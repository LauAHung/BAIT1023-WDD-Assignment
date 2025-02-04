document.addEventListener('DOMContentLoaded', function () {
    function validateNumberInput(inputElement) {
        inputElement.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '');
        });
    }

    function validateInputLength(inputElement, maxLength) {
        inputElement.addEventListener('input', function () {
            if (this.value.length > maxLength) {
                this.style.color = 'red'; 
            } else {
                this.style.color = '';
            }
        });
    }

    // Validate 
    document.querySelectorAll('input[type="num"]').forEach(function (inputElement) {
        validateNumberInput(inputElement);
        validateInputLength(inputElement, 4); 
    });

    const cardHolderInput = document.getElementById('card-holder');
    cardHolderInput.addEventListener('input', function () {
        const cardHolder = this.value;
        const cardHolderDiv = document.querySelector('.card-holder div');

        if (cardHolder.length > 20) {
            cardHolderDiv.textContent = 'Card holder name is too long';
            cardHolderDiv.style.color = 'red';
        } else {
            cardHolderDiv.textContent = cardHolder;
            cardHolderDiv.style.color = '';
        }
    });

    const cvvInput = document.getElementById('card-cvv');
    cvvInput.addEventListener('input', function () {
        const cvv = this.value;
        const cvvDiv = document.querySelector('.cvv div');

        if (cvv.length !== 3 || isNaN(cvv)) {
            cvvDiv.textContent = 'Invalid CVV';
            cvvDiv.style.color = 'red';
        } else {
            cvvDiv.textContent = cvv;
            cvvDiv.style.color = '';
        }
    });

    cvvInput.addEventListener('focus', function () {
        document.querySelector('.credit-card-box .flip').classList.add('flipped');
    });

    cvvInput.addEventListener('blur', function () {
        document.querySelector('.credit-card-box .flip').classList.remove('flipped');
    });

    const cardNumberInputs = document.querySelectorAll('.input-cart-number');
    cardNumberInputs.forEach(function (inputElement, index) {
        inputElement.addEventListener('input', function () {
            const cardNumberDiv = document.querySelector('.number');
            const cardNumber = getCardNumberFromInputs(cardNumberInputs);

            if (cardNumber.replace(/\s/g, '').length === 16) {
                cardNumberDiv.textContent = cardNumber;
                cardNumberDiv.style.color = '';
            } else {
                cardNumberDiv.textContent = cardNumber;
                cardNumberDiv.style.color = 'red';
            }

            if (this.value.length === 4 && index < cardNumberInputs.length - 1) {
                cardNumberInputs[index + 1].focus();
            }
        });
    });

    function getCardNumberFromInputs(inputs) {
        let cardNumber = '';
        inputs.forEach(function (input) {
            cardNumber += input.value.padEnd(4, '•').trim() + ' ';
        });
        return cardNumber.trim(); 
    }

    const expMonthInput = document.getElementById('card-expiration-month');
    const expYearInput = document.getElementById('card-expiration-year');
    const expirationDateDiv = document.querySelector('.card-expiration-date div');

    function updateExpirationDate() {
        const month = expMonthInput.value;
        const year = expYearInput.value.slice(2);

        if (month && year) {
            expirationDateDiv.textContent = `${month}/${year}`;
            expirationDateDiv.style.color = '';
        } else {
            expirationDateDiv.textContent = 'MM/YY';
            expirationDateDiv.style.color = 'red';
        }
    }

    expMonthInput.addEventListener('change', updateExpirationDate);
    expYearInput.addEventListener('change', updateExpirationDate);

    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        displaySuccessfulPaymentPopupAndNavigate();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem('cart_' + currentUser.email)) || [];

    displayUserDetails(currentUser);
    displayCartItems(cart);
    initializePaymentButtons();
    displayShippingDetails();

    generateTransactionAndOrderID();

    // Add event listener to the Next button
    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', function() {
        displaySuccessfulPaymentPopupAndNavigate();
    });
});

function displayUnsuccessfulPaymentPopup() {
    const blurBackground = document.createElement('div');
    blurBackground.className = 'blur-background';
    document.body.appendChild(blurBackground);

    const popupMessage = document.createElement('div');
    popupMessage.className = 'popup-message';
    popupMessage.innerHTML = `
        <div class="popup-content">
            <img src="../../pictures/Shop/failed.gif" width="200px">
            <h2>Payment Unsuccessful</h2>
            <p>Your payment could not be processed. Please try again.</p>
            <button class="payment_done" onclick="location.reload()">Refresh</button>
        </div>
    `;
    document.body.appendChild(popupMessage);
}

function displaySuccessfulPaymentPopupAndNavigate() {
    const blurBackground = document.createElement('div');
    blurBackground.className = 'blur-background';
    document.body.appendChild(blurBackground);

    const popupMessage = document.createElement('div');
    popupMessage.className = 'popup-message';
    popupMessage.innerHTML = `
        <div class="popup-content">
            <img src="../../pictures/Shop/success.gif" width="200px">
            <h2 style="text-align:center">Payment-Successful</h2>
            <p>Your payment was successfully processed.</p>
        </div>
    `;
    playSuccessSound();
    document.body.appendChild(popupMessage);

    setTimeout(function() {
        window.location.href = 'invoice-car.html';
    }, 3000); 
}

function playSuccessSound() {
    const audio = new Audio('../../audio/success.mp3');
    audio.play();
}
