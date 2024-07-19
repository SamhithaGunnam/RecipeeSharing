import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);
