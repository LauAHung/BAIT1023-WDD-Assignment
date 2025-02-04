let selectedPackage = null;

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
    nextButton.addEventListener("click", function() {
        displaySuccessfulPaymentPopupAndNavigate();
    });
});


// Automatically select the first package
document.addEventListener('DOMContentLoaded', function () {
    selectOne();
});

// Selects one package if none are selected
function selectOne() {
    const allPackages = document.querySelectorAll('.car_package');
    if (!selectedPackage) {
        selectedPackage = allPackages[0];
        selectedPackage.classList.add('selected');
    }
}

// Toggles selection
function toggleSelection(element) {
    if (element !== selectedPackage) {
        if (selectedPackage) {
            selectedPackage.classList.remove('selected');
        }
        selectedPackage = element;
        selectedPackage.classList.add('selected');
    }
}


// NEW STORE ID

document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const productButtons = document.querySelectorAll('.continue_btn');

    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart_' + currentUser.email)) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart_' + currentUser.email, JSON.stringify(cart));
        displayModal('Added to cart!');
    }

    function promptLogin() {
        const backgroundElements = document.querySelectorAll('body > *:not(.modal-content)');
        backgroundElements.forEach(element => {
            element.classList.add('blur-background');
        });
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content">
              <span class="close">&times;</span>
              <img src="../pictures/Shop/failed.gif" width="200px">
              <p>Please login to add products to your cart.</p>
              <button id="loginBtn">Login</button>
          </div>
      `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            closeModal(modal);
        });

        const loginButton = modal.querySelector('#loginBtn');
        loginButton.addEventListener('click', () => {
            closeModal(modal);
            window.location.href = '../Reg_Log_page/login.html';
        });

        modal.style.display = 'block';

        document.body.classList.add('modal-open');
    }



    // store id
    function displayModal(message) {
        const backgroundElements = document.querySelectorAll('body > *:not(.modal-content)');
        backgroundElements.forEach(element => {
            element.classList.add('blur-background');
        });
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content_cart">
          <span class="close">&times;</span>
              <img src="../pictures/Shop/success.gif" width="150px">
              <p>${message}</p>
              <button id="continue">Continue Shopping</button>
              <button id="view_cart">View Cart</button>
          </div>
      `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            closeModal(modal);
        });

        const continueButton = modal.querySelector('#continue');
        continueButton.addEventListener('click', () => {
            closeModal(modal);
        });

        const viewCartButton = modal.querySelector('#view_cart');
        viewCartButton.addEventListener('click', () => {
            closeModal(modal);
            window.location.href = '../cart.html';
        });

        modal.style.display = 'block';

        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        const backgroundElements = document.querySelectorAll('body > *:not(.modal-content)');
        backgroundElements.forEach(element => {
            element.classList.remove('blur-background');
        });
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    productButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!currentUser) {
                promptLogin();
                return;
            }

            const productContainer = button.closest('.product_info');
            const priceText = productContainer.querySelector('.price').textContent;
            const price = parseFloat(priceText.split(" ")[1]);
            const productInfo = {
                id_car: parseInt(button.dataset.productId),
                name_car: productContainer.querySelector('.product-title').textContent,
                price_car: price,
                imageUrl_car: productContainer.parentNode.querySelector('.car_image img').src
            };
            addToCart(productInfo);
        });
    });
});

function selectPackage(packageNumber) {
    // Remove 'selected' class from all packages
    const packages = document.querySelectorAll('.car_package');
    packages.forEach(pkg => pkg.classList.remove('selected'));

    // Add 'selected' class to the clicked package
    const selectedPkg = document.getElementById(`package${packageNumber}`);
    selectedPkg.classList.add('selected');

    selectedPackage = packageNumber;
}

