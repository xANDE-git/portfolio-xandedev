// Único JavaScript do site: monta os links do WhatsApp e controla o botão fixo no celular.

const ZAP = "5531900000000";
const MENSAGEM = "Olá, DedetiMax! Vim pelo site e gostaria de pedir um orçamento.";

// Todo link com data-zap vira um link do WhatsApp com a mensagem pronta.
// Se o link tiver data-zap="outra mensagem", usa essa mensagem no lugar.
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
