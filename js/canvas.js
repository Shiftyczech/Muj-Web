/**
 * Interaktivní Cyber-Tech částicové pozadí
 * Plynulá síť uzlů s dynamickým propojením a jemnou reakcí na kurzor myši
 */

(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };
  let animationFrameId;
  let isVisible = true;

  // Respektování preference sníženého pohybu
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    // Adaptivní hustota bodů podle rozlišení
    const density = width < 768 ? 45 : 90;

    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.45),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.45),
        size: Math.random() * 1.6 + 0.8,
        color: Math.random() > 0.4 ? "rgba(0, 240, 255, " : "rgba(59, 130, 246, "
      });
    }
  }

  function draw() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Kreslení spojnic a bodů
    const connectionDist = width < 768 ? 85 : 120;
    const connectionDistSq = connectionDist * connectionDist;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Pohyb
      if (!prefersReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        // Odraz od okrajů
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interakce s myší
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius) {
            const force = (1 - Math.sqrt(distSq) / mouse.radius) * 0.8;
            p.x -= (dx / Math.sqrt(distSq)) * force;
            p.y -= (dy / Math.sqrt(distSq)) * force;
          }
        }
      }

      // Kreslení uzlu
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + "0.65)";
      ctx.fill();

      // Kreslení linií mezi blízkými uzly
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connectionDistSq) {
          const alpha = (1 - Math.sqrt(distSq) / connectionDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Kreslení spojnice k myši
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < mouse.radius * mouse.radius) {
          const alpha = (1 - Math.sqrt(distSq) / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  // Event listenery
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Šetření baterie při přepnutí na jinou záložku
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isVisible = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isVisible = true;
      animationFrameId = requestAnimationFrame(draw);
    }
  });

  // Spuštění
  resize();
  draw();
})();