function storePackage() {
    if (selectedPackage === null) {
        alert('Please select a package before continuing');
        return;
    }

    const packageDetails = {
        1: {
            imageUrl: '../../pictures/toyota_car_1.png',
            name: 'Hybrid Electric',
            price: 'RM 143,000',
            details: `
                <p style="font-size:20px;"><strong>36 L</strong> Fuel Tank Capacity</p>
                <p style="font-size:20px;"><strong>6.5Ahr</strong> Battery Capacity (3hr)</p>
                <p style="font-size:20px;"><strong>170 Km/h</strong> Top Speed</p><br>
                <small>Antenna with Shark Fin Design <br>
                    Drive Mode SPORT / ECO / NORMAL / EV<br>
                    Electrochromic Mirror<br>
                    Carpet Mat With Hybrid Blue Accents<br></small>`
        },
        2: {
            imageUrl: '../../pictures/toyota_car_1.png',
            name: '1.8V AT',
            price: 'RM 130,900',
            details: `
                <p style="font-size:20px;"><strong>47 L</strong> Fuel Tank Capacity</p>
                <p style="font-size:20px;"><strong>182 Km/h</strong> Top Speed</p>`
        },
        3: {
            imageUrl: '../../pictures/toyota_car_1.png',
            name: 'GR Sport',
            price: 'RM 146,000',
            details: `
                <p style="font-size:20px;"><strong>47 L</strong> Fuel Tank Capacity</p>
                <p style="font-size:20px;"><strong>185 Km/h</strong> Top Speed</p><br>
                <small>Radiator Grille with Black Design<br>
                    Antenna with Shark Fin Design With Black Color & Black Roof
                    Smart Entry & Start System With GR Logo<br>
                    Carpet Mat With GR Design<br></small>`
        },
        4: {
            imageUrl: '../../pictures/honda_car_1.png',
            name: 'Sport Hybrid',
            price: 'RM 155,782',
            details: `
            <p style="font-size:20px;"><strong>48.5 L</strong> Fuel Tank Capacity</p>
            <p style="font-size:20px;"><strong>204</strong> Hourspower</p>
            <p style="font-size:20px;"><strong>201 Km/h</strong> Top Speed</p><br>
            <small>Gloss Black Decklid Spoiler<br>
                Sport Pedals<br></small>`
        },
        5: {
            imageUrl: '../../pictures/honda_car_1.png',
            name: 'EX-L Hybrid',
            price: 'RM 167,848',
            details: `
            <p style="font-size:20px;"><strong>48.5 L</strong> Fuel Tank Capacity</p>
            <p style="font-size:20px;"><strong>204</strong> Hourspower</p>
            <p style="font-size:20px;"><strong>201 Km/h</strong> Top Speed</p><br>
            <small>Body-Colored Parking Sensors<br>
                Body-Colored and Heated with Integrated LED Turn Indicators<br>
                Automatic-Dimming Rearview Mirror<br>
                Leather-Trimmed Seats<br>`
        },
        6: {
            imageUrl: '../../pictures/honda_car_1.png',
            name: 'Touring Hybrid',
            price: 'RM 183,669',
            details: `
            <p style="font-size:20px;"><strong>48.5 L</strong> Fuel Tank Capacity</p>
            <p style="font-size:20px;"><strong>204</strong> Hourspower</p>
            <p style="font-size:20px;"><strong>201 Km/h</strong> Top Speed</p><br>
            <small>Body-Colored Parking Sensors<br>
                Low-Speed Braking Control<br>
                Rain Sensing<br>
                Body-Colored and Heated with Integrated LED Turn Indicators<br>
                Passenger-Side Reverse Gear Tilt-Down<br>
                Automatic-Dimming Rearview Mirror<br>
                Leather-Trimmed Seats<br>
            </small>`
        },
        7: {
            imageUrl: '../../pictures/honda_car_2.png',
            name: 'Rear-Wheel Drive',
            price: 'RM 181,000',
            details: `
            <p style="font-size:20px;"><strong>513 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>6.1s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>201 Km/h</strong> Top Speed</p>`
        },
        8: {
            imageUrl: '../../pictures/honda_car_2.png',
            name: 'Long Range All-Wheel Drive',
            price: 'RM 210,000',
            details: `
            <p style="font-size:20px;"><strong>629 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>4.2s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>201 Km/h</strong> Top Speed</p>`
        },
        9: {
            imageUrl: '../../pictures/honda_car_2.png',
            name: 'Performance All-Wheel Drive',
            price: 'RM 242,000',
            details: `
            <p style="font-size:20px;"><strong>513 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>3.1s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>261 Km/h</strong> Top Speed</p><br>
            <small>Bespoke Performance Design<br>
                AWD with Performance Drive Unit<br>
                Sport Seats<br>
                Adaptive Suspension<br>
                20" Forged Wheels<br>
                Track Mode V3</small>`
        },
        10: {
            imageUrl: '../../pictures/toyota_car_2.png',
            name: 'Hybrid Electric',
            price: 'RM 202,000',
            details: `
            <p style="font-size:20px;"><strong>52 L</strong> Fuel Tank Capacity</p>
            <p style="font-size:20px;"><strong>6.5 Ahr</strong> Battery Capacity(3 hr)</p>
            <p style="font-size:20px;"><strong>170 Km/h</strong> Top Speed</p><br>
        </div>
        <small>Panoramic Sunroof<br>
            Drive Mode (Normal & Eco, Power & EV Mode)<br>
            Paddle Shift Mode<br>
            Rear Seat (2nd Row)	Captain Seat, Walk in Slide & Side Table<br>
            Rear Seat (3rd Row) 5:5 Tilt down<br></small>`
        },
        11: {
            imageUrl: '../../pictures/toyota_car_2.png',
            name: '2.0V SPECIFICATIONS',
            price: 'RM 165,000',
            details: `
            <p style="font-size:20px;"><strong>629 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>52 L</strong> Fuel Tank Capacity</p>
            <p style="font-size:20px;"><strong>180 Km/h</strong> Top Speed</p><br>
            <small>Rear Seat (2nd Row) 6:4 Walk in Slide<br>
            Rear Seat (3rd Row) 5:5 Tilt down<br>
            Lamps (Dome Lamp)<br></small>`
        },
        12: {
            imageUrl: '../../pictures/tesla_car_3.png',
            name: 'Rear-Wheel Drive',
            price: 'RM 271,042',
            details: `
            <p style="font-size:20px;"><strong>485 KM</strong> Range (WLTP)*</p>
                            <p style="font-size:20px;"><strong>6.5s</strong> 0-100km/h</p>
                            <p style="font-size:20px;"><strong>180 Km/h</strong> Top Speed</p>
                            <p style="font-size:20px;"><strong>7,500 LBS</strong> Towing</p>`
        },
        13: {
            imageUrl: '../../pictures/tesla_car_3.png',
            name: 'All-Wheel Drive',
            price: 'RM 360,775',
            details: `
            <p style="font-size:20px;"><strong>660 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>4.1s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>180 Km/h</strong> Top Speed</p>
            <p style="font-size:20px;"><strong>11,000 LBS</strong> Towing</p><br>
            <small>Charging Speed IN 15 MINUTES<br>
                UP TO 264 KM Range (WLTP)*<br>
            </small>`
        },
        14: {
            imageUrl: '../../pictures/tesla_car_3.png',
            name: 'Cyberbeast',
            price: 'RM 455,231',
            details: `
            <p style="font-size:20px;"><strong>620 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>2.6s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>209 Km/h</strong> Top Speed</p>
            <p style="font-size:20px;"><strong>11,000 LBS</strong> Towing</p><br>
            <small>Charging Speed IN 15 MINUTES<br>
                UP TO 248 KM Range (WLTP)*<br>
            </small>`
        },
        15: {
            imageUrl: '../../pictures/tesla_car_2.png',
            name: 'Rear-Wheel Drive',
            price: 'RM 181,000',
            details: `
            <p style="font-size:20px;"><strong>513 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>6.1s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>201 Km/h</strong> Top Speed</p>`
        },
        16: {
            imageUrl: '../../pictures/tesla_car_2.png',
            name: 'Long Range All-Wheel Drive',
            price: 'RM 210,000',
            details: `
            <p style="font-size:20px;"><strong>629 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>4.4s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>201 Km/h</strong> Top Speed</p>`
        },
        17: {
            imageUrl: '../../pictures/tesla_car_2.png',
            name: 'Performance All-Wheel Drive',
            price: 'RM 242,000',
            details: `
            <p style="font-size:20px;"><strong>513 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>3.1s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>261 Km/h</strong> Top Speed</p><br>
            <small>Bespoke Performance Design<br>
                AWD with Performance Drive Unit<br>
                Sport Seats<br>
                Adaptive Suspension<br>
                20" Forged Wheels<br>
                Track Mode V3</small>`
        },
        18: {
            imageUrl: '../../pictures/tesla_car_1.png',
            name: 'Model X All-Wheel Drive',
            price: 'RM 302,212',
            details: `
            <p style="font-size:20px;"><strong>650 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>3.8s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>240 Km/h</strong> Top Speed</p>
            <p style="font-size:20px;"><strong>670</strong> Peak Power</p>`
        },
        19: {
            imageUrl: '../../pictures/tesla_car_1.png',
            name: 'Model X Plaid Tri Motor All-Wheel Drive',
            price: 'RM 323,465',
            details: `
            <p style="font-size:20px;"><strong>632 KM</strong> Range (WLTP)*</p>
            <p style="font-size:20px;"><strong>2.5s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>262 Km/h</strong> Top Speed</p>
            <p style="font-size:20px;"><strong>1,020</strong> Peak Power</p><br>
            <small>Advanced Driver-Assistance Features<br>
                Upgraded Brakes, Suspension, and Aerodynamics<br>
            </small>`
        },
        20: {
            imageUrl: '../../pictures/tesla_car_1.png',
            imageUrl: '../../pictures/1.png',
            name: 'Xiaomi SU7',
            price: 'RM 141,770',
            details: `
            <p style="font-size:20px;"><strong>700 km</strong> CLTC cruising range</p>
            <p style="font-size:20px;"><strong>5.28s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>210 km/h</strong> Top Speed</p>
            <p style="font-size:20px;"><strong>25 Minute</strong> Fast Charging time(10% - 80%)</p>`
        },
        21: {
            imageUrl: '../../pictures/1.png',
            name: 'Xiaomi SU7 Pro',
            price: 'RM 161,470',
            details: `
            <p style="font-size:20px;"><strong>830 KM</strong> CLTC cruising range</p>
            <p style="font-size:20px;"><strong>5.7s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>210 Km/H</strong> Top Speed</p>
            <p style="font-size:20px;"><strong>30 Minute</strong> Fast Charging time(10% - 80%)</p>`
        },
        22: {
            imageUrl: '../../pictures/1.png',
            name: 'Xiaomi SU7 Max',
            price: 'RM 196,929',
            details: `
            <p style="font-size:20px;"><strong>800 KM</strong> CLTC cruising range</p>
            <p style="font-size:20px;"><strong>2.78s</strong> 0-100km/h</p>
            <p style="font-size:20px;"><strong>265 KM/h</strong> Top Speed</p>
            <p style="font-size:20px;"><strong>19 Minute</strong> Fast Charging time(10% - 80%)</p><br>
            <small>Gets Adaptive Air Suspension<br>
                The Max Variant Gets Adaptive Air Suspension Which can Switch<br>
                Between Soft and Firm,and High and Low<br>
                Brembo Four-piston Fixed Caliper<br>
                Perforated Ventilated Disc Brakes<br></small>`
        },
    };

    localStorage.setItem('selectedPackage', JSON.stringify(packageDetails[selectedPackage]));
    window.location.href = 'package-details.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const packageDetails = JSON.parse(localStorage.getItem('selectedPackage'));

    if (packageDetails) {
        document.getElementById('packageDetails').innerHTML = `
            <img src="${packageDetails.imageUrl}" alt="${packageDetails.name}" style="max-width: 100%; height: 200px;border:2px solid black;box-shadow:-10px 10px grey;margin-bottom:20px;">
            <h2>Product Name: ${packageDetails.name}</h2><br>
            <h2>Price :&nbsp;${packageDetails.price}</h2><br>
            <h2>Details:&nbsp;</h2><br>
            <p>${packageDetails.details}</p>
        `;
    } else {
        document.getElementById('packageDetails').innerHTML = `
            <p>No package selected.</p>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const packageDetails = JSON.parse(localStorage.getItem('selectedPackage'));

    if (packageDetails) {
        const packagePrice = parseFloat(packageDetails.price.replace(/[^0-9.-]+/g, ""));
        const convenientFee = 250;
        const commissionFee = packagePrice * 0.10;
        const totalPrice = packagePrice + convenientFee + commissionFee;

        document.getElementById('packagePrice').innerHTML = `
            <div class="package_price">Package Price: RM ${packagePrice.toFixed(2)}</div>
            <div class="convenient_fee">Convenient Fee: RM ${convenientFee.toFixed(2)}</div>
            <div class="commission_fee">Commission Fee (10%): RM ${commissionFee.toFixed(2)}</div>
            <div class="total_price">Total Price: RM ${totalPrice.toFixed(2)}</div>
        `;

        setTimeout(() => {
            document.getElementById('welcomeMessage').innerHTML = `
                <h2>Welcome!</h2>
            `;
            document.getElementById('remainingDetails').innerHTML = `
                <h3>${packageDetails.name}</h3>
                <img src="${packageDetails.imageUrl}" alt="${packageDetails.name}" style="max-width: 100%; height: auto;">
                <div class="package_detail">${packageDetails.details}</div>
            `;
        }, 2000); // 2 seconds delay
    } else {
        document.getElementById('packagePrice').innerHTML = `
            <p>No package selected.</p>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const packageDetails = JSON.parse(localStorage.getItem('selectedPackage'));

    if (packageDetails) {
        const packagePrice = parseFloat(packageDetails.price.replace(/[^0-9.-]+/g, ""));
        const convenientFee = 250;
        const commissionFee = packagePrice * 0.10;
        const totalPrice = packagePrice + convenientFee + commissionFee;

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

        setTimeout(() => {
            document.getElementById('welcomeMessage').innerHTML = `
                <h2>Welcome!</h2>
            `;
            document.getElementById('remainingDetails').innerHTML = `
                <h3>${packageDetails.name}</h3>
                <img src="${packageDetails.imageUrl}" alt="${packageDetails.name}" style="max-width: 100%; height: auto;">
                <div class="package_detail">${packageDetails.details}</div>
            `;
        }, 2000); // 2 seconds delay
    } else {
        document.getElementById('packagePrice').innerHTML = `
            <p>No package selected.</p>
        `;
    }
});

function displayUnsuccessfulPaymentPopup() {
    const blurBackground = document.createElement('div');
    blurBackground.className = 'blur-background';
    document.body.appendChild(blurBackground);

    const popupMessage = document.createElement('div');
    popupMessage.className = 'popup-message';
    popupMessage.innerHTML = `
        <div class="popup-content">
            <img src="../pictures/Shop/failed.gif" width="200px">
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
            <img src="../pictures/Shop/success.gif" width="200px">
            <h2>Payment Successful</h2>
            <p>Your payment was successfully processed.</p>
        </div>
    `;
    document.body.appendChild(popupMessage);

    setTimeout(function() {
        window.location.href = 'invoice.html';
    }, 3000); 
}