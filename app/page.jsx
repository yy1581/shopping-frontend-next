"use client";

import Link from "next/link";
import useTranslate from "@/hooks/useTranslate";
import "./HomePage.css";

function HomePage() {
  const t = useTranslate();

  return (
    <div className="App">
      <div className="home-body">
        <h1 className="home-title">{t("welcome to ymazon")}</h1>
        <p className="home-subtitle">
          {t("your one stop shop for everything")}
        </p>
        <div className="home-actions">
          <Link href="/products" className="home-button">
            {t("browse products")}
          </Link>
          <Link href="/wishlist" className="home-button">
            {t("my wishlist")}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
