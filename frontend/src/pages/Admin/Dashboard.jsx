// src/pages/AdminUserManagement.jsx
import React, { useCallback, useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";

/* ── Notification Component ─────────────────────────────────── */
function Notification({ type, message, onClose }) {
  const config = {
    success: {
      outer: "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800",
      iconBg: "inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200",
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
      ),
    },
    danger: {
      outer: "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800",
      iconBg: "inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200",
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
      ),
    },
    warning: {
      outer: "flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800",
      iconBg: "inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200",
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
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
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  );
}

/* ── mock data ─────────────────────────────────────────────── */
const USERS = [
  { id: "U001", name: "Sugath Perera", role: "Admin", contact: "sugath@gmail.com", status: "Active" },
  { id: "U002", name: "Mahesh Kumara", role: "Responsible Officer", contact: "mahesh@gmail.com", status: "Active" },
  { id: "U003", name: "M S S M Hashan", role: "Responsible Officer", contact: "hashan@gmail.com", status: "Active" },
  { id: "U004", name: "A A Rasik", role: "Fee Collector", contact: "rasik@gmail.com", status: "Active" },
  { id: "U005", name: "Sisira Nirmal", role: "Fee Collector", contact: "sisira@gmail.com", status: "Active" },
  { id: "U006", name: "Row 6", role: "Fee Collector", contact: "six@gmail.com", status: "Active" },
  { id: "U007", name: "Row 7", role: "Fee Collector", contact: "seven@gmail.com", status: "Active" },
];
const PER_PAGE = 5;

