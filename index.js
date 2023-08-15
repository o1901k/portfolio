import i18Obj from './translate.js'

// Burger menu
const burger = document.querySelector('.burgerMenu');
const navMenu = document.querySelector('.navMenu')
burger.addEventListener('click', toggleMenu);


function toggleMenu() {
  burger.classList.toggle('open');
  navMenu.classList.toggle('active')
}

const menuLinks = document.querySelectorAll(".navLink");

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", closeMenu);   
    });

    function closeMenu(event) {
        if (event.target.classList.contains('navLink')) {
            burger.classList.remove('open');
            navMenu.classList.remove('active');
        }
      }
}

    //Preload image
function preloadImages () {
const seasons = ['winter', 'spring', 'summer', 'autumn'];
      
    seasons.forEach((season) => {
       for (let i = 1; i <= 6; i++) {
        const img = new Image();
          img.src = `./assets/content/${season}/${i}.jpg`;
          }
        });
      };
preloadImages();

// Photo Change
const portfolioImages = document.querySelectorAll('.portfolioImage');
const portfolioBtns = document.querySelector('.portfolioButtons');

function changeImage() {
portfolioBtns.addEventListener('click', function(event) {
    if(event.target.classList.contains('portfolioButton')) {
        portfolioImages.forEach( (img, index) => img.src = `assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
})
}
changeImage()

//Change color button
const portfolioBtn = document.querySelectorAll('.portfolioButton');

function changeColorBtn(event) {
    portfolioBtn.forEach((element) => element.classList.remove('active'));
    if(event.target.classList.contains('portfolioButton')) {
        event.target.classList.add('active');
  }
}

portfolioBtn.forEach((element) =>
    element.addEventListener('click', changeColorBtn));
   
//Local storage 
let language = 'en';
// let theme = 'black';


const langSwitcher = document.querySelector('.navLang');
if(langSwitcher){
  langSwitcher.addEventListener('click', switchLang);

  function switchLang(e) {
    const selectedLang = e.target.dataset.lang;
       localStorage.setItem('language', selectedLang);
  }
}
function getLocalStorage() {
  if(localStorage.getItem('language')) {
    const lang = localStorage.getItem('language');
    getTranslate(lang);
  }
}
window.addEventListener('load', getLocalStorage)

//Page translate 

const langArr = document.querySelectorAll("[data-i18]");
const enLang = document.querySelector('.langBtn.en');
const ruLang = document.querySelector('.langBtn.ru');

function getTranslate(lang) {
    const languagesBtn = document.querySelectorAll('.langBtn');
  if (lang) {
    languagesBtn.forEach(item => item.classList.remove('active'));
    languagesBtn.forEach(item => {
      if (item.dataset.lang === lang) {
        item.classList.add('active');
      }
    });
  }
  langArr.forEach((e) => {
    e.textContent = i18Obj[lang][e.dataset.i18];
  })
 };

ruLang.addEventListener('click', e => {
  if(e.target.click){
    getTranslate('ru');
    enLang.classList.remove('active');
    ruLang.classList.add('active');
  }});

enLang.addEventListener('click', e => {
    if(e.target.click){
      getTranslate('en');
      ruLang.classList.remove('active');
      enLang.classList.add('active');
  }});

  //Theme change .light
  const themeBtn = document.querySelector('.themeBtn')
  const themeItems = document.querySelectorAll('.black');
  
  themeBtn.addEventListener('click', () => {
    themeBtn.classList.toggle('light');
    themeItems.forEach((el) => el.classList.toggle('light'));
   });

//Video player
const video = document.querySelector('video');
const videoBtn = document.querySelector('.videoBtn')
const videoPlayer = document.querySelector('.videoPlayer');
const playBtn = document.querySelector('.playBtn');
const volumeBtn = document.querySelector('.volumeBtn');
const progress = document.querySelector('.progress');
const timeCurrent = document.querySelector('.timeCurrent');
const volumeFilled = document.querySelector('.volumeFilled');
const progressFilled = document.querySelector('.progressFilled');
const fullscreenBtn = document.querySelector('.buttonFullscren');

videoBtn.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayBtn);
video.addEventListener('pause', togglePlayBtn);
video.addEventListener('ended', togglePlayBtn);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
volumeBtn.addEventListener('click', toggleMute);
progress.addEventListener('click', setProgress);
fullscreenBtn.addEventListener('click', fullScreen);

function togglePlay() {
	if (video.paused == true) {
		video.play();
    videoBtn.classList.add('nonePlayer')
	} else {
		video.pause();	
    videoBtn.classList.remove('nonePlayer')
	}	
	playBtn.classList.toggle('paused');
};

volumeFilled.addEventListener('input', function() {
      const value = this.value * 100;
      this.style.background = `linear-gradient(to right, #bdae82 ${value}%, #f2f3f4 ${value}%)`;
      let volume = this.value;
      video.volume = volume;
     if (this.value == 0) {
       volumeBtn.classList.add('muted');
     } else {
       volumeBtn.classList.remove('muted');
      }
    })


progressFilled.addEventListener('input', function() {
 const value = this.value * 100;
this.style.background = `linear-gradient(to right,  #bdae82 ${value}%, #f2f3f4 ${value}%,)`
});

function updateProgress(e) {
 	progressFilled.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${video.currentTime/video.duration*100}%, #f2f3f4 ${video.currentTime/video.duration*100}%, #f2f3f4 100%)` 
  timeCurrent.innerHTML = `${neatTime(video.currentTime)} / ${neatTime(video.duration)}`;
  progressFilled.value = (video.currentTime / video.duration);
  }

function setProgress(e) {
	const newTime = e.offsetX/progress.offsetWidth;
	progressFilled.style.background =  `${newTime*100}%`;
    video.currentTime = newTime*video.duration;
};

let lastVolume = 0.5 ;
function toggleMute() {
	if(video.volume) {
		lastVolume = video.volume;
    video.volume = 0;
    volumeBtn.classList.add('muted');
    volumeFilled.value = video.volume;
    volumeFilled.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${video.volume}%, #f2f3f4 ${video.volume}%, #f2f3f4 100%)`    
    } else {
      video.volume = lastVolume;
      volumeBtn.classList.remove('muted');
      volumeFilled.value = lastVolume;
      volumeFilled.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${lastVolume*100}%, #f2f3f4 ${lastVolume*100}%, #f2f3f4 100%)`;
    }
	};

 function togglePlayBtn() {
    playBtn.classList.toggle('playing');
  };

function neatTime(time) {
 let minutes = Math.floor((time % 3600)/60);
 let seconds = Math.floor(time % 60);
	seconds = seconds>9?seconds:`0${seconds}`;
	return `${minutes}:${seconds}`;
};

let fullscreen = false;
function fullScreen () {
    fullscreen? exitFullscreen() : launchIntoFullscreen(videoPlayer)
    fullscreen = !fullscreen;
}
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }