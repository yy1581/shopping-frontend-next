import { getProducts } from "@/lib/api";
import ProductListPageClient from "./ProductListPageClient";

// LIMIT개씩 불러오기
const LIMIT = 10;

export default async function ProductListPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const order = resolvedSearchParams.order || "newest";
  const keyword = resolvedSearchParams.keyword || "";

  // 서버에서 초기 데이터 가져오기
  const initialProducts = await getProducts({
    order,
    limit: LIMIT,
    search: keyword,
  });

  return (
    <ProductListPageClient
      initialProducts={initialProducts}
      searchParams={resolvedSearchParams}
      limit={LIMIT}
    />
  );
}
