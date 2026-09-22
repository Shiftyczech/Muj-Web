/**
 * Hlavní aplikační logika portfolia Šimona Tobiáše
 * Obsluhuje: vykreslení a filtrování projektů, lightbox diplomu, kopírování kontaktů, navigaci
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initProjects();
  initLightbox();
  initContactCopy();
  initFaqAccordion();
  initContactForm();
});

/**
 * 1. Navigace a mobilní menu
 */
function initNavigation() {
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const siteNav = document.getElementById("site-nav");
  const navBackdrop = document.getElementById("nav-backdrop");
  const links = document.querySelectorAll(".nav-link");

  function setMenuState(isOpen) {
    if (!mobileBtn || !siteNav) return;
    mobileBtn.classList.toggle("open", isOpen);
    siteNav.classList.toggle("open", isOpen);
    if (navBackdrop) navBackdrop.classList.toggle("open", isOpen);
    mobileBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-locked", isOpen);
  }

  if (mobileBtn && siteNav) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = !siteNav.classList.contains("open");
      setMenuState(isOpen);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", () => setMenuState(false));
    }

    // Zavřít menu po kliknutí na odkaz
    links.forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });

    // Zavřít menu klávesou Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && siteNav.classList.contains("open")) {
        setMenuState(false);
      }
    });
  }

  // Zvýraznění aktivní sekce při scrollování
  const sections = document.querySelectorAll("section[id]");
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      const scrollY = window.scrollY;
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 130;
        const sectionId = current.getAttribute("id");
        const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (targetLink) {
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            targetLink.classList.add("active");
          } else {
            targetLink.classList.remove("active");
          }
        }
      });
    }, 40);
  }, { passive: true });
}

/**
 * 2. Vykreslování a filtrování projektů z projects.js
 */
function initProjects() {
  const container = document.getElementById("projects-container");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!container || typeof projectsData === "undefined") return;

  function renderProjects(filterCategory = "all") {
    container.innerHTML = "";

    const filtered = filterCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filterCategory);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          V této kategorii zatím není žádný projekt.
        </div>
      `;
      return;
    }

    filtered.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.id = `proj-${project.id}`;

      // GitHub tlačítko
      const githubBtn = project.githubUrl
        ? `
          <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="Zdrojový kód na GitHubu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub
          </a>
        `
        : "";

      // Demo tlačítko
      const demoBtn = project.demoUrl && project.demoUrl !== "#"
        ? `
          <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="Otevřít živou ukázku">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            Živá ukázka
          </a>
        `
        : "";

      const techBadges = project.tech
        .map((t) => `<span class="tech-badge">${escapeHtml(t)}</span>`)
        .join("");

      card.innerHTML = `
        <div class="project-header">
          <span class="project-tag">${escapeHtml(project.categoryLabel)}</span>
          ${project.featured ? '<span style="font-family: var(--font-mono); font-size: 0.72rem; color: #38bdf8;">★ Hlavní</span>' : ""}
        </div>
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-summary">${escapeHtml(project.summary)}</p>
        <div class="project-role-box">
          <span class="project-role-label">Co jsem na projektu dělal</span>
          <span class="project-role-text">${escapeHtml(project.role)}</span>
        </div>
        <div class="project-tech-stack">
          ${techBadges}
        </div>
        <div class="project-links">
          ${githubBtn}
          ${demoBtn}
        </div>
      `;

      container.appendChild(card);
    });
  }

  // Obsluha přepínání filtrů
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderProjects(filter);
    });
  });

  // Výchozí vykreslení všech projektů
  renderProjects("all");
}

/**
 * 3. Lightbox modal pro diplom z AI olympiády
 */
function initLightbox() {
  const trigger = document.getElementById("diploma-trigger");
  const modal = document.getElementById("diploma-modal");
  const closeBtn = document.getElementById("lightbox-close");

  if (!modal || !trigger) return;

  function openModal() {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  trigger.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Zavření kliknutím na pozadí mimo obsah
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Zavření klávesou Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

/**
 * 4. Kopírování kontaktů do schránky s toast notifikací
 */
function initContactCopy() {
  const copyButtons = document.querySelectorAll(".btn-copy");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      const label = btn.getAttribute("data-label") || "Text";

      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Zkopírováno: ${textToCopy}`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(`Zkopírováno: ${text}`);
  } catch (err) {
    showToast(`Nepodařilo se zkopírovat, označte text ručně.`);
  }
  document.body.removeChild(textArea);
}

let toastTimeout;
function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span>${escapeHtml(message)}</span>
  `;

  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/**
 * Pomocná funkce pro bezpečné vložení HTML
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 5. FAQ Akordeon (interaktivní rozbalování)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Zavřít ostatní otevřené položky pro čistý akordeonový efekt
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains("open")) {
          other.classList.remove("open");
          const btn = other.querySelector(".faq-question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      // Přepnout aktuální položku
      item.classList.toggle("open", !isOpen);
      questionBtn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

/**
 * 6. Poptávkový formulář s AJAX odesíláním přes FormSubmit.co
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("form-submit-btn");
  const btnText = submitBtn ? submitBtn.querySelector(".btn-submit-text") : null;
  const statusEl = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot ochrana proti robotům
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) {
      return;
    }

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const serviceInput = form.querySelector('[name="service"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const service = serviceInput ? serviceInput.value : "Poptávka";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      if (statusEl) {
        statusEl.className = "form-status error";
        statusEl.textContent = "Prosím vyplňte všechna povinná pole označená hvězdičkou (*).";
      }
      return;
    }

    // Nastavení stavu odesílání
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Odesílám poptávku...";
    if (statusEl) {
      statusEl.className = "form-status loading";
      statusEl.textContent = "Odesílám vaši zprávu...";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/simon.tobi@seznam.cz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Jméno: name,
          Email: email,
          Typ_služby: service,
          Zpráva: message,
          _subject: `Nová poptávka z webu: ${service} (${name})`,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true)) {
        form.reset();
        if (statusEl) {
          statusEl.className = "form-status success";
          statusEl.innerHTML = `<strong>Děkuji za zprávu!</strong> Vaše poptávka byla úspěšně odeslána. Ozvu se vám nejpozději do 24 hodin.`;
        }
        showToast("Poptávka byla úspěšně odeslána!");
      } else {
        throw new Error(data.message || "Chyba při odesílání.");
      }
    } catch (err) {
      if (statusEl) {
        statusEl.className = "form-status error";
        statusEl.innerHTML = `Odeslání se nezdařilo. Můžete mi prosím napsat přímo na <a href="mailto:simon.tobi@seznam.cz" style="color: var(--accent-cyan); text-decoration: underline;">simon.tobi@seznam.cz</a>?`;
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Odeslat nezávaznou poptávku";
    }
  });
}


