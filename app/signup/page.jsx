"use client";

import Link from "next/link";
import styles from "./SignupPage.module.css";
import { useState } from "react";
import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordRepeat: "",
    address: "",
    subscribe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (values.password !== values.passwordRepeat) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { email, firstName, lastName, password, address } = values;
      await signup({ email, firstName, lastName, password, address, userPreferences: values.subscribe });
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (error) {
      alert(`회원가입에 실패했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      <button type="button" className={styles.socialButton}>
        <img alt="Google" />
        구글로 시작하기
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="lastName">성</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="홍"
          required
          value={values.lastName}
          onChange={handleChange}
        />
        <label htmlFor="firstName">이름</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="길동"
          required
          value={values.firstName}
          onChange={handleChange}
        />
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          required
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={values.password}
          onChange={handleChange}
        />
        <label htmlFor="passwordRepeat">비밀번호 확인</label>
        <input
          id="passwordRepeat"
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          required
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        <label htmlFor="address">주소</label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="서울시 강남구 역삼동"
          required
          value={values.address}
          onChange={handleChange}
        />
        <label className={styles.checkboxContainer} htmlFor="subscribe">
          <input
            id="subscribe"
            name="subscribe"
            type="checkbox"
            checked={values.subscribe}
            onChange={handleChange}
          />
          이메일 수신에 동의합니다.
        </label>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          회원가입
        </button>
      </form>
      <div className={styles.loginLink}>
        이미 회원이신가요? <Link href="/login">로그인하기</Link>
      </div>
    </div>
  );
}