import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ListPage from './pages/ListPage.tsx';
import ItemPage from './pages/ItemPage.tsx';
import StatsPage from './pages/StatsPage.tsx';
import MainTemplate from './components/templates/MainTemplate.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

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
        path: '/item',
        element: <ItemPage />,
      },
      {
        path: '/stats',
        element: <StatsPage />,
      },
      {
        // вообще такого в инструкции нет, но вот данные даются, почему бы не сделать;)
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
