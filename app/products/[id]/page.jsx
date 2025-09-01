import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";
import ProductDetailsClient from "./ProductDetailsClient";
import "./ProductPage.css";

export async function generateStaticParams() {
  // 빌드 시점에 미리 렌더링할 상품 ID 목록을 가져옴
  const products = await getProducts({ limit: 20 });
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }) {
  const { id } = await params; // 오류 메시지에 맞춰 임시 수정
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
