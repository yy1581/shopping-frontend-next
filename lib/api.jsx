import axios from "@/lib/axios";

async function apiFetch(endpoint, options = {}) {
  const { method = "GET", body, ...restOptions } = options;
  const config = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    let response;
    switch (method.toUpperCase()) {
      case "POST":
        response = await axios.post(endpoint, body, config);
        break;
      case "PATCH":
        response = await axios.patch(endpoint, body, config);
        break;
      case "DELETE":
        response = await axios.delete(endpoint, config);
        break;
      case "GET":
      default:
        response = await axios.get(endpoint, config);
        break;
    }

    if (response.status === 204) return null;
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return null;
      }
      const errorMessage =
        error.response.data?.message ||
        `API Error: ${error.response.status} ${error.response.statusText}`;
      throw new Error(errorMessage);
    } else {
      // 네트워크 오류 등 axios 요청 자체가 실패한 경우
      console.error("API Fetch Error:", error);
      throw new Error(
        "API 서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요."
      );
    }
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
    body: productData,
  });
}

export async function updateProduct(id, productData) {
  const { name, description, price, stock, category } = productData;
  const updatedData = { name, description, price, stock, category };
  return apiFetch(`/products/${id}`, {
    method: "PATCH",
    body: updatedData,
  });
}

export async function deleteProduct(id) {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
}
