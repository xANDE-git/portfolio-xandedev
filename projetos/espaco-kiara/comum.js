// Único JavaScript do site: links do WhatsApp, menu do celular, cabeçalho ao rolar e entrada suave das seções.

// PENDÊNCIA: número de WhatsApp do salão ainda não informado. Formato: 55 + DDD + número, só dígitos.
const ZAP = "";
const MENSAGEM = "Olá, Espaço Kiara! Vim pelo site e gostaria de agendar um horário.";

document.querySelectorAll("[data-zap]").forEach(function (link) {
  if (!ZAP) { return; }
  link.href = "https://wa.me/" + ZAP + "?text=" + encodeURIComponent(link.dataset.zap || MENSAGEM);
  link.target = "_blank";
  link.rel = "noopener";
});
const aviso = document.getElementById("aviso-zap");
if (aviso && !ZAP) { aviso.hidden = false; }

const botao = document.querySelector(".menu-botao");
const menu = document.getElementById("menu");
if (botao && menu) {
  const fechar = function () { menu.classList.remove("aberto"); botao.setAttribute("aria-expanded", "false"); botao.setAttribute("aria-label", "Abrir menu"); };
  botao.addEventListener("click", function () {
    const abrir = !menu.classList.contains("aberto");
    menu.classList.toggle("aberto", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) { fechar(); } });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { fechar(); } });
}

const topo = document.querySelector("[data-topo]");
if (topo) {
  const rolar = function () { topo.classList.toggle("rolou", window.scrollY > 12); };
  rolar();
  window.addEventListener("scroll", rolar, { passive: true });
}

const fixo = document.querySelector(".zap-fixo");
const inicio = document.querySelector("[data-hero]");
const rodape = document.querySelector("footer");
if (fixo && inicio && rodape && "IntersectionObserver" in window) {
  fixo.style.opacity = "0"; fixo.style.pointerEvents = "none";
  let a = true, b = false;
  const atualizar = function () { const ver = !a && !b; fixo.style.opacity = ver ? "1" : "0"; fixo.style.pointerEvents = ver ? "auto" : "none"; };
  new IntersectionObserver(function (e) { a = e[0].isIntersecting; atualizar(); }).observe(inicio);
  new IntersectionObserver(function (e) { b = e[0].isIntersecting; atualizar(); }).observe(rodape);
}

const itens = document.querySelectorAll(".rev");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  itens.forEach(function (i) { io.observe(i); });
} else {
  itens.forEach(function (i) { i.classList.add("on"); });
}
