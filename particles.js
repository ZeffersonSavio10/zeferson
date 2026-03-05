/* ============================================
   ZEFFER SQUIN GROUP — particles.js
   Animated particle network background
   ============================================ */

(function () {
  let animFrame;
  let particles = [];
  let W, H;
  let currentColor = "#0CF2A0";

  function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;

    particles = Array.from({ length: 65 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r:  Math.random() * 1.1 + 0.3,
      a:  Math.random() * 0.28 + 0.06,
    }));

    cancelAnimationFrame(animFrame);
    draw(canvas, ctx);
  }

  function draw(canvas, ctx) {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = currentColor;
      ctx.globalAlpha = p.a;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 90) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = currentColor;
          ctx.globalAlpha = 0.035 * (1 - d / 90);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    animFrame = requestAnimationFrame(() => draw(canvas, ctx));
  }

  function setParticleColor(color) {
    currentColor = color || "#0CF2A0";
  }

  window.addEventListener("resize", () => {
    const canvas = document.getElementById("particle-canvas");
    if (canvas) {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
  });

  // Expose globally
  window.ZSParticles = { init: initParticles, setColor: setParticleColor };
})();
