import { products } from "../data/products.js";
import { cart, addToCart, removeFromCart} from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const today = dayjs();

let orderSummaryHTML = "";
cart.forEach((cartItem) => {
  const product = products.find((product) => product.id === cartItem.productId);
  const deliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);
  orderSummaryHTML += `
          <div class="cart-item-container 
            js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: ${today.add(deliveryOption.deliveryDays, "day").format('dddd, MMMM D')}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliverOptionsHTML(product, deliveryOptions, cartItem)}
              </div>
            </div>
          </div>
  `
});

function deliverOptionsHTML(product, deliveryOptions, cartItem) {
  let html = '';
  deliveryOptions.forEach(deliveryOption => {
  const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "";
  html += `
    <div class="delivery-option">
      <input type="radio" ${isChecked}
        class="delivery-option-input"
        name="delivery-option-${product.id}">
      <div>
        <div class="delivery-option-date">
          ${ today.add(deliveryOption.deliveryDays, "day").format('dddd, MMMM D')}
        </div>
        <div class="delivery-option-price">
          ${ deliveryOption.deliveryDays === 7 ? "FREE Shipping" : `$${formatCurrency(deliveryOption.priceCents)} - Shipping` }
        </div>
      </div>
    </div>
  `
  });
  return html;
}

document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((deleteLink, index) => {
    deleteLink.addEventListener("click", () => {
        const productId = deleteLink.dataset.productId;
        removeFromCart(productId, cart);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    }
)});

