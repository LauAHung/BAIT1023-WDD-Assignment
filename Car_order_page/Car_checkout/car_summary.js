document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem('cart_' + currentUser.email)) || [];

    displayUserDetails(currentUser);

    initializePaymentButtons(); // Initialize payment buttons without the checkout button
    displayShippingDetails();
    // Add event listener to the Next button
    const nextButton1 = document.getElementById("nextButton");
    nextButton1.addEventListener("click", function() {
        displaySuccessfulPaymentPopupAndNavigate();
    });
});


function displayUserDetails(currentUser) {
    const userDetailsDiv = document.getElementById('userDetails');
    userDetailsDiv.innerHTML = `<p>Username: ${currentUser.userName}</p><p>Email: ${currentUser.email}</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const packageDetails = JSON.parse(localStorage.getItem('selectedPackage'));

    if (packageDetails) {
        document.getElementById('packagePrice-1').innerHTML = `
        <p style="font-size:25px;"><strong>Product Name:</strong> ${packageDetails.name}<p><br>
        <p style="font-size:25px;"><strong>Details:</strong>&nbsp;</p><br>
        <p>${packageDetails.details}</p><br>
        `;
    } else {
        document.getElementById('packagePrice-1').innerHTML = `
            <p>No package selected.</p>
        `;
    }
});


function displayShippingDetails() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
        const detailsHtml = `
            <p>${userDetails.firstName} ${userDetails.lastName}</p>
            <p>${userDetails.address}</p>
            <p>${userDetails.address2}</p>
            <p>${userDetails.postcode}</p>
            <p>${userDetails.city}</p>
            <p>${userDetails.state}</p>
            <p>+6${userDetails.mobileNumber}</p>
        `;
        document.getElementById('shippingDetails').innerHTML = detailsHtml;
    } else {
        document.getElementById('shippingDetails').innerHTML = "<p>No user details found.</p>";
    }
}


function initializePaymentButtons() {
    const paymentButtons = document.querySelectorAll('.secondary-button');

    paymentButtons.forEach(button => {
        button.addEventListener('click', function () {
            localStorage.setItem('selectedPaymentMethod', button.id);
            navigateToPaymentMethodPage(button.id);
        });
    });
}

function navigateToPaymentMethodPage(paymentMethod) {
    let paymentUrl = '';

    switch (paymentMethod) {
        case 'card':
            paymentUrl = 'card_payment.html';
            break;
        case 'ewallet':
            paymentUrl = 'ewallet_payment.html';
            break;
        case 'transfer':
            paymentUrl = 'online_transfer_payment.html';
            break;
        default:
            paymentUrl = 'payment_success.html';
            break;
    }

    window.location.href = paymentUrl;
}

function initializePaymentButtons() {
    const paymentButtons = document.querySelectorAll('.secondary-button');

    paymentButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedPaymentMethod = button.id;
            localStorage.setItem('selectedPaymentMethod', selectedPaymentMethod);
            navigateToPaymentMethodPage(selectedPaymentMethod);
        });
    });
}

function displaySelectedPaymentMethod() {
    const selectedPaymentMethod = localStorage.getItem('selectedPaymentMethod');
    const paymentMethodDisplay = document.getElementById('paymentMethodDisplay');

    if (selectedPaymentMethod) {
        switch (selectedPaymentMethod) {
            case 'card':
                paymentMethodDisplay.textContent = 'Debit/Credit Card';
                break;
            case 'ewallet':
                paymentMethodDisplay.textContent = 'eWallet Payment';
                break;
            case 'transfer':
                paymentMethodDisplay.textContent = 'Cash on Delivery';
                break;
            default:
                paymentMethodDisplay.textContent = 'Unknown';
                break;
        }
    } else {
        paymentMethodDisplay.textContent = 'Payment method not selected';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const packageDetails = JSON.parse(localStorage.getItem('selectedPackage'));

    if (packageDetails) {
        const packagePrice = parseFloat(packageDetails.price.replace(/[^0-9.-]+/g, ""));
        const convenientFee = 250;
        const commissionFee = packagePrice * 0.10;
        const totalPrice = packagePrice + convenientFee + commissionFee;

        const transactionNumber = Math.floor(1000000 + Math.random() * 9000000);
        const orderID = Math.floor(10000 + Math.random() * 90000);

        // Store transaction number and order ID separately in local storage
        let transactionNumbers = JSON.parse(localStorage.getItem('transactionNumbers')) || [];
        let orderIDs = JSON.parse(localStorage.getItem('orderIDs')) || [];

        // Add the new transaction number and order ID to their respective arrays
        transactionNumbers.push(transactionNumber);
        orderIDs.push(orderID);

        // Save the updated arrays to local storage
        localStorage.setItem('transactionNumbers', JSON.stringify(transactionNumbers));
        localStorage.setItem('orderIDs', JSON.stringify(orderIDs));

        document.getElementById('transactionNumbers').innerHTML = `
        Transaction No.:${transactionNumber}
        `;

        document.getElementById('orderIDs').innerHTML = `
        Order ID:${orderID}
        `;

        // Display transaction number
        document.getElementById('packagePrice').innerHTML = `
            <div class="price-row">
                <div class="price-label">Package Price:</div>
                <div class="price-value">RM ${packagePrice.toFixed(2)}</div>
            </div>
            <div class="price-row">
                <div class="price-label">Convenient Fee:</div>
                <div class="price-value">RM ${convenientFee.toFixed(2)}</div>
            </div>
            <div class="price-row">
                <div class="price-label">Commission Fee (10%):</div>
                <div class="price-value">RM ${commissionFee.toFixed(2)}</div>
            </div>
            <div class="price-row">
                <div class="price-label">Total Price:</div>
                <div class="price-value">RM ${totalPrice.toFixed(2)}</div>
            </div>
        `;
    } else {
        document.getElementById('packagePrice').innerHTML = `
            <p>No package selected.</p>
        `;
    }
});

