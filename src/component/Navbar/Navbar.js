// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css"
import logo1 from '../../assets/images/companylogos/logotransparent.png'
import logo2 from '../../assets/images/companylogos/Dlogo.jpeg'
function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" className="">
      <div className='container-lg'>
        <Navbar.Brand href="#home">
          <img src={logo1} className='img-fluid full_logo'/>
          <img src={logo2} className='img-fluid D_logo'/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='nav_menu_links' href="">Home</Nav.Link>
            <Nav.Link className='nav_menu_links' href="#CompanyVision">Our Vision</Nav.Link>
            <Nav.Link className='nav_menu_links' href='#services'>Services</Nav.Link>
            <Nav.Link className='nav_menu_links' href='#tools'>Tools</Nav.Link>
            <Nav.Link className='nav_menu_links' href='#contact'>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navigation;