/* Barbearia Tradição - protótipo. Script único, sem bibliotecas. */
(function () {
  'use strict';
  var WA = '5531999990000';
  var MSG = 'Olá! Vim pelo site e gostaria de agendar um horário na Barbearia Tradição.';

  /* Links de WhatsApp: <a data-wa> ou <a data-wa="mensagem personalizada"> */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var m = a.getAttribute('data-wa') || MSG;
    a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(m);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Menu do celular */
  var btn = document.querySelector('.menu-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Cabeçalho muda ao rolar */
  var head = document.querySelector('.topo');
  function onScroll() {
    if (head) head.classList.toggle('rolou', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Aberto agora (horário de Brasília, conforme o AppBarber) */
  var HORARIO = {
    2: [[480, 690], [780, 1200]],
    3: [[480, 690], [780, 1200]],
    4: [[480, 690], [780, 1200]],
    5: [[480, 690], [780, 1200]],
    6: [[480, 720], [780, 1200]]
  };
  function agora() {
    try {
      var p = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var o = {};
      p.forEach(function (x) { o[x.type] = x.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { d: dias[o.weekday], m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) { return null; }
  }
  var t = agora();
  document.querySelectorAll('[data-aberto]').forEach(function (el) {
    if (!t) { el.hidden = true; return; }
    var faixas = HORARIO[t.d] || [];
    var aberto = faixas.some(function (f) { return t.m >= f[0] && t.m < f[1]; });
    el.classList.add(aberto ? 'on' : 'off');
    el.querySelector('.txt').textContent = aberto ? 'Aberto agora' : 'Fechado agora';
  });

  /* Destaca o dia de hoje na tabela de horários */
  if (t) {
    document.querySelectorAll('[data-dia="' + t.d + '"]').forEach(function (el) { el.classList.add('hoje'); });
  }

  /* Aparecer ao rolar (respeita prefers-reduced-motion) */
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var itens = document.querySelectorAll('.rv');
  if (reduz || !('IntersectionObserver' in window)) {
    itens.forEach(function (i) { i.classList.add('vis'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    itens.forEach(function (i) { io.observe(i); });
  }

  /* Carrossel do topo (opcional): <div data-carrossel> com .slide e .pontos */
  document.querySelectorAll('[data-carrossel]').forEach(function (c) {
    var slides = c.querySelectorAll('.slide');
    var pontos = c.querySelectorAll('.pontos button');
    if (slides.length < 2) return;
    var i = 0, timer;
    function ir(n) {
      slides[i].classList.remove('ativo'); if (pontos[i]) pontos[i].classList.remove('ativo');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('ativo'); if (pontos[i]) pontos[i].classList.add('ativo');
    }
    pontos.forEach(function (p, n) { p.addEventListener('click', function () { ir(n); parar(); }); });
    function parar() { clearInterval(timer); }
    var reduzC = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduzC) timer = setInterval(function () { ir(i + 1); }, 6000);
  });

  var y = document.querySelector('[data-ano]');
  if (y) y.textContent = new Date().getFullYear();
})();
