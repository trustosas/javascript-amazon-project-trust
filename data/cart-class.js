class Cart {
  cartItems = undefined;
  localStorageKey = undefined;
  
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
  }
  
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: "1"}, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: "2",
    }]
  }
  
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
  }
  
  addToCart(productId, selectorValue=1) {
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
          matchingItem = cartItem
      }
    })
    
    if (matchingItem) {
      matchingItem.quantity++
    } else {
      this.cartItems.push({
      productId: productId,
      quantity: selectorValue,
      deliveryOptionId: "1",
      });
    }
  
    this.saveToStorage()
  }
  
  removeFromCart(productId) {
    let newCart = this.cartItems.filter((cartItem) => {
    return cartItem.productId !== productId
    });
  
    this.cartItems = newCart;
  
    renderOrderSummary();
    this.saveToStorage();
  }
  
  calculateCartQuantity() {
    let cartQuantity = 0;
    
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    });
    
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
      cartQuantityElement.innerText = cartQuantity;
    }
    
    return cartQuantity;
  }
  
  updateQuantity(id, value) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === id) {
        cartItem.quantity = value
      }
    });
    
    const quantityElement = document.querySelector('.quantity-label')
    if (quantityElement) {
      quantityElement.innerText = value
    }
    
    this.saveToStorage();
  }
  
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
          matchingItem = cartItem
      }
    })
    
    matchingItem.deliveryOptionId = deliveryOptionId;
    
    this.saveToStorage();
  }
};

let cart = new Cart('cart-oop');
let businessCart = new Cart('cart-business')

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);