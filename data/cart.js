
export let cart;
loadFromStorage();

export function saveToStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, cart) {
    const index = cart.findIndex((cartItem) => cartItem.productId === productId);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({'productId': productId, 'quantity': 1, deliveryOptionId: '1'});
    }
    saveToStorage(cart);
}

export function removeFromCart(productId, cart) {
    const index = cart.findIndex((cartItem) => cartItem.productId === productId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    saveToStorage(cart);
}

export function updateDeliveryOption(productId, deliveryOptionId, cart) {
  const cartItem = cart.find((cartItem) => cartItem.productId === productId);
  cartItem.deliveryOptionId = deliveryOptionId;
  saveToStorage(cart);
}

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart"))
  if (!cart) {
    cart = [  {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1'},
              {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2'},
            ]; 
  }
}