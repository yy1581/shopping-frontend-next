import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import ProductDetailsClient from "./ProductDetailsClient";
import "./ProductPage.css";

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
