function toggleAnswer(button) {
  var answer = button.parentNode.nextElementSibling;
  var isOpen = answer.classList.contains('open');
  if (isOpen) {
      answer.classList.remove('open');
      setTimeout(function () {
          answer.style.display = 'none';
      }, 500); // Adjust the timing to match the CSS transition duration
  } else {
      answer.style.display = 'block';
      setTimeout(function () {
          answer.classList.add('open');
      }, 10); // Delay to ensure display is set before sliding down
  }
  button.parentNode.classList.toggle('open'); // Toggle 'open' class on parent
}