import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import './styles/app.css';

/**
 * Shared between the browser entry and the prerender entry, so what gets
 * built statically is exactly what hydrates.
 */
export default function App() {
  return useRoutes(routes);
}
