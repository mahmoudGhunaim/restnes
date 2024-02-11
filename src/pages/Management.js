import React from 'react'
import  Layout  from "../components/layout"
import "../components/style/Management.css"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const Management = () => {
  return (
    <Layout>
        <section className='hero-sec-Management'>
            <div className='hero-container-Management'>
                <div className='hero-content-Management'>
                    <h1>Luxury Rental Management in British Columbia</h1>
                    <span>Home owner</span>
                    <p>Join hands with our experts and transform your investment journey.<br/>Your vacation rental should be a gateway to peace, not a source of stress. Entrust it to us and witness the seamless blend of profitability and tranquility. Our province-wide, full-service short-term rental management ensures your peace of mind, leaving you to savor the rewards.</p>
                    <button>Unveil Stress-Free Rental Management</button>
                </div>
             </div>
        </section>
        <section className='Service-Description-sec'>
            <div className='Service-Description-contanier'>
                <div className='Service-Description-des'>
                    <span>Service Description</span>
                    <h1>Unparalleled Full-Service short-term Rental Management</h1>
                    <div className='gold-line'></div>
                    <p>Rest easy knowing that with your lavish property in our meticulous care—whether you’re expecting visitors, stopping by for your own summer getaway, or spending winter at home—is always in the condition that you expect: flawless.<br/>From orchestrating year-round maintenance to screening your potential guests to ensure the perfect fit, allow us to take care of everything, so you don’t have to.<br/>Whether it’s marketing, guest management, furniture insurance, pool maintenance, lawn mowing, housekeeping or snow removal: you name it, we’ll take care of it to your standard, at a rate you’ll feel good about.</p>
                </div>
                <div className='Service-Description-img'>
                    <img src='/Frame 48096215.svg'/>
                </div>
            </div>

        </section>
        <section className='Features-sec'>
            <div className='Features-container'>
                <div className='Features-title'>
                    <span>Features</span>
                    <h1>Advantages of our comprehensive property management</h1>
                    <div className='gold-line'></div>
                </div>
                <div className='Features-cards'>
                    <div className='Features-single-card'>
                        <img src='/clipboard-text.svg'/>
                        <h6>Seamless Management</h6>
                        <p>Reap the benefits of your investment sans inconvenience, courtesy of our all-inclusive management services, specializing in luxu...</p>
                    </div>
                    <div className='Features-single-card'>
                        <img src='/format-square.svg'/>
                        <h6>Custom-Fit Solutions</h6>
                        <p>Our offerings, meticulously crafted to echo your property's unique charm, meet your high standards without compromise.</p>
                    </div>
                    <div className='Features-single-card'>
                        <img src='/call-calling.svg'/>
                        <h6>Unwavering Support</h6>
                        <p>Our substantial presence in BC, particularly in locales like Kelowna and Whistler, ensures your property garners...</p>
                    </div>
                    <div className='Features-single-card'>
                        <img src='/clock.svg'/>
                        <h6>Real-Time Insights</h6>
                        <p>Stay in the loop with immediate access to earnings reports, booking schedules, and comprehensive financial statements thro...</p>
                    </div>
                    <div className='Features-single-card'>
                        <img src='/tag-user.svg'/>
                        <h6>Guest-Centric Experiences</h6>
                        <p>Our dedicated app allows guests to have all property details at their fingertips, enhancing their stay and encouraging m...</p>
                    </div>
                    <div className='Features-single-card'>
                        <img src='/shield-tick.svg'/>
                        <h6>Guaranteed Security</h6>
                        <p>We go beyond just insurance, offering guest coverage for any damages, ensuring your peace of mind.</p>
                    </div>
                    <div className='Features-single-card'>
                        <img src='/receipt-item.svg'/>
                        <h6>Data-Driven Pricing</h6>
                        <p>Utilize our dynamic pricing strategies, informed by thorough market research, to keep your property in high demand, ens...</p>
                    </div>
                    <div className='Features-single-card'>
                        <img src='/broom.svg'/>
                        <h6>Consistently Immaculate</h6>
                        <p>Comprehensive post-visit clean-ups guarantee your property is always in pristine condition, ready for you or your...</p>
                    </div>
                </div>
                
            </div>
        </section>
        <section className='We-hear-you-sec'>
            <div className='We-hear-you-container'>
                <div className='We-hear-you-img'>
                    <img src='/Frame 480962155414554.jpg'/>
                </div>
                <div className='We-hear-you-title'>
                    <h3></h3>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            
                        >
                        Exceptional Value, Now Accessible..
                        </AccordionSummary>
                        <AccordionDetails>
                        The rental management journey can often seem overwhelming, especially with the high costs typically involved, which can force property owners to settle for less than premium services. However, RestNest breaks through this barrier by presenting a comprehensive suite of services at an exceptional value — costing you just 30% of your rental income.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        Commitment Beyond Seasons
                        </AccordionSummary>
                        <AccordionDetails>
                        The rental management journey can often seem overwhelming, especially with the high costs typically involved, which can force property owners to settle for less than premium services. However, RestNest breaks through this barrier by presenting a comprehensive suite of services at an exceptional value — costing you just 30% of your rental income.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        >
                        Effortless Earnings Maximization
                        </AccordionSummary>
                        <AccordionDetails>
                        Venturing into rental property management solo can lead to unexplored avenues for revenue maximization. RestNest adeptly navigates this complexity, guaranteeing your investment realises its utmost financial potential. Our potent marketing tactics ensure your property commands attention on prime platforms like Airbnb, VRBO, and more, drawing a steady stream of guests. Moreover, our global partnerships with travel agencies open a broader client base, funnelling in bookings from European and American travellers, thereby ensuring a consistent occupancy rate.
                        </AccordionDetails>
                    </Accordion>
    
                </div>
            </div>
        </section>
        <section className='our-solution-sec'>
            <div className='our-solution-container'>
                <div className='our-solution-content'>
                    <span>our solution</span>
                    <h1>Comprehensive Care, Unmatched Serenity</h1>
                    <div className='gold-line'></div>
                    <p>Embrace the ease as every intricate detail is handled with expert care. From selecting the crème de la crème of service providers to regular check-ups and guest matching, we lift the weight off your shoulders. Revel in the comfort of our all-encompassing property management, and rediscover the joys your investment was meant to bring you.</p>
                </div>
            </div>
        </section>
        <section className='The-Process-sec'>
            <div className='The-Process-container'>
                <div className='The-Process-title'>
                    <span>The Process</span>
                    <h1>Your Journey to Serenity, Simplified.</h1>
                    <div className='gold-line'></div>
                    <p>In just a few steps, immerse yourself in the tranquility that comes with unparalleled property management.</p>
                </div>
                <div className='The-Process-img'>
                    <img src='/Frame 48096227.svg'/>
                    <img src='/Frame 48096225 111.svg' className='mobile-img-process'/>
                </div>
            </div>
        </section>
        <section className='Qualification-sec'>
            <div className='Qualification-container'>
                <div className='Qualification-content'>
                    <span>Qualification</span>
                    <h1>Transform Your Investment Experience</h1>
                    <div className='gold-line'></div>
                    <p className='Qualification-p'>If you’re ready to turn your premium vacation property into profit, our complete rental management package is for you.</p>
                    <div className='Qualification-sec-items'>
                        <div className='Qualification-single-sec'>
                            <img src='/check-circle 1 (1).svg'/> <p>You want to make more money from your real estate investment.</p>
                        </div>
                        <div className='Qualification-single-sec'>
                            <img src='/check-circle 1 (1).svg'/> <p>You don’t have the time or resources to manage a listing, screen potential guests, manage bookings, handover keys, find cleaners, and more.</p>
                        </div>
                        <div className='Qualification-single-sec'>
                            <img src='/check-circle 1 (1).svg'/> <p>You’re currently renting your vacation home, but know you could be earning more from your investment.</p>
                        </div>
                        <div className='Qualification-single-sec'>
                            <img src='/check-circle 1 (1).svg'/> <p>You’ve been opposed to renting your home because you don’t want anyone to damage your property, make a mess, or disturb your neighbours.</p>
                        </div>
                        <div className='Qualification-single-sec'>
                            <img src='/check-circle 1 (1).svg'/> <p>You don’t want to rent your vacation home because you don’t know what weekends you’re going to be there yourself and coordinating it all is too much work to bother.</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
        <section className='footer-sec-about'>
            <div className='footer-container-about'>
                <div className='footer-des-about'>
                    <h1>Experience the RestNest Difference</h1>
                    <button>Embark on a Partnership Today</button>
                </div>
            </div>
        </section>
</Layout>
  )
}

export default Management