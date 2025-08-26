"use client";

import Link from "next/link";
import useTranslate from "@/hooks/useTranslate";
import "./ProductPage.css";

function ProductDetailsClient({ product }) {
  const t = useTranslate();
  const { name, description, price, stock, category, photoUrl } = product;

  return (
    <div className="App">
      <div className="product-page-container">
        <div className="product-image-container">
          <img src={photoUrl} alt={name} className="product-image" />
        </div>
        <div className="product-details-container">
          <div className="product-category">{t(category)}</div>
          <h1 className="product-name">{name}</h1>
          <p className="product-description">{description}</p>
          <div className="product-price">{`${price.toLocaleString()} ${t(
            "won"
          )}`}</div>
          <div className="product-stock">{`${t("stock")}: ${stock}`}</div>
          <div className="product-actions">
            <button className="add-to-cart-button">{t("add to cart")}</button>
            <Link href="/products" className="back-to-list-button">
              {t("back to list")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsClient;
