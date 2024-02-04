import React, { useRef } from 'react';
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "../components/style/index.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Form from "../components/form"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CustmerSay from "../components/CustmerSay"
import { Swiper, SwiperSlide } from 'swiper/react';
import FooterSec from '../components/FooterSec';

const IndexPage = () => (
  <Layout>
    <section className='Home-Head-sec'>
      <div className='Home-Head-container'>
        <div className='Home-left-sec'>
          <h1>Book your British Columbia experience</h1>
          <span>Luxury rentals</span> 
        </div>
        <div className='Home-right-sec'>
          <div>
          <p>
            Treat yourself to the perfect getaway with our selection of British Columbia’s most exquisite short-term rental properties in Kelowna, Whistler, and Vancouver.
          </p>
          <button>Explore all properties</button>
          </div>
        </div>
      </div>
    </section>
    <div className="sec-img-home">
      <img src="head-home-img.svg"/>
    </div>
    <div>
      <div>
        <Form/>
      </div>
      <section className="description-home-sec">
        <div className="description-home-container">
          <div className="description-home-title">
            <h1>Elevate Your Vacation Experience</h1>
          </div>
          <div className="description-home-line"></div>
          <div className="description-home-p">
            <p>From the moment you arrive at your stunning vacation home, whether it's amidst the beautiful vineyards of Kelowna, the majestic mountains of Whistler, or the vibrant cityscape of Vancouver, you’ll be enamored by the charm and luxury we offer.</p>
            <p>Indulge in first-class comfort with our lavish properties, complete with luxury amenities and concierge service dedicated to your every desire. Focus on the finer aspects of life, like creating unforgettable memories with your loved ones in British Columbia's most desirable destinations.</p>
          </div>
        </div>
      </section>
    </div>
    <section className="card-sec-home">
      <div className="card-container-home">
        <div className="card-title-home">
          <h1>The benefits of booking direct</h1>
          
        </div>
        <div className="card-content-home">
              <div className="cards-home">
                <img src="gem 1.svg"/>
                <h1>Luxury, for less</h1>
                <p>Enjoy pristine landscapes and sparkling pools at a rate more affordable than you imagine. Booking direct saves you 15%, whether it's a cozy chalet in Whistler, a modern loft in Vancouver, or a luxurious estate in Kelowna</p>
              </div>
              <div className="cards-home">
                <img src="user-shield-solid 1.svg"/>
                <h1>Personal concierge service</h1>
                <p>Every RestNest booking includes a dedicated concierge, local to your chosen city, committed to making your stay memorable and comfortable. No middle man, just personalized service.</p>
              </div>
              <div className="cards-home">
                <img src="peace-solid 1.svg"/>
                <h1>Quality Insurance for Peace of Mind.</h1>
                <p>In addition to offering lower rates, booking directly through RestNest ensures higher quality insurance than competing platforms, providing you with the assurance you need to relax and enjoy.</p>
              </div>
        </div>
      </div>
    </section>
    <section className="slider-home">
      <div className="slider-container-home">
        <div className="slider-title-home-con">
        <div className="slider-title-home">
          <h1 >Don't just take our word for it—read what our guests have to say!</h1>
        </div>
        </div>
      <Swiper
                       breakpointsInverse= {true}
                       breakpoints={{
                         640: {
                           slidesPerView: 1,
                           spaceBetween: 20,
                         },
                         768: {
                           slidesPerView: 1,
                           spaceBetween: 40,
                         },
                         1024: {
                           slidesPerView: 1,
                           spaceBetween: 50,
                         },
                         1030: {
                           slidesPerView: 1,
                           spaceBetween: 50,
                         },
                       }}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={0}
              // slidesPerView={4}
              navigation
              direction="horizontal"
              // pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              >
              <div className="clients-slider">
                  <SwiperSlide><CustmerSay
                  imgSrc="3 (1) 2.svg"
                  des="Staying at this luxury rental property was a dream come true!  Every detail was carefully curated to perfection, making our stay an unforgettable retreat into luxury. A heartfelt thanks for turning our getaway into an extraordinary memory. Can't wait to return and relive the magic!" 
                  Name="Diana Rachel"
                  location="Entire condo in Banff, Canada"
                  /></SwiperSlide>
                  <SwiperSlide><CustmerSay
                  imgSrc="3 (1) 2.svg"
                  des="Staying at this luxury rental property was a dream come true!  Every detail was carefully curated to perfection, making our stay an unforgettable retreat into luxury. A heartfelt thanks for turning our getaway into an extraordinary memory. Can't wait to return and relive the magic!" 
                  Name="Diana Rachel"
                  location="Entire condo in Banff, Canada"
                  /></SwiperSlide>
                  <SwiperSlide><CustmerSay
                  imgSrc="3 (1) 2.svg"
                  des="Staying at this luxury rental property was a dream come true!  Every detail was carefully curated to perfection, making our stay an unforgettable retreat into luxury. A heartfelt thanks for turning our getaway into an extraordinary memory. Can't wait to return and relive the magic!" 
                  Name="Diana Rachel"
                  location="Entire condo in Banff, Canada"
                  /></SwiperSlide>
                  <SwiperSlide><CustmerSay
                  imgSrc="3 (1) 2.svg"
                  des="Staying at this luxury rental property was a dream come true!  Every detail was carefully curated to perfection, making our stay an unforgettable retreat into luxury. A heartfelt thanks for turning our getaway into an extraordinary memory. Can't wait to return and relive the magic!" 
                  Name="Diana Rachel"
                  location="Entire condo in Banff, Canada"
                  /></SwiperSlide>
                  <SwiperSlide><CustmerSay
                  imgSrc="3 (1) 2.svg"
                  des="Staying at this luxury rental property was a dream come true!  Every detail was carefully curated to perfection, making our stay an unforgettable retreat into luxury. A heartfelt thanks for turning our getaway into an extraordinary memory. Can't wait to return and relive the magic!" 
                  Name="Diana Rachel"
                  location="Entire condo in Banff, Canada"
                  /></SwiperSlide>
            
              </div>
              
          </Swiper>
      </div>
    </section>
    <FooterSec/>
  </Layout>
)



export default IndexPage
