# Osobní portfolio — Šimon Tobiáš

Moderní, responzivní prezentační web pro vývojáře se zaměřením na **tvorbu a úpravy webů**, **aplikace** a **kybernetickou bezpečnost**.

- **Styl:** Cyber-Tech & Dark Glow (interaktivní canvas s propojenými uzly, tmavé téma s cyan akcenty, skleněné karty)
- **Kód:** Čistý moderní frontend (HTML5, CSS3, Vanilla JS) bez frameworků, npm balíčků či složitého sestavování
- **Hosting:** 100% optimalizováno pro okamžitý běh na **GitHub Pages**

---

## Jak nahrát web na GitHub a spustit GitHub Pages

1. **Inicializace a první commit v terminálu:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio Simona Tobiasa"
   git branch -M main
   ```

2. **Propojení s tvým GitHub repozitářem:**
   (Vytvoř si na svém GitHubu nový prázdný repozitář, např. `portfolio` nebo `<tvoje-jmeno>.github.io`):
   ```bash
   git remote add origin https://github.com/<tvoje-github-jmeno>/<nazev-repozitare>.git
   git push -u origin main
   ```

3. **Zapnutí GitHub Pages:**
   - Jdi do svého repozitáře na GitHubu -> **Settings** -> v levém menu klikni na **Pages**.
   - V sekci **Build and deployment**:
     - **Source:** vyber `Deploy from a branch`
     - **Branch:** zvol `main` a složku `/ (root)`
     - Klikni na **Save**.
   - Během 1–2 minut bude tvůj web dostupný na adrese `https://<tvoje-github-jmeno>.github.io/<nazev-repozitare>/`.

---

## Jak upravit obsah a přidávat projekty

### 1. Přidání nového projektu (`js/projects.js`)
Projekty jsou odděleny od HTML. Otevři soubor `js/projects.js` a přidej nový objekt do pole:

```javascript
{
  id: "novy-projekt",
  title: "Název tvého projektu",
  category: "web", // 'web' | 'aplikace' | 'uprava' | 'security'
  categoryLabel: "Tvorba webu",
  summary: "Stručný a lidský popis, o co šlo a co bylo cílem.",
  role: "Co konkrétně jsi na projektu vytvořil, naprogramoval nebo upravil.",
  tech: ["HTML5", "CSS3", "JavaScript"],
  githubUrl: "https://github.com/Shiftyczech/muj-projekt", // nebo null
  demoUrl: "https://muj-projekt.cz", // nebo null
  featured: false
}
```

### 2. Vložení vlastní fotky diplomu z AI olympiády
1. Vlož fotku svého diplomu do složky `assets/img/` (např. jako `diplom.jpg`).
2. V souboru `index.html` vyhledej `assets/img/placeholder-diplom.svg` a nahraď jej za `assets/img/diplom.jpg`.

### 3. Změna sociálních sítí a kontaktů
- V souboru `index.html` vyhledej odkazy na GitHub a Instagram a doplň své přesné uživatelské adresy.

---

## Struktura souborů

```
├── index.html               # Hlavní struktura webu
├── css/
│   └── style.css            # Kompletní styly, efekty, responzivita
├── js/
│   ├── projects.js          # Modulární databáze projektů
│   ├── canvas.js            # Interaktivní síťové plátno na pozadí
│   └── main.js              # Filtrování, lightbox, kopírování kontaktů
├── assets/
│   └── img/
│       ├── placeholder-diplom.svg  # Grafický náhled diplomu
│       └── README.md
└── README.md
```

