const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function apiFetch(endpoint, options = {}) {
  let response;
  try {
    response = await fetch(`${BACKEND_URL}${endpoint}`, options);
  } catch (error) {
    // 네트워크 오류 등 fetch 자체가 실패한 경우
    console.error("API Fetch Error:", error);
    throw new Error(
      "API 서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요."
    );
  }

  // 404 Not Found 응답을 받으면 null을 반환하여, 호출하는 쪽에서 notFound()를 실행하도록 유도합니다.
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null); // 에러 응답 body 파싱 시도
    const errorMessage =
      errorBody?.message ||
      `API Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  // 204 No Content와 같이 body가 없는 성공 응답은 null을 반환합니다.
  if (response.status === 204) return null;
  return response.json().catch(() => null); // JSON 파싱 실패 시(body가 비었을 경우 등) null 반환
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
