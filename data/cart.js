export const cart = []; // {product, quantity}

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

export function updateCartCount(cart) {
    // update cart quantity in header
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

}