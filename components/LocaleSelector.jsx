"use client";

import { useEffect, useState } from "react";
import { useLocale, useSetLocale } from "@/lib/contexts/LocaleContext";
import Dropdown from "./Dropdown";
import styles from "./LocaleSelector.module.css";

export default function LocaleSelector() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (name, value) => setLocale(value);

  return (
    <Dropdown
      buttonClassName={isMounted ? styles.localeDropdownButton : ""}
      name="locale"
      onChange={handleChange}
      value={locale}
      options={[
        { label: "한국어", value: "ko" },
        { label: "English", value: "en" },
      ]}
    />
  );
}
