import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";

function Navigation({ setSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // 🔹 referencja do menu

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Kliknięcie poza menu zamyka je
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // 🔹 Przełączanie sekcji i przewijanie do góry
  const handleNavClick = (section) => {
    setSection(section);
    setActiveSection(section);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`} ref={menuRef}>
      <div className="navbar-top">
        <h1 className="navbar-logo" onClick={() => handleNavClick("about")}>
          Over The Moon
        </h1>

        {/* === HAMBURGER === */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </div>
      </div>

      {/* === MENU LINKI === */}
      <div className={`navbar-bottom ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li
            className={`nav-item-custom ${activeSection === "about" ? "active" : ""}`}
            onClick={() => handleNavClick("about")}
          >
            O mnie
          </li>
          <li
            className={`nav-item-custom ${activeSection === "offer" ? "active" : ""}`}
            onClick={() => handleNavClick("offer")}
          >
            Oferta
          </li>
          <li
            className={`nav-item-custom ${activeSection === "gallery" ? "active" : ""}`}
            onClick={() => handleNavClick("gallery")}
          >
            Galeria
          </li>
          <li
            className={`nav-item-custom ${activeSection === "contact" ? "active" : ""}`}
            onClick={() => handleNavClick("contact")}
          >
            Kontakt
          </li>
          <li className="nav-item-custom instagram-icon">
            <a
              href="https://www.instagram.com/overthemoon_weddingplanner/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} className="instagram-icon" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
