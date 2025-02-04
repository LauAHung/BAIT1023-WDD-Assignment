document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser) {
        const modal = document.createElement('div');
        modal.id = 'loginModal';
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        const modalImage = document.createElement('img');
        modalImage.src = 'pictures/Shop/failed.gif';
        modalImage.alt = 'Failed';
        modalImage.style.width = '200px';

        const modalText = document.createElement('p');
        modalText.textContent = 'Please log in to access your cart.';

        const loginButton = document.createElement('button');
        loginButton.id = 'loginButton';
        loginButton.textContent = 'Log In';

        contentContainer.appendChild(modalImage);
        contentContainer.appendChild(modalText);
        contentContainer.appendChild(loginButton);

        modalContent.appendChild(contentContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        document.body.classList.add('modal-open');
        modal.style.display = 'block';

        loginButton.addEventListener('click', function () {
            window.location.href = 'Reg_Log_page/login.html';
        });

        return; 
    }

    const cart = JSON.parse(localStorage.getItem('cart_' + currentUser.email)) || [];
    const cartItemsContainer = document.getElementById('cartItems');

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="product-display">
                    <img src="${item.imageUrl}" alt="${item.name}" class="product-image">
                    <div class="product-details">
                        <div class="name_price">
                            <p class="product_name">${item.name}</p>
                            <p class="product_price">RM${item.price}</p>
                        </div>
                        <div class="input_remove">
                            <p class="quantity">Quantity: </p>
                            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                            <p class="remove" onclick="removeItem(${index})">Remove</p>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        if (cart.length === 0 || total === 0) {
            window.location.href = 'no_product_cart.html';
        } else {
            document.getElementById('totalAmount').innerText = 'RM ' + total.toFixed(2);
        }
    }

    window.updateQuantity = function (index, quantity) {
        quantity = parseInt(quantity);
        if (quantity > 0) {
            cart[index].quantity = quantity;
            localStorage.setItem('cart_' + currentUser.email, JSON.stringify(cart));
            updateCartDisplay();
        }
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        localStorage.setItem('cart_' + currentUser.email, JSON.stringify(cart));
        updateCartDisplay();
    };

    updateCartDisplay();
});
