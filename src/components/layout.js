/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header"
import "./style/layout.css"
import { Link } from "gatsby"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <main>{children}</main>
        <footer className="footer">
          <div className="footer-container">
            <div className="sec-footer-logo">
              <img src="/Restnest.svg"/>
              <Link to="/Services"><img src="/map-marked-alt-solid 1.svg"/>3635 Carrington Rd West<br/> Kelowna, BC</Link>
              <Link to="/Services"><img src="/phone-solid 1.svg"/>7788584942</Link>
              <Link to="/Services"><img src="/envelope-open-text-solid 1.svg"/>info@restnest.ca</Link>
            </div>
            <div className="sec-footer">
              <Link to="../">Home</Link>
              <Link to='/BLOG'>Blog</Link>
              <Link to="/Properties">Properties</Link>
            </div>
            <div className="sec-footer">
              <Link to='/ContactUs' >Contact Us</Link>
              <Link to='/AboutUs' >Our Story</Link>
              <Link to='/ContactUs' >Rental Agreement</Link>
            </div>
            <div className="sec-footer">
              <Link to='/ContactUs' >Good Neighbor</Link>
              <Link to='/ContactUs' >Policies</Link>
              <Link to='/FAQ'>FAQ</Link>
            </div>            
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
