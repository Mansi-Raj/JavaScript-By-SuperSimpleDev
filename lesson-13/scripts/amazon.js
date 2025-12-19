import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyFormatting } from './utilities/money.js';

let productHTML = '';

products.forEach((product) => {
  productHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="" class="product-rating-stars">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${moneyFormatting(product.priceCents)}
      </div>

      <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        ${generateOptions(10)}
      </select>
    </div>

      <div class="product-spacer"></div>

      <div class="add-to-cart js-added-${product.id}">
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

function generateOptions(count) {
  let options = '';
  for (let i = 1; i <= count; i++) {
    options += `<option value="${i}">${i}</option>`;
  }
  return options;
}

document.querySelector('.js-products-grid').innerHTML = productHTML;

function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
     const productId = button.dataset.productId;

     addToCart(productId);
     updateCartQuantity();

     let addedMark = document.querySelector(`.js-added-${productId}`); 
     addedMark.innerHTML = '<img class="check-mark" src="images/icons/checkmark.png" alt=""> Added';

     setTimeout(() => {addedMark.innerHTML = ''}, 2000);
  });
});