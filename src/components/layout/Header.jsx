import { useState, useEffect } from "react";
import prancheta from "../../assets/prancheta.svg";
import { Sun, Moon } from "lucide-react";

function Header() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light" ? "light" : "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <header className="header_container">
        <div className="header_content">
          <img src={prancheta} alt="prancheta" />
          <h2>To-Do List</h2>
        </div>

        <div className="container_button">
          <button className="theme_toggle_button" onClick={toggleTheme}>
            {theme === "dark" ? (
              <div className="theme_content">
                <Sun size={30} />

                <span className="theme_text">Modo claro</span>
              </div>
            ) : (
              <div className="theme_content">
                <Moon size={30} />

                <span className="theme_text">Modo escuro</span>
              </div>
            )}
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
