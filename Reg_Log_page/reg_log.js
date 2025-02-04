document.addEventListener('DOMContentLoaded', function () {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUserIndex = -1;
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser) {
        currentUserIndex = users.findIndex(user => user.email === currentUser.email);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const userName = document.getElementById('userName').value;
            const birthDate = document.getElementById('birthDate').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const retypePassword = document.getElementById('retypePassword').value;

            if (password !== retypePassword) {
                showModal("Passwords do not match!", false);
                return;
            }

            if (users.some(user => user.email === email)) {
                showModal("User already exists with that email!", false);
                return;
            }

            const newUser = { userName, birthDate, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            sessionStorage.setItem('currentUser', JSON.stringify(newUser));
            showModal("Registration successful!", true);
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                showModal("Login successful!", true);
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);
            } else {
                showModal("Invalid credentials!", false);
            }
        });
    }

    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function () {
            const email = prompt("Please enter your email:");
            if (email) {
                const user = users.find(user => user.email === email);
                if (user) {
                    const code = Math.floor(100000 + Math.random() * 900000).toString();
                    alert(`The 6-digit code has been sent to your email: ${code}`);
                    const userCode = prompt("Please enter the 6-digit code:");
                    if (userCode === code) {
                        alert(`Your password is: ${user.password}`);
                    } else {
                        alert("Invalid code!");
                    }
                } else {
                    alert("Email not found!");
                }
            }
        });
    }

    const accountDetails = document.getElementById('accountDetails');
    if (accountDetails && currentUser) {
        accountDetails.innerHTML = `
            <h2>User Details</h2>
            <div class="user_info">
            <p><strong>Username:</strong> ${currentUser.userName} <img id="modifyUserName" src="../pictures/account/edit_icon.png" alt="Edit" class="editIcon"></p>
            <p><strong>Email:</strong> ${currentUser.email} <img id="modifyEmail" src="../pictures/account/edit_icon.png" alt="Edit" class="editIcon"></p>
            <p><strong>Birth Date:</strong> ${currentUser.birthDate} <img id="modifyBirthDate" src="../pictures/account/edit_icon.png" alt="Edit" class="editIcon"></p>
            <button id="modifyPassword">Modify Password</button>
            <button id="logout">Log Out Account</button>
            <button id="deleteAccount">Delete Account</button>
            </div>
        `;
    }

    const modifyUserNameBtn = document.getElementById('modifyUserName');
    if (modifyUserNameBtn) {
        modifyUserNameBtn.addEventListener('click', function () {
            showModalInput("Enter new username:", currentUser.userName, function (newUserName) {
                if (newUserName !== null) {
                    currentUser.userName = newUserName;
                    updateCurrentUser();
                }
            });
        });
    }

    const modifyEmailBtn = document.getElementById('modifyEmail');
    if (modifyEmailBtn) {
        modifyEmailBtn.addEventListener('click', function () {
            showModalInput("Enter new email:", currentUser.email, function (newEmail) {
                if (newEmail !== null) {
                    if (!isValidEmail(newEmail)) {
                        showModal("Invalid email format!", false);
                        return;
                    }
                    currentUser.email = newEmail;
                    updateCurrentUser();
                }
            });
        });
    }

    const modifyBirthDateBtn = document.getElementById('modifyBirthDate');
    if (modifyBirthDateBtn) {
        modifyBirthDateBtn.addEventListener('click', function () {
            showModalInput("Enter new birth date (YYYY-MM-DD):", currentUser.birthDate, function (newBirthDate) {
                if (newBirthDate !== null) {
                    if (!isValidDate(newBirthDate)) {
                        showModal("Invalid date format (YYYY-MM-DD)!", false);
                        return;
                    }
                    currentUser.birthDate = newBirthDate;
                    updateCurrentUser();
                }
            });
        });
    }

    const modifyPasswordBtn = document.getElementById('modifyPassword');
    if (modifyPasswordBtn) {
        modifyPasswordBtn.addEventListener('click', function () {
            showModalInput("Enter new password:", '', function (newPassword) {
                if (newPassword !== null) {
                    currentUser.password = newPassword;
                    updateCurrentUser();
                }
            }, true);
        });
    }

    const deleteAccountButton = document.getElementById('deleteAccount');
    if (deleteAccountButton) {
        deleteAccountButton.addEventListener('click', function () {
            const confirmDelete = confirm("Are you sure you want to delete your account?");
            if (confirmDelete) {
                users.splice(currentUserIndex, 1);
                localStorage.setItem('users', JSON.stringify(users));
                sessionStorage.removeItem('currentUser');
                showModal("Account deleted successfully!", true);
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    function updateCurrentUser() {
        users[currentUserIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        showModal("Information updated successfully!", true);
    }

    function showModal(message, success) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        let imgSrc = success ? "success.gif" : "failed.gif";
        let imgWidth = success ? "200px" : "200px";
        modal.innerHTML = `
            <div class="modal-content">
                <img class="status-img" src="../pictures/Shop/${imgSrc}" alt="${success ? 'success' : 'failed'}" width="${imgWidth}">
                <p class="invalid">${message}</p>
                <button class="close_btn">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close_btn');
        closeButton.addEventListener('click', () => {
            closeModal(modal);
        });
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }

    function showModalInput(message, defaultValue, callback, isPassword = false) {
        const modal = document.createElement('div');
        modal.classList.add('modal-input');
        const inputType = isPassword ? "password" : "text";
        modal.innerHTML = `
            <div class="modal-content">
                <p>${message}</p>
                <input type="${inputType}" id="modalInput" value="${defaultValue}">
                <button class="close_btn">Cancel</button>
                <button class="close_btn" id="submitInput">Submit</button>
            </div>
        `;
        document.body.appendChild(modal);

        const cancelButton = modal.querySelector('.close_btn');
        const submitButton = modal.querySelector('#submitInput');

        cancelButton.addEventListener('click', () => {
            closeModal(modal);
            callback(null);
        });

        submitButton.addEventListener('click', () => {
            const newValue = document.getElementById('modalInput').value;
            closeModal(modal);
            callback(newValue);
        });
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function isValidDate(date) {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        return datePattern.test(date);
    }
});

function checkAge() {
    // Get the birth date entered by the user
    var birthDate = document.getElementById("birthDate").value;

    // Check if it's a future date
    var today = new Date().toISOString().split('T')[0];
    if (birthDate > today) {
        alert("You cannot choose a future date.");
        document.getElementById("birthDate").value = "";
        return;
    }

    // Calculate the user's age (assuming today's date)
    var birthDateParts = birthDate.split("-");
    var birthYear = parseInt(birthDateParts[0]);
    var todayYear = new Date().getFullYear();
    var age = todayYear - birthYear - ((new Date().getMonth() + 1) < (parseInt(birthDateParts[1])) || (new Date().getDate() < parseInt(birthDateParts[2])));

    // Display an error message if the user is under 12
    if (age < 12) {
        alert("You must be 12 years or older to register.");
        document.getElementById("birthDate").value = "";
    }
}