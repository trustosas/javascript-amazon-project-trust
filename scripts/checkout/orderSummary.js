import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { calculateCartQuantity, updateQuantity } from '../../data/cart.js'
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary() {
  
  let generatedCheckoutOrderSummary = '';
  
  cart.forEach((cartItem) => {
    
    const matchingProduct = getProduct(cartItem.productId);
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    
    const dateString = calculateDeliveryDate(deliveryOption);
    
    generatedCheckoutOrderSummary +=
      `
    <div class="cart-item-container cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>
    
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">
    
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input" data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Save
            </span>
            <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    </div>
    `
  });
  
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    
    let html = '';
    
    deliveryOptions.forEach((deliveryOption) => {
      
      const dateString = calculateDeliveryDate(deliveryOption);
      
      const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id=${deliveryOption.id}>
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
      
    });
    
    return html;
  }
  
  document.querySelector('.js-order-summary').innerHTML = generatedCheckoutOrderSummary;
  
  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const id = deleteLink.dataset.productId;
      removeFromCart(id);
      calculateCartQuantity();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });
  
  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.productId;
      const cartItem = document.querySelector(`.cart-item-container-${productId}`);
      cartItem.classList.add('is-editing-quantity');
      calculateCartQuantity();
    });
  });
  
  document.querySelectorAll('.save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const id = saveLink.dataset.productId;
      const cartItem = document.querySelector(`.cart-item-container-${id}`);
      cartItem.classList.remove('is-editing-quantity');
      const input = Number(document.querySelector('.quantity-input').value);
      if (input > 0 && input < 1000) {
        updateQuantity(id, input);
      }
      calculateCartQuantity();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });
  
  document.querySelectorAll('.quantity-input').forEach((field) => {
    field.addEventListener('keydown', (event) => {
      
      const id = field.dataset.productId;
      
      const cartItem = document.querySelector(`.cart-item-container-${id}`);
      
      const input = Number(document.querySelector('.quantity-input').value);
      
      if (event.key === 'Enter') {
        if (input > 0 && input < 1000) {
          updateQuantity(id, input);
          cartItem.classList.remove('is-editing-quantity');
          calculateCartQuantity();
        }
      }
      
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });
  
  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', () => {
      const productId = option.dataset.productId;
      const deliveryOptionId = option.dataset.deliveryOptionId;
      
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();

    });
  });
  
  calculateCartQuantity();
  renderPaymentSummary();
};