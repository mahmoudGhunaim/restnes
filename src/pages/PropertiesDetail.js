import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faTv, faSnowflake, faUtensils, faHotTub, faFire, faSwimmingPool, faWasher, faDryer, faCheckCircle, faHairDryer, faTemperatureHigh, faSmoke, faSkullCrossbones, faFirstAid,  faConciergeBell, faTshirt, faVolumeUp, faPaw, faParking, faBalcony, faCouch, faChild, faIroningBoard, faBed, faGrill, faToaster, faDishwasher, faMicrowave, faOven, faCoffee, faShower, faBath, faSun, faStove, faRefrigerator, faTree, faUtensilsAlt, faLaptop, faDoorOpen, faLongArrowAltUp, faSwimmer, faCircle, faHistory, faHeart, faHandSparkles, faUtensilSpoon, faBinoculars, faShip, faKayak, faUmbrella, faWater, faMountain, faRoute, faWarehouseAlt, faFireAlt, faSkiing, faBicycle, faSuitcase, faDock, faCloset, faBlender, faChestFreezer, faIgloo, faWineBottle, faFish, faChair, faGolfBall, faTennisBall, faBasketballBall, faVolleyballBall, faBell, faFireExtinguisher, faLightbulb, faFileAlt, faLock, faWindowMaximize, faPlug, faBook, faGamepad, faBaby, faExchangeAlt, faBlind, faBroadcastTower,  faUmbrellaBeach, faCrosshairs, faSkating,  faShuttleVan, faSplotch, faToilet, faRoad, faHandHolding, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
// import { DateRangePicker } from 'react-datepicker';
// import amenitiesData from '../jsonFolder/amenities.json'; // Adjust the path as needed
import Hostaway from '../services/hostaway';
import 'react-datepicker/dist/react-datepicker.css';
import "../components/style/PropertiesDetail.css";
import Layout from "../components/layout";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ImportData from './importData';
import SinglePrice from '../components/singlePrice';
import { Map, Circle, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '450px',
};
const PropertiesDetail = (props) => {
  const [properties, setProperties] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Auto');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [guests, setGuests] = useState(1);
  const [listings, setListings] = useState(null);
  const [error, setError] = useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState([]); // Assumed to be part of your listing data
  const [activeMarker, setActiveMarker] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [nights, setNights] = useState(0);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const milliseconds = ('00' + date.getMilliseconds()).slice(-3);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  };
  const calculateNumberOfNights = (startDate, endDate) => {
    if (startDate && endDate) {
      const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
      const start = new Date(startDate);
      const end = new Date(endDate);
      const calculatedNights = Math.round(Math.abs((end - start) / oneDay));
      setNights(calculatedNights); // Update nights in the component state
      return calculatedNights;
    } else {
      setNights(0); // Set nights to 0 if startDate or endDate is missing
      return 0;
    }
  };
  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    if (newStartDate && newEndDate) {
      // Check if "Auto" is selected (modify the condition accordingly)
      if (selectedOption === 'Auto') {
        calculateNumberOfNights(newStartDate, newEndDate);
      }
    }
  };
  const handleBooking = (e) => {
    e.preventDefault(); 
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const nights = calculateNumberOfNights(startDate, endDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const queryParamsId = new URLSearchParams(window.location.search);
  const bookingId=queryParamsId.get('listingMapId');
    const url = `https://58620_1.holidayfuture.com/checkout/${bookingId}?start=${formattedStartDate}&end=${formattedEndDate}&numberOfGuests=${guests}&nights=${nights}`;
    window.location.href = url;
  };
  const onMapClicked = (props, map, clickEvent) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };
  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };
  var data;
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const fetchData = async () => {
      const id = queryParams.get('listingMapId');
      const baseUrl = 'https://api.hostaway.com/v1/listings';
      const url = `${baseUrl}/${id}`;
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1ODYyMCIsImp0aSI6ImMyZmI1YjRiM2UxOGIyNWE0N2IwYWU5MmRiZDRlMjljNGY2MTg3MDRlY2M5MWM5ZTA5MDJlYzg4MWMzMjc4Y2MwOTZiODlkYjA0Y2ZmMjE3IiwiaWF0IjoxNjgwMjAxODE3LCJuYmYiOjE2ODAyMDE4MTcsImV4cCI6MTc0MzM2MDIxNywic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjEzNzAyfQ.ILnp24OkuH18ylsP6DDMWYX11fywUNi1XU_D5iPfpuDOFLpW4tcEQHlaYb94u8O3pERnv1iYENz_KPT6WGI6qFhL-gBA_tM10GWhJuZrSukIJYDWyv7x-WWsmfpUMcsvcQYXyWksAWY-wcCS4RmFtVIw0KWtVGJMy_h_yRs8Ypw'; // Use the provided token
      try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setListings([data.result]); // Assuming 'result' contains the listing data including amenities
        setAmenities(data.result.amenities || []); // Assuming amenities are part of the listing data
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchData();
  }, []);

  const amenityImages = {
    'Internet': faWifi,
    'Cable TV': faTv,
    'Wireless': faWifi,
    'Air conditioning': faSnowflake,
    'Kitchen': faUtensils,
    'Hot tub': faHotTub,
    'Fireplace': faFire,
    'Swimming pool': faSwimmingPool,
    'Washing Machine': faWasher,
    'Dryer': faDryer,
    '24-hour checkin': faCheckCircle,
    'Hair Dryer': faHairDryer,
    'Heating': faTemperatureHigh,
    'Smoke detector': faSmoke,
    'Carbon Monoxide Detector': faSkullCrossbones,
    'First aid kit': faFirstAid,
    'Fire Extinguisher': faFireExtinguisher,
    'Essentials': faConciergeBell,
    'Hangers': faTshirt,
    'Iron': faTshirt,
    'Laptop Friendly workspace': faLaptop,
    'TV': faTv,
    'Sound system': faVolumeUp,
    'Pets allowed': faPaw,
    'Free parking': faParking,
    'Balcony': faBalcony,
    'Private living room': faCouch,
    'Suitable for children': faChild,
    'Heated swimming pool': faSwimmingPool,
    'Iron board': faIroningBoard,
    'Linens': faBed,
    'Outdoor grill': faGrill,
    'Toaster': faToaster,
    'Dishwasher': faDishwasher,
    'Microwave': faMicrowave,
    'Oven': faOven,
    'Electric kettle': faCoffee,
    'Coffee/tea maker': faCoffee,
    'Shower': faShower,
    'Tub': faBath,
    'Deck patio uncovered': faSun,
    'Stove': faStove,
    'Refrigerator': faRefrigerator,
    'Towels': faBed,
    'Garden or backyard': faTree,
    'Kitchen utensils': faUtensilsAlt,
    'Hot water': faTemperatureHigh,
    'Private entrance': faDoorOpen,
    'Extra pillows and blankets': faBed,
    'Cooking basics': faUtensils,
    'Beach essentials': faUmbrellaBeach,
    // 'Winery tours': faWineGlass,
    'Toilet': faToilet,
    // 'Car necessary': faCar,
    'Dining area': faUtensilSpoon,
    'Bird watching': faBinoculars,
    'Boating': faShip,
    'Paddle boating': faKayak,
    'Beach front': faUmbrella,
    'Lake': faWater,
    'Lake front': faWater,
    'Lake view': faMountain,
    'Mountain view': faMountain,
    'Water view': faUmbrella,
    'Waterfront': faUmbrella,
    'Bicycle': faBicycle,
    'Boat': faShip,
    'Kayak canoe': faKayak,
    'Luggage dropoff allowed': faSuitcase,
    'Long term stays allowed': faLongArrowAltUp,
    'Private pool': faSwimmer,
    'Family': faCircle,
    'Historic': faHistory,
    'Romantic': faHeart,
    'Contactless Check-In/Out': faHandSparkles,
    'Smart TV': faTv,
    'Kitchen island': faUtensils,
    'Dining table': faUtensilSpoon,
    'Private dock': faDock,
    'Outdoor furniture': faChair,
    'Fire pit': faFireAlt,
    'Clothing storage': faCloset,
    'Barbeque utensils': faUtensils,
    'Blender': faBlender,
    'Coffee': faCoffee,
    'Freezer': faChestFreezer,
    'Mini fridge': faIgloo,
    'Wine glasses': faWineBottle,
    'Outdoor kitchen': faUtensils,
    // Add icons for the newly added amenities
    'Outdoor kitchen': faUtensils,
    'Outdoor shower': faShower,
    'Rooftop patio': faSun,
    'Safety card': faFileAlt,
    'Waterfront': faUmbrella,
    'Beachfront': faUmbrella,
    'Mountain biking': faBicycle,
    'Mountain climbing': faMountain,
    'Mountain view': faMountain,
    'Hiking trails': faRoute,
    'Snow sports': faWarehouseAlt,
    'Indoor fireplace': faFireAlt,
    'Surfing': faWater,
    'Snowshoeing': faSplotch,
    'Snowboarding': faSnowflake,
    'Skiing': faSkiing,
    'Boat slip': faShip,
    'Water skiing': faSwimmer,
    'Jet skiing': faShip,
    'Scuba diving': faSwimmer,
    'Snorkeling': faSwimmer,
    'Fishing equipment': faFish,
    'Beachcombing': faUmbrella,
    'Outdoor furniture': faChair,
    'Patio or balcony': faSun,
    'Lawn or garden': faTree,
    'Beach view': faWater,
    'Golf course view': faGolfBall,
    'Outdoor dining area': faUtensils,
    'Grill': faUtensils,
    'Tennis court': faTennisBall,
    'Basketball court': faBasketballBall,
    'Volleyball court': faVolleyballBall,
    'BBQ grill': faUtensils,
    'Smoke alarms': faBell,
    'Carbon monoxide alarm': faBell,
    'Fire extinguisher': faFireExtinguisher,
    'Fire blanket': faFire,
    'Emergency lighting': faLightbulb,
    'Safety card': faFileAlt,
    'First aid kit': faFirstAid,
    'Lock on bedroom door': faLock,
    'Window guards': faWindowMaximize,
    'Outlet covers': faPlug,
    'Bathtub': faBath,
    'High chair': faChair,
    'Children’s books and toys': faBook,
    'Game console': faGamepad,
    'Babysitter recommendations': faBaby,
    'Pack ’n Play/travel crib': faBed,
    'Stair gates': faExchangeAlt,
    'Room-darkening shades': faBlind,
    'Baby monitor': faBroadcastTower,
    'Changing table': faExchangeAlt,
    'Children’s dinnerware': faUtensils,
    'Fireplace guards': faFireAlt,
    'Pool with a view': faSwimmingPool,
    'Infinity pool': faSwimmingPool,
    'Plunge pool': faSwimmingPool,
    'Heated pool': faSwimmingPool,
    'Pool cover': faSwimmingPool,
    'Saltwater pool': faSwimmingPool,
    'Beach chairs': faChair,
    'Beach umbrellas': faUmbrellaBeach,
    'Bicycles': faBicycle,
    'Boat dock': faDock,
    'Fishing': faFish,
    'Golf': faGolfBall,
    'Hiking': faRoute,

    // 'Hot air ballooning': faHotAirBalloon,
    'Kayaking': faKayak,

    'Rafting': faWater,
    'Sailing': faShip,
    'Scuba diving or snorkeling': faSwimmer,
    'Skiing': faSkiing,
    // 'Snowboarding': faSnowboarding,
    // 'Snowmobiling': faSnowplow,
    'Surfing': faWater,
    'Swimming': faSwimmer,
    'Tennis': faTennisBall,
    'Water skiing': faSwimmer,
    'Water tubing': faWater,
    'Whitewater rafting': faWater,
    // 'Windsurfing': faWind,
    'Hunting': faCrosshairs,
    'Ice skating': faSkating,
    'Mountain biking': faBicycle,
    'Mountaineering': faMountain,
    'Rock climbing': faMountain,
    'Roller blading': faSkating,
    'Ski lift privileges': faSkiing,
    'Ski shuttle': faShuttleVan,
    // 'Snowmobiling': faSnowplow,
    'Snowshoeing': faSplotch,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide doorway to guest bathroom': faDoorOpen,
    'Wide entryway': faDoorOpen,
    'Wide hallways': faRoute,
    'Flat path to guest entrance': faRoad,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'No stairs or steps to enter': faSignInAlt,
    'Wide entrance for guests': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Handheld shower head': faShower,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Accessible-height toilet': faToilet,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Grab bars for shower': faHandHolding,
    'Shower chair': faChair,
    'Step-free access': faHandHolding,
    'Wide entryway': faDoorOpen,
    'Well-lit path to entrance': faLightbulb,
    'Step-free access': faHandHolding,
    'Wide entrance for guests': faDoorOpen,
    'Wide entrance for bathroom': faDoorOpen,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height bed': faBed,
    'Extra space around bed': faBed,
    'Accessible-height toilet': faToilet,
    'Wide entrance for bedroom': faDoorOpen,
  };
  
    // const getAmenityImage = (amenityName) => {
    //   const imageName = amenityName.toLowerCase().replace(/ /g, '-');
    //   const imagePath = `/${amenityImages[amenityName] || imageName}.svg`;
    //   return imagePath;
    // };
  const queryParams = new URLSearchParams(window.location.search);
  const ids = queryParams.get('listingMapId'); // Replace with your actual ID value
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1ODYyMCIsImp0aSI6ImMyZmI1YjRiM2UxOGIyNWE0N2IwYWU5MmRiZDRlMjljNGY2MTg3MDRlY2M5MWM5ZTA5MDJlYzg4MWMzMjc4Y2MwOTZiODlkYjA0Y2ZmMjE3IiwiaWF0IjoxNjgwMjAxODE3LCJuYmYiOjE2ODAyMDE4MTcsImV4cCI6MTc0MzM2MDIxNywic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjEzNzAyfQ.ILnp24OkuH18ylsP6DDMWYX11fywUNi1XU_D5iPfpuDOFLpW4tcEQHlaYb94u8O3pERnv1iYENz_KPT6WGI6qFhL-gBA_tM10GWhJuZrSukIJYDWyv7x-WWsmfpUMcsvcQYXyWksAWY-wcCS4RmFtVIw0KWtVGJMy_h_yRs8Ypw'; // Replace with your actual token value
console.log('debug',JSON.stringify(data) );
fetch(`https://api.hostaway.com/v1/listings/${ids}/calendar`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  data : {
    startingDate: startDate,
    endingDate: endDate,
    numberOfGuests: guests
  },
  body: JSON.stringify(data) // Make sure 'data' is defined with your desired JSON data
})
.then(response => response.json())
.then(data => {
  console.log(data); // Log the response data
})
.catch(error => {
  console.error('Error:', error);
});
const fetchData = async () => {
  try {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('listingMapId');
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1ODYyMCIsImp0aSI6ImMyZmI1YjRiM2UxOGIyNWE0N2IwYWU5MmRiZDRlMjljNGY2MTg3MDRlY2M5MWM5ZTA5MDJlYzg4MWMzMjc4Y2MwOTZiODlkYjA0Y2ZmMjE3IiwiaWF0IjoxNjgwMjAxODE3LCJuYmYiOjE2ODAyMDE4MTcsImV4cCI6MTc0MzM2MDIxNywic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjEzNzAyfQ.ILnp24OkuH18ylsP6DDMWYX11fywUNi1XU_D5iPfpuDOFLpW4tcEQHlaYb94u8O3pERnv1iYENz_KPT6WGI6qFhL-gBA_tM10GWhJuZrSukIJYDWyv7x-WWsmfpUMcsvcQYXyWksAWY-wcCS4RmFtVIw0KWtVGJMy_h_yRs8Ypw'; // Replace with your actual token value

    const response = await fetch(`https://api.hostaway.com/v1/listings/${id}/calendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch('/api/dates');
        const data = await response.json();

      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };
    if (listings && listings.length > 0) {
      setDescription(listings[0].description);
      setAmenities(listings[0].listingAmenities || []);
    }
  }, [listings]);
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const fetchData = async () => {
      const id = queryParams.get('listingMapId');
      const baseUrl = 'https://api.hostaway.com/v1/listings';
      const url = `${baseUrl}/${id}`;
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1ODYyMCIsImp0aSI6ImMyZmI1YjRiM2UxOGIyNWE0N2IwYWU5MmRiZDRlMjljNGY2MTg3MDRlY2M5MWM5ZTA5MDJlYzg4MWMzMjc4Y2MwOTZiODlkYjA0Y2ZmMjE3IiwiaWF0IjoxNjgwMjAxODE3LCJuYmYiOjE2ODAyMDE4MTcsImV4cCI6MTc0MzM2MDIxNywic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjEzNzAyfQ.ILnp24OkuH18ylsP6DDMWYX11fywUNi1XU_D5iPfpuDOFLpW4tcEQHlaYb94u8O3pERnv1iYENz_KPT6WGI6qFhL-gBA_tM10GWhJuZrSukIJYDWyv7x-WWsmfpUMcsvcQYXyWksAWY-wcCS4RmFtVIw0KWtVGJMy_h_yRs8Ypw'; // Use the provided token
      try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setListings([data.result]); 
        setAmenities(data.result.amenities || []);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchData();
  }, []);

;

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleAmenities = () => {
    setIsAmenitiesExpanded(!isAmenitiesExpanded);
  };
  // Logic for displaying the description and amenities with "Read More"
  const descriptionLines = description.split('\n');
  const shouldShowReadMoreDescription = descriptionLines.length > 8;
  const displayDescription = isDescriptionExpanded ? descriptionLines : descriptionLines.slice(0, 8);
  if (shouldShowReadMoreDescription && (
    <span id="toggleButton" onClick={toggleDescription}>
      {isDescriptionExpanded  ? 'Show Less' : 'Read More'}
    </span>
  ));

  const shouldShowReadMoreAmenities = amenities.length > 12;
  const displayAmenities = isAmenitiesExpanded ? amenities : amenities.slice(0, 12);
  if (shouldShowReadMoreAmenities && (
    <span id="toggleButton" onClick={toggleDescription}>
      {isAmenitiesExpanded   ? 'Show Less' : 'Show More'}
    </span>
  ));
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!listings) {
    return   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
              <CircularProgress />
            </Box>;
  }


  const firstListing = listings[0];
  const listingImages = firstListing.listingImages ? firstListing.listingImages.slice(0) : [];
  const firstImage = listingImages.length > 0 ? listingImages[0] : null;
  console.log(148,firstListing.listingAmenities);
 const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
 const queryParams2 = new URLSearchParams(window.location.search);
 const id2 = queryParams2.get('listingMapId');
 const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    // const getIconForAmenity = (amenityName) => {
    //   switch (amenityName) {
    //     case 'Cable TV':
    //       return faTv;
    //     case 'Air conditioning':
    //       return faWind;
    //     case 'Swimming pool':
    //       return faSwimmer;
    //     case 'Kitchen':
    //       return faUtensils;
    //     case 'Hot tub':
    //       return faHotTub;
    //     // Add more cases as needed
    //     default:
    //       return null; // or some default icon
    //   }
    // };
  return (
    <Layout>
      <section className='image-sec-det'>
         <div className='image-container-det'>  
          <div className="image-list-inner">
            <div className='Big-image-d'>
              <img src={firstImage.url} alt={firstImage.name || 'Listing'} />
              <button className="view-all-photos" onClick={() => setIsGalleryOpen(true)}>
                View All Photos
              </button>
              {
                  isGalleryOpen && (
                    <div className="gallery-modal" onClick={() => setIsGalleryOpen(false)}>
                      <div className="gallery-content" onClick={e => e.stopPropagation()}>
                        {listings[0].listingImages.map((image, index) => (
                          <img key={index} src={image.url} alt={`Listing ${index}`} />
                        ))}
                      </div>
                    </div>
                  )
                }
            </div>            
            <div className='small-image-d'>
            {listingImages.slice(1, 5).map((listing, index) => {
            const borderRadiusStyle = index === 1
                ? { borderRadius: '0 10px 0 0' }
                : index === 3
                ? { borderRadius: '0 0 10px 0' }
                : {};
        
            return (
                <div className={`listing-image-container-list${index === 0 ? ' separate-div' : ''}`} key={listing.url} data-toggle="modal" data-target="#exampleModalLong">
                <img
                    src={listing.url}
                    alt={listing.name || 'Listing'}
                    className="listing-image-list"
                    style={borderRadiusStyle}
                />
        
                </div>
            );
            })}
        </div>
          </div>
        </div>
      </section>
      <section className='detail-pro-sec'>
        <div className='detail-pro-container'>
          <div className='detail-pro-des'>
            <h1>{firstListing.externalListingName}</h1>
            <h6>House in {firstListing.city} , {firstListing.state}</h6>
            <div className='card-des-detail'>
            <span><img src='/bed-solid 1.svg'/> {firstListing.bedroomsNumber}</span>
            <span><img src='/bath-solid 1.svg'/> {firstListing.bathroomsNumber}</span>
            <span><img src='/users-solid 1.svg'/> {firstListing.guestsIncluded}</span>
            <span><img src='/ruler-combined-solid 1.svg'/> {firstListing.squareMeters ? `${firstListing.squareMeters}m²` : 'N/A'}</span>
          </div>
          <h2>About this space</h2>

            {displayDescription.map((line, index) => (
              <p key={index} className='space-detail'>{line}</p>
            ))}
            <div className='space-for-space'></div>
            {shouldShowReadMoreDescription && (
              
            <span id="toggleButton" onClick={toggleDescription}>
              {isDescriptionExpanded  ? 'Show Less' : 'Read More'}
            </span>
  )}
               <h2>Amenities</h2>
               <div className="amenities-list">
               <div className='amenity-detail'>
      {displayAmenities.map((amenity, index) => {
        const icon = amenityImages[amenity.amenityName];
        return (
          <div key={index} className='amenity-detail-single'>
            {icon && <FontAwesomeIcon icon={icon} />} {/* Render the icon if available */}
            <p className='amenity-single-detail'>{amenity.amenityName}</p>
          </div>
        );
      })}
    </div>
             </div>
            {shouldShowReadMoreAmenities && (
              <span id="toggleButton" onClick={toggleAmenities}>
                {isAmenitiesExpanded  ? 'Show Less' : 'Show More'}
              </span>
            )}
          </div>
          <div className='pay-detail'>
          <h2><SinglePrice
          id55={id2}
          setStartDate={formattedStartDate}
          setendDate={formattedEndDate}
          nights={nights}
          /></h2>
        <form onSubmit={handleBooking}>
        <div className='form-data'>
          <div className="form-group">
            <label htmlFor="checkIn">Check In</label>
            <DatePicker
  selected={startDate}
  
        onChange={(date) => {
          setStartDate(date);
                  handleDateChange(date, endDate);// Adjust to call handleDateChange
        }}
        dateFormat="yyyy-MM-dd"
        id="checkIn"
        className="form-control"
        placeholderText="Select Check-In Date"
        minDate={currentDate}
/>
          </div>
          <div className="form-group">
            <label htmlFor="checkOut">Check Out</label>
            <DatePicker
  selected={endDate}
  onChange={(date) => {
    setEndDate(date);
    handleDateChange(startDate, date); // Adjust to call handleDateChange
  }}
  dateFormat="yyyy-MM-dd"
  id="checkOut"
  className="form-control"
  placeholderText="Select Check-Out Date"
  minDate={startDate || currentDate}
/>
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <select
  id="guests"
  className="form-control"
  value={guests}
  onChange={(e) => setGuests(e.target.value)}
>
  {Array.from({ length: 10 }, (_, i) => i + 1).map((option) => (
    <option key={option} value={option}>
      {option} {option === 1 ? 'Guest' : 'Guests'}
    </option>
  ))}
</select>
          </div>        
          <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
            <ImportData
            id55={id2}
            setStartDate={formattedStartDate}
            setendDate={formattedEndDate}
            nights={nights}
            />
            <p>{firstListing.Tax}</p>
           </div>
        </div>
        
      </section>
      <section className='map-detail'>
      <div className='map-detail-des'>
              <h2>property location</h2>
              <Map
          google={props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{
            lat: firstListing.lat,
            lng: firstListing.lng
          }}
          className="map-map"
          onClick={onMapClicked}
        >
          <Circle
            center={{
              lat: firstListing.lat,
              lng: firstListing.lng
            }}
            radius={1000}
            strokeColor='#0000FF'
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor='#0000FF'
            fillOpacity={0.2}
            onClick={onMarkerClick}
          />
          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onMapClicked}
          >
            {/* Add your info window content here */}
            <div>
              <h3>{firstListing.name}</h3>
              {/* Add more listing details you want to show in the InfoWindow */}
            </div>
          </InfoWindow>
        </Map>
        
        </div>
      </section>
      <section className='detail-map-sec'>
        <div className='detail-map-container'>
        <h3>{firstListing.publicAddress}</h3>
        </div>
      </section>
      <section className='checkout-mobile-sec'>
        <div className='checkout-mobile-container'>
        <div className="form-group">
      <label>Check-In / Check-Out</label>
      {/* <DateRangePicker
        startDate={startDate} // The start date of the range
        endDate={endDate} // The end date of the range
        onCalendarClose={() => console.log("Calendar closed")}
        onCalendarOpen={() => console.log("Calendar opened")}
        onChange={handleDateChange} // Function that handles date changes
        selectsRange // Enables range selection
        startDateId="checkIn" // Start date input's id
        endDateId="checkOut" // End date input's id
        dateFormat="yyyy-MM-dd"
        minDate={currentDate} // Minimum date
        className="form-control"
        placeholderText="Select Check-In and Check-Out Date"
      /> */}
      
     
    </div>
        </div>
       
      </section>
    </Layout>
  );
};
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBo349XwCDBNxWs45of-UxOr_6IDDQ9iLQ'
})(PropertiesDetail);