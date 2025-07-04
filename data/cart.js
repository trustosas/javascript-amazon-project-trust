export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  }
];

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId, selectorValue) {
  
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
        matchingItem = cartItem
    }
  })
  
  if (matchingItem) {
    matchingItem.quantity++
  } else {
    cart.push({
    productId: productId,
    quantity: selectorValue,
      });
  }
  
  saveToLocalStorage()
}

export function removeFromCart(productId) {
  
 let newCart = cart.filter((cartItem) => {
    return cartItem.productId !== productId
  });
  
  cart = newCart;
  
  document.querySelector(`.cart-item-container-${productId}`).remove();
  
  saveToLocalStorage();
};