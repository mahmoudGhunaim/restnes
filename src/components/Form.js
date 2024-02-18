import React, { useEffect, useState } from 'react';
import * as easepick from '@easepick/bundle';
import "./style/Form.css"
import "./SearchForm"
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const Form = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numAdults, setNumAdults] = useState(2); // Default value
  const [numChildren, setNumChildren] = useState(0); // Default value
  const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    onFilter(formattedStartDate, formattedEndDate, numAdults, numChildren);
  };

  return (
    <>
      <form id="lmpm-property-search-filters"  onSubmit={handleSubmit} action="" method="get">
        <div className='form-container'>
        <div className="lmpm-search-fields DateRangePickerInput DateRangePickerInput_1">
          <div className="form-field DateInput DateInput_1">
            <h3>Check in</h3>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)} // Ensure this line is present
              minDate={currentDate}
              placeholderText="Select Check-In Date"
          />

          </div>
          
          <div className="form-field DateInput DateInput_1">
          <h3>Check out</h3>
          <DatePicker
              minDate={startDate || currentDate}
              selected={endDate}
              onChange={(date) => setEndDate(date)} // Ensure this line is present
              placeholderText="Select Check-Out Date"

          />
          </div>
          <div className="form-field">
            <h3>Guests</h3>
            <select name="num_adults" id="num_adults"  defaultValue="2">
              {/* Options for num_adults */}
              {Array.from({ length: 17 }, (_, i) => (
                <option key={i} value={i}>
                  {i} Adults
                </option>
              ))}
            </select>
            <select name="num_children" id="num_children">
              {/* Options for num_children */}
              {Array.from({ length: 17 }, (_, i) => (
                <option key={i} value={i}>
                  {i} Children
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
          <button type="submit"><img src='/search-normal.svg'/></button>
        </div>
          
        </div>
        </div>
      </form>
    </>
  );
};

export default Form;
