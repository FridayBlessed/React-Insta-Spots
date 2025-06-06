import Logo from '../assets/Logo.svg';

function Header (){
    return <>
    <section className="logo-section">
      <img className='logo-img' src={Logo} alt="Logo" />
    </section>
    </>
}

export default Header;