/* ── page component ─────────────────────────────────────────── */
export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* modal state */
  const [modalType, setModalType] = useState(null); // 'view' | 'edit' | 'delete' | 'add'
  const [selectedUser, setSelectedUser] = useState(null);

  /* notification state */
  const [notification, setNotification] = useState({ type: "", message: "", visible: false });
  const showNotification = (type, message) => setNotification({ type, message, visible: true });
  const closeNotification = () => setNotification(prev => ({ ...prev, visible: false }));

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
    return USERS.filter(u =>
      u.id.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
    );
  }, [search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageUsers = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  return (
    <>
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


      <section className="w-full px-4 sm:px-6 pt-6 pb-12">
        {/* █ HEADER ROW █ */}
        <header className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="relative flex-grow sm:flex-grow-0 sm:basis-1/3">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              placeholder="User ID or Name"
              value={search}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="button"
            onClick={() => openModal("add")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 sm:px-4 sm:py-2
                       rounded transition text-sm sm:text-base"
          >
            Add New User
          </button>
        </header>

        {/* █ CARD LIST (mobile) █ */}
        <ul className="sm:hidden space-y-4">
          {pageUsers.map(u => (
            <li key={u.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold">{u.id}</span>
                <span className="inline-block bg-green-700 text-white text-xs px-3 py-[2px] rounded-full">
                  {u.status}
                </span>
              </div>
              <dl className="mt-2 text-sm space-y-1">
                <InfoPair label="Name" value={u.name} />
                <InfoPair label="Role" value={u.role} />
                <InfoPair label="Email" value={u.contact} />
              </dl>
              <div className="flex gap-6 mt-3 text-sm font-semibold">
                <button className="text-blue-600" onClick={() => openModal("edit", u)}>
                  Edit
                </button>
                <button className="text-red-600" onClick={() => openModal("delete", u)}>
                  Delete
                </button>
                <button className="text-yellow-600" onClick={() => openModal("view", u)}>
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* █ TABLE (≥ sm) █ */}
        <div className="hidden sm:block overflow-x-auto rounded-lg">
          <table className="w-full text-[15px] shadow">
            <thead className="bg-gray-100 text-green-900 uppercase text-sm">
              <tr>
                {["User ID","Name","Role","Contact Info","Status","Action"].map(h => (
                  <th key={h} className="px-6 py-4 text-left font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageUsers.map((u,i) => (
                <tr key={u.id} className={`${i%2?"bg-white":"bg-gray-50"} border-t last:border-b`}>
                  <td className="px-4 py-4">{u.id}</td>
                  <td className="px-4 py-4">{u.name}</td>
                  <td className="px-4 py-4">{u.role}</td>
                  <td className="px-4 py-4">{u.contact}</td>
                  <td className="px-4 py-4">
                    <span className="inline-block bg-green-700 text-white text-s px-7 py-[8px] rounded-full">
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-6 text-sm font-semibold">
                      <button className="text-blue-600 hover:underline" onClick={() => openModal("edit", u)}>Edit</button>
                      <button className="text-red-600  hover:underline" onClick={() => openModal("delete", u)}>Delete</button>
                      <button className="text-yellow-600 hover:underline" onClick={() => openModal("view", u)}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* █ PAGINATION █ */}
        <footer className="mt-6 flex justify-center items-center gap-2 select-none">
          <PageNav label="<" disabled={page===1} onClick={()=>changePage(page-1)} />
          {Array.from({ length: totalPages }).map((_,i) => (
            <PageNumber
              key={i}
              number={i+1}
              active={page===i+1}
              onClick={()=>changePage(i+1)}
            />
          ))}
          <PageNav label=">" disabled={page===totalPages} onClick={()=>changePage(page+1)} />
        </footer>

        {/* █ MODALS █ */}
        {modalType==="view"   && selectedUser && <ViewUserModal user={selectedUser} onClose={closeModal} />}
        {modalType==="edit"   && selectedUser && <EditUserModal user={selectedUser} onClose={closeModal} showNotification={showNotification} />}
        {modalType==="delete" && selectedUser && <DeleteUserModal onClose={closeModal} showNotification={showNotification} />}
        {modalType==="add"    && <AddUserModal onClose={closeModal} showNotification={showNotification} />}
      </section>
    </>
  );
}

/* ── small helpers ─────────────────────────────────────────── */
const InfoPair = ({ label, value }) => (
  <div>
    <dt className="inline font-medium">{label}: </dt>
    <dd className="inline">{value}</dd>
  </div>
);
const PageNav = ({ label, disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-40"
  >
    {label}
  </button>
);
const PageNumber = ({ number, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-8 h-8 rounded text-sm font-semibold ${
      active ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
    }`}
  >
    {number}
  </button>
);

/* ── MODAL BASE ────────────────────────────────────────────── */
function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-ls"
    >
      <div className="bg-white rounded shadow-lg min-w-[550px] max-w-[100vw] p-6 relative">
        <button
          className="absolute top-3 right-3 text-2xl text-red-500 font-bold"
          onClick={onClose}
        >×</button>
        {children}
      </div>
    </div>
  );
}

/* ── ① View User ───────────────────────────────────────────── */
function ViewUserModal({ user, onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 text-green-900 text-center">View User Details</h2>
      <div className="space-y-4">
        <InfoDisplay label="Name" value={user.name} />
        <InfoDisplay label="Email" value={user.contact} />
        <InfoDisplay label="Contact No" value="+94 776589765" />
        <InfoDisplay label="Role" value={user.role} />
        <InfoDisplay label="User Name" value="Sugath123" />
      </div>
    </Modal>
  );
}
const InfoDisplay = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
    <span className="w-32 text-gray-700 font-bold">{label}</span>
    <div className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 shadow-sm">
      {value}
    </div>
  </div>
);

/* ── ② Edit User ───────────────────────────────────────────── */
function EditUserModal({ user, onClose, showNotification }) {
  const [form, setForm] = useState({
    name: user.name,
    username: "Sugath123",
    email: user.contact,
    contact: "+94 776589765",
  });
  const updateField = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    const { name, username, email, contact } = form;
    if (!name || !username || !email || !contact) {
      showNotification("warning", "All fields are required.");
      return;
    }
    // … perform your update call here …
    showNotification("success", "User updated successfully.");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-green-900 text-center">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <EditRow label="Name" name="name" value={form.name} onChange={updateField} />
        <EditRow label="User Name" name="username" value={form.username} onChange={updateField} />
        <EditRow label="Email" name="email" value={form.email} onChange={updateField} />
        <EditRow label="Contact No" name="contact" value={form.contact} onChange={updateField} />
        <button className="w-full bg-green-700 text-white py-2 rounded font-semibold">
          Update User
        </button>
      </form>
    </Modal>
  );
}
const EditRow = ({ label, ...props }) => (
  <div className="flex items-center gap-3">
    <label className="font-bold w-32">{label}</label>
    <input
      className="flex-1 px-3 py-1 border border-gray-300 rounded"
      {...props}
    />
  </div>
);

/* ── ③ Delete User ─────────────────────────────────────────── */
function DeleteUserModal({ onClose, showNotification }) {
  const handleDelete = () => {
    // … perform your delete call here …
    showNotification("danger", "User deleted successfully.");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-2 text-green-900 text-center">Delete User</h2>
      <div className="flex flex-col items-center py-2">
        <svg className="mb-4" height="54" viewBox="0 0 50 54" fill="none">
          <rect x="9" y="17" width="32" height="30" rx="5" fill="#B91C1C" />
          <rect x="16" y="8" width="18" height="6" rx="2" fill="#B91C1C" />
        </svg>
        <p className="mb-4 text-center">Are you sure you want to delete this user?</p>
        <button
          onClick={handleDelete}
          className="w-40 bg-red-700 text-white py-2 rounded font-semibold"
        >
          Yes, Delete
        </button>
      </div>
    </Modal>
  );
}

/* ── ④ Add New User ─────────────────────────────────────────── */
function AddUserModal({ onClose, showNotification }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    contact: "",
    role: "",
    status: "Active",
  });
  const updateField = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    const { id, name, username, email, contact, role } = form;
    if (!id || !name || !username || !email || !contact || !role) {
      showNotification("warning", "All fields are required.");
      return;
    }
    // … perform your create call here …
    showNotification("success", "User added successfully.");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-green-900">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <EditRow label="User ID" name="id" value={form.id} onChange={updateField} />
        <EditRow label="Name" name="name" value={form.name} onChange={updateField} />
        <EditRow label="User Name" name="username" value={form.username} onChange={updateField} />
        <EditRow label="Email" name="email" value={form.email} onChange={updateField} />
        <EditRow label="Contact No" name="contact" value={form.contact} onChange={updateField} />
        <EditRow label="Role" name="role" value={form.role} onChange={updateField} />
        <EditRow label="Status" name="status" value={form.status} onChange={updateField} />
        <button className="w-full bg-green-700 text-white py-2 rounded font-semibold">
          Create User
        </button>
      </form>
    </Modal>
  );
}
