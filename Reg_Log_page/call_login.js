document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser) {
        showLoginModal();
    }

    function showLoginModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="../pictures/Shop/failed.gif" width="200px">
                <p class="login">Please log in to access your account.</p>
                <button id="loginRedirectBtn">Log In</button>
            </div>
        `;
        document.body.appendChild(modal);

        const blurElements = document.querySelectorAll('.container');
        blurElements.forEach(element => {
            element.classList.add('blurred');
        });

        const loginRedirectBtn = document.getElementById('loginRedirectBtn');
        loginRedirectBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
});
