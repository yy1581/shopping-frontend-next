const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error("API 요청에 실패했습니다.");
  }
  try {
    return await response.json();
  } catch (error) {
    // JSON 파싱에 실패한 경우 (예: body가 없는 204 응답)
    return null;
  }
}

export async function getProducts({
  order = "newest",
  offset = 0,
  limit = 6,
  search = "",
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}&search=${search}`;
  // 60초 동안 캐시 유지 (ISR과 유사)
  return apiFetch(`/products?${query}`, {
    next: {
      revalidate: 60,
    },
  });
}

export async function getProduct(id) {
  // 60초 동안 캐시 유지 (ISR과 유사)
  return apiFetch(`/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });
}

export async function createProduct(productData) {
  return apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateProduct(id, productData) {
  const { name, description, price, stock, category } = productData;
  const updatedData = { name, description, price, stock, category };
  return apiFetch(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteProduct(id) {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
}
