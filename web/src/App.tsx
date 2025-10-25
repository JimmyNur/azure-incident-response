import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, Activity, TrendingUp, FileText, Moon, Sun, Globe } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import FieldHealth from './pages/FieldHealth';
import MarketPrices from './pages/MarketPrices';
import Reports from './pages/Reports';
import './styles/index.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock authentication

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  // Set initial dark mode
  if (darkMode) {
    document.documentElement.classList.add('dark');
  }

  // Set initial language direction
  document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

  if (!isAuthenticated) {
    return <div>Login Page (Not Implemented)</div>;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    AgroVision
                  </span>
                </Link>
                
                <div className="hidden md:flex gap-4">
                  <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Dashboard" />
                  <NavLink to="/field-health" icon={<Activity className="w-4 h-4" />} text="Field Health" />
                  <NavLink to="/market" icon={<TrendingUp className="w-4 h-4" />} text="Market" />
                  <NavLink to="/reports" icon={<FileText className="w-4 h-4" />} text="Reports" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleLanguage}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Toggle Language"
                >
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                    {language.toUpperCase()}
                  </span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Toggle Dark Mode"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/field-health" element={<FieldHealth />} />
            <Route path="/market" element={<MarketPrices />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default App;
