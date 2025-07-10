import React from 'react';
import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';
import ClientSection from '../components/ClientSection';
import ContactForm from '../components/ContactForm';
import NewsletterSection from '../components/NewsletterSection';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                Portfolio
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#projects" className="text-gray-700 hover:text-primary-600 transition duration-200">
                Projects
              </a>
              <a href="#clients" className="text-gray-700 hover:text-primary-600 transition duration-200">
                Clients
              </a>
              <a href="#contact" className="text-gray-700 hover:text-primary-600 transition duration-200">
                Contact
              </a>
              <a href="/admin" className="text-gray-700 hover:text-primary-600 transition duration-200">
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navigation */}
      <div className="pt-16">
        <HeroSection />
        <ProjectSection />
        <ClientSection />
        <ContactForm />
        <NewsletterSection />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
              <p className="text-gray-400">
                Creating innovative solutions that drive growth and success for businesses worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#projects" className="hover:text-white transition duration-200">Projects</a></li>
                <li><a href="#clients" className="hover:text-white transition duration-200">Clients</a></li>
                <li><a href="#contact" className="hover:text-white transition duration-200">Contact</a></li>
                <li><a href="/admin" className="hover:text-white transition duration-200">Admin Panel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="text-gray-400 space-y-2">
                <p>Email: contact@portfolio.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Business St, City, State 12345</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;