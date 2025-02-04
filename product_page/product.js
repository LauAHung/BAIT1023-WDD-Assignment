document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const productButtons = document.querySelectorAll('.add_cart_btn');

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

    function stepper(button) {
        const input = button.parentNode.querySelector('input[type="number"]');
        const value = parseInt(input.value);
        const max = parseInt(input.getAttribute('max'));
        const min = parseInt(input.getAttribute('min'));
        const step = parseInt(input.getAttribute('step'));

        if (button.id === 'increment' && value < max) {
            input.value = value + step;
        } else if (button.id === 'decrement' && value > min) {
            input.value = value - step;
        }
    }

    productButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!currentUser) {
                promptLogin();
                return;
            }

            const productContainer = button.closest('.product_info');
            const quantityInput = productContainer.querySelector('input[type="number"]');
            const priceText = productContainer.querySelector('.price').textContent;
            const price = parseFloat(priceText.split(" ")[1]); 
            const productInfo = {
                id: parseInt(button.dataset.productId), 
                name: productContainer.querySelector('.product-title').textContent,
                price: price,
                quantity: parseInt(quantityInput.value),
                imageUrl: productContainer.parentNode.querySelector('.product-image img').src
            };
            addToCart(productInfo);
        });
    });

    // Add event listeners for increment and decrement buttons
    const incrementButtons = document.querySelectorAll('#increment');
    const decrementButtons = document.querySelectorAll('#decrement');

    incrementButtons.forEach(button => {
        button.addEventListener('click', () => stepper(button));
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', () => stepper(button));
    });
});

function changeImage(src) {
    document.getElementById("mainImage").src = src;
}