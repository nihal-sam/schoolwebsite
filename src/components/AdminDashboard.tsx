import React, { useState, useEffect } from 'react';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Contact {
  name: string;
  email: string;
  message: string;
  date: string;
}

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  childAge: string;
  message: string;
  date: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'contacts'>('enquiries');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const adminUsername = localStorage.getItem('adminUsername');
    if (!adminUsername) {
      navigate('/');
      return;
    }
    setUsername(adminUsername);

    // Load data from localStorage
    const storedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    
    // Sort by date (newest first)
    setEnquiries(storedEnquiries.sort((a: Enquiry, b: Enquiry) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
    setContacts(storedContacts.sort((a: Contact, b: Contact) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminUsername');
    navigate('/');
  };

  const updateEnquiryStatus = (id: number, newStatus: string) => {
    const updatedEnquiries = enquiries.map(enquiry => 
      enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
    );
    setEnquiries(updatedEnquiries);
    localStorage.setItem('enquiries', JSON.stringify(updatedEnquiries));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {username}</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'enquiries'
                ? 'bg-green-500 text-white'
                : isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'contacts'
                ? 'bg-green-500 text-white'
                : isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>

        {/* Content */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
          {activeTab === 'enquiries' ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">Admission Enquiries</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Child's Age</th>
                      <th className="pb-3">Message</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {enquiries.map((enquiry) => (
                      <tr key={enquiry.id}>
                        <td className="py-3">{new Date(enquiry.date).toLocaleDateString()}</td>
                        <td className="py-3">{enquiry.name}</td>
                        <td className="py-3">{enquiry.email}</td>
                        <td className="py-3">{enquiry.phone}</td>
                        <td className="py-3">{enquiry.childAge}</td>
                        <td className="py-3">{enquiry.message}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            enquiry.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                            enquiry.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            enquiry.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {enquiry.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <select
                            value={enquiry.status}
                            onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value)}
                            className={`rounded-md text-sm ${
                              isDarkMode 
                                ? 'bg-gray-700 text-white' 
                                : 'bg-white text-gray-900'
                            } border-gray-300`}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Contact Messages</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map((contact, index) => (
                      <tr key={index}>
                        <td className="py-3">{new Date(contact.date).toLocaleDateString()}</td>
                        <td className="py-3">{contact.name}</td>
                        <td className="py-3">{contact.email}</td>
                        <td className="py-3">{contact.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;