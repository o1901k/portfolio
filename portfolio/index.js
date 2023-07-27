
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

    // function onMenuLinkClick(e) {
    //     const menuLink = e.target;
    //     if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    //         const gotoBlock = document.querySelector(menuLink.dataset.goto);
    //         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

    //         if (burger.classList.contains('_active')) {
    //             document.body.classList.remove('_lock');
    //             burgerIkon.classList.remove('_active');
    //             burgNav.classList.remove('_active');
    //         };

    //         window.scrollTo({
    //             top: gotoBlockValue,
    //             behavior: "smooth"
    //         });
    //         e.preventDefault();
    //     }
    // }
}
