"use client";

import { useEffect } from "react";
import Warn from "@/components/Warn";
import styles from "./ProductListPage.module.css";

export default function ProductsError({ error, reset }) {
  useEffect(() => {
    // 에러 로깅 기능 추가 가능
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <Warn
        title="오류 발생"
        description={
          error.message ||
          "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }
      />
      <button className={styles.loadMore} onClick={() => reset()}>
        다시 시도
      </button>
    </div>
  );
}
