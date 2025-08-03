import React, { useState } from 'react';
import { Users, Search, Filter, CheckCircle, Clock, MapPin, DollarSign, Plus } from 'lucide-react';

const ResponsibleOfficerAssignmentTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [assignments, setAssignments] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [companies, setCompanies] = useState([
    {
      regNo: 'ST1NWT2',
      ownerName: 'Mahesh Kumara',
      companyName: 'Rajarata Oil',
      outstandingDue: 2300.00,
      zone: 'Zone A1',
      status: 'Pending'
    },
    {
      regNo: 'ST2NWT3',
      ownerName: 'Sunil Fernando',
      companyName: 'Ceylon Trading Co.',
      outstandingDue: 4500.00,
      zone: 'Zone A1',
      status: 'Pending'
    },
    {
      regNo: 'ST3NWT4',
      ownerName: 'Priya Jayasinghe',
      companyName: 'Green Valley Exports',
      outstandingDue: 1800.00,
      zone: 'Zone A2',
      status: 'Pending'
    },
    {
      regNo: 'ST4NWT5',
      ownerName: 'Rohan Silva',
      companyName: 'Silva Construction',
      outstandingDue: 3200.00,
      zone: 'Zone A1',
      status: 'Pending'
    },
    {
      regNo: 'ST5NWT6',
      ownerName: 'Kamani Perera',
      companyName: 'Peak Logistics',
      outstandingDue: 2750.00,
      zone: 'Zone B1',
      status: 'Pending'
    },
    {
      regNo: 'ST6NWT7',
      ownerName: 'Nimal Wijeratne',
      companyName: 'Tech Solutions Lanka',
      outstandingDue: 5100.00,
      zone: 'Zone A2',
      status: 'Pending'
    }
  ]);
  const [newCompany, setNewCompany] = useState({
    regNo: '',
    ownerName: '',
    companyName: '',
    outstandingDue: '',
    zone: 'Zone A1'
  });

  // Mock data for companies with outstanding dues

  // Available fee collectors
  const feeCollectors = [
    { id: 'FC001', name: 'Samantha Perera', zones: ['Zone A1', 'Zone A2'] },
    { id: 'FC002', name: 'Ruwan Fernando', zones: ['Zone B1', 'Zone B2'] },
    { id: 'FC003', name: 'Niluka Silva', zones: ['Zone C1', 'Zone C2'] },
    { id: 'FC004', name: 'Kasun Wijeratne', zones: ['Zone A3', 'Zone A4'] }
  ];

  const zones = ['All Zones', 'Zone A1', 'Zone A2', 'Zone A3', 'Zone A4', 'Zone B1', 'Zone B2', 'Zone B3', 'Zone B4'];

  const handleCollectorChange = (regNo, collectorId) => {
    setAssignments(prev => ({
      ...prev,
      [regNo]: collectorId
    }));
  };

  const handleAssign = (company) => {
    const collectorId = assignments[company.regNo];
    if (!collectorId) {
      alert('Please select a fee collector first!');
      return;
    }

    const collector = feeCollectors.find(c => c.id === collectorId);
    alert(`Successfully assigned ${company.companyName} (${company.regNo}) to ${collector.name}!\n\nThis assignment will now appear in ${collector.name}'s dashboard.`);
    
    // Remove the assignment dropdown after successful assignment
    setAssignments(prev => {
      const newAssignments = { ...prev };
      delete newAssignments[company.regNo];
      return newAssignments;
    });
  };

  const handleAddCompany = () => {
    if (!newCompany.regNo || !newCompany.ownerName || !newCompany.companyName || !newCompany.outstandingDue) {
      alert('Please fill in all required fields!');
      return;
    }

    // Check if registration number already exists
    if (companies.find(c => c.regNo === newCompany.regNo)) {
      alert('Registration number already exists!');
      return;
    }

    const companyToAdd = {
      ...newCompany,
      outstandingDue: parseFloat(newCompany.outstandingDue),
      status: 'Pending'
    };

    setCompanies(prev => [...prev, companyToAdd]);
    setNewCompany({
      regNo: '',
      ownerName: '',
      companyName: '',
      outstandingDue: '',
      zone: 'Zone A1'
    });
    setShowAddModal(false);
    alert(`Successfully added ${companyToAdd.companyName} to the assignment list!`);
  };

  const AddCompanyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full m-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Company</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
            <input
              type="text"
              placeholder="e.g. ST7NWT8"
              value={newCompany.regNo}
              onChange={(e) => setNewCompany(prev => ({ ...prev, regNo: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name *</label>
            <input
              type="text"
              placeholder="Enter owner name"
              value={newCompany.ownerName}
              onChange={(e) => setNewCompany(prev => ({ ...prev, ownerName: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
            <input
              type="text"
              placeholder="Enter company name"
              value={newCompany.companyName}
              onChange={(e) => setNewCompany(prev => ({ ...prev, companyName: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zone *</label>
            <select
              value={newCompany.zone}
              onChange={(e) => setNewCompany(prev => ({ ...prev, zone: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {zones.slice(1).map(zone => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Outstanding Due (LKR) *</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={newCompany.outstandingDue}
              onChange={(e) => setNewCompany(prev => ({ ...prev, outstandingDue: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddCompany}
              className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Add Company
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const getAvailableCollectors = (zone) => {
    return feeCollectors.filter(collector => collector.zones.includes(zone));
  };

  const filteredCompanies = companies.filter(company => 
    (selectedZone === 'All Zones' || company.zone === selectedZone) &&
    (company.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
     company.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     company.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fee Collection Assignment</h1>
            <p className="text-gray-600">Assign companies to fee collectors for outstanding payment collection</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Row
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500">Updated now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{companies.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Assignments</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {companies.filter(c => c.status === 'Pending').length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Collectors</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{feeCollectors.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Outstanding</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                LKR {companies.reduce((sum, c) => sum + c.outstandingDue, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Reg No, Owner Name, or Company Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select 
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {zones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
              
              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Fee Collector Assignment Table</h2>
              <p className="text-gray-600 mt-1">Assign fee collectors to collect outstanding payments</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {filteredCompanies.length} companies found
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">Reg No</th>
                <th className="text-left p-4 font-semibold text-gray-900">Owner Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Company Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Zone</th>
                <th className="text-right p-4 font-semibold text-gray-900">Outstanding Due</th>
                <th className="text-left p-4 font-semibold text-gray-900">Assign Fee Collector</th>
                <th className="text-center p-4 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCompanies.map((company, index) => {
                const availableCollectors = getAvailableCollectors(company.zone);
                return (
                  <tr key={company.regNo} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{company.regNo}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{company.ownerName}</div>
                    </td>
                    
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{company.companyName}</div>
                    </td>
                    
                    <td className="p-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {company.zone}
                      </span>
                    </td>
                    
                    <td className="p-4 text-right">
                      <span className="font-bold text-red-600 text-lg">
                        LKR {company.outstandingDue.toLocaleString()}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <select 
                        value={assignments[company.regNo] || ''}
                        onChange={(e) => handleCollectorChange(company.regNo, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      >
                        <option value="">Select Collector...</option>
                        {availableCollectors.map(collector => (
                          <option key={collector.id} value={collector.id}>
                            {collector.name}
                          </option>
                        ))}
                      </select>
                      {availableCollectors.length === 0 && (
                        <p className="text-xs text-red-500 mt-1">No collectors available for this zone</p>
                      )}
                    </td>
                    
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleAssign(company)}
                        disabled={!assignments[company.regNo]}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          assignments[company.regNo]
                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Companies Found</h3>
              <p className="text-gray-600">No companies match your current search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Today's Assignment Summary</h2>
          <p className="text-gray-600 mt-1">Overview of assignments made today</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feeCollectors.map(collector => {
              const assignedCount = Object.values(assignments).filter(id => id === collector.id).length;
              return (
                <div key={collector.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{collector.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {collector.id}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span>Active Zones: </span>
                      {collector.zones.map(zone => (
                        <span key={zone} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-1">
                          {zone}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Pending Assignments: </span>
                      <span className="font-bold text-orange-600">{assignedCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      
      {/* Add Company Modal */}
      {showAddModal && <AddCompanyModal />}
    </div>
  );
};

export default ResponsibleOfficerAssignmentTable;