document.addEventListener("DOMContentLoaded", function() {
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = subscribeForm.querySelector('input[name="email"]');

    subscribeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        if (validateEmail(email)) {
            alert("Subscribed successfully with email: " + email);
            emailInput.value = '';
        } else {
            alert('Invalid email format');
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
