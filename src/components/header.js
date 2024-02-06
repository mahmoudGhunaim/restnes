import React, { useState } from 'react';
import { Link } from "gatsby"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const Header = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <header className="header-sec">
    <div className="header-container">
      <div className="logo-sec">
        <img src="/Restnest.svg"/>
      </div>
      <div className="link-family">
        <Link to="../">Home</Link>
          <Link to='/BLOG'>Blog</Link>
          <Link to="/Properties">Properties</Link>
          <Link to='/FAQ'>FAQ</Link>
          <Link to='/AboutUs' >Our Story</Link>
          <Link to='/ContactUs' >Contact Us</Link>
          <Link to='/Management' >Management</Link>
      </div>
      <div className="login-sec">
      <Link to='https://dashboard.hostaway.com/login' className='login-btn'>Owner Login</Link>
      </div>
      <div className='mobile-menu'>
      <Button color="danger" onClick={toggle}>
        <img src='/menu.svg'/>
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
        <div className="logo-sec-mob">
          <img src="/Restnest.svg"/>
        </div>
        <div className='navBar-hamburger'>
          <Link to="../">Home</Link>
          <Link to='/BLOG'>Blog</Link>
          <Link to="/Properties">Properties</Link>
          <Link to='/FAQ'>FAQ</Link>
          <Link to='/AboutUs' >Our Story</Link>
          <Link to='/ContactUs' >Contact Us</Link>
          <Link to='/Management' >Management</Link>
        
        </div>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '} */}
          {/* <Button color="secondary" onClick={toggle}>
            Cancel
          </Button> */}
          <div className="login-mob">
            <Link to='https://dashboard.hostaway.com/login' className='login-btn'>Owner Login</Link>
          </div>
        </ModalFooter>
      </Modal>
    </div>
    </div>
  </header>
  )
}

export default Header
