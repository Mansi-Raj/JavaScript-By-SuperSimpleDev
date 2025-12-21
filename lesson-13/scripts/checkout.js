import { cart, removeFromCart, updateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyFormatting } from './utilities/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

console.log(dayjs());

let cartProductHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartProductHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date:
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${moneyFormatting(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML(matchingProduct){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.days, 'days');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');

    const deliveryPriceString = deliveryOption.priceCents === 0 ?
      'FREE' : `$${moneyFormatting(deliveryOption.priceCents)} -`;

    html += `
        <div class="delivery-option">
        <input type="radio" 
          ${deliveryOption.id === '1' ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDateString}
          </div>
          <div class="delivery-option-price">
            ${deliveryPriceString} Shipping
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartProductHTML;

let checkoutCount = document.querySelector('.js-checkout-count');
checkoutCount.innerHTML = `${updateCartQuantity()} items`;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      const cartQuantity = updateCartQuantity();
      document.querySelector('.js-checkout-count')
        .innerHTML = `${cartQuantity} items`;
    });
  });

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-quantity-label-${productId}`);

    if(link.innerHTML.trim() === 'Update'){
      link.innerHTML = 'Save';
      const currentQuantity = container.innerHTML;

      container.innerHTML = `<input 
          class="quantity-input js-quantity-input-${productId}" 
          type="number" 
          min="0" 
          value="${currentQuantity}"
          oninput="this.value = Math.abs(this.value)"
        >`;
    }else{
      link.innerHTML = 'Update';

      const inputEle =document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(inputEle.value);
      updateQuantity(productId, newQuantity);

      container.innerHTML = newQuantity;
      const cartQuantity = updateCartQuantity();
      document.querySelector('.js-checkout-count').innerHTML = `${cartQuantity} items`;
    }
  });
});
