import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-class.js";

renderOrderSummary();
renderPaymentSummary();


/*
M - Model
V - View
C - Controller

Model - data and business logic
View - what user sees
Controller - handles user interaction, updates model, updates view


Update the data, Update the HTML, Update the page
*/
