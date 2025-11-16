import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ListPage from './pages/ListPage/ListPage.tsx';
import ItemPage from './pages/ItemPage/ItemPage.tsx';
import StatsPage from './pages/StatsPage/StatsPage.tsx';
import MainTemplate from './components/templates/MainTemplate.tsx';

const routes = createBrowserRouter([
  {
    element: <MainTemplate />,
    children: [
      {
        path: '/',
        element: <Navigate to="/list" />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
      {
        path: '/item/:id',
        element: <ItemPage />,
      },
      {
        path: '/stats',
        element: <StatsPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
