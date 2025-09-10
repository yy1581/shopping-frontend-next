"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LocaleSelector from "@/components/LocaleSelector";
import styles from "./Header.module.css";
import useTranslate from "@/hooks/useTranslate";
import UserMenu from "@/components/UserMenu";

function Header() {
  const t = useTranslate();
  const pathname = usePathname();

  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoLink}>
          <h1 className={styles.headerTitle}>Ymazon</h1>
        </Link>
        <nav className={styles.headerNav}>
          <Link
            href="/products"
            className={`${styles.headerNavLink} ${
              pathname === "/products" ? styles.active : ""
            }`}
          >
            {t("products")}
          </Link>
          <Link
            href="/mypage"
            className={`${styles.headerNavLink} ${
              pathname === "/mypage" ? styles.active : ""
            }`}
          >
            {t("my page")}
          </Link>
          <UserMenu />
          <LocaleSelector />
        </nav>
      </div>
    </header>
  );
}

export default Header;
