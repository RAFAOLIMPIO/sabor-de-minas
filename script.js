// ======================================================
// SABOR DE MINAS - SCRIPT PRINCIPAL ATUALIZADO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("menu-hamburger");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar") || document.querySelector("nav");
  const whatsappBtn = document.querySelector(".whatsapp-float");
  const anoAtual = document.getElementById("anoAtual");

  // MENU MOBILE
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll("#nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // NAVBAR AO ROLAR
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ANIMAÇÃO AO ENTRAR NA TELA
  const elementosAnimados = document.querySelectorAll(
    ".card-prato, .foto-box, .horario-row, .contato-bloco, .nd-item, .beneficio-card, .preco-item, .self-texto"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elementosAnimados.forEach((el) => {
      el.classList.add("hidden");
      observer.observe(el);
    });
  } else {
    elementosAnimados.forEach((el) => el.classList.add("show"));
  }

  // WHATSAPP FLUTUANTE
  if (whatsappBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        whatsappBtn.classList.add("visible");
      } else {
        whatsappBtn.classList.remove("visible");
      }
    });
  }

  // ANO AUTOMÁTICO
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }
});