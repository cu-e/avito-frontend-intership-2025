import { Outlet } from 'react-router-dom';
import HeaderContainer from './HeaderContainer.tsx';
import MaxContainer from '../ui/MaxContainer/MaxContainer.tsx';

function MainTemplate() {
  return (
    <>
      <HeaderContainer />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <MaxContainer>
          <Outlet />
        </MaxContainer>
      </main>
    </>
  );
}

export default MainTemplate;
