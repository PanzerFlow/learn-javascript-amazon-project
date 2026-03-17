class Cart {
  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.cartItems = undefined;
    this.loadFromStorage();
  }
  loadFromStorage () {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey))
    if (!this.cartItems) {
      this.cartItems = [  {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1'},
                {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2'},
              ]; 
          }
  }
  
  saveToStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const index = this.cartItems.findIndex((cartItem) => cartItem.productId === productId);
    if (index > -1) {
      this.cartItems[index].quantity += 1;
    } else {
      this.cartItems.push({'productId': productId, 'quantity': 1, deliveryOptionId: '1'});
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
      const index = this.cartItems.findIndex((cartItem) => cartItem.productId === productId);
      if (index > -1) {
          this.cartItems.splice(index, 1);
      }
      this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
    cartItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}



let cart1 = new Cart('cart-1')
let cart2 = new Cart('cart-2')
console.log(cart1);
console.log(cart2);
