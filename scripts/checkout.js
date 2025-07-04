import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {updateCartQuantity} from './amazon.js';

let generatedCheckoutOrderSummary = '';

cart.forEach((cartItem) => {
  
  let matchingProduct;
  
  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      matchingProduct = product;
    }
  });
  
  generatedCheckoutOrderSummary += `
  <div class="cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>
  
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">
  
      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>
  
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option js-delivery-option">
          <input type="radio"
            class="delivery-option-input js-delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option js-delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
});

document.querySelector('.order-summary').innerHTML = generatedCheckoutOrderSummary;

document.querySelectorAll('.delete-quantity-link').forEach((deleteLink) => {
  deleteLink.addEventListener('click', () => {
    const id = deleteLink.dataset.productId
    removeFromCart(id);
  });
});

document.querySelector('.return-to-home-link').innerHTML = `${updateCartQuantity()} Items`;

console.log(updateCartQuantity());