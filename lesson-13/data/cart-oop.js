function Cart(){
  const cart = {

  cartItems :  undefined,

  loadFromLocalStorage(){

    this.cartItems =  JSON.parse(localStorage.getItem('cart'));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  },

  saveToCart(){
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  },

    //add to cart and save it in local storage
    addToCart(productId){
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
          quantity: quantity,
          deliveryOptionId: '1'
        });
      }
      this.saveToCart();
    },

    //remove from cart and update local storage
    removeFromCart(productId) {
      const newCart = [];

      cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);    
        }
      });

      this.cartItems = newCart;
      this.saveToCart();
    },

    //update cart quantity
    updateCartQuantity(){
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      })
      return cartQuantity;
    },

    // update item quantity
    updateQuantity(productId, newQuantity) {
      let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.quantity = newQuantity;

      this.saveToCart();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToCart();
    }
  }
  return cart;
}

