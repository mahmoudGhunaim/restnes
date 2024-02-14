import React from 'react'
import "../components/style/AboutUs.css"
import Layout from "../components/layout"
import { Link } from "gatsby"
const AboutUs = () => {
  return (
    <Layout>
        <section className='hero-sec'>
            <div className='hero-container'>
                <div className='hero-content'>
                    <h1>Where Luxury Meets Exceptional Care</h1>
                    <span>RestNest</span>
                    <p>Welcome to RestNest, the name synonymous with luxury vacation home management across the picturesque landscapes of Kelowna, Whistler, and Vancouver. We're in the business of creating exceptional experiences — for both homeowners and guests.</p>
                    <Link to='/Properties'><button>Explore all properties</button></Link>
                </div>
            </div>
        </section>
        <section className='aboutus-des-sec'>
            <div className='aboutus-des-contaner'>
                <div className='aboutus-des-title'>
                    <span>ABOUT US</span>
                    <h1>Redefining Luxury Vacation Home Management in BC</h1>
                    <div className='line-about'></div>
                    <p className='aboutus-des-p1'>RestNest was born out of a passion for hospitality and a keen understanding of the nuanced needs of luxury vacation homeowners. Our journey began in the scenic locale of Kelowna, where our founder, Shervin, identified a need for a dedicated, high-caliber management service tailored to luxury properties. Today, our presence spans the breathtaking regions of Whistler and Vancouver, known for their captivating beauty and allure.</p>
                    <p className='aboutus-des-p2'>Our mission transcends beyond traditional property management. We focus on two things: helping homeowners realize the full potential of their investment and ensuring guests have unforgettable stays in some of BC's most stunning locations.</p>
                </div>
            </div>
        </section>
        <section className='dual-commitment-section'>
            <div className='dual-commitment-container'>
                <div className='dual-commitment-des'>
                    <span>WHAT WE DO </span>
                    <h1>A Dual Commitment: Homeowners and Guests</h1>
                    <div className='gold-line'></div>
                    <p>For homeowners, RestNest is a trusted partner, dedicated to transforming your luxury vacation home into a profitable venture. We handle every aspect of short-term rental, from marketing your property to vetting guests, ensuring your home is not just a retreat, but a lucrative investment.</p>
                    <p>For guests, we are committed to providing a seamless, luxury experience from start to finish. Every property under RestNest's management is a promise of quality, comfort, and unforgettable memories in BC’s most exquisite locations.</p>
                </div>
                <div className='dual-commitment-img'>
                    <img src='/Frame 48096212.svg'/>
                </div>
            </div>
        </section>
        <section className='aboutus-des-sec'>
            <div className='aboutus-des-contaner'>
                <div className='aboutus-des-title'>
                    <span>WHY CHOOSE US</span>
                    <h1>Unparalleled Expertise & Personalized Care</h1>
                    <div className='gold-line'></div>
                    <p className='aboutus-des-p1'>What truly sets RestNest apart is our unwavering commitment to excellence and personalized service. Our teams across Kelowna, Whistler, and Vancouver are not just experts in luxury property management; they're ambassadors of the exquisite local lifestyle, dedicated to offering authentic experiences.</p>
                    <p className='aboutus-des-p2'>Whether you're a homeowner seeking to simplify the management of your luxury property or a guest looking for your next extraordinary getaway, RestNest promises a standard of service that is unmatched in the industry.</p>
                </div>
            </div>
        </section>
        {/* <section className='Meet-Our-Team-sec'>
            <div className='Meet-Our-Team-contaner'>
                <div className='Meet-Our-Team-img'>
                    <h3>Shervin</h3>
                    <img src='/Rectangle 4.svg'/>
                </div>
                <div className='Meet-Our-Team-des'>
                    <span>MEET OUR TEAM</span>
                    <h1>Leading RestNest with Vision and Passion</h1>
                    <div className='gold-line'></div>
                    <p>The driving force behind RestNest is Shervin, a seasoned professional with a profound understanding of luxury property management. His foresight and dedication are the cornerstones of RestNest's ethos and continuous expansion.</p>
                </div>
            </div>
        </section> */}
        <section className='footer-sec-about'>
            <div className='footer-container-about'>
                <div className='footer-des-about'>
                    <h1>Experience the RestNest Difference</h1>
                    <h3>British Columbia</h3>
                    <p>What truly sets RestNest apart is our unwavering commitment to excellence and personalized service. Our teams across Kelowna, Whistler, and Vancouver are not just experts in luxury property management; they're ambassadors of the exquisite local lifestyle, dedicated to offering authentic experiences.</p>
                    <p>Whether you're a homeowner seeking to simplify the management of your luxury property or a guest looking for your next extraordinary getaway, RestNest promises a standard of service that is unmatched in the industry.</p>
                    <Link to='/Properties'><button>Discover Luxury with RestNest</button></Link>
                </div>
            </div>
        </section>
    </Layout>
  )
}

export default AboutUs