export let cart = JSON.parse(localStorage.getItem('cart'));

function saveToCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

  let quantity = Number(quantitySelector.value);

  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      productId: productId,
      quantity: quantity
    });
  }
  saveToCart();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);    
    }
  });

  cart = newCart;
  saveToCart();
}

export function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}