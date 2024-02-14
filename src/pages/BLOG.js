import React from 'react'
import "../components/style/BLOG.css"
import Layout from "../components/layout"
import { Link } from "gatsby"
const BLOG = () => {
  return (
    <Layout>
        <section className='hero-sec-Management'>
            <div className='hero-container-Management'>
                <div className='hero-content-Management'>
                    <h1>Our Blog</h1>
                    <p>Embark on an unforgettable journey through British Columbia with our insider recommendations on dining, events, and activities in Kelowna, Whistler, and Vancouver, plus exclusive travel tips for a luxury-filled escape.</p>
                    <button>Unveil Stress-Free Rental Management</button>
                </div>
             </div>
        </section>
        <section className='blog-des-sec'>
            <div className='blog-des-container'>
                <div className='blog-des-content'>
                    <span>property owner faq</span>
                    <h1>Explore the Best of British Columbia.</h1>
                    <div className='gold-line'></div>
                    <p>From the vineyard-dotted landscapes of Kelowna to the snow-capped peaks of Whistler and the urban sophistication of Vancouver, British Columbia is a tapestry of vibrant cities and raw natural beauty. Whether you're indulging in a lakeside retreat, a mountain adventure, or a city exploration,
 you've landed on the perfect resource. Dive in for the freshest insights on maximizing your British Columbia escapades.</p>
                </div>
            </div>
        </section>
    </Layout>
  )
}

export default BLOG