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

// /carreira/: marca no menu a seção que está na tela.
(function () {
  var links = document.querySelectorAll('.lado nav a');
  if (!links.length || !('IntersectionObserver' in window)) return;
  var mapa = {};
  links.forEach(function (a) { mapa[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('on'); });
      var a = mapa[e.target.id]; if (a) { a.classList.add('on'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(mapa).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
})();

// /carreira/: botão que recolhe e abre a barra lateral (lembra a escolha neste navegador).
(function () {
  var b = document.querySelector('.lado-bt');
  if (!b) return;
  var raiz = document.body;
  function aplica(off) {
    raiz.classList.toggle('lado-off', off);
    b.setAttribute('aria-expanded', off ? 'false' : 'true');
    b.setAttribute('aria-label', off ? 'Abrir a barra lateral' : 'Recolher a barra lateral');
  }
  try { aplica(localStorage.getItem('lado') === 'off'); } catch (e) {}
  b.addEventListener('click', function () {
    var off = !raiz.classList.contains('lado-off');
    aplica(off);
    try { localStorage.setItem('lado', off ? 'off' : 'on'); } catch (e) {}
  });
})();
