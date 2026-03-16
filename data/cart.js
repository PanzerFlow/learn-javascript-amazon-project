export const cart = [
  {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2},
  {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1},

]; // {product, quantity}

export function addToCart(productId, cart) {
    let matchingItem; // check if item already in cart
    cart.forEach((cartItem) => {
      if (cartItem.product === productId) {
        matchingItem = cartItem;
      }
    })
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({product: productId, quantity: 1});
    }
}

export function removeFromCart(productId, cart) {
    cart = cart.filter((cartItem) => cartItem.product !== productId);
}