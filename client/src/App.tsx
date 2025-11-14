import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ListPage from './pages/ListPage.tsx';
import ItemPage from './pages/ItemPage.tsx';
import StatsPage from './pages/StatsPage.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/list" />,
  },
  {
    path: '/list',
    element: <ListPage />,
  },
  {
    path: '/item',
    element: <ItemPage />,
  },
  {
    path: '/stats',
    element: <StatsPage />,
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
