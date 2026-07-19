(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sticky header elevation
  const top = document.getElementById("site-top");
  if (top) {
    const onScroll = () => top.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav
  const btn = document.querySelector(".menu-btn");
  const panel = document.getElementById("nav");
  if (top && btn && panel) {
    const setOpen = (open) => {
      top.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    btn.addEventListener("click", () => setOpen(!top.classList.contains("is-open")));
    panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && top.classList.contains("is-open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  // Scroll reveals
  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Stagger agent chips
  const chips = document.querySelector(".chips");
  if (chips) {
    const items = Array.from(chips.querySelectorAll("[data-stagger]"));
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      chips.classList.add("is-visible");
      items.forEach((item) => item.classList.add("is-in"));
    } else {
      const chipIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            chips.classList.add("is-visible");
            items.forEach((item, index) => {
              window.setTimeout(() => item.classList.add("is-in"), Math.min(index * 45, 480));
            });
            chipIo.unobserve(chips);
          });
        },
        { threshold: 0.2 }
      );
      chipIo.observe(chips);
    }
  }

  // Subtle parallax on hero shot
  const visual = document.querySelector(".hero__visual");
  const shot = document.querySelector(".hero__shot");
  if (!reduceMotion && visual && shot && window.matchMedia("(pointer: fine)").matches) {
    visual.addEventListener("pointermove", (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      shot.style.transform = `perspective(1200px) rotateY(${-4 + x * 6}deg) rotateX(${3 - y * 5}deg)`;
    });
    visual.addEventListener("pointerleave", () => {
      shot.style.transform = "";
    });
  }
})();
