"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import personIcon from "@/lib/assets/person.png";
import styles from "./UserMenu.module.css";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button
        className={styles.iconButton}
        onClick={handleButtonClick}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img src={personIcon} alt="유저 메뉴" />
      </button>
      <ul className={`${styles.popup} ${isOpen ? styles.open : ""}`}>
        <li>
          <Link href="/wishlist">위시리스트</Link>
        </li>
        <li>
          <Link href="/signup">회원가입</Link>
        </li>
        <li>
          <Link href="/login">로그인</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
