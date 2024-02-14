import React, { useState, useEffect } from 'react';
import "../components/style/Properties.css"
import Layout from "../components/layout"
import Form from '../components/form';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "gatsby"
import LazyLoad from 'react-lazyload';
const Properties = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const startDate = queryParams.get('start_date') || '';
    const endDate = queryParams.get('end_date') || '';
    const numAdults = parseInt(queryParams.get('num_adults'), 10) || 0;
    const numChildren = parseInt(queryParams.get('num_children'), 10) || 0;
    const totalGuests = numAdults + numChildren;

    // Hostaway API token
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1ODYyMCIsImp0aSI6ImMyZmI1YjRiM2UxOGIyNWE0N2IwYWU5MmRiZDRlMjljNGY2MTg3MDRlY2M5MWM5ZTA5MDJlYzg4MWMzMjc4Y2MwOTZiODlkYjA0Y2ZmMjE3IiwiaWF0IjoxNjgwMjAxODE3LCJuYmYiOjE2ODAyMDE4MTcsImV4cCI6MTc0MzM2MDIxNywic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjEzNzAyfQ.ILnp24OkuH18ylsP6DDMWYX11fywUNi1XU_D5iPfpuDOFLpW4tcEQHlaYb94u8O3pERnv1iYENz_KPT6WGI6qFhL-gBA_tM10GWhJuZrSukIJYDWyv7x-WWsmfpUMcsvcQYXyWksAWY-wcCS4RmFtVIw0KWtVGJMy_h_yRs8Ypw';

    // Prepare the API request
    const url = new URL('https://api.hostaway.com/v1/listings');
    const headers = new Headers({
      'Authorization': `Bearer ${token}`
    });

    url.search = new URLSearchParams({
      availabilityDateStart: startDate,
      availabilityDateEnd: endDate,
      availabilityGuestNumber: totalGuests,
    }).toString();

    // Make the API call
    fetch(url, { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setListings(data.result); // Assuming 'result' is the array of listings
      })
      .catch(error => {
        setError(error.message);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  // Display the returned listings
  if (error) {
    return <p>Error: {error}</p>;
  }  if (listings.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  const firstListing = listings.length > 0 ? listings[0] : null;
  
  return (
    <Layout>
      <section className='form-property'>
      <Form/>
      </section>
      <section className='properties-sec'>
    <div className="properties-container">
    {/* Debug: Print the entire listings array as JSON */}
    {listings.map((listing) => (
      <div className="property-card" key={listing.id}>
        <Link to={`/PropertiesDetail/?listingMapId=${listing.id}`}>

        <Swiper
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={50}
  slidesPerView={1} 
  // navigation
  pagination={{ clickable: true }} // This enables clicking on pagination dots
  scrollbar={{ draggable: true }}
  onSwiper={(swiper) => console.log(swiper)}
  onSlideChange={() => console.log('slide change')}
>
{listing.listingImages.map((image, index) => (
    <SwiperSlide key={image.id || index} className='properties-slide'> {/* Ensure 'key' is on SwiperSlide */}
        <LazyLoad height={200} once>
            <img src={image.url} alt={image.caption} />
        </LazyLoad>
    </SwiperSlide>
))}
</Swiper>
         {/* {firstListing.listingImages.length > 0 && (
            <img src={firstListing.listingImages[0].url} alt={firstListing.listingImages[0].caption} />
          )} */}
        <div className='properties-card-des'>
          <h3>{listing.externalListingName}</h3>
          {/* <h6>House in {listing.city} , {listing.state}</h6> */}
          <div className='card-des'>
            <span><img src='/bed-solid 1.svg'/> {listing.bedroomsNumber}</span>
            <span><img src='/bath-solid 1.svg'/> {listing.bathroomsNumber}</span>
            <span><img src='/users-solid 1.svg'/> {listing.guestsIncluded}</span>
            <span><img src='/ruler-combined-solid 1.svg'/> {listing.squareMeters ? `${listing.squareMeters}m²` : 'N/A'}</span>
          </div>
        </div>
        {/* More property details can be added here */}
        </Link>
      </div>
      
    ))}
  </div>
  </section>
  </Layout>
  );
}
export default Properties;
