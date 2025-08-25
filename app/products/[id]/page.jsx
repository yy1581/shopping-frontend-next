"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getProduct } from "@/lib/api";
import useAsync from "@/hooks/useAsync";
import useTranslate from "@/hooks/useTranslate";
import "./ProductPage.css";

function ProductPage() {
  const t = useTranslate();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isProductLoading, productLoadingError, getProductAsync] =
    useAsync(getProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductAsync(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      }
    };
    fetchProduct();
  }, [id, getProductAsync]);

  useEffect(() => {
    if (productLoadingError) {
      router.push("/products");
    }
  }, [productLoadingError, router]);

  if (isProductLoading) {
    return (
      <div className="App">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (productLoadingError) {
    return <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (!product) {
    return null;
  }

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

export default ProductPage;
