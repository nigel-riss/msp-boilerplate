class MobileMenu {
  constructor() {
    this.headerTop = document.querySelector('.header__top');

    if (this.headerTop) {
      this.menuButton = this.headerTop.querySelector('.menu-button');
      this.mainNav = this.headerTop.querySelector('.header__nav');

      this.resetDOM();
      this.addEventListeners();
    }
  }

  addEventListeners() {
    this.menuButton.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  resetDOM() {

  }

  toggleMenu() {
    this.menuButton.classList.toggle('menu-button--close');
    this.mainNav.classList.toggle('header__nav--closed');
  }
}

export default MobileMenu;
