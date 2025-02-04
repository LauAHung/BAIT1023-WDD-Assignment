document.addEventListener('DOMContentLoaded', function () {
  const inputs = {
      firstName: document.getElementById('firstName'),
      lastName: document.getElementById('lastName'),
      address: document.getElementById('address'),
      address2: document.getElementById('address2'),
      city: document.getElementById('city'),
      state: document.getElementById('state'),
      postcode: document.getElementById('postcode'),
      mobileNumber: document.getElementById('mobileNumber')
  };

  // Function to validate First Name
  function validateFirstName() {
      if (inputs.firstName.value.length > 20 || inputs.firstName.value.length === 0) {
          document.getElementById('firstName_error').innerText = 'First name must be between 1 and 20 characters.';
          inputs.firstName.style.borderColor = 'red';
          return false;
      } else {
          document.getElementById('firstName_error').innerText = '';
          inputs.firstName.style.borderColor = 'green';
          return true;
      }
  }

  // Function to validate Last Name
  function validateLastName() {
      if (inputs.lastName.value.length > 20 || inputs.lastName.value.length === 0) {
          document.getElementById('lastName_error').innerText = 'Last name must be between 1 and 20 characters.';
          inputs.lastName.style.borderColor = 'red';
          return false;
      } else {
          document.getElementById('lastName_error').innerText = '';
          inputs.lastName.style.borderColor = 'green';
          return true;
      }
  }

  // Function to validate Address
  function validateAddress() {
      if (inputs.address.value.length === 0) {
          document.getElementById('address_error').innerText = 'Address is required.';
          inputs.address.style.borderColor = 'red';
          return false;
      } else {
          document.getElementById('address_error').innerText = '';
          inputs.address.style.borderColor = 'green';
          return true;
      }
  }

  // Function to validate City
  function validateCity() {
      if (inputs.city.value.length > 30 || inputs.city.value.length === 0) {
          document.getElementById('city_error').innerText = 'City must be less than 30 characters.';
          inputs.city.style.borderColor = 'red';
          return false;
      } else {
          document.getElementById('city_error').innerText = '';
          inputs.city.style.borderColor = 'green';
          return true;
      }
  }

  // Function to validate State
  function validateState() {
      if (inputs.state.value === "") {
          document.getElementById('state_error').innerText = 'Please select a state.';
          inputs.state.style.borderColor = 'red';
          return false;
      } else {
          document.getElementById('state_error').innerText = '';
          inputs.state.style.borderColor = 'green';
          return true;
      }
  }

  // Function to validate Postcode
  function validatePostcode() {
      if (!/^\d{5}$/.test(inputs.postcode.value)) {
          document.getElementById('postcode_error').innerText = 'Postcode must be 5 digits.';
          inputs.postcode.style.borderColor = 'red';
          return false;
      } else {
          document.getElementById('postcode_error').innerText = '';
          inputs.postcode.style.borderColor = 'green';
          return true;
      }
  }

  // Function to validate Mobile Number
  function validateMobileNumber() {
      if (!/^01\d{8,10}$/.test(inputs.mobileNumber.value)) {
          document.getElementById('mobileNumber_error').innerText = 'Must start with 01 and be 10-12 digits';
          inputs.mobileNumber.style.borderColor = 'red';
          return false;
      } else {
          document.getElementById('mobileNumber_error').innerText = '';
          inputs.mobileNumber.style.borderColor = 'green';
          return true;
      }
  }

  // Composite function to validate all inputs
  function validateInput() {
      const firstNameValid = validateFirstName();
      const lastNameValid = validateLastName();
      const addressValid = validateAddress();
      const cityValid = validateCity();
      const stateValid = validateState();
      const postcodeValid = validatePostcode();
      const mobileNumberValid = validateMobileNumber();
      
      return firstNameValid && lastNameValid && addressValid && cityValid && stateValid && postcodeValid && mobileNumberValid;
  }

  // Function to handle form submission
  function saveDetails() {
      if (validateInput()) {
          const userDetails = {
              firstName: inputs.firstName.value,
              lastName: inputs.lastName.value,
              address: inputs.address.value,
              address2: inputs.address2.value, // Optional, no validation needed
              city: inputs.city.value,
              state: inputs.state.value,
              postcode: inputs.postcode.value,
              mobileNumber: inputs.mobileNumber.value
          };
  
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          window.location.href = 'car_payment_summary.html'; // Make sure this page exists
      } else {
          console.log("Validation failed, not proceeding.");
      }
  }

  window.saveDetails = saveDetails; // Make sure saveDetails is accessible globally
});

document.getElementById('submit').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting
    displaySuccessfulPaymentPopupAndNavigate();
});

window.onload = function() {
    displaySuccessfulPaymentPopupAndNavigate();
};