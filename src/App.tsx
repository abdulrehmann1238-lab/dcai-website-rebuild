import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { DataProvider } from './state/DataContext';
import { PersonaProvider } from './state/PersonaContext';
import { ToastProvider } from './state/ToastContext';
import { StaffProvider } from './state/StaffContext';

export function App() {
  return (
    <DataProvider>
      <PersonaProvider>
        <ToastProvider>
          <StaffProvider>
            <RouterProvider router={router} />
          </StaffProvider>
        </ToastProvider>
      </PersonaProvider>
    </DataProvider>
  );
}

export default App;
