import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { FaPlus, FaUserCircle, FaCog } from 'react-icons/fa';
import { usePersonaStore } from './store/personaStore';
import CreatePersonaPage from './pages/CreatePersonaPage';
import MyPersonasPage from './pages/MyPersonasPage';
import NotificationContainer from './components/NotificationToast';

function App() {
  const { resetPersona } = usePersonaStore();

  return (
    <div className="flex min-h-screen bg-neutral-200 font-sans text-neutral-500">
      {/* Sidebar Navigation */}
      <aside className="w-[15%] bg-neutral-100 p-md shadow-md flex flex-col">
        <h1 className="text-xl font-display font-bold text-primary mb-lg">PersonaForge</h1>
        <nav className="flex flex-col space-y-sm">
          <NavLink
            to="/create"
            onClick={resetPersona}
            className={({ isActive }) =>
              `flex items-center p-sm rounded-md transition-colors text-left ${
                isActive ? 'bg-primary-200 text-primary-800 font-semibold' : 'hover:bg-neutral-300'
              }`
            }
          >
            <FaPlus className="mr-sm" /> Create New Persona
          </NavLink>
          <NavLink
            to="/my-personas"
            className={({ isActive }) =>
              `flex items-center p-sm rounded-md transition-colors ${
                isActive ? 'bg-primary-200 text-primary-800 font-semibold' : 'hover:bg-neutral-300'
              }`
            }
          >
            <FaUserCircle className="mr-sm" /> My Personas
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-sm rounded-md transition-colors ${
                isActive ? 'bg-primary-200 text-primary-800 font-semibold' : 'hover:bg-neutral-300'
              }`
            }
          >
            <FaCog className="mr-sm" /> Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex">
        <Routes>
          <Route path="/" element={<CreatePersonaPage />} />
          <Route path="/create" element={<CreatePersonaPage />} />
          <Route path="/my-personas" element={<MyPersonasPage />} />
          {/* Future routes for Settings, etc. */}
          <Route path="*" element={
            <div className="p-lg text-center w-full">
              <h2 className="text-2xl font-display font-bold mb-lg">Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
              <NavLink to="/create" className="text-primary hover:underline mt-md block">Go to Create Persona</NavLink>
            </div>
          } />
        </Routes>
      </main>
      <NotificationContainer />
    </div>
  );
}

export default App;
