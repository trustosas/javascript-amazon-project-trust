import {cart, calculateCartQuantity} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/../utils/money.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += cartItem.quantity * product.priceCents
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents
  })
  
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents
  const taxCents = totalBeforeTaxCents * 0.1
  const totalCents = totalBeforeTaxCents + taxCents;
  
  const paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>
  
  <div class="payment-summary-row">
    <div>Items (${calculateCartQuantity()}):</div>
    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
  </div>
  
  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
  </div>
  
  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
  </div>
  
  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
  </div>
  
  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
  </div>
  
  <button class="place-order-button button-primary">
    Place your order
  </button>
  `;
  
  const paymentSummaryElement = document.querySelector('.js-payment-summary');
  if (paymentSummaryElement) {
    paymentSummaryElement.innerHTML = paymentSummaryHTML
  }
}