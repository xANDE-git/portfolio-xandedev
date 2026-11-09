// Único JavaScript do site: monta os links do WhatsApp, controla o botão fixo no celular e a entrada das seções.

const ZAP = "5531999990000";
const MENSAGEM = "Olá, Oficina Mecânica Turbocar! Vim pelo site e gostaria de pedir um orçamento.";

// Todo link com data-zap vira um link do WhatsApp com a mensagem pronta.
document.querySelectorAll("[data-zap]").forEach(function (link) {
  const texto = link.dataset.zap || MENSAGEM;
  link.href = "https://wa.me/" + ZAP + "?text=" + encodeURIComponent(texto);
});

// Botão fixo: aparece depois que a primeira dobra sai da tela
// e some quando o rodapé (que já tem botão) aparece.
const fixo = document.querySelector(".zap-fixo");
const inicio = document.querySelector("[data-hero]");
const rodape = document.querySelector("footer");

if (fixo && inicio && rodape && "IntersectionObserver" in window) {
  let inicioNaTela = true;
  let rodapeNaTela = false;
  const atualizar = function () {
    fixo.classList.toggle("visivel", !inicioNaTela && !rodapeNaTela);
  };
  new IntersectionObserver(function (e) { inicioNaTela = e[0].isIntersecting; atualizar(); }).observe(inicio);
  new IntersectionObserver(function (e) { rodapeNaTela = e[0].isIntersecting; atualizar(); }).observe(rodape);
}

// Entrada suave ao rolar nos navegadores que não têm a animação por CSS (Safari, Firefox).
if ("IntersectionObserver" in window && !CSS.supports("animation-timeline: view()") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-surge");
  const io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".surge").forEach(function (el) { el.classList.add("surge-js"); io.observe(el); });
}
