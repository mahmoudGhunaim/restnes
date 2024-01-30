import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header className="header-sec">
    <div className="header-container">
      <div className="logo-sec">
        <img src="Restnest.svg"/>
      </div>
      <div className="link-family">
        <Link to="/Services">Home</Link>
          <Link to='/Clients'>Blog</Link>
          <Link to="/About">Properties</Link>
          <Link to='/Projects'>FAQ</Link>
          <Link to='/ContactUs' >Our Story</Link>
          <Link to='/ContactUs' >Contact Us</Link>
          <Link to='/ContactUs' >Management</Link>
      </div>
      <div className="login-sec">
      <Link to='/ContactUs' className='login-btn'>Owner Login</Link>
      </div>
    </div>
  </header>
)

export default Header
