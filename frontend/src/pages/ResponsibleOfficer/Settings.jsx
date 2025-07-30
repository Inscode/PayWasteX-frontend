import React, { useState } from "react";
import { 
  Settings, 
  Plus, 
  MapPin, 
  Users, 
  UserCheck, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Building,
  Phone,
  Mail,
  Hash,
  User
} from "lucide-react";

const ResponsibleOfficerSettings = () => {
  const [activeTab, setActiveTab] = useState('zones');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState('');

  // Sample data
  const [zones, setZones] = useState([
    { id: 1, code: 'A1', name: 'Colombo Central', description: 'Main business district', status: 'active', businesses: 45 },
    { id: 2, code: 'A2', name: 'Colombo North', description: 'Residential and commercial', status: 'active', businesses: 32 },
    { id: 3, code: 'B1', name: 'Mount Lavinia', description: 'Tourist area', status: 'active', businesses: 28 },
    { id: 4, code: 'C1', name: 'Dehiwala', description: 'Mixed development', status: 'inactive', businesses: 15 },
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, regNo: 'REG001', companyName: 'Railway Tourist Bungalow', ownerName: 'M S D Priyantha', zone: 'A1', phone: '+94771234567', email: 'priyantha@rtb.lk', status: 'active' },
    { id: 2, regNo: 'REG002', companyName: 'Sunset Hotel', ownerName: 'Nirosha Perera', zone: 'A2', phone: '+94772345678', email: 'nirosha@sunset.lk', status: 'active' },
    { id: 3, regNo: 'REG003', companyName: 'Ocean View Café', ownerName: 'Tharindu Silva', zone: 'B1', phone: '+94773456789', email: 'tharindu@oceanview.lk', status: 'active' },
    { id: 4, regNo: 'REG004', companyName: 'Green Leaf Spa', ownerName: 'Harsha Bandara', zone: 'A1', phone: '+94774567890', email: 'harsha@greenleaf.lk', status: 'inactive' },
  ]);

  const [collectors, setCollectors] = useState([
    { id: 1, name: 'Prasad Perera', employeeId: 'EMP001', zones: ['A1', 'A2'], phone: '+94711234567', email: 'prasad.p@municipality.lk', status: 'active', collections: 156 },
    { id: 2, name: 'Silva Fernando', employeeId: 'EMP002', zones: ['B1', 'B2'], phone: '+94712345678', email: 'silva.f@municipality.lk', status: 'active', collections: 142 },
    { id: 3, name: 'Nimal Jayawardena', employeeId: 'EMP003', zones: ['C1', 'C2'], phone: '+94713456789', email: 'nimal.j@municipality.lk', status: 'active', collections: 98 },
    { id: 4, name: 'Kamala Bandara', employeeId: 'EMP004', zones: ['A3'], phone: '+94714567890', email: 'kamala.b@municipality.lk', status: 'inactive', collections: 45 },
  ]);

  const [formData, setFormData] = useState({});

  const tabs = [
    { id: 'zones', label: 'Zones', icon: MapPin, count: zones.length },
    { id: 'customers', label: 'Customers', icon: Users, count: customers.length },
    { id: 'collectors', label: 'Fee Collectors', icon: UserCheck, count: collectors.length },
  ];

  const handleAdd = () => {
    setFormData({});
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: editingItem ? editingItem.id : Date.now() };
    
    if (activeTab === 'zones') {
      if (editingItem) {
        setZones(zones.map(z => z.id === editingItem.id ? newItem : z));
      } else {
        setZones([...zones, { ...newItem, businesses: 0, status: 'active' }]);
      }
    } else if (activeTab === 'customers') {
      if (editingItem) {
        setCustomers(customers.map(c => c.id === editingItem.id ? newItem : c));
      } else {
        setCustomers([...customers, { ...newItem, status: 'active' }]);
      }
    } else if (activeTab === 'collectors') {
      if (editingItem) {
        setCollectors(collectors.map(c => c.id === editingItem.id ? newItem : c));
      } else {
        setCollectors([...collectors, { ...newItem, collections: 0, status: 'active' }]);
      }
    }

    setShowAddModal(false);
    setShowSuccess(editingItem ? 'Updated successfully!' : 'Added successfully!');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handleDelete = (id) => {
    if (activeTab === 'zones') {
      setZones(zones.filter(z => z.id !== id));
    } else if (activeTab === 'customers') {
      setCustomers(customers.filter(c => c.id !== id));
    } else if (activeTab === 'collectors') {
      setCollectors(collectors.filter(c => c.id !== id));
    }
    setShowSuccess('Deleted successfully!');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const toggleStatus = (id) => {
    if (activeTab === 'zones') {
      setZones(zones.map(z => z.id === id ? { ...z, status: z.status === 'active' ? 'inactive' : 'active' } : z));
    } else if (activeTab === 'customers') {
      setCustomers(customers.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
    } else if (activeTab === 'collectors') {
      setCollectors(collectors.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
    }
  };

  const getCurrentData = () => {
    const data = activeTab === 'zones' ? zones : activeTab === 'customers' ? customers : collectors;
    return data.filter(item => {
      const searchFields = activeTab === 'zones' 
        ? [item.code, item.name, item.description]
        : activeTab === 'customers'
        ? [item.regNo, item.companyName, item.ownerName]
        : [item.name, item.employeeId, item.email];
      
      return searchFields.some(field => 
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Settings className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Responsible Officer Settings</h1>
                <p className="text-gray-600">Manage zones, customers, and fee collectors</p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center space-x-3 animate-fade-in">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-green-800 font-medium">{showSuccess}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-2xl border border-white/20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform -translate-y-0.5'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentData().map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              type={activeTab}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
              onToggleStatus={() => toggleStatus(item.id)}
            />
          ))}
        </div>

        {getCurrentData().length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search terms or add a new item.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <Modal
          title={editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
          activeTab={activeTab}
          formData={formData}
          setFormData={setFormData}
          zones={zones}
        />
      )}
    </div>
  );
};

const ItemCard = ({ item, type, onEdit, onDelete, onToggleStatus }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:shadow-xl hover:bg-white/80 transition-all duration-300 relative">
      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          item.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </span>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border z-10 py-1 min-w-[120px]">
              <button
                onClick={() => { onEdit(); setShowMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => { onToggleStatus(); setShowMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
              >
                {item.status === 'active' ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Deactivate</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Activate</span>
                  </>
                )}
              </button>
              <button
                onClick={() => { onDelete(); setShowMenu(false); }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content based on type */}
      {type === 'zones' && (
        <>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.code}</h3>
              <p className="text-sm text-gray-600">{item.name}</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Businesses:</span>
            <span className="font-semibold text-gray-800">{item.businesses}</span>
          </div>
        </>
      )}

      {type === 'customers' && (
        <>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.regNo}</h3>
              <p className="text-sm text-gray-600">{item.companyName}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{item.ownerName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Zone {item.zone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{item.phone}</span>
            </div>
          </div>
        </>
      )}

      {type === 'collectors' && (
        <>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.employeeId}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Zones: {item.zones.join(', ')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{item.phone}</span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <span className="text-gray-500">Collections:</span>
              <span className="font-semibold text-gray-800">{item.collections}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Modal = ({ title, onClose, onSave, activeTab, formData, setFormData, zones }) => {
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'zones':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Code</label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => updateFormData('code', e.target.value)}
                  placeholder="e.g., A1"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="e.g., Colombo Central"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Brief description of the zone"
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </>
        );

      case 'customers':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration No</label>
                <input
                  type="text"
                  value={formData.regNo || ''}
                  onChange={(e) => updateFormData('regNo', e.target.value)}
                  placeholder="e.g., REG001"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
                <select
                  value={formData.zone || ''}
                  onChange={(e) => updateFormData('zone', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Zone</option>
                  {zones.map(zone => (
                    <option key={zone.id} value={zone.code}>{zone.code} - {zone.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                placeholder="Company or business name"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
              <input
                type="text"
                value={formData.ownerName || ''}
                onChange={(e) => updateFormData('ownerName', e.target.value)}
                placeholder="Owner or contact person name"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+94771234567"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="contact@company.lk"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </>
        );

      case 'collectors':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Full name"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={formData.employeeId || ''}
                  onChange={(e) => updateFormData('employeeId', e.target.value)}
                  placeholder="e.g., EMP001"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Zones</label>
              <div className="grid grid-cols-3 gap-2">
                {zones.map(zone => (
                  <label key={zone.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(formData.zones || []).includes(zone.code)}
                      onChange={(e) => {
                        const currentZones = formData.zones || [];
                        if (e.target.checked) {
                          updateFormData('zones', [...currentZones, zone.code]);
                        } else {
                          updateFormData('zones', currentZones.filter(z => z !== zone.code));
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm">{zone.code}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+94711234567"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="employee@municipality.lk"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {renderFormFields()}
        </div>
        
        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleOfficerSettings;