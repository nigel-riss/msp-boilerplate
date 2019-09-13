class MobileMenu {
  constructor() {
    this.headerTop = document.querySelector('.header__top');

    if (this.headerTop) {
      this.menuButton = this.headerTop.querySelector('.menu-button');

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
    console.log('menu toggle');
  }
}

export default MobileMenu;
