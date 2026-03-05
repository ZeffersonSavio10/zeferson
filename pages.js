/* ============================================
   ZEFFER SQUIN GROUP — pages.js
   Page HTML renderers
   ============================================ */

/* ── Helpers ── */
function el(tag, attrs, ...children) {
  const e = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (k === "class") e.className = v;
    else if (k === "style") e.style.cssText = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v);
  });
  children.forEach(c => {
    if (c == null) return;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return e;
}

function html(str) {
  const t = document.createElement("div");
  t.innerHTML = str;
  return t;
}

/* ── Ticker ── */
function buildTicker() {
  const track = el("div", { class: "ticker-track" });
  for (let j = 0; j < 8; j++) {
    DIVISIONS.forEach(d => {
      track.appendChild(el("span", {
        class: "ticker-item",
        style: `color: ${d.color}70`,
      }, `${d.code} · ${d.name} ◆`));
    });
  }
  return el("div", { class: "ticker-wrap" }, track);
}

/* ── Division Card ── */
function buildDivCard(div, index, onclick) {
  const card = el("div", {
    class: "div-card anim-fade-up",
    style: `animation-delay:${index * 0.07}s; --color:${div.color}; --dim:${div.dim};`,
  });

  card.addEventListener("click", onclick);
  card.addEventListener("mouseenter", () => { card.style.background = div.dim; });
  card.addEventListener("mouseleave", () => { card.style.background = ""; });

  card.innerHTML = `
    <div class="div-card-top-line" style="background:${div.color}"></div>
    <div class="div-card-glow" style="--glow:${div.color}20"></div>
    <div class="div-card-code" style="color:${div.color}55">${div.code}</div>
    <div class="div-card-icon">${div.icon}</div>
    <div class="div-card-tag" style="border-color:${div.color}22;color:${div.color}CC">${div.tagline}</div>
    <div class="div-card-name">${div.name}</div>
    <div class="div-card-headline">${div.headline}</div>
    <div class="div-card-cta" style="color:${div.color}">
      <span>View Division</span>
      <span class="div-card-arrow">→</span>
    </div>
  `;
  return card;
}

/* ── Stat Box ── */
function buildStatGrid(stats, color) {
  const grid = el("div", { class: "stat-grid" });
  stats.forEach(s => {
    grid.innerHTML += `
      <div class="stat-box">
        <div class="stat-box-line" style="background:${color}"></div>
        <div class="stat-box-val">${s.v}</div>
        <div class="stat-box-label">${s.l}</div>
      </div>`;
  });
  return grid;
}

/* ── Eyebrow ── */
function buildEyebrow(text, color) {
  return html(`
    <div class="eyebrow">
      <div class="eyebrow-line" style="background:${color}"></div>
      <span class="eyebrow-text" style="color:${color}">${text}</span>
    </div>`).firstChild;
}

/* ════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════ */
function renderHome(navigate) {
  const frag = document.createDocumentFragment();

  /* HERO */
  const hero = el("section", { class: "hero" });
  hero.innerHTML = `
    <div class="hero-watermark">ZS</div>
    <div class="hero-deco">
      ${[56,42,28,14].map(w => `<div class="hero-deco-line" style="width:${w}px"></div>`).join("")}
    </div>
    <div class="hero-content">
      <div class="hero-eyebrow anim-fade-up delay-1">
        <div class="hero-eyebrow-line"></div>
        <span class="hero-eyebrow-text">Est. 2016 — Multi-Industry Conglomerate</span>
      </div>
      <div class="hero-title-wrap anim-fade-up delay-2">
        <span class="hero-title solid">Zeffer</span>
      </div>
      <div class="hero-title-wrap anim-fade-up delay-3">
        <span class="hero-title outline">Squin</span>
      </div>
      <div class="hero-tagline anim-fade-up delay-3">"One Group. Infinite Possibilities."</div>
      <p class="hero-desc anim-fade-up delay-4">
        A diversified conglomerate operating across cybersecurity, hospitality, international trade,
        technology, real estate, and strategic consulting — built on trust, driven by excellence.
      </p>
      <div class="hero-btns anim-fade-up delay-5" id="hero-btns"></div>
      <div class="hero-stats anim-fade-up delay-6">
        ${SITE_STATS.map(s => `
          <div class="hero-stat">
            <div class="hero-stat-val">${s.v}</div>
            <div class="hero-stat-label">${s.l}</div>
          </div>`).join("")}
      </div>
    </div>
    <div class="hero-scroll">
      <span class="hero-scroll-text">Scroll</span>
      <div class="hero-scroll-line"></div>
    </div>
  `;
  const btns = hero.querySelector("#hero-btns");
  const btnDiv = el("button", { class: "btn-primary" }, "Explore Divisions ↓");
  btnDiv.onclick = () => navigate("divisions");
  const btnAbout = el("button", { class: "btn-secondary" }, "About the Group");
  btnAbout.onclick = () => navigate("about");
  btns.appendChild(btnDiv);
  btns.appendChild(btnAbout);
  frag.appendChild(hero);

  /* TICKER */
  frag.appendChild(buildTicker());

  /* DIVISIONS GRID */
  const divSec = el("div", { class: "section" });
  const divInner = el("div", { class: "section-inner" });
  divInner.appendChild(buildEyebrow("Our Divisions", "#818CF8"));
  divInner.innerHTML += `<h2 class="section-title" style="margin-bottom:56px">Six Pillars of <em style="color:#818CF8">the Group</em></h2>`;
  const grid = el("div", { class: "div-grid" });
  DIVISIONS.forEach((div, i) => grid.appendChild(buildDivCard(div, i, () => navigate(div.id))));
  divInner.appendChild(grid);
  divSec.appendChild(divInner);
  frag.appendChild(divSec);

  /* ABOUT TEASER */
  const aboutSec = el("div", { class: "section section-border" });
  const aboutInner = el("div", { class: "section-inner about-grid" });
  aboutInner.innerHTML = `
    <div class="anim-slide-r">
      <div class="eyebrow">
        <div class="eyebrow-line" style="background:#0CF2A0;width:24px;height:1px"></div>
        <span class="eyebrow-text" style="color:#0CF2A0">About the Group</span>
      </div>
      <h2 class="col-title" style="margin-top:16px">
        Built on Trust,<br><em style="color:#0CF2A0">Driven by</em><br>Excellence
      </h2>
      <p class="col-body">Zeffer Squin Group was founded with a singular vision: to be the most trusted diversified conglomerate in Southeast Asia. Today, six specialised divisions serve over 1,200 clients across 40+ nations.</p>
      <button class="btn-secondary" id="about-cta" style="margin-top:8px;color:#0CF2A0;border-color:#0CF2A030">Read Our Story →</button>
    </div>
    <div class="anim-slide-l delay-2">
      <div class="stat-grid">
        ${[{l:"Global Reach",v:"40+ Nations",c:"#0CF2A0"},{l:"Clients Served",v:"1,200+",c:"#F5C842"},{l:"Team Members",v:"500+",c:"#818CF8"},{l:"Years of Trust",v:"8+",c:"#FF6B6B"}].map(b=>`
          <div class="stat-box">
            <div class="stat-box-line" style="background:${b.c}"></div>
            <div class="stat-box-val">${b.v}</div>
            <div class="stat-box-label">${b.l}</div>
          </div>`).join("")}
      </div>
    </div>
  `;
  aboutSec.appendChild(aboutInner);
  aboutSec.querySelector("#about-cta").onclick = () => navigate("about");
  frag.appendChild(aboutSec);

  /* CTA BAND */
  const ctaBand = el("div", { class: "cta-band" });
  ctaBand.innerHTML = `
    <div class="cta-band-inner">
      <div>
        <div class="cta-band-title">Ready to work with us?</div>
        <div class="cta-band-sub">Our team is ready to discuss how Zeffer Squin can serve your needs.</div>
      </div>
      <button class="btn-primary" id="cta-contact">Start a Conversation ↗</button>
    </div>`;
  ctaBand.querySelector("#cta-contact").onclick = () => navigate("contact");
  frag.appendChild(ctaBand);

  return frag;
}

/* ════════════════════════════════════════════
   ABOUT PAGE
════════════════════════════════════════════ */
function renderAbout(navigate) {
  const frag = document.createDocumentFragment();

  frag.appendChild(html(`
    <section class="page-hero">
      <div class="page-hero-wm">ABOUT</div>
      <div class="page-hero-content anim-fade-up">
        <div class="eyebrow">
          <div class="eyebrow-line" style="background:#0CF2A0;width:36px;height:1px"></div>
          <span class="eyebrow-text" style="color:#0CF2A0">Our Story</span>
        </div>
        <h1 class="page-hero-title" style="margin-top:16px">
          A Legacy of<br><em style="color:#0CF2A0">Excellence</em>
        </h1>
      </div>
    </section>
  `).firstChild);

  const story = el("div", { class: "section" });
  const inner = el("div", { class: "section-inner two-col" });
  inner.innerHTML = `
    <div class="anim-slide-r">
      <h2 class="col-title">Who We Are</h2>
      <p class="col-body">Zeffer Squin Group was established in 2016 with a vision to build a uniquely capable organisation — one that could serve clients across the full spectrum of their business and personal needs.</p>
      <p class="col-body">Today, six specialised divisions operate under the Zeffer Squin umbrella, each led by industry veterans, each committed to world-class execution. Together, they form a conglomerate of rare breadth and depth.</p>
      <p class="col-body" style="color:#252530">Our growth has been deliberate: we expand into sectors where we can genuinely excel, not merely participate. Every division is built to lead, not to follow.</p>
    </div>
    <div class="anim-slide-l delay-2">
      <div class="value-block" style="border-left-color:#0CF2A0">
        <div class="value-label" style="color:#0CF2A080">Vision</div>
        <div class="value-text">To be the most trusted diversified group in Southeast Asia, creating lasting value across every sector we operate in.</div>
      </div>
      <div class="value-block">
        <div class="value-label" style="color:#818CF880">Mission</div>
        <div class="value-text">Delivering world-class solutions through relentless innovation, integrity, and an unwavering commitment to our clients' success.</div>
      </div>
      <div class="value-block">
        <div class="value-label" style="color:#F5C84280">Values</div>
        <div class="value-text">Excellence. Trust. Innovation. Collaboration. These principles guide every decision, every engagement, every day.</div>
      </div>
    </div>
  `;
  story.appendChild(inner);
  frag.appendChild(story);

  frag.appendChild(html(`
    <div class="quote-section">
      <div class="quote-mark">"</div>
      <p class="quote-text">We don't just build businesses. We build futures — for our clients, our people, and the communities we serve.</p>
      <div class="quote-attr">
        <div class="quote-avatar">Z</div>
        <div>
          <div class="quote-name">Zeffer Squin Group</div>
          <div class="quote-role">Group Chairman</div>
        </div>
      </div>
    </div>
  `).firstChild);

  const divSec = el("div", { class: "section section-border" });
  const divInner = el("div", { class: "section-inner" });
  divInner.innerHTML = `<h2 class="section-title" style="margin-bottom:48px">Our <em style="color:#818CF8">Six Divisions</em></h2>`;
  const grid = el("div", { class: "div-grid" });
  DIVISIONS.forEach((div, i) => grid.appendChild(buildDivCard(div, i, () => navigate(div.id))));
  divInner.appendChild(grid);
  divSec.appendChild(divInner);
  frag.appendChild(divSec);

  return frag;
}

/* ════════════════════════════════════════════
   DIVISIONS PAGE
════════════════════════════════════════════ */
function renderDivisions(navigate) {
  const frag = document.createDocumentFragment();

  frag.appendChild(html(`
    <section class="page-hero">
      <div class="page-hero-wm">DIV</div>
      <div class="page-hero-content anim-fade-up">
        <div class="eyebrow">
          <div class="eyebrow-line" style="background:#818CF8;width:36px;height:1px"></div>
          <span class="eyebrow-text" style="color:#818CF8">All Divisions</span>
        </div>
        <h1 class="page-hero-title" style="margin-top:16px">
          Six Pillars of<br><em style="color:#818CF8">the Group</em>
        </h1>
      </div>
    </section>
  `).firstChild);

  const sec = el("div", { class: "section" });
  const inner = el("div", { class: "section-inner" });
  const grid = el("div", { class: "div-grid" });
  DIVISIONS.forEach((div, i) => grid.appendChild(buildDivCard(div, i, () => navigate(div.id))));
  inner.appendChild(grid);
  sec.appendChild(inner);
  frag.appendChild(sec);
  return frag;
}

/* ════════════════════════════════════════════
   DIVISION PAGE
════════════════════════════════════════════ */
function renderDivision(divId, navigate) {
  const div = DIVISIONS.find(d => d.id === divId);
  if (!div) return renderHome(navigate);

  const frag = document.createDocumentFragment();

  /* Hero */
  const heroSec = el("section", { class: "div-hero" });
  heroSec.innerHTML = `
    <div class="div-hero-wm" style="-webkit-text-stroke:1px ${div.color}12">${div.code}</div>
    <div class="div-hero-glow" style="background:radial-gradient(ellipse at 70% 50%,${div.color}06,transparent 70%)"></div>
    <div style="position:relative;z-index:2">
      <div class="breadcrumb anim-fade-up">
        <button class="breadcrumb-btn" id="bc-home">Home</button>
        <span class="breadcrumb-sep">/</span>
        <button class="breadcrumb-btn" id="bc-divs">Divisions</button>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current" style="color:${div.color}">${div.name}</span>
      </div>
      <div class="eyebrow anim-fade-up delay-1">
        <div class="eyebrow-line" style="background:${div.color};width:36px;height:1px"></div>
        <span class="eyebrow-text" style="color:${div.color}">${div.tagline}</span>
      </div>
      <div style="overflow:hidden">
        <h1 class="div-hero-title anim-fade-up delay-2">${div.name}</h1>
      </div>
      <div class="div-hero-tagline anim-fade-up delay-3" style="color:${div.color}80">${div.headline}</div>
      <p class="div-hero-desc anim-fade-up delay-3">${div.heroText}</p>
      <div class="div-hero-btns anim-fade-up delay-4">
        <button class="btn-primary" id="div-enquire" style="background:${div.color}">Enquire Now ↗</button>
        ${div.stats.slice(0, 2).map(s => `
          <div class="div-mini-stat" style="border-color:${div.color}20">
            <div class="div-mini-stat-val" style="color:${div.color}">${s.v}</div>
            <div class="div-mini-stat-label">${s.l}</div>
          </div>`).join("")}
      </div>
    </div>
  `;
  heroSec.querySelector("#bc-home").onclick = () => navigate("home");
  heroSec.querySelector("#bc-divs").onclick = () => navigate("divisions");
  heroSec.querySelector("#div-enquire").onclick = () => navigate("contact");
  frag.appendChild(heroSec);

  /* About Division */
  const aboutSec = el("div", { class: "section" });
  const aboutInner = el("div", { class: "section-inner two-col" });
  aboutInner.innerHTML = `
    <div class="anim-slide-r">
      <div class="eyebrow">
        <div class="eyebrow-line" style="background:${div.color};width:24px;height:1px"></div>
        <span class="eyebrow-text" style="color:${div.color}">About ${div.name}</span>
      </div>
      <h2 class="col-title" style="margin-top:16px">Our <em style="color:${div.color}">Story</em></h2>
      <p class="col-body">${div.about}</p>
    </div>
    <div class="anim-slide-l delay-2">
      ${(() => {
        const g = document.createElement("div"); g.className = "stat-grid";
        div.stats.forEach(s => {
          g.innerHTML += `<div class="stat-box"><div class="stat-box-line" style="background:${div.color}"></div><div class="stat-box-val">${s.v}</div><div class="stat-box-label">${s.l}</div></div>`;
        });
        return g.outerHTML;
      })()}
    </div>
  `;
  aboutSec.appendChild(aboutInner);
  frag.appendChild(aboutSec);

  /* Services */
  const svcSec = el("div", { class: "section section-border" });
  const svcInner = el("div", { class: "section-inner" });
  svcInner.appendChild(buildEyebrow("Services", div.color));
  svcInner.innerHTML += `<h2 class="section-title" style="margin-top:16px;margin-bottom:52px">What We <em style="color:${div.color}">Offer</em></h2>`;
  const svcGrid = el("div", { class: "services-grid" });
  div.services.forEach((s, i) => {
    const card = el("div", { class: "service-card anim-fade-up", style: `animation-delay:${i * 0.07}s` });
    card.innerHTML = `
      <div class="service-card-bar" style="background:${div.color}"></div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
    `;
    svcGrid.appendChild(card);
  });
  svcInner.appendChild(svcGrid);
  svcSec.appendChild(svcInner);
  frag.appendChild(svcSec);

  /* Other Divisions */
  const otherSec = el("div", { class: "section section-border" });
  const otherInner = el("div", { class: "section-inner" });
  otherInner.innerHTML = `<h3 style="font-family:'Cormorant Garamond',serif;font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;letter-spacing:-0.02em;margin-bottom:32px;color:#333">Other <em style="color:#fff">Divisions</em></h3>`;
  const othersWrap = el("div", { class: "other-divs" });
  DIVISIONS.filter(d => d.id !== divId).forEach(d => {
    const btn = el("button", { class: "other-div-btn", style: `--color:${d.color};--dim:${d.dim}` });
    btn.innerHTML = `
      <span class="other-div-icon">${d.icon}</span>
      <div>
        <div class="other-div-code" style="color:${d.color}">${d.code}</div>
        <div class="other-div-name">${d.name}</div>
      </div>
      <span class="other-div-arrow" style="color:${d.color}">→</span>
    `;
    btn.onclick = () => navigate(d.id);
    othersWrap.appendChild(btn);
  });
  otherInner.appendChild(othersWrap);
  otherSec.appendChild(otherInner);
  frag.appendChild(otherSec);

  return frag;
}

/* ════════════════════════════════════════════
   CONTACT PAGE
════════════════════════════════════════════ */
function renderContact() {
  const frag = document.createDocumentFragment();

  frag.appendChild(html(`
    <section class="page-hero contact-hero">
      <div class="page-hero-wm">HELLO</div>
      <div class="contact-glow"></div>
      <div class="page-hero-content anim-fade-up">
        <div class="eyebrow">
          <div class="eyebrow-line" style="background:#0CF2A0;width:36px;height:1px"></div>
          <span class="eyebrow-text" style="color:#0CF2A0">Get in Touch</span>
        </div>
        <h1 class="page-hero-title" style="margin-top:16px">
          Let's Build<br><em style="color:#0CF2A0">Something</em><br>Remarkable
        </h1>
      </div>
    </section>
  `).firstChild);

  const sec = el("div", { class: "section" });
  const inner = el("div", { class: "section-inner contact-grid" });

  /* Form col */
  const formCol = el("div", { class: "anim-slide-r" });
  formCol.innerHTML = `
    <div class="eyebrow" style="margin-bottom:36px">
      <div class="eyebrow-line" style="background:#0CF2A0;width:24px;height:1px"></div>
      <span class="eyebrow-text" style="color:#0CF2A0">Send an Inquiry</span>
    </div>
    <div id="form-wrap">
      <div class="form-group">
        <div class="form-row">
          <div>
            <label class="form-label">Full Name *</label>
            <input class="form-input" id="f-name" placeholder="John Smith" />
          </div>
          <div>
            <label class="form-label">Company</label>
            <input class="form-input" id="f-company" placeholder="PT Acme Corp" />
          </div>
        </div>
        <div class="form-row">
          <div>
            <label class="form-label">Email Address *</label>
            <input class="form-input" id="f-email" type="email" placeholder="john@example.com" />
          </div>
          <div>
            <label class="form-label">Phone Number</label>
            <input class="form-input" id="f-phone" placeholder="+62 812 xxxx xxxx" />
          </div>
        </div>
        <div>
          <label class="form-label">Division of Interest</label>
          <select class="form-select" id="f-division">
            <option value="">— Select a Division (optional) —</option>
            ${DIVISIONS.map(d => `<option value="${d.id}">${d.name} — ${d.tagline}</option>`).join("")}
            <option value="general">General Inquiry</option>
          </select>
        </div>
        <div>
          <label class="form-label">Message *</label>
          <textarea class="form-textarea" id="f-message" rows="5" placeholder="Tell us about your needs or project..."></textarea>
        </div>
        <button class="btn-submit" id="submit-btn">Send Message ↗</button>
        <p class="form-note">* Required fields. We respond within 1 business day.</p>
      </div>
    </div>
  `;

  /* Submit handler */
  setTimeout(() => {
    const btn = document.getElementById("submit-btn");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const name    = document.getElementById("f-name")?.value;
      const email   = document.getElementById("f-email")?.value;
      const message = document.getElementById("f-message")?.value;
      if (!name || !email || !message) {
        alert("Please fill in all required fields (Name, Email, Message).");
        return;
      }
      btn.disabled = true;
      btn.textContent = "Sending…";
      setTimeout(() => {
        const wrap = document.getElementById("form-wrap");
        if (wrap) {
          wrap.innerHTML = `
            <div class="form-success">
              <div class="form-success-icon">✅</div>
              <div class="form-success-title">Message Received</div>
              <p class="form-success-text">Thank you for reaching out to Zeffer Squin Group. Our team will review your inquiry and respond within 1 business day.</p>
            </div>`;
        }
      }, 1800);
    });
  }, 100);

  inner.appendChild(formCol);

  /* Info col */
  const infoCol = el("div", { class: "anim-slide-l delay-2" });
  infoCol.innerHTML = `
    <div class="eyebrow" style="margin-bottom:36px">
      <div class="eyebrow-line" style="background:#0CF2A0;width:24px;height:1px"></div>
      <span class="eyebrow-text" style="color:#0CF2A0">Contact Information</span>
    </div>
    <div class="contact-info">
      ${CONTACT_INFO.map(c => `
        <div class="contact-card" style="border:1px solid ${c.color}20">
          <div class="contact-card-bar" style="background:${c.color}"></div>
          <div class="contact-card-label" style="color:${c.color}">${c.label}</div>
          <div class="contact-card-val">${c.val}</div>
          <div class="contact-card-sub">${c.sub}</div>
        </div>`).join("")}
    </div>
    <div style="margin-top:28px">
      <div style="font-size:0.62rem;color:#1A1A22;letter-spacing:0.22em;text-transform:uppercase;font-family:'DM Mono',monospace;margin-bottom:14px">Division Contacts</div>
      <div class="contact-div-tags">
        ${DIVISIONS.map(d => `
          <div class="contact-div-tag" style="border:1px solid ${d.color}18">
            <div class="contact-div-dot" style="background:${d.color}"></div>
            <span class="contact-div-name">${d.name}</span>
          </div>`).join("")}
      </div>
    </div>
  `;
  inner.appendChild(infoCol);

  sec.appendChild(inner);
  frag.appendChild(sec);
  return frag;
}
