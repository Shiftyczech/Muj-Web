/**
 * Konfigurace projektů pro portfolio Šimona Tobiáše
 * 
 * Zde můžeš jednoduše přidávat, upravovat nebo mazat své projekty.
 * Pro přidání nového projektu zkopíruj jeden blok a vyplň své údaje.
 * 
 * Možné kategorie (category): 'web' | 'aplikace' | 'uprava' | 'security'
 */

const projectsData = [
  {
    id: "tor-messenger",
    title: "Tor E2EE Messenger",
    category: "security",
    categoryLabel: "Kyberbezpečnost",
    summary: "Decentralizovaná zabezpečená komunikační aplikace běžící přes anonymní síť Tor (Onion v3) s End-to-End šifrováním. Klade důraz na ochranu soukromí, zabránění úniku metadat a bezpečné ukládání zpráv.",
    role: "Implementace kryptografického protokolu (X3DH, Double Ratchet), propojení přes Tor SOCKS5 proxy, šifrovaná databáze v SQLCipher a backendový relay server v Rustu",
    tech: ["React Native", "TypeScript", "Rust (Axum)", "Tor Network", "SQLCipher", "Docker"],
    githubUrl: "https://github.com/Shiftyczech/TorE2EE_Messenger",
    demoUrl: null,
    featured: true
  },
  {
    id: "ts-copy-system",
    title: "TS — Evidence zakázek & databázová migrace",
    category: "aplikace",
    categoryLabel: "Aplikace & Správa dat",
    summary: "Desktopový informační systém pro správu objednávek, plánování rozvozů a expedici. Zahrnuje kompletní migrační nástroj z historických FoxPro (DBF) tabulek do moderního SQLite a automatické zálohy na Google Drive.",
    role: "Vývoj GUI v PySide6 (Qt 6), vytvoření migračního můstku DBF -> SQLite, integrace SMTP pro odesílání potvrzení a napojení na Google Drive API (OAuth 2.0)",
    tech: ["Python 3.12", "PySide6 (Qt 6)", "SQLite3", "Visual FoxPro DBF", "Google Drive API", "PyInstaller"],
    githubUrl: "https://github.com/Shiftyczech/TS---Copy",
    demoUrl: null,
    featured: true
  },
  {
    id: "web-portfolio",
    title: "Osobní portfolio & prezentační web",
    category: "web",
    categoryLabel: "Tvorba webu",
    summary: "Vlastní webové portfolio zaměřené na rychlost, čistý kód a temný technologický design. Postaveno bez závislostí a zbytečných knihoven pro okamžité nasazení na GitHub Pages.",
    role: "Kompletní návrh rozhraní, CSS architektura a interaktivní skripty",
    tech: ["HTML5", "CSS3", "Vanilla JS", "Canvas API", "GitHub Pages"],
    githubUrl: "https://github.com/Shiftyczech",
    demoUrl: "#",
    featured: false
  },
  {
    id: "web-refactor",
    title: "Refaktoring a modernizace webu",
    category: "uprava",
    categoryLabel: "Úprava a refaktor",
    summary: "Přepracování staršího webového kódu. Přechod z fixních tabulkových nebo absolutních rozměrů na moderní responzivní grid a flexbox, vyčištění stylů a zrychlení odezvy načítání stránek.",
    role: "Optimalizace CSS, přepis layoutu do responzivní podoby, oprava zobrazení na mobilních zařízeních a zjednodušení struktury",
    tech: ["CSS Grid", "Flexbox", "Responsive Design", "Performance Tuning"],
    githubUrl: "https://github.com/Shiftyczech",
    demoUrl: null,
    featured: false
  }
];
