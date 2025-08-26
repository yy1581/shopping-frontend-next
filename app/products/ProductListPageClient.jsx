"use client";

import ProductList from "@/components/ProductList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/api";
import useAsync from "@/hooks/useAsync";
import useTranslate from "@/hooks/useTranslate";
import SearchForm from "@/components/SearchForm";
import ProductRegistration from "@/components/ProductRegistration";
import Warn from "@/components/Warn";
import Spinner from "@/components/Spinner";
import styles from "./ProductListPage.module.css";

function ProductListPageClient({ initialProducts, searchParams, limit }) {
  const t = useTranslate();
  const [products, setProducts] = useState(initialProducts);
  const [offset, setOffset] = useState(initialProducts.length);
  const [hasMore, setHasMore] = useState(initialProducts.length === limit);

  const [isProductsLoading, productsLoadingError, getProductsAsync] =
    useAsync(getProducts);
  const [isDeleting, deletingError, deleteProductAsync] =
    useAsync(deleteProduct);

  const router = useRouter();
  const order = searchParams.order || "newest";
  const keyword = searchParams.keyword || "";

  const handleOrderChange = (newOrder) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("order", newOrder);
    router.push(`/products?${newSearchParams.toString()}`);
  };

  const handleNewestClick = () => handleOrderChange("newest");
  const handleCheapestClick = () => handleOrderChange("priceLowest");

  const handleLoadMore = async () => {
    const newProducts = await getProductsAsync({
      order,
      offset,
      limit,
      search: keyword,
    });
    if (!newProducts) return;

    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setOffset((prevOffset) => prevOffset + newProducts.length);
    setHasMore(newProducts.length === limit);
  };

  const handleCreateProductSuccess = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const handleUpdateProductSuccess = (updatedProduct) => {
    setProducts((prevProducts) => {
      const index = prevProducts.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index === -1) return prevProducts;
      const nextProducts = [...prevProducts];
      nextProducts[index] = updatedProduct;
      return nextProducts;
    });
  };

  const handleDeleteProduct = async (id) => {
    const result = await deleteProductAsync(id);
    if (!result) return;

    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  const handleSearchSubmit = (newKeyword) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newKeyword) {
      newSearchParams.set("keyword", newKeyword);
    } else {
      newSearchParams.delete("keyword");
    }
    router.push(`/products?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    setProducts(initialProducts);
    setOffset(initialProducts.length);
    setHasMore(initialProducts.length === limit);
  }, [initialProducts, limit]);

  return (
    <div className={styles.productListPage}>
      <div className={styles.container}>
        <SearchForm initialValue={keyword} onSubmit={handleSearchSubmit} />

        <ProductRegistration
          onSubmit={createProduct}
          onSubmitSuccess={handleCreateProductSuccess}
        />

        <div className={styles.orderButtons}>
          <button
            className={`${styles.orderBtn} ${
              order === "newest" ? styles.active : ""
            }`}
            onClick={handleNewestClick}
          >
            {t("order newest")}
          </button>
          <button
            className={`${styles.orderBtn} ${
              order === "priceLowest" ? styles.active : ""
            }`}
            onClick={handleCheapestClick}
          >
            {t("order cheapest")}
          </button>
        </div>

        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onUpdate={updateProduct}
          onUpdateSuccess={handleUpdateProductSuccess}
        />

        {products.length === 0 && !isProductsLoading && (
          <Warn
            className={styles.emptyList}
            title="조건에 맞는 상품이 없습니다."
            description="검색어를 확인해주세요."
          />
        )}

        {(isProductsLoading || isDeleting) && <Spinner />}

        {hasMore && (
          <button
            className={styles.loadMore}
            onClick={handleLoadMore}
            disabled={isProductsLoading}
          >
            {t("load more")}
          </button>
        )}

        {productsLoadingError?.message && (
          <span className={styles.error}>{productsLoadingError.message}</span>
        )}
        {deletingError?.message && (
          <span className={styles.error}>{deletingError.message}</span>
        )}
      </div>
    </div>
  );
}

export default ProductListPageClient;
