import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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

    <Navbar expand="lg" className="navhad sticky-top">
      <Container fluid>
        <Navbar.Brand >Myportfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Myportfolio
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">

              {navItems.map((item) => item.active ? (
                <li key={item.name} className='nav-link' onClick={() => navigate(item.slug)}>
                  {item.name}
                </li>
              ) : null)}

            </Nav>

            {authStatus ? (

              <LogoutBtn />

            ) : <Link to='/login' variant="outline-success" className='btn loginbtn rounded-4 d-lg-inline-block d-none'>Login</Link>}

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>


    

  )
}

export default Header