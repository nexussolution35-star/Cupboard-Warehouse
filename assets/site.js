/* Cupboard Warehouse — shared interactivity (vanilla JS, no framework) */
(function () {
  // ---- Services dropdown ----
  window.toggleSvc = function (e) {
    e.stopPropagation();
    var m = document.getElementById('svcMenu');
    if (m) m.classList.toggle('open');
  };
  document.addEventListener('click', function () {
    var m = document.getElementById('svcMenu');
    if (m) m.classList.remove('open');
  });

  // ---- Mobile menu ----
  window.toggleMob = function (e) {
    if (e) e.stopPropagation();
    var m = document.getElementById('mob');
    if (m) m.classList.toggle('open');
  };
  var mob = document.getElementById('mob');
  if (mob) {
    mob.addEventListener('click', function (ev) {
      if (ev.target === mob) mob.classList.remove('open');
    });
    mob.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mob.classList.remove('open'); });
    });
  }

  // ---- FAQ accordion ----
  window.toggleFaq = function (btn) {
    btn.parentElement.classList.toggle('open');
  };

  // ---- Quote form placeholder handler ----
  window.submitForm = function (e) {
    e.preventDefault();
    alert("Thank you! Cupboard Warehouse will call you back within 5 minutes during business hours.\n\n(Replace this placeholder with your CRM / email handler.)");
    e.target.reset();
  };

  // ---- Smooth-scroll for in-page anchors ----
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var t = document.querySelector(id);
        if (t) { ev.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });

  // ---- Gallery carousel ----
  var track = document.getElementById('carTrack');
  if (track) {
    var files = [
      'modern-kitchen-nelspruit.jpg',
      'fitted-kitchen-cupboards-mbombela.jpg',
      'white-fitted-kitchen-white-river.jpg',
      'kitchen-island-granite-top.jpg',
      'luxury-kitchen-design-nelspruit.jpg',
      'modern-kitchen-cupboards-hazyview.jpg',
      'kitchen-renovation-secunda.jpg',
      'granite-countertops-mpumalanga.jpg',
      'custom-kitchen-barberton.jpg',
      'white-kitchen-cupboards-mpumalanga.jpg',
      'kitchen-renovation-witbank.jpg',
      'bedroom-cupboards-nelspruit.jpg',
      'dark-kitchen-renovation-ermelo.jpg',
      'walk-in-wardrobe-nelspruit.jpg',
      'quartz-countertops-mbombela.jpg',
      'kitchen-renovation-malelane.jpg',
      'modern-fitted-kitchen-mpumalanga.jpg'
    ];
    var total = files.length, idx = 0;
    var imgs = files.map(function (f) { return 'assets/work/' + f; });
    var dotsWrap = document.getElementById('carDots');
    function render() {
      var prev = (idx - 1 + total) % total;
      var next = (idx + 1) % total;
      track.innerHTML =
        '<div class="slide side"><img src="' + imgs[prev] + '" alt="Kitchen project"></div>' +
        '<div class="slide main"><img src="' + imgs[idx] + '" alt="Featured kitchen project"></div>' +
        '<div class="slide side"><img src="' + imgs[next] + '" alt="Kitchen project"></div>';
      if (dotsWrap) {
        var d = '';
        for (var k = 0; k < total; k++) d += '<button class="' + (k === idx ? 'on' : '') + '" aria-label="Slide ' + (k + 1) + '"></button>';
        dotsWrap.innerHTML = d;
        dotsWrap.querySelectorAll('button').forEach(function (b, k) {
          b.addEventListener('click', function () { idx = k; render(); });
        });
      }
    }
    window.moveCar = function (dir) { idx = (idx + dir + total) % total; render(); };
    render();
    setInterval(function () { window.moveCar(1); }, 6000);
  }

  // ---- Brand marquee ----
  document.querySelectorAll('.marquee-track').forEach(function (el) {
    if (el.innerHTML.trim()) return;
    var icon = el.getAttribute('data-icon') || 'assets/favicon.png';
    var unit = '<div class="marquee-item"><img src="' + icon + '" alt=""><span>Cupboard Warehouse</span></div>';
    var html = '';
    for (var i = 0; i < 12; i++) html += unit;
    el.innerHTML = html;
  });

  // ---- Scroll reveal ----
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
