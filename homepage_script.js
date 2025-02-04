// Cache DOM elements
const body = document.body;
const header = document.querySelector('header');
const links = header.querySelectorAll('a');
const main = document.querySelector('main');
const sections = main.querySelectorAll('section');
const video = sections[0].querySelector('video');


let ticking = false;
let stickyHeight = header.offsetHeight + 'px';

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      const isVideoVisible = body.scrollTop < video.offsetTop + video.offsetHeight;
      isVideoVisible ? video.play() : video.pause();

      const isSticking = body.scrollTop > header.offsetHeight;
      header.classList.toggle('sticking', isSticking);

      ticking = false;
    });
    ticking = true;
  }
}

body.addEventListener('scroll', handleScroll);

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

links.forEach(link => {
  link.addEventListener('mouseover', handleLinkMouseOver);
  link.addEventListener('mouseleave', handleLinkMouseLeave);
});

sections.forEach(section => {
  section.style.paddingTop = `calc(${stickyHeight} + 1em)`;
});

