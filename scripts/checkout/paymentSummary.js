import { products, getProduct } from "../../data/products.js";
import { cart, addToCart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingCents = 0;
    cart.forEach((cartItem) => {
        // total cost of the item in cart
        const matchingProduct = getProduct(products, cartItem.productId);
        productPriceCents += matchingProduct.priceCents * cartItem.quantity;
        // total cost of shipping for the item in the cart
        const shippingOption = getDeliveryOption(deliveryOptions, cartItem.deliveryOptionId);
        shippingCents += shippingOption.priceCents;
    });
    
    const subtotalCents = productPriceCents + shippingCents;

    const taxCents = Math.round(subtotalCents * 0.1);

    const TotalCents = subtotalCents + taxCents;
    
    // WIP Marker: Just started looking into the payment summary html 15:20
    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(subtotalCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(TotalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
        `
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}


