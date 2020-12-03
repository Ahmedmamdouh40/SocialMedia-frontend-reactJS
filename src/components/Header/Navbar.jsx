import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const LogOut = () => {
    cookies.remove('userData', { path: '/' })
    cookies.remove('token', { path: '/' })
    props.redirect.history.replace('/login')
  }
  return (
    <div>
      <Navbar color="info" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/me">Me</NavLink>
            </NavItem>
          </Nav>
          <NavbarText><NavLink href="#" onClick={LogOut}>Logout</NavLink></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;