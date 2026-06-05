// ======================================================
// SABOR DE MINAS — SCRIPT PRINCIPAL FINALIZADO
// ======================================================

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    // ── REFERÊNCIAS ─────────────────────────────────────
    const hamburger   = document.getElementById("menu-hamburger");
    const navLinks    = document.getElementById("nav-links");
    const navbar      = document.getElementById("navbar");
    const wppFloat    = document.querySelector(".whatsapp-float");
    const anoAtual    = document.getElementById("anoAtual");

    // ── ANO AUTOMÁTICO ───────────────────────────────────
    if (anoAtual) {
      anoAtual.textContent = new Date().getFullYear();
    }

    // ── MENU HAMBURGER (MOBILE) ──────────────────────────
    if (hamburger && navLinks) {

      const fecharMenu = () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      };

      const abrirMenu = () => {
        navLinks.classList.add("active");
        hamburger.classList.add("active");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
      };

      hamburger.addEventListener("click", () => {
        const aberto = navLinks.classList.contains("active");
        aberto ? fecharMenu() : abrirMenu();
      });

      // Fechar ao clicar em qualquer link
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
      });

      // Fechar com tecla ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") fecharMenu();
      });

      // Fechar ao clicar fora do menu
      document.addEventListener("click", (e) => {
        if (
          navLinks.classList.contains("active") &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)
        ) {
          fecharMenu();
        }
      });
    }

    // ── NAVBAR AO ROLAR ──────────────────────────────────
    if (navbar) {
      const toggleScrolled = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      };

      window.addEventListener("scroll", toggleScrolled, { passive: true });
      toggleScrolled(); // aplica no carregamento
    }

    // ── BOTÃO WHATSAPP FLUTUANTE ─────────────────────────
    if (wppFloat) {
      const toggleWpp = () => {
        if (window.scrollY > 300) {
          wppFloat.style.opacity = "1";
          wppFloat.style.pointerEvents = "auto";
          wppFloat.style.transform = "";
        } else {
          wppFloat.style.opacity = "0";
          wppFloat.style.pointerEvents = "none";
          wppFloat.style.transform = "translateY(16px)";
        }
      };

      // Estado inicial
      wppFloat.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      wppFloat.style.opacity = "0";
      wppFloat.style.pointerEvents = "none";

      window.addEventListener("scroll", toggleWpp, { passive: true });
    }

    // ── ANIMAÇÕES AO ENTRAR NA TELA ──────────────────────
    const seletoresAnimados = [
      ".card-prato",
      ".beneficio-card",
      ".nd-item",
      ".horario-row",
      ".contato-bloco",
      ".self-card",
      ".self-texto",
      ".avaliacao-box",
      ".nd-texto",
      ".nd-diferenciais",
      ".depoimento-card",
      ".insta-post-placeholder"
    ].join(", ");

    const elementosAnimados = document.querySelectorAll(seletoresAnimados);

    if ("IntersectionObserver" in window && elementosAnimados.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      elementosAnimados.forEach((el, i) => {
        el.classList.add("hidden");
        const delay = Math.min(i * 60, 400);
        el.style.transitionDelay = delay + "ms";
        observer.observe(el);
      });
    } else {
      elementosAnimados.forEach((el) => el.classList.add("show"));
    }

    // ── SMOOTH SCROLL PARA ÂNCORAS ────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navbarH = navbar ? navbar.offsetHeight : 80;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navbarH - 8;

        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });

    // ── ACTIVE LINK NA NAVBAR (SCROLL SPY) ───────────────
    const secoes = document.querySelectorAll("section[id], header[id]");
    const linksNav = navbar ? navbar.querySelectorAll("ul a[href^='#']") : [];

    if (secoes.length && linksNav.length) {
      const ativarLink = () => {
        const navbarH = navbar ? navbar.offsetHeight : 80;
        let secaoAtual = "";

        secoes.forEach((sec) => {
          const top = sec.offsetTop - navbarH - 60;
          if (window.scrollY >= top) {
            secaoAtual = sec.getAttribute("id");
          }
        });

        linksNav.forEach((link) => {
          link.classList.remove("ativo");
          const destino = link.getAttribute("href").replace("#", "");
          if (destino === secaoAtual) {
            link.classList.add("ativo");
          }
        });
      };

      window.addEventListener("scroll", ativarLink, { passive: true });
      ativarLink();
    }

  }); // DOMContentLoaded

})(); // IIFE
