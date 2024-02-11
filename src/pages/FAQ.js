import React from 'react'
import "../components/style/FAQ.css"
import Layout from "../components/layout"
import { Link } from "gatsby"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
const FAQ = () => {
  return (
    <Layout>
         <section className='hero-sec-Management'>
            <div className='hero-container-Management'>
                <div className='hero-content-Management'>
                    <h1>Frequently Asked Questions</h1>
                    <p>JDive into details about our luxury short-term rentals and full-service property management across British Columbia.</p>
                    <button>Unveil Stress-Free Rental Management</button>
                </div>
             </div>
        </section>
        <section className='Service-Description-sec1'>
            <div className='Service-Description-container1'>
                <div className='Service-Description-title1'>
                    <span>Service Description</span>
                    <h1>Your curiosity, satisfied.</h1>
                    <div className='gold-line'></div>
                    <p>Whether you're indulging in a luxurious stay or considering our property management services, we've got answers to your questions right here.<br/>Can't find what you're seeking? Please feel free to <Link to="">contact us</Link></p>
                </div>
                <div className='Service-Description-img1'>
                    <img src='/Frame 48096235.svg'/>
                </div>
            </div>
        </section>
        <section className='guest-faq-sec'>
            <div className='guest-faq-container'>
                <div className='guest-faq-title'>
                    <span>guest faq</span>
                    <h1>As a guest, I’d like to know:</h1>
                    <div className='gold-line'></div>
                </div>
                <div className='guest-faq-acc'>
                    <Accordion defaultExpanded>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-faq"
                            >
                            Can we celebrate an event at this property?
                            </AccordionSummary>
                            <AccordionDetails>
                            Think of staying at one of our luxurious short-term rental properties as your chance to finally escape, unwind and make the most of quality time with friends, family or someone special.
                            While we appreciate your interest in celebrating with us, in order to maintain the first-class quality of our properties and remain respectful of neighbours, parties are strictly prohibited.
                            </AccordionDetails>
                    </Accordion>
                    <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-faq"
                            >
                            What can I do while visiting Kelowna?
                            </AccordionSummary>
                            <AccordionDetails>
                            In between moments of pure relaxation at your home-away-from-home, there are countless ways to make the most of your Kelowna getaway. Whether you’re lazing in a boat on Okanagan Lake or pedalling your way between some of Canada’s finest wineries, this dazzling region offers something for everyone.

                            We also recommend visiting Tourism Kelowna for a complete guide to activities throughout every season.
                            </AccordionDetails>
                    </Accordion>
                    <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-faq"
                            >
                            Do you allow pets?
                            </AccordionSummary>
                            <AccordionDetails>
                            While some of our properties allow pets, in order to avoid disappointment, please read the description of your desired listing carefully to learn whether pets are permitted. If you are uncertain about pet policies at a specific vacation rental, please contact us to learn more.
                            </AccordionDetails>
                    </Accordion>
                    <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-faq"
                            >
                           What is your cancellation policy?
                            </AccordionSummary>
                            <AccordionDetails>
                            Venturing into rental property management solo can lead to unexplored avenues for revenue maximization. RestNest adeptly navigates this complexity, guaranteeing your investment realises its utmost financial potential. Our potent marketing tactics ensure your property commands attention on prime platforms like Airbnb, VRBO, and more, drawing a steady stream of guests. Moreover, our global partnerships with travel agencies open a broader client base, funnelling in bookings from European and American travellers, thereby ensuring a consistent occupancy rate.
                            </AccordionDetails>
                    </Accordion>
                    
                </div>
            </div>
        </section>
        <section className='property-owner-faq-sec'>
            <div className='property-owner-faq-container'>
                <div className='property-owner-faq-title'>
                    <span>property owner faq</span>
                    <h1>As a property owner, I’d like to know:</h1>
                    <div className='gold-line'></div>
                </div>
                <div className='property-owner-faq-acc'>
                <Accordion defaultExpanded>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-faq"
                            >
                            What is included with your property management services?
                            </AccordionSummary>
                            <AccordionDetails>
                            The short answer is: anything you need.

Our property management services are as unique as your property. Together, we’ll customize a plan to keep it maintained to your expectations, year-round. From there, our team will arrange for all jobs to be completed with impeccable quality, as well as any other tasks detected during our routine property inspections.

Our short-term property management is full service, which means that in addition to receiving our maintenance services, you can be completely hands-off with guests; our expert team will be the key touchpoint for your visitors, from touchdown to takeoff.
                            </AccordionDetails>
                    </Accordion>
                    <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-faq"
                            >
                           How much do your services cost?
                            </AccordionSummary>
                            <AccordionDetails>
                            Since our services are tailored to suit your needs, pricing depends on what it means to manage your property.

We’ll take care of payments for all maintenance services, and invoice you for reimbursement or subtract the total from your monthly rental income. We charge an additional, modest fee to cover the convenience of our exceptional property management and maintenance services.
                            </AccordionDetails>
                    </Accordion>
                    <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-faq"
                            >
                            How do you know if a guest is the right fit?
                            </AccordionSummary>
                            <AccordionDetails>
                            During the booking process, we ask all potential guests a variety of questions to determine whether they will make a good fit for your home. We’ll conduct background checks to learn as much as we can about your visitors before they arrive to ensure that your property will be treated with care, and that you (and your neighbours) can rest easy.
                            </AccordionDetails>
                    </Accordion>
                    
                </div>
            </div>

        </section>
    </Layout>
  )
}

export default FAQ