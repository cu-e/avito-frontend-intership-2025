import { Outlet } from 'react-router-dom';
import HeaderContainer from './HeaderContainer.tsx';
import MaxContainer from '../ui/MaxContainer/MaxContainer.tsx';

function MainTemplate() {
  return (
    <div>
      <HeaderContainer />
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <MaxContainer style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
          <Outlet />
        </MaxContainer>
      </main>
    </div>
  );
}

export default MainTemplate;
