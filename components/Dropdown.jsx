import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({
  className,
  buttonClassName, // 버튼 스타일을 위한 새로운 prop
  name,
  value,
  options,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange(name, optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={dropdownRef} className={`${styles.dropdown} ${className || ""}`}>
      <button
        type="button"
        className={`${styles.dropdownButton} ${buttonClassName || ""}`}
        onClick={handleToggle}
      >
        <span>{selectedOption?.label}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}>
          ▼
        </span>
      </button>

      <ul className={`${styles.popup} ${isOpen ? styles.open : ""}`}>
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={value === option.value ? styles.selected : ""}
          >
            <a>{option.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
