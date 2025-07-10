import React, { useState } from 'react';
import ProjectManagement from '../components/admin/ProjectManagement';
import ClientManagement from '../components/admin/ClientManagement';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import NewsletterSubscribers from '../components/admin/NewsletterSubscribers';

type TabType = 'projects' | 'clients' | 'contacts' | 'newsletter';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  const tabs = [
    { id: 'projects', label: 'Projects', icon: '📂' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'contacts', label: 'Contact Submissions', icon: '📧' },
    { id: 'newsletter', label: 'Newsletter Subscribers', icon: '📰' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectManagement />;
      case 'clients':
        return <ClientManagement />;
      case 'contacts':
        return <ContactSubmissions />;
      case 'newsletter':
        return <NewsletterSubscribers />;
      default:
        return <ProjectManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-gray-600 hover:text-primary-600 transition duration-200"
              >
                ← Back to Website
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2023 Portfolio Admin Panel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;