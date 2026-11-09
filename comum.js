(function () {
  var raiz = document.documentElement; raiz.classList.add('js');
  var topo = document.querySelector('.topo');
  function rola() { topo.classList.toggle('rolou', window.scrollY > 8); }
  window.addEventListener('scroll', rola, { passive: true }); rola();
  var itens = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { itens.forEach(function (e) { e.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  itens.forEach(function (e, i) { e.style.transitionDelay = (e.closest('.passos') ? (i % 4) * 90 : 0) + 'ms'; io.observe(e); });
})();
