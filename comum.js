// Faz o conteúdo surgir quando entra na tela. Sem isso (ou com "reduzir movimento" ligado), tudo aparece direto.
(function () {
  document.documentElement.classList.add('js');
  var itens = document.querySelectorAll('.rv');
  function mostra(e) { e.classList.add('on'); }
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { itens.forEach(mostra); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { mostra(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  itens.forEach(function (e) { io.observe(e); });
})();

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.crs').forEach(function (d) {
    d.querySelector('summary').addEventListener('click', function (ev) {
      if (!d.open || d.classList.contains('fechando')) return;
      ev.preventDefault();
      d.classList.add('fechando');
      setTimeout(function () { d.open = false; d.classList.remove('fechando'); }, 330);
    });
  });
})();
