import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages are hydrated; a plain SPA build is mounted fresh.
if (container.dataset.prerendered === 'true') {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
