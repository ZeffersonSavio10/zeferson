/* ============================================
   ZEFFER SQUIN GROUP — app.js
   Main router, nav & footer init
   ============================================ */

(function () {

  let currentPage = "home";
  const DIVISION_IDS = DIVISIONS.map(d => d.id);

  /* ── Update Nav ── */
  function updateNav(page) {
    // Highlight active link
    document.querySelectorAll(".nav-link").forEach(btn => {
      const p = btn.dataset.page;
      btn.classList.toggle("active", p === page || (p === "divisions" && DIVISION_IDS.includes(page)));
    });

    // Accent colour for division pages
    const div = DIVISIONS.find(d => d.id === page);
    const color = div ? div.color : "#0CF2A0";
    document.querySelectorAll(".logo-letter").forEach(el => el.style.color = color);
    document.querySelectorAll(".logo-box").forEach(el => el.style.borderColor = color + "50");
    document.querySelectorAll(".nav-cta").forEach(el => {
      el.style.borderColor = color + "40";
      el.style.color = color;
      el.onmouseenter = () => { el.style.background = color; el.style.color = "#000"; };
      el.onmouseleave = () => { el.style.background = "transparent"; el.style.color = color; };
    });
    if (window.ZSParticles) ZSParticles.setColor(color);

    // Dot indicators
    const dotsWrap = document.getElementById("nav-dots");
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      DIVISIONS.slice(0, 5).forEach(d => {
        const dot = document.createElement("button");
        dot.className = "nav-dot" + (page === d.id ? " active" : "");
        dot.style.setProperty("--div-color", d.color);
        if (page === d.id) dot.style.background = d.color;
        dot.title = d.name;
        dot.onclick = () => navigate(d.id);
        dotsWrap.appendChild(dot);
      });
    }
  }

  /* ── Build Footer ── */
  function buildFooter() {
    const divCol = document.getElementById("footer-divisions");
    if (divCol) {
      divCol.innerHTML = `<div class="footer-col-title">Divisions</div>`;
      DIVISIONS.forEach(d => {
        const item = document.createElement("div");
        item.className = "footer-div-item";
        item.innerHTML = `<div class="footer-div-dot" style="background:${d.color}"></div><span class="footer-div-name">${d.name}</span>`;
        item.style.cursor = "pointer";
        item.onclick = () => navigate(d.id);
        item.onmouseenter = () => item.querySelector(".footer-div-name").style.color = "#fff";
        item.onmouseleave = () => item.querySelector(".footer-div-name").style.color = "";
        divCol.appendChild(item);
      });
    }
  }

  /* ── Sticky Nav shadow ── */
  function initScrollBehaviour() {
    const nav = document.getElementById("main-nav");
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* ── Navigate ── */
  function navigate(page) {
    currentPage = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderPage(page);
    updateNav(page);
  }
  window.navigate = navigate; // expose globally for inline onclick

  /* ── Render Page ── */
  function renderPage(page) {
    const app = document.getElementById("app");
    app.innerHTML = "";

    let content;
    if (page === "home")       content = renderHome(navigate);
    else if (page === "about") content = renderAbout(navigate);
    else if (page === "divisions") content = renderDivisions(navigate);
    else if (page === "contact")   content = renderContact();
    else if (DIVISION_IDS.includes(page)) content = renderDivision(page, navigate);
    else content = renderHome(navigate);

    app.appendChild(content);
  }

  /* ── Init ── */
  document.addEventListener("DOMContentLoaded", () => {
    ZSParticles.init();
    buildFooter();
    initScrollBehaviour();

    // Check URL hash for deep links (optional)
    const hash = window.location.hash.replace("#", "");
    const startPage = (hash && (["home","about","divisions","contact"].includes(hash) || DIVISION_IDS.includes(hash)))
      ? hash : "home";

    navigate(startPage);
  });

  // Update hash on navigation (optional)
  const _navigate = window.navigate;
  window.navigate = function(page) {
    history.pushState({}, "", "#" + page);
    _navigate(page);
  };

  // Handle back/forward
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.replace("#", "") || "home";
    currentPage = hash;
    renderPage(hash);
    updateNav(hash);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

})();
