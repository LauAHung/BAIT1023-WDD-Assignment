//categories Page//

const carLinks = document.querySelectorAll('.car-link');
const carInfo = document.querySelectorAll('.car-info');

carLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const carId = link.getAttribute('data-car');
    carInfo.forEach(info => {
      info.classList.remove('active');
    });
    document.getElementById(carId).classList.add('active');
  });
});



//CAR SELECTED

document.addEventListener("DOMContentLoaded", function() {
  const carLinks = document.querySelectorAll('.car-link');

  function selectCar(link) {
    const previousSelected = document.querySelector('.car-link.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
    }

    link.classList.add('selected');

    const carId = link.getAttribute('data-car');
    const carInfo = document.getElementById(carId);

    const allCarInfo = document.querySelectorAll('.car-info');
    allCarInfo.forEach(function(info) {
      info.classList.remove('active');
    });

    carInfo.classList.add('active');
  }

  carLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      selectCar(link);
    });
  });
});


window.onload = function () {
  var xiaomi_intro = document.getElementById('xiaomi_intro');
  xiaomi_intro.classList.add('show');
  setTimeout(function () {
    var xiaomi_intro_img = document.getElementById('xiaomi_intro_img');
    xiaomi_intro_img.classList.add('show');
  }, 1000);
};
