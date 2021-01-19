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
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

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

const loadImg = (entries, observer) => {
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load',() => entry.target.classList.remove('lazy-img'));
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg,{root: null, threshold: 0, rootMargin: '-200px'});


imgTargets.forEach( img => imgObserver.observe(img) );

const createDots = () => {
  slides.forEach((_, index)=> dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${index}"></button>`));
  activateDot(0);
}

const activateDot = (slide) => {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  //console.log(document.querySelector(`.dots__dot[data-slide="${slide}"]`));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}


const goToSlide = (slide) => {
  slides.forEach( (s, i) => s.style.transform = `translateX(${ (i - slide) * 100 }%)`);
}

goToSlide(0);
createDots();


let curSlide = 0;
const maxSlide = slides.length;

const nextSlide = () => {
  if(curSlide === maxSlide - 1 ) return;
  else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
}

const prevSlide = () => {
  if(curSlide === 0 ) return;
  else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
}

btnSliderRight.addEventListener('click',nextSlide);
btnSliderLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown', (event) =>{
  event.key === 'ArrowLeft' && prevSlide();
  event.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', event => {
  if(event.target.classList.contains('dots__dot')){
    const {slide} = event.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
})