"use client";

import useTranslate from "@/hooks/useTranslate";
import "./WishListPage.css";
import axios from "@/lib/axios";
import { useState } from "react";

function WishListPage() {
  const t = useTranslate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  async function getUser() {
    const res = await axios.get;
  }

  return (
    <div className="App">
      <div className="wishlist-body">
        <h1 className="wishlist-title">{t("my wishlist")}</h1>
        <p className="wishlist-empty">{t("Your wishlist is empty.")}</p>
      </div>
    </div>
  );
}

export default WishListPage;
