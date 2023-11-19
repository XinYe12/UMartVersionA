class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById('cart-notification');
    this.checkmarkContainer = document.querySelector('.checkmark-container');
    this.header = document.querySelector('sticky-header');
    this.onBodyClick = this.handleBodyClick.bind(this);
    
    this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener('click', this.close.bind(this))
    );
  }

  open() {
     // Remove any existing checkmark elements
     this.notification.querySelectorAll('.checkmark-container').forEach((checkmarkContainer) => {
      checkmarkContainer.remove();
  });

  // Trigger checkmark animation immediately
  const checkmarkContainer = document.createElement('div');
  checkmarkContainer.classList.add('checkmark-container');

  const checkmark = document.createElement('div');
  checkmark.classList.add('checkmark');
  checkmark.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
  `;

  checkmarkContainer.appendChild(checkmark);
  this.notification.appendChild(checkmarkContainer);

  // Continue with the rest of the open function
  this.notification.classList.add('animate', 'active');

  // Set focus and trap focus as before
  this.notification.addEventListener('transitionend', () => {
      this.notification.focus();
      trapFocus(this.notification);
  }, { once: true });

  // Set a timeout to remove the checkmark after 5 seconds
  setTimeout(() => {
      checkmarkContainer.remove();
  }, 5000);

  // Add the event listener for body click
  document.body.addEventListener('click', this.onBodyClick);
  }
  
  
  

  close() {
    this.notification.classList.remove('active');

    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
      this.productId = parsedState.id;
      this.getSectionsToRender().forEach((section => {
        document.getElementById(section.id).innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      }));

      this.header?.reveal();
      this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
        selector: `#cart-notification-product-${this.productId}`,
      },
      {
        id: 'cart-notification-button'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      const disclosure = target.closest('details-disclosure');
      this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);
