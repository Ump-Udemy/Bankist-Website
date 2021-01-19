'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const openModal = (event) => {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn)=> btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click',(event)=>{
  //const s1coord = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left:s1coord.left + window.pageXOffset,
  //   top:s1coord.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({behavior: 'smooth'});
});

document.querySelector('.nav__links').addEventListener('click',(event)=>{
  event.preventDefault();
  if(event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    if(id === '#') return;
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  };
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',(event)=>{
  const clicked = event.target.closest('.operations__tab');
  if(!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

const handleHover = (event,opacity) => {
  if(event.target.classList.contains('nav__link')){
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(element => {
      if ( element !== link ) element.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover',(event) => handleHover(event,0.5));
nav.addEventListener('mouseout',(event) => handleHover(event,1));

const stickyNav = (entries) => {
  const entry = entries[0];
  if(!entry.isIntersecting)nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav,{root: null, threshold: 0, rootMargin: '-90px'});
headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection,{root: null, threshold: 0.15});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})