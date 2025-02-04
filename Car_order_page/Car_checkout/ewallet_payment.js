document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem('cart_' + currentUser.email)) || [];

    displayUserDetails(currentUser);
    displayCartItems(cart);
    initializePaymentButtons();
    displayShippingDetails();

    generateTransactionAndOrderID();

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

function displayCartItems(cart) {
    const cartItemsDiv = document.getElementById('cart_Items');
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="product-details">
                <p class="product-name">${item.name}</p> 
                <div class="product-quantity"><span class="quantity1">Quantity:</span><span class="quantity"> ${item.quantity}</span></div>
                <div class="product-subtotal"><span class="subtotal1">Subtotal:</span><span class="subtotal"> RM ${(item.price * item.quantity).toFixed(2)}</span></div>
                <br />
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
            <hr>
            <div class="total-row"><span class="total-label">Total Items:</span><span class="total-value">${totalItems}</span></div>
            <div class="total-row"><span class="total-label">Subtotal:</span><span class="total-value">RM ${totalPrice.toFixed(2)}</span></div>
            <div class="total-row"><span class="total-label">SST (6%):</span><span class="total-value">RM ${tax.toFixed(2)}</span></div>
            <div class="total-row"><span class="total-label">Total Due:</span><span class="total-value">RM ${totalAfterTax.toFixed(2)}</span></div>
        </div>
    `;
    document.getElementById('summaryDetails').innerHTML = totalsHtml;
}

function generateTransactionAndOrderID() {
    const transactionNo = Math.floor(1000000 + Math.random() * 9000000);
    const orderID = Math.floor(10000 + Math.random() * 90000);

    localStorage.setItem('transactionNo', transactionNo);
    localStorage.setItem('orderID', orderID);

    document.querySelector('.transaction_no').textContent = transactionNo;
    document.querySelector('.orderID').textContent = orderID;

    return { transactionNo, orderID };
}

window.onload = function () {
    var timeDisplay = document.getElementById('timer');
    var thirtySeconds = 29; 
    startTimer(thirtySeconds, timeDisplay);
};

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            displaySuccessfulPaymentPopupAndNavigate();
        }
    }, 1000);
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
            <h2>Payment Successful</h2>
            <p>Your payment was successfully processed.</p>
        </div>
    `;
    document.body.appendChild(popupMessage);

    setTimeout(function() {
        window.location.href = 'invoice-car.html';
    }, 3000); 
}

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
