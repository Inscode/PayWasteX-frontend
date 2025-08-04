import React, { useCallback, useMemo, useState, useEffect } from "react";
import { fetchAllUser } from "../../services/admin";

const deleteUser = async (userId) => {
  console.log("Deleting user:", userId);
  return Promise.resolve();
};

const adminRegister = async (userData) => {
  console.log("Creating user:", userData);
  return Promise.resolve({ success: true });
};

/* ── Notification Component ─────────────────────────────────── */
function Notification({ type, message, onClose }) {
  const config = {
    success: {
      outer:
        "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-2xl shadow-lg border border-emerald-200 backdrop-blur-sm",
      iconBg:
        "inline-flex items-center justify-center shrink-0 w-8 h-8 text-emerald-500 bg-emerald-100 rounded-xl",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ),
    },
    danger: {
      outer:
        "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-2xl shadow-lg border border-red-200 backdrop-blur-sm",
      iconBg:
        "inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-xl",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      ),
    },
    warning: {
      outer:
        "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-2xl shadow-lg border border-amber-200 backdrop-blur-sm",
      iconBg:
        "inline-flex items-center justify-center shrink-0 w-8 h-8 text-amber-500 bg-amber-100 rounded-xl",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
        </svg>
      ),
    },
  };

  const { outer, iconBg, icon } = config[type] || config.success;

  return (
    <div id={`toast-${type}`} className={outer} role="alert">
      <div className={iconBg}>
        {icon}
        <span className="sr-only">{type} icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        onClick={onClose}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

const PER_PAGE = 5;

/* ── page component ─────────────────────────────────────────── */
export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* modal state */
  const [modalType, setModalType] = useState(null); // 'view' | 'edit' | 'delete' | 'add'
  const [selectedUser, setSelectedUser] = useState(null);

  /* notification state */
  const [notification, setNotification] = useState({
    type: "",
    message: "",
    visible: false,
  });
  const showNotification = (type, message) =>
    setNotification({ type, message, visible: true });
  const closeNotification = () =>
    setNotification((prev) => ({ ...prev, visible: false }));

  /* handlers */
  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
  };
  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
  };
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);
  const changePage = useCallback((p) => setPage(p), []);

  /* filter + paginate */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter(
      (u) =>
        u.id.toString().toLowerCase().includes(q) ||
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [search, users]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageUsers = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  /* fetch all users */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchAllUser();
        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        showNotification("danger", "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ── Toast Notification ── */}
      <div className="fixed top-19 right-6 z-60 w-80">
        {notification.visible && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={closeNotification}
          />
        )}
      </div>

      <section className="w-full px-4 sm:px-6 pt-6 pb-12 max-w-7xl mx-auto">
        {/* ── Modern Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              User Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage system users and their permissions
          </p>
        </div>

        {/* █ HEADER ROW █ */}
        <header className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="relative flex-grow sm:flex-grow-0 sm:basis-1/3">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <input
                placeholder="User ID, Name or Email"
                value={search}
                onChange={handleSearch}
                className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl placeholder-gray-500 bg-white/80
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              type="button"
              onClick={() => openModal("add")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                        text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg 
                        hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New User
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
        ) : (
          <>
            {/* █ CARD LIST (mobile) █ */}
            <ul className="sm:hidden space-y-4">
              {pageUsers.map((u) => (
                <li
                  key={u.id}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {u.fullName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 text-lg">
                          U{u.id.toString().padStart(3, "0")}
                        </span>
                        <p className="text-sm text-gray-500">{u.fullName}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center bg-emerald-100 text-emerald-800 text-xs px-3 py-2 rounded-full font-semibold border border-emerald-200">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Active
                    </span>
                  </div>
                  <dl className="mt-2 text-sm space-y-3">
                    <InfoPair label="Name" value={u.fullName} />
                    <InfoPair label="Role" value={u.role} />
                    <InfoPair label="Email" value={u.email} />
                    <InfoPair label="Contact" value={u.contactNo} />
                  </dl>
                  <div className="flex gap-2 mt-6">
                    <button
                      className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 px-4 py-2 rounded-xl font-semibold transition-all duration-200"
                      onClick={() => openModal("edit", u)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 px-4 py-2 rounded-xl font-semibold transition-all duration-200"
                      onClick={() => openModal("delete", u)}
                    >
                      Delete
                    </button>
                    <button
                      className="flex-1 bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200 px-4 py-2 rounded-xl font-semibold transition-all duration-200"
                      onClick={() => openModal("view", u)}
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* █ TABLE (≥ sm) █ */}
            <div className="hidden sm:block bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm overflow-hidden">
              <table className="w-full text-[15px]">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
                  <tr>
                    {[
                      "User ID",
                      "Name",
                      "Role",
                      "Email",
                      "Contact",
                      "Status",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pageUsers.map((u, i) => (
                    <tr
                      key={u.id}
                      className="hover:bg-blue-50/50 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-gray-900">
                          U{u.id.toString().padStart(3, "0")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold">
                            {u.fullName.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">
                            {u.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{u.email}</td>
                      <td className="px-6 py-4 text-gray-600">{u.contactNo}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center bg-emerald-100 text-emerald-800 text-xs px-4 py-2 rounded-full font-semibold border border-emerald-200">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          {u.accountNonLocked ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg font-semibold transition-all duration-200"
                            onClick={() => openModal("edit", u)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg font-semibold transition-all duration-200"
                            onClick={() => openModal("delete", u)}
                          >
                            Delete
                          </button>
                          <button
                            className="text-amber-600 hover:bg-amber-100 px-3 py-1 rounded-lg font-semibold transition-all duration-200"
                            onClick={() => openModal("view", u)}
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* █ PAGINATION █ */}
            {users.length > 0 && (
              <footer className="mt-8 flex justify-center items-center gap-2 select-none">
                <PageNav
                  label="<"
                  disabled={page === 1}
                  onClick={() => changePage(page - 1)}
                />
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PageNumber
                    key={i}
                    number={i + 1}
                    active={page === i + 1}
                    onClick={() => changePage(i + 1)}
                  />
                ))}
                <PageNav
                  label=">"
                  disabled={page === totalPages}
                  onClick={() => changePage(page + 1)}
                />
              </footer>
            )}
          </>
        )}

        {/* █ MODALS █ */}
        {modalType === "view" && selectedUser && (
          <ViewUserModal user={selectedUser} onClose={closeModal} />
        )}
        {modalType === "edit" && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={closeModal}
            showNotification={showNotification}
          />
        )}
        {modalType === "delete" && selectedUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={closeModal}
            showNotification={showNotification}
          />
        )}
        {modalType === "add" && (
          <AddUserModal
            onClose={closeModal}
            showNotification={showNotification}
          />
        )}
      </section>
    </div>
  );
}

/* ── small helpers ─────────────────────────────────────────── */
const InfoPair = ({ label, value }) => (
  <div className="flex justify-between">
    <dt className="font-medium text-gray-600">{label}:</dt>
    <dd className="text-gray-900 font-medium">{value}</dd>
  </div>
);

const PageNav = ({ label, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="px-3 py-2 rounded-xl hover:bg-white/80 disabled:opacity-40 border border-gray-200 bg-white transition-all duration-200"
  >
    {label}
  </button>
);

const PageNumber = ({ number, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
    }`}
  >
    {number}
  </button>
);

/* ── MODAL BASE ────────────────────────────────────────────── */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl min-w-[550px] max-w-[90vw] p-6 relative border border-gray-100">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 font-bold w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-200"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/* ── ① View User ───────────────────────────────────────────── */
function ViewUserModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
          {user.fullName.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          View User Details
        </h2>
        <p className="text-gray-600">
          Complete information for {user.fullName}
        </p>
      </div>
      <div className="space-y-4">
        <InfoDisplay label="Name" value={user.fullName} />
        <InfoDisplay label="Email" value={user.email} />
        <InfoDisplay label="Contact No" value={user.contactNo} />
        <InfoDisplay label="Role" value={user.role} />
        <InfoDisplay label="NIC" value={user.nic} />
      </div>
    </Modal>
  );
}

const InfoDisplay = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
    <span className="w-32 text-gray-700 font-bold">{label}</span>
    <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 shadow-sm">
      {value}
    </div>
  </div>
);

/* ── ② Edit User ───────────────────────────────────────────── */
function EditUserModal({ user, onClose, showNotification }) {
  const [form, setForm] = useState({
    fullName: user.fullName,
    email: user.email,
    contactNo: user.contactNo,
    role: user.role,
    nic: user.nic,
  });

  const updateField = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, contactNo, role, nic } = form;
    if (!fullName || !email || !contactNo || !role || !nic) {
      showNotification("warning", "All fields are required.");
      return;
    }
    // … perform your update call here …
    showNotification("success", "User updated successfully.");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Edit User</h2>
        <p className="text-gray-600">Update user information</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <EditRow
          label="Name"
          name="fullName"
          value={form.fullName}
          onChange={updateField}
        />
        <EditRow
          label="Email"
          name="email"
          value={form.email}
          onChange={updateField}
        />
        <EditRow
          label="Contact No"
          name="contactNo"
          value={form.contactNo}
          onChange={updateField}
        />
        <div className="flex items-center gap-3">
          <label className="font-bold w-32">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={updateField}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Role</option>
            <option value="Responsible officer">Responsible officer</option>
            <option value="Fee Collector officer">Fee Collector officer</option>
          </select>
        </div>
        <EditRow
          label="NIC"
          name="nic"
          value={form.nic}
          onChange={updateField}
        />
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
          >
            Update User
          </button>
        </div>
      </form>
    </Modal>
  );
}

const EditRow = ({ label, type = "text", options, ...props }) => (
  <div className="flex items-center gap-3">
    <label className="font-bold w-32">{label}</label>
    {options ? (
      <select
        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        {...props}
      />
    )}
  </div>
);

/* ── ③ Delete User ─────────────────────────────────────────── */
function DeleteUserModal({ user, onClose, showNotification }) {
  const handleDelete = async () => {
    // Log the user ID to console
    console.log("Deleting user with ID:", user.id);

    try {
      // Call the deleteUser service
      await deleteUser(user.id);
      showNotification("success", "User deleted successfully.");
      onClose();

      // Optionally refresh the users list
      // You might want to call a refresh function here or trigger a re-fetch
    } catch (error) {
      console.error("Error deleting user:", error);

      let errorMessage = "Failed to delete user. Please try again.";

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 404) {
          errorMessage = "User not found.";
        } else if (error.response.status === 403) {
          errorMessage = "You don't have permission to delete this user.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      showNotification("danger", errorMessage);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Delete User</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">User:</span> {user.fullName}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">ID:</span> U
            {user.id.toString().padStart(3, "0")}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ── ④ Add New User ─────────────────────────────────────────── */
function AddUserModal({ onClose, showNotification }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    role: "Responsible officer", // Default value
    nic: "",
    password: "",
  });

  const updateField = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, contactNo, role, nic, password } = form;

    if (!fullName || !email || !contactNo || !role || !nic || !password) {
      showNotification("warning", "All fields are required.");
      return;
    }

    const transformedRole =
      role === "Responsible officer" ? "RESPONSIBLEOFFICER" : role;

    const userData = {
      fullName,
      email,
      contactNo,
      role: transformedRole,
      nic,
      password,
    };
    try {
      // Call the adminRegister service
      const response = await adminRegister(userData);
      showNotification("success", "Registration successfully.");
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
      let errorMessage = "Failed to create user. Please try again.";

      if (error.response) {
        console.error("Error response:", error.response);
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = "Invalid data provided. Please check your inputs.";
        } else if (error.response.status === 409) {
          errorMessage = "User with this email or NIC already exists.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        console.error("Network error:", error.request);
        errorMessage = "Network error. Please check your connection.";
      } else {
        console.error("Other error:", error.message);
        errorMessage = error.message || "An unexpected error occurred.";
      }

      showNotification("danger", errorMessage);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Add New User</h2>
        <p className="text-gray-600">Create a new user account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <EditRow
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={updateField}
        />
        <EditRow
          label="Email"
          name="email"
          value={form.email}
          onChange={updateField}
        />
        <EditRow
          label="Contact No"
          name="contactNo"
          value={form.contactNo}
          onChange={updateField}
        />
        <EditRow
          label="Role"
          name="role"
          value={form.role}
          onChange={updateField}
        />
        <EditRow
          label="NIC"
          name="nic"
          value={form.nic}
          onChange={updateField}
        />
        <EditRow
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={updateField}
        />
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
          >
            Create User
          </button>
        </div>
      </form>
    </Modal>
  );
}
