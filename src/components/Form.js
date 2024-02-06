import React, { useEffect } from 'react';
import * as easepick from '@easepick/bundle';
import "./style/Form.css"
import "./SearchForm"
import SearchForm from './SearchForm';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';


const Form = () => {
  useEffect(() => {
    // Function to create options for select elements
    // const createOptions = (elementId, start, end, selectedValue) => {
    //   const selectElement = document.getElementById(elementId);
    //   for (let i = start; i <= end; i++) {
    //     const option = document.createElement('option');
    //     option.value = i;
    //     if (i === selectedValue) {
    //       option.selected = true;
    //     }
    //     option.text = i + (elementId === 'num_adults' ? ' Adults' : ' Children');
    //     selectElement.appendChild(option);
    //   }
    // };

    // // Create options for num_adults and num_children select elements
    // createOptions('num_adults', 1, 16, 2); // Selected value = 2
    // createOptions('num_children', 0, 16, 0); // Selected value = 0

    // Initialize date pickers
    const startPicker = new easepick.create({
      element: "#start_date",
      css: [
        'https://restnest.ca/wp-content/themes/hello-theme-child-master/style.css',
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/date-plugin@1.2.1/dist/index.css'
      ],
      plugins: ["DatePlugin", "LockPlugin"],
      LockPlugin: {
        minDate: new Date(),
      }
    });

    const endPicker = new easepick.create({
      element: "#end_date",
      css: [
        'https://restnest.ca/wp-content/themes/hello-theme-child-master/style.css',
        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/date-plugin@1.2.1/dist/index.css'
      ],
      plugins: ["DatePlugin", "LockPlugin"],
      LockPlugin: {
        minDate: new Date(),
      }
    });

    // Set placeholders for date inputs
    document.getElementById('start_date').setAttribute('placeholder', 'Start Date');
    document.getElementById('end_date').setAttribute('placeholder', 'End Date');

    // Handle form submission
    document.getElementById('lmpm-property-search-filters').addEventListener('submit', function(event) {
      event.preventDefault();
      const startDate = encodeURIComponent(document.getElementById('start_date').value);
      const endDate = encodeURIComponent(document.getElementById('end_date').value);
      const numAdults = encodeURIComponent(document.getElementById('num_adults').value);   
      const numChildren = encodeURIComponent(document.getElementById('num_children').value);
      // const url = `/search-page/?start_date=${startDate}&end_date=${endDate}&num_adults=${numAdults}&num_children=${numChildren}`;
      // window.location.href = url;
    });
  }, []);

  return (
    <>
      <form id="lmpm-property-search-filters" action="" method="get">
        <div className='form-container'>
        <div className="lmpm-search-fields DateRangePickerInput DateRangePickerInput_1">
          <div className="form-field DateInput DateInput_1">
            <h3>Check in</h3>
            <input
              type="text"
              className="datepicker"
              name="start_date"
              id="start_date"
              autoComplete="off"
              required
            />
          </div>
          
          <div className="form-field DateInput DateInput_1">
          <h3>Check out</h3>
            <input
              type="text"
              className="datepicker"
              name="end_date"
              id="end_date"
              autoComplete="off"
              required
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
          <SearchForm/>
          {/* <div className="button-container">
          <button type="submit"><img src='search-normal.svg'/></button>
        </div> */}
          
        </div>
        </div>
      </form>
    </>
  );
};



export default Form;
