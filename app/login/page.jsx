"use client";

import { useState } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    // 백엔드에 로그인 요청을 보냅니다.
    // 성공하면 '/mypage'로 리다이렉트합니다.
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>로그인</h1>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          className={styles.input}
        />
        <button className={styles.button} type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}
