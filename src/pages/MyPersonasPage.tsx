import React, { useEffect } from 'react';
import { useSavedPersonasStore } from '../store/savedPersonasStore';
import { usePersonaStore } from '../store/personaStore';
import { useNotificationStore } from '../store/notificationStore';
import { Link, NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MyPersonasPage: React.FC = () => {
  const { personas, fetchPersonas, isLoading, error, deletePersona } = useSavedPersonasStore();
  const { loadPersona, resetPersona } = usePersonaStore();
  const { addNotification } = useNotificationStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [personaToDelete, setPersonaToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

  const handleEditPersona = (personaId: string) => {
    const personaToLoad = personas.find(p => p.id === personaId);
    if (personaToLoad) {
      loadPersona(personaToLoad);
      addNotification(`Loaded persona '${personaToLoad.name}' for editing.`, 'info');
    } else {
      addNotification('Persona not found!', 'error');
    }
  };

  const confirmDelete = (personaId: string, personaName: string) => {
    setPersonaToDelete({ id: personaId, name: personaName });
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (personaToDelete) {
      deletePersona(personaToDelete.id);
      addNotification(`Persona '${personaToDelete.name}' deleted.`, 'success');
      setIsDeleteModalOpen(false);
      setPersonaToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-lg text-center w-full">
        <h2 className="text-2xl font-display font-bold mb-lg">My Personas</h2>
        <p>Loading personas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-lg text-center w-full text-error">
        <h2 className="text-2xl font-display font-bold mb-lg">Error Loading Personas</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-lg flex-1">
      <h2 className="mb-lg">My Personas</h2>
      {personas.length === 0 ? (
        <div className="bg-neutral-100 p-md rounded-lg shadow-md text-center">
          <p className="mb-md">You haven't saved any personas yet.</p>
          <NavLink to="/create" className="text-primary hover:underline" onClick={resetPersona}>
            Create your first persona!
          </NavLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {personas.map((persona) => (
            <div key={persona.id} className="bg-neutral-100 p-md rounded-lg shadow-md flex flex-col">
              <h3 className="text-primary mb-sm">{persona.name}</h3>
              <p className="text-sm text-neutral-500 mb-xs line-clamp-2">{persona.description || 'No description.'}</p>
              <p className="text-xs text-neutral-400 mb-md">Last Modified: {new Date(persona.metadata?.lastModified || '').toLocaleDateString()}</p>
              <div className="flex space-x-sm mt-auto">
                <NavLink
                  to="/create"
                  onClick={() => handleEditPersona(persona.id)}
                  className="flex-1 py-sm px-md rounded-md bg-primary text-white text-center text-sm font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center"
                >
                  <FaEdit className="mr-xs" /> Edit
                </NavLink>
                <button
                  onClick={() => confirmDelete(persona.id, persona.name)}
                  className="flex-1 py-sm px-md rounded-md bg-error text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <FaTrash className="mr-xs" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDeleteModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-lg text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-500"
                  >
                    Confirm Delete Persona
                  </Dialog.Title>
                  <div className="mt-md">
                    <p className="text-sm text-neutral-500">
                      Are you sure you want to delete persona <span className="font-semibold">'{personaToDelete?.name}'</span>? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-lg flex justify-end space-x-sm">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-neutral-200 px-md py-sm text-sm font-medium text-neutral-500 hover:bg-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-error px-md py-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MyPersonasPage;
