import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EquipeWheelPage from './pages/EquipeWheelPage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EquipeWheelPage />
  </StrictMode>
);
