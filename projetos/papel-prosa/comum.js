// Único JavaScript do site: links do WhatsApp, teste de nome e cor, botão fixo e entrada das seções.

// PENDÊNCIA: número de WhatsApp do negócio ainda não foi informado. Formato: 55 + DDD + número, só dígitos.
const ZAP = "";
const MENSAGEM = "Olá, Papel Prosa! Vim pelo site e gostaria de fazer um pedido.";

function ligaZap(link, texto) {
  if (!ZAP) { return; }
  link.href = "https://wa.me/" + ZAP + "?text=" + encodeURIComponent(texto || MENSAGEM);
  link.target = "_blank";
  link.rel = "noopener";
}
document.querySelectorAll("[data-zap]").forEach(function (l) { ligaZap(l, l.dataset.zap); });
const aviso = document.getElementById("aviso-zap");
if (aviso && !ZAP) { aviso.hidden = false; }

// Teste: o nome e a cor aparecem na etiqueta, no adesivo e no marcador. Nada é enviado.
const campo = document.getElementById("nome");
const palco = document.getElementById("palco");
const pedir = document.getElementById("demo-zap");
const NOMES_COR = { tomate: "tomate", rosa: "rosa", sol: "amarelo", menta: "menta", tinta: "azul-marinho" };
let corAtual = "tomate";
function atualiza() {
  const nome = campo.value.trim() || "Seu nome";
  document.querySelectorAll(".nome-demo").forEach(function (e) { e.textContent = nome; });
  ligaZap(pedir, "Olá, Papel Prosa! Vi o teste no site e quero uma peça com o nome " + nome + ", na cor " + NOMES_COR[corAtual] + ".");
}
if (campo && palco) {
  campo.addEventListener("input", atualiza);
  document.querySelectorAll(".cor").forEach(function (b) {
    b.addEventListener("click", function () {
      corAtual = b.dataset.cor;
      palco.className = "palco cor-" + corAtual;
      document.querySelectorAll(".cor").forEach(function (o) {
        const on = o === b;
        o.classList.toggle("on", on);
        o.setAttribute("aria-pressed", String(on));
      });
      atualiza();
    });
  });
  atualiza();
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
  let a = true, b = false;
  const atualizar = function () { fixo.classList.toggle("visivel", !a && !b); };
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
