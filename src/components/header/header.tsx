import './header.scss';
import logo from '../../resources/logo.png';

export const Header = () => {
  return (
    <header className='header'>
      <img src={logo} alt='Logo' className='header__logo' />
    </header>
  );
};
