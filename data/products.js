import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(products , productId) {
  return products.find((product) => product.id === productId);
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

export class ClothingProduct extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new ClothingProduct(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('products loaded');
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
