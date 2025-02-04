// Cache DOM elements
const body = document.body;
const header = document.querySelector('header');
const links = header.querySelectorAll('a.nav-link');

// Define variables for optimization
let ticking = false;
let stickyHeight = header.offsetHeight + 'px';

// Scroll event handler
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const isVideoVisible = body.scrollTop < video.offsetTop + video.offsetHeight;
      isVideoVisible ? video.play() : video.pause();

      // Header sticking effect
      const isSticking = body.scrollTop > header.offsetHeight;
      header.classList.toggle('sticking', isSticking);

      ticking = false;
    });
    ticking = true;
  }
}

// Add scroll event listener
body.addEventListener('scroll', handleScroll);

// Nav hover animation
const navAnimate = document.querySelector('.nav-animate');

function handleLinkMouseOver(event) {
  const target = event.target;
  navAnimate.style.opacity = '1';
  navAnimate.style.top = `${target.offsetTop}px`;
  navAnimate.style.left = `${target.offsetLeft}px`;
  navAnimate.style.width = `${target.offsetWidth}px`;
  navAnimate.style.height = `${target.offsetHeight}px`;
}

function handleLinkMouseLeave() {
  navAnimate.style.opacity = '0';
}

// Attach mouseover and mouseleave event listeners to each link
links.forEach(link => {
  link.addEventListener('mouseover', handleLinkMouseOver);
  link.addEventListener('mouseleave', handleLinkMouseLeave);
});

// Adjust section padding top
sections.forEach(section => {
  section.style.paddingTop = `calc(${stickyHeight} + 1em)`;
});

