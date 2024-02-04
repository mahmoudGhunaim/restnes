import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
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
      <Link to='/ContactUs' className='login-btn'>Owner Login</Link>
      </div>
    </div>
  </header>
)

export default Header
