//FEEDBACK JIANLE 06052024
const allStar = document.querySelectorAll('.rating .star');
const ratingValue = document.querySelector('.rating input');
const selectedRatingElement = document.getElementById('selected-rating');
const allStar2 = document.querySelectorAll('.rating2 .star');
const ratingValue2 = document.querySelector('.rating2 input');
const selectedRatingElement2 = document.getElementById('selected-rating2');
const averageRateElement = document.getElementById('averageRate');

allStar.forEach((item, idx) => {
  item.addEventListener('click', function () {
    let click = 0;
    ratingValue.value = idx + 1;
    console.log(ratingValue.value);
    selectedRatingElement.textContent = ratingValue.value;

    allStar.forEach(i => {
      i.classList.replace('bxs-star', 'bx-star');
      i.classList.remove('active');
    });
    for (let i = 0; i < allStar.length; i++) {
      if (i <= idx) {
        allStar[i].classList.replace('bx-star', 'bxs-star');
        allStar[i].classList.add('active');
      } else {
        allStar[i].style.setProperty('--i', click);
        click++;
      }
    }
  });
});

allStar2.forEach((item, idx) => {
  item.addEventListener('click', function () {
    let click = 0;
    ratingValue2.value = idx + 1;
    console.log(ratingValue2.value);
    selectedRatingElement2.textContent = ratingValue2.value;

    allStar2.forEach(i => {
      i.classList.replace('bxs-star', 'bx-star');
      i.classList.remove('active');
    });
    for (let i = 0; i < allStar2.length; i++) {
      if (i <= idx) {
        allStar2[i].classList.replace('bx-star', 'bxs-star');
        allStar2[i].classList.add('active');
      } else {
        allStar2[i].style.setProperty('--i', click);
        click++;
      }
    }
  });
});

function updateAverage() {
  const rating1 = parseFloat(selectedRatingElement.textContent);
  const rating2 = parseFloat(selectedRatingElement2.textContent);
  const average = (rating1 + rating2) / 2;

  averageRateElement.textContent = average.toFixed(1);

  // Store the average in local storage
  localStorage.setItem('average', average.toFixed(1));
}

document.addEventListener('DOMContentLoaded', function () {
  const feedbackContainer = document.getElementById('myFeedback');
  const averageRateElement = document.getElementById('averageRate');
  const feedbackTemplate = document.getElementById('feedbackTemplate');

  // Load existing feedback data
  loadFeedback();

  // Function to load existing feedback
  function loadFeedback() {
    // Clear existing feedback from the container
    feedbackContainer.innerHTML = '';

    // Get feedback data from local storage
    let feedbackDataArray = JSON.parse(localStorage.getItem('feedbackData')) || [];

    // Display only the newest feedback for each user
    const latestFeedbackMap = new Map();

    feedbackDataArray.forEach(feedbackData => {
      // Check if there is existing feedback from the same user
      if (latestFeedbackMap.has(feedbackData.userName)) {
        const existingFeedback = latestFeedbackMap.get(feedbackData.userName);
        if (feedbackData.timestamp > existingFeedback.timestamp) {
          // Replace existing feedback with newer one
          latestFeedbackMap.set(feedbackData.userName, feedbackData);
        }
      } else {
        // Store the newest feedback for the user
        latestFeedbackMap.set(feedbackData.userName, feedbackData);
      }
    });

    // Display the newest feedback for each user
    latestFeedbackMap.forEach(feedbackData => {
      displayFeedback(feedbackData);
    });
  }

  // Event listener for the submit button
  document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault();

    // Get the user's input values
    const opinion = document.getElementById('opinion').value.trim();
    const rating1 = parseFloat(document.getElementById('selected-rating').textContent);
    const rating2 = parseFloat(document.getElementById('selected-rating2').textContent);
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    // Check if the user is logged in
    if (currentUser) {
      // Check if the ratings and opinion are provided
      if (!isNaN(rating1) && !isNaN(rating2) && opinion !== "") {
        // Create a new feedback object with a unique ID
        const feedbackData = {
          feedbackId: Date.now(), // Unique ID using timestamp
          userId: currentUser.userId,
          userName: currentUser.userName,
          opinion: opinion,
          rating1: rating1,
          rating2: rating2,
          timestamp: Date.now() // Add timestamp to track latest feedback
        };

        // Get existing feedback data from local storage
        let feedbackDataArray = JSON.parse(localStorage.getItem('feedbackData')) || [];

        // Add the new feedback to the feedback data array
        feedbackDataArray.push(feedbackData);

        // Save the updated feedback data to local storage
        localStorage.setItem('feedbackData', JSON.stringify(feedbackDataArray));

        // Reload and display the feedback
        loadFeedback();
      } else {
        displayModal("Please rate and provide your feedback before submitting.");
      }
    } else {
      displayModal("Please log in to submit feedback.", true);
    }
  });

  // Function to display feedback
  function displayFeedback(feedbackData) {
    // Clone the feedback template
    const clone = feedbackTemplate.content.cloneNode(true);

    // Populate the cloned template with feedback data
    clone.querySelector('.feedbackUsername').textContent = feedbackData.userName;
    clone.querySelector('.averageRate').textContent = ((feedbackData.rating1 + feedbackData.rating2) / 2).toFixed(1);
    clone.querySelector('.output').textContent = feedbackData.opinion;

    // Append the cloned template to the feedback container
    feedbackContainer.appendChild(clone);
  }
});

function displayModal(message, showLoginButton = false) {
  const backgroundElements = document.querySelectorAll('body > *:not(.modal-content)');
  backgroundElements.forEach(element => {
    element.classList.add('blur-background');
  });
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="pictures/Shop/failed.gif" width="160px">
            <p>${message}</p>
            ${showLoginButton ? '<button id="loginBtn">Login</button>' : ''}
        </div>
    `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.close');
  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });

  if (showLoginButton) {
    const loginButton = modal.querySelector('#loginBtn');
    loginButton.addEventListener('click', () => {
      closeModal(modal);
      window.location.href = 'Reg_Log_page/login.html';
    });
  }

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