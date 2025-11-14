import { NavLink, type NavLinkProps } from 'react-router-dom';
import styles from './Link.module.css';

function Link(props: NavLinkProps) {
  const { style, ...rest } = props;

  return <NavLink {...rest} className={styles.link}></NavLink>;
}

export default Link;
