import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogoutBtn } from '../index'

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },

    {
      name: 'Profile',
      slug: '/edit-profile',
      active: authStatus,
    },

    {
      name: 'Education',
      slug: '/education',
      active: authStatus,
    },
    {
      name: 'Experience',
      slug: '/experience',
      active: authStatus,
    },
    {
      name: 'Project',
      slug: '/project',
      active: authStatus,
    },
    {
      name: 'Resume',
      slug: '/resume',
      active: authStatus,
    }

  ]

  return (

    <Navbar collapseOnSelect expand="lg" className="navhad sticky-top">
      <Container>
        <Navbar.Brand to="/">Myportfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='flex-none'>
          <Nav className="me-auto">
            {navItems.map((item) => item.active ? (
              <NavLink key={item.name} to={item.slug} className='nav-link'>{item.name}</NavLink>
            ) : null)}

            {/* <Nav.Link href={item.slug}>Pricing</Nav.Link> */}

          </Nav>
          {authStatus ? (

            <LogoutBtn />

          ) : <Link to='/login' variant="outline-success" className='btn loginbtn rounded-4 d-lg-inline-block '>Login</Link>}

        </Navbar.Collapse>
      </Container>
    </Navbar>
   
  )
}

export default Header