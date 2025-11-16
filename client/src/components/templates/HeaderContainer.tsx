import MaxContainer from '../ui/MaxContainer/MaxContainer.tsx';
import { Button } from '@gravity-ui/uikit';
import Link from '../ui/Link/Link.tsx';

function HeaderContainer() {
  return (
    <header
      style={{
        backgroundColor: '#292929',
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaxContainer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
        }}
      >
        <Link to={'/list'}>
          <Button view={'flat'} style={{ color: 'inherit' }}>
            Объявления
          </Button>
        </Link>
        <Link to={'/stats'}>
          <Button view={'action'} t style={{ color: 'var(--g-color-text-inverted-primary)' }}>
            Статистика и профиль
          </Button>
        </Link>
      </MaxContainer>
    </header>
  );
}

export default HeaderContainer;
