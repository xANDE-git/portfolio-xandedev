// Único JavaScript do site: WhatsApp, menu do celular, filtro e setas do carrossel, botão fixo.
const ZAP = document.documentElement.dataset.numero;

document.querySelectorAll("[data-zap]").forEach(function (a) {
  a.href = "https://wa.me/" + ZAP + "?text=" + encodeURIComponent(a.dataset.zap);
  a.target = "_blank";
  a.rel = "noopener";
});

const hamb = document.querySelector(".hamb");
const menu = document.getElementById("menu");
hamb.addEventListener("click", function () {
  const aberto = menu.classList.toggle("aberto");
  hamb.setAttribute("aria-expanded", aberto);
});
menu.addEventListener("click", function (e) {
  if (e.target.tagName === "A") { menu.classList.remove("aberto"); hamb.setAttribute("aria-expanded", false); }
});

const trilho = document.querySelector(".trilho");
document.querySelectorAll(".chip[data-filtro]").forEach(function (chip) {
  chip.addEventListener("click", function () {
    document.querySelectorAll(".chip[data-filtro]").forEach(function (c) { c.classList.toggle("ativo", c === chip); });
    const f = chip.dataset.filtro;
    trilho.querySelectorAll(".prod").forEach(function (p) { p.hidden = f !== "Todos" && p.dataset.cat !== f; });
    trilho.scrollTo({ left: 0 });
  });
});
document.querySelector(".seta-e").addEventListener("click", function () { trilho.scrollBy({ left: -324, behavior: "smooth" }); });
document.querySelector(".seta-d").addEventListener("click", function () { trilho.scrollBy({ left: 324, behavior: "smooth" }); });

// O botão fixo aparece depois da primeira dobra e some no rodapé.
const fixo = document.querySelector(".zap-fixo");
const inicio = document.querySelector("[data-hero]");
const rodape = document.querySelector(".rodape");
if ("IntersectionObserver" in window) {
  let noInicio = true, noRodape = false;
  const celular = window.matchMedia("(max-width: 640px)");
  const atualizar = function () { fixo.classList.toggle("visivel", (!noInicio || celular.matches) && !noRodape); };
  new IntersectionObserver(function (e) { noInicio = e[0].isIntersecting; atualizar(); }).observe(inicio);
  new IntersectionObserver(function (e) { noRodape = e[0].isIntersecting; atualizar(); }).observe(rodape);
} else {
  fixo.classList.add("visivel");
}

// Animação de entrada: cada bloco aparece ao chegar na tela (sem JS ou com "reduzir movimento", tudo já aparece).
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js");
  const alvos = document.querySelectorAll(".destaque-foto, .destaque-texto, .produtos-topo, .trilho, .historia-grade > *, .como h2, .passos li, .aval-esq, .aval-dir, .cta > *, .b-foto, .b-texto, .b-chef");
  const io = new IntersectionObserver(function (itens) {
    itens.forEach(function (i) { if (i.isIntersecting) { i.target.classList.add("in"); io.unobserve(i.target); } });
  }, { threshold: 0.15 });
  alvos.forEach(function (el, n) {
    el.classList.add("rev");
    el.style.setProperty("--d", (el.matches(".passos li, .b-foto, .b-texto, .b-chef") ? (n % 4) * 0.1 : 0) + "s");
    io.observe(el);
  });
}
