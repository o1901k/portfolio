
const burger = document.querySelector('.burgerMenu');
const navMenu = document.querySelector('.navMenu')
burger.addEventListener('click', toggleMenu);


function toggleMenu() {
  burger.classList.toggle('open');
  navMenu.classList.toggle('active')
}

const menuLinks = document.querySelectorAll(".nav-link");

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", closeMenu);   
    });

    function closeMenu(event) {
        if (event.target.classList.contains('nav-link')) {
            burger.classList.remove('open');
            navMenu.classList.remove('active');
        }
      }
}
