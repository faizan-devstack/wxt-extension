import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import CredentialForm from './components/credentialForm';
import { ThemeProvider } from '@/lib/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CredentialForm />
    </ThemeProvider>
  </React.StrictMode>,
);
