import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Props Interface für children
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      current: location.pathname === '/',
      count: null
    },
    {
      name: 'Klienten',
      href: '/clients',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      current: location.pathname.startsWith('/clients'),
      count: 12
    },
    {
      name: 'Sessions',
      href: '/sessions',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 5h6m-6-5v5a2 2 0 002 2h2a2 2 0 002-2v-5m-6 0h6" />
        </svg>
      ),
      current: location.pathname.startsWith('/sessions'),
      count: null,
      badge: 'active' // Zeigt grünen Punkt für aktive Sessions
    },
    {
      name: 'Dokumente',
      href: '/documents',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      current: location.pathname.startsWith('/documents'),
      count: null
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      current: location.pathname.startsWith('/analytics'),
      count: null
    },
    {
      name: 'Business',
      href: '/business',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      current: location.pathname.startsWith('/business'),
      count: null
    },
    {
      name: 'Entwicklung',
      href: '/development',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      current: location.pathname.startsWith('/development'),
      count: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-2 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <div className="ml-2">
                  <div className="text-sm font-semibold text-gray-900">Coach MCS</div>
                  <div className="text-xs text-gray-500">Mission Control</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-lg font-bold text-gray-900">Coach MCS</div>
                  <div className="text-sm text-gray-500">Mission Control</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = item.current;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-l-md transition-colors`}
                    >
                      <span
                        className={`${
                          isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                        } flex-shrink-0 mr-3`}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.name}</span>
                      
                      {/* Count badge */}
                      {item.count && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {item.count}
                        </span>
                      )}
                      
                      {/* Active indicator for Sessions */}
                      {item.badge === 'active' && (
                        <span className="ml-2 w-2 h-2 bg-green-400 rounded-full"></span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* User profile */}
              <div className="flex-shrink-0 border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">DS</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Dr. Schmidt</p>
                    <p className="text-xs text-gray-500">Coach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {location.pathname === '/' ? 'Dashboard Übersicht' :
                     location.pathname.startsWith('/clients') ? 'Klienten Management' :
                     location.pathname.startsWith('/sessions') ? 'Session Management' :
                     location.pathname.startsWith('/documents') ? 'Dokumente' :
                     location.pathname.startsWith('/analytics') ? 'Analytics' :
                     location.pathname.startsWith('/business') ? 'Business' :
                     location.pathname.startsWith('/development') ? 'Entwicklung' : 'Coach Platform'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
               
                  
                  {/* Notifications */}
                  <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zm-1.44-2.05L12 13.5l-1.56 1.45C10.15 15.24 10 15.61 10 16v5l5-5h-2.5c-.39 0-.76-.15-1.04-.45z" />
                    </svg>
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                  </button>

                  {/* User menu */}
                  <div className="flex items-center space-x-3">
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-medium text-gray-900">Dr. Schmidt</div>
                      <div className="text-xs text-gray-500">Coach & Berater</div>
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">DS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Breadcrumb/Subtitle */}
            {location.pathname !== '/' && (
              <div className="px-4 sm:px-6 lg:px-8 pb-4">
                <p className="text-sm text-gray-600">
                  {location.pathname === '/' ? 'Willkommen zurück, Dr. Schmidt' :
                   location.pathname.startsWith('/clients') ? 'Verwalten Sie Ihre Klienten und deren Profile' :
                   location.pathname.startsWith('/sessions') ? 'Planen und verwalten Sie Ihre Coaching Sessions' :
                   location.pathname.startsWith('/documents') ? 'Dokumente und Ressourcen verwalten' :
                   location.pathname.startsWith('/analytics') ? 'Einblicke in Ihre Coaching Performance' :
                   location.pathname.startsWith('/business') ? 'Business Metriken und KPIs' :
                   location.pathname.startsWith('/development') ? 'Entwicklung und Einstellungen' : ''}
                </p>
              </div>
            )}
          </div>

          {/* Page content - HIER ist der Fix! */}
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;