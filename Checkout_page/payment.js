function updateCardSimulator(field) {
    const name = document.getElementById('cardholder').value;
    const number = document.getElementById('cardnumber').value.replace(/\s+/g, '').replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    const cvv = document.getElementById('cvv').value;
    const month = document.getElementById('expmonth').value;
    const year = document.getElementById('expyear').value;

    if (field === 'expdate' && month && year) {
        document.querySelector('.card-expiry').textContent = `${month}/${year}`;
    } else {
        document.querySelector('.card-name').textContent = name || 'FULL NAME';
        document.querySelector('.card-number').textContent = number || '#### #### #### ####';
        document.querySelector('.card-cvv').textContent = cvv.replace(/./g, '*') || 'CVV';
    }
}

function validateCardHolder() {
    const input = document.getElementById('cardholder');
    const error = document.getElementById('cardholder-error');
    updateCardSimulator('name'); // Update display
    if (input.value.length > 20) {
        showError(input, error, 'Card holder name cannot exceed 20 characters.');
    } else {
        hideError(input, error);
    }
}


function validateCardNumber() {
    const input = document.getElementById('cardnumber');
    const error = document.getElementById('cardnumber-error');
    let cursorPosition = input.selectionStart;  // Get current cursor position
    const originalLength = input.value.length;

    let value = input.value.replace(/\s+/g, '').replace(/\D/g, '');
    if (value.length > 16) {
        value = value.slice(0, 16);  // Limit to 16 digits
    }
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim(); // Add spaces every 4 digits
    
    input.value = formattedValue;
    updateCardSimulator('number');  // Update display

    // Adjust the cursor position to handle spaces
    const newLength = input.value.length;
    cursorPosition += newLength - originalLength; // Adjust position based on length change

    if (cursorPosition > newLength) {  // Ensure cursor isn't beyond the input value
        cursorPosition = newLength;
    }

    input.setSelectionRange(cursorPosition, cursorPosition); // Reset cursor position

    if (value.length !== 16) {
        showError(input, error, 'Card number must be 16 digits.');
    } else {
        hideError(input, error);
    }
}


function validateCVV() {
    const input = document.getElementById('cvv');
    const error = document.getElementById('cvv-error');
    updateCardSimulator('cvv'); // Update display
    if (input.value.length !== 3) {
        showError(input, error, 'CVV must be 3 digits.');
    } else {
        hideError(input, error);
    }
}

function showError(input, error, message) {
    input.classList.add('input-error');
    input.classList.remove('input-valid');
    error.textContent = message;
    error.style.display = 'block';
}

function hideError(input, error) {
    input.classList.remove('input-error');
    input.classList.add('input-valid');
    error.style.display = 'none';
}

function navigateIfValid() {
    const inputs = document.querySelectorAll('.form-container input');
    const allValid = Array.from(inputs).every(input => input.classList.contains('input-valid'));
    if (allValid) {
        window.location.href = 'checkout_step2.html'; // Navigate to the next step
    } else {
        alert('Please fill all fields correctly before proceeding.');
    }
}



//EWALLET
