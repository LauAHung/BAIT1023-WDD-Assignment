document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem('cart_' + currentUser.email)) || [];

    displayUserDetails(currentUser);
    displayCartItems(cart);
    initializePaymentButtons(); 
    displayShippingDetails(); 
});


function displayUserDetails(currentUser) {
    const userDetailsDiv = document.getElementById('userDetails');
    userDetailsDiv.innerHTML = `<p>Email:<span> ${currentUser.email}</span></p>`;
}

function displayCartItems(cart) {
    const cartItemsDiv = document.getElementById('cartItems');
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="product-image-container">
                <img src="${item.imageUrl}" alt="${item.name}" class="product-image" width="150px">
            </div>
            <div class="product-details">
                <p class="product-name">${item.name}</p> 
                <p class="product-quantity">Quantity: ${item.quantity}</p>
                <p class="product-price">Price: RM${item.price}</p>
                <p class="product-subtotal">Subtotal: RM${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartItemsDiv.appendChild(itemElement);
    });

    displayTotals(totalItems, totalPrice);
}



function displayTotals(totalItems, totalPrice) {
    const tax = totalPrice * 0.06;
    const totalAfterTax = totalPrice + tax;

    const totalsHtml = `
        <div class="totals-info">
            <div class="total-row"><span class="total-label">Total Items<span class="colon">:</span></span><span class="total-value">${totalItems}</span></div>
            <div class="total-row"><span class="total-label">Subtotal<span class="colon">:</span></span><span class="total-value">RM ${totalPrice.toFixed(2)}</span></div>
            <div class="total-row"><span class="total-label">SST (6%)<span class="colon">:</span></span><span class="total-value">RM ${tax.toFixed(2)}</span></div>
            <div class="total-row"><span class="total-label">Total Due<span class="colon">:</span></span><span class="total-value">RM ${totalAfterTax.toFixed(2)}</span></div>
        </div>
    `;
    document.getElementById('summaryDetails').innerHTML = totalsHtml;
}

function displayShippingDetails() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
        const detailsHtml = `
            <h1>${userDetails.firstName} ${userDetails.lastName}</h1>
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
        button.addEventListener('click', function() {
            localStorage.setItem('selectedPaymentMethod', button.id);
            navigateToPaymentMethodPage(button.id);
        });
    });
}

function navigateToPaymentMethodPage(paymentMethod) {
    let paymentUrl = '';

    switch(paymentMethod) {
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


function displaySelectedPaymentMethod() {
    const selectedPaymentMethod = localStorage.getItem('selectedPaymentMethod');
    const paymentMethodDisplay = document.getElementById('paymentMethodDisplay');

    if (selectedPaymentMethod) {
        switch (selectedPaymentMethod) {
            case 'card':
                paymentMethodDisplay.textContent = 'Debit/Credit Card';
                break;
            case 'ewallet':
                paymentMethodDisplay.textContent = 'eWallet';
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

document.addEventListener('DOMContentLoaded', function () {
    displaySelectedPaymentMethod();
});

function displayCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const paymentDateElement = document.getElementById('Date');

    paymentDateElement.textContent = formattedDate;
}

document.addEventListener('DOMContentLoaded', function () {
    displayCurrentDateTime();
});

document.addEventListener('DOMContentLoaded', function () {
    const transactionNo = localStorage.getItem('transactionNo');
    const orderID = localStorage.getItem('orderID');

    document.getElementById('transactionNo').textContent = transactionNo;
    document.getElementById('orderID').textContent = orderID;
});


//Print

document.getElementById('printButton').addEventListener('click', function () {
    window.print();
});


document.querySelector('.button_container button[type="button"]:last-child').addEventListener('click', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    localStorage.removeItem('cart_' + currentUser.email);
    
    window.location.href = '../index.html';
});