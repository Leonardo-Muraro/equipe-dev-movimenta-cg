import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EquipePage from './pages/EquipePage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EquipePage />
  </StrictMode>
);
