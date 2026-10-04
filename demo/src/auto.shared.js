/* Halcyon sample brand: shared data and helpers for the two automotive demo pages.
   Every model, price, and figure is made up. */
var H = (function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function money(n) { return '$' + n.toLocaleString('en-US'); }

  var PAINTS = [['Glacier White', '#e8ecef'], ['Obsidian', '#1a1c22'], ['Meridian Blue', '#1f4f9c'], ['Ember Red', '#a3231c'], ['Sage', '#6d7f6b'], ['Platinum', '#a9afb6']];
  var PT = { ev: 'Electric', phev: 'Plug-in hybrid', gas: 'Gasoline' };

  // trims: [name, price, EV range (mi), horsepower, 0-60 seconds]
  var MODELS = [
    { id: 'aria', name: 'Aria', pt: 'ev', body: 'Sedan', car: 'sedan', seats: 5, paint: '#1f4f9c', charge: 18,
      tag: 'The flagship electric sedan.',
      blurb: 'A low, quiet four-door with a glass roof, a 350 kW charging system, and a cabin that stays silent at any speed.',
      trims: [['Base', 72900, 372, 480, 4.3], ['Premium', 84900, 412, 560, 3.8], ['Performance', 104900, 355, 880, 3.0]],
      features: ['Dual-motor all-wheel drive', 'Panoramic glass roof', '350 kW fast charging', 'Air suspension with road preview'] },
    { id: 'vega', name: 'Vega', pt: 'ev', body: 'SUV', car: 'suv', seats: 5, paint: '#6d7f6b', charge: 20,
      tag: 'The everyday electric SUV.',
      blurb: 'Compact outside and spacious inside, with a flat floor, a hands-free liftgate, and range for a long weekend.',
      trims: [['Base', 58900, 298, 360, 5.2], ['Premium', 66900, 318, 440, 4.6], ['Performance', 79900, 276, 620, 3.6]],
      features: ['Flat-floor five-seat cabin', 'Hands-free liftgate', '270 kW fast charging', 'Over-the-air updates'] },
    { id: 'orion', name: 'Orion', pt: 'ev', body: 'SUV', car: 'suvl', seats: 7, paint: '#e8ecef', charge: 22,
      tag: 'Three rows. Zero noise.',
      blurb: 'Room for seven adults with captain’s chairs in the second row, a quiet third row, and towing up to 7,500 pounds.',
      trims: [['Base', 86500, 329, 520, 5.0], ['Premium', 98500, 355, 610, 4.4], ['Performance', 118500, 308, 880, 3.5]],
      features: ['Seven seats with captain’s chairs', 'Tows up to 7,500 lb', '350 kW fast charging', 'Rear-seat entertainment'] },
    { id: 'nova', name: 'Nova', pt: 'ev', body: 'Coupe', car: 'coupe', seats: 4, paint: '#a3231c', charge: 19,
      tag: 'The electric grand tourer.',
      blurb: 'A hand-finished two-door built in limited numbers, with a carbon-fiber body and three motors.',
      trims: [['Grand Touring', 138000, 380, 700, 3.2], ['Signature', 168000, 360, 1020, 2.5]],
      features: ['Tri-motor all-wheel drive', 'Carbon-fiber body', 'Limited production', 'Bespoke interior program'] },
    { id: 'atlas', name: 'Atlas', pt: 'phev', body: 'SUV', car: 'suv', seats: 7, paint: '#1a1c22', charge: 0, fuelLeg: 480, fuelMins: 8, total: 510,
      tag: 'Electric around town, V6 on the open road.',
      blurb: 'A plug-in hybrid full-size SUV with 42 miles of electric range and a turbocharged V6 for everything beyond.',
      trims: [['Base', 79900, 42, 470, 5.4], ['Premium', 91900, 42, 520, 5.1], ['Performance', 112900, 38, 640, 4.4]],
      features: ['42 miles of electric range', 'Turbocharged V6 hybrid', 'Seven seats', 'Plugs into any outlet'] },
    { id: 'regent', name: 'Regent', pt: 'gas', body: 'Sedan', car: 'sedan', seats: 5, paint: '#a9afb6', charge: 0, fuelLeg: 420, fuelMins: 8, mpg: '17/25',
      tag: 'Twin-turbo V8. Hand-stitched leather.',
      blurb: 'The traditional flagship: a twin-turbo V8, rear-wheel drive, and a long wheelbase tuned for quiet motorway miles.',
      trims: [['Base', 98500, 0, 520, 4.4], ['Premium', 114500, 0, 563, 4.1], ['Signature', 139500, 0, 650, 3.7]],
      features: ['4.0-liter twin-turbo V8', 'Rear-wheel drive', 'Executive rear seating', 'Hand-stitched leather'] }
  ];
  MODELS.forEach(function (m) { m.trims = m.trims.map(function (t) { return { n: t[0], price: t[1], range: t[2], hp: t[3], zero: t[4] }; }); });
  function byId(id) { for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i]; }
  function from(m) { return m.trims[0].price; }
  function best(m) { return m.trims.reduce(function (a, t) { return t.range > a.range ? t : a; }, m.trims[0]); }
  function range(m, t) { t = t || best(m); return m.pt === 'ev' ? t.range + ' mi' : m.pt === 'phev' ? t.range + ' mi EV' : m.mpg + ' mpg'; }
  function rangeLabel(m) { return m.pt === 'ev' ? 'Est. range' : m.pt === 'phev' ? 'Electric range' : 'City / hwy'; }
  function ptBadge(m) { return '<span class="pt ' + m.pt + '">' + PT[m.pt] + '</span>'; }
  function carSvg(m, paint, cls) {
    return '<svg class="car ' + (cls || '') + '" viewBox="0 0 400 140" role="img" aria-label="' + esc(m.name + ' side view') + '" style="--paint:' + (paint || m.paint) + '"><use href="#car-' + m.car + '"/></svg>';
  }

  var GLYPH = { info: 'i', success: '✓', warn: '!', error: '×' };
  function toast(kind, title, msg) {
    var box = $('#toasts'); if (!box) return;
    var el = document.createElement('div');
    el.className = 'snow-hud ' + kind; el.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    el.innerHTML = '<span class="ico" aria-hidden="true">' + GLYPH[kind] + '</span><div><h4></h4><p></p></div><button class="x" aria-label="Dismiss">×</button>';
    $('h4', el).textContent = title; $('p', el).textContent = msg;
    function close() { if (el.parentNode) { el.classList.add('is-out'); setTimeout(function () { el.remove(); }, 220); } }
    $('.x', el).addEventListener('click', close);
    box.appendChild(el); setTimeout(close, 4500);
  }

  function initChrome() {
    var page = document.body.getAttribute('data-page');
    if (page === 'models') { var a = $('[data-nav=models]'); if (a) a.setAttribute('aria-current', 'page'); }
    var mb = $('#menu-btn'), mn = $('#mobile-nav');
    if (mb) mb.addEventListener('click', function () { var o = !mn.hasAttribute('data-open'); mn.toggleAttribute('data-open', o); mb.setAttribute('aria-expanded', o); });
    var si = $('#hd-signin'); if (si) si.addEventListener('click', function () { toast('info', 'This is a sample site', 'Sign-in is not wired up. Nothing here is real.'); });
    var top = $('#totop');
    window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 700); }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  }

  return { $: $, $$: $$, esc: esc, money: money, reduce: reduce, PAINTS: PAINTS, PT: PT, MODELS: MODELS, byId: byId, from: from, best: best, range: range, rangeLabel: rangeLabel, ptBadge: ptBadge, carSvg: carSvg, toast: toast, initChrome: initChrome };
})();
