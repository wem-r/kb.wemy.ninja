/* wem theme — search overlay. "/" or the bar button opens it; the index is
   /index.json (built by Hugo). Ranking: title > headings > path > text. */
(function () {
  'use strict';
  var wrap = document.getElementById('wm-search');
  if (!wrap) return;
  var q = document.getElementById('wm-search-q');
  var list = document.getElementById('wm-search-res');
  var count = document.getElementById('wm-search-n');
  var src = (document.querySelector('meta[name="wm-search-index"]') || {}).content;
  var index = null, sel = 0, hits = [];

  function load() {
    if (index) return Promise.resolve(index);
    return fetch(src).then(function (r) { return r.json(); }).then(function (d) {
      index = d.map(function (p) { p.lt = p.t.toLowerCase(); p.lh = (p.h || '').toLowerCase(); p.ls = p.s.toLowerCase(); p.lc = (p.c || '').toLowerCase(); return p; });
      return index;
    });
  }
  function open() { wrap.hidden = false; q.focus(); q.select(); load().then(run); }
  function close() { wrap.hidden = true; }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mark(s, terms) {
    var out = esc(s);
    terms.forEach(function (t) { if (t.length > 1) out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
    return out;
  }
  function run() {
    if (!index) return;
    var terms = q.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) { hits = []; render(terms); return; }
    hits = [];
    index.forEach(function (p) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], s = 0;
        if (p.lt.indexOf(t) >= 0) s += p.lt.indexOf(t) === 0 ? 12 : 8;
        if (p.lh.indexOf(t) >= 0) s += 4;
        if (p.ls.indexOf(t) >= 0) s += 2;
        if (p.lc.indexOf(t) >= 0) s += 1;
        if (!s) return;           // every term must match somewhere
        score += s;
      }
      hits.push({ p: p, score: score });
    });
    hits.sort(function (a, b) { return b.score - a.score || a.p.t.localeCompare(b.p.t); });
    hits = hits.slice(0, 40);
    sel = 0;
    render(terms);
  }
  function snippet(p, terms) {
    var i = -1;
    for (var k = 0; k < terms.length && i < 0; k++) i = p.lc.indexOf(terms[k]);
    if (i < 0) return p.h || '';
    var a = Math.max(0, i - 40);
    return (a ? '…' : '') + p.c.slice(a, i + 90) + '…';
  }
  function render(terms) {
    count.textContent = terms.length ? hits.length + (hits.length === 40 ? '+' : '') + ' hits' : '';
    list.innerHTML = hits.map(function (h, i) {
      return '<li class="' + (i === sel ? 'on' : '') + '" role="option"><a href="' + h.p.u + '">' +
        '<span class="t">' + mark(h.p.t, terms) + '</span>' +
        '<span class="p">~' + esc(h.p.s) + '</span>' +
        '<span class="x">' + mark(snippet(h.p, terms), terms) + '</span></a></li>';
    }).join('');
  }
  function move(d) {
    if (!hits.length) return;
    sel = (sel + d + hits.length) % hits.length;
    Array.prototype.forEach.call(list.children, function (li, i) { li.classList.toggle('on', i === sel); });
    list.children[sel].scrollIntoView({ block: 'nearest' });
  }
  q.addEventListener('input', run);
  q.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter' && hits[sel]) { location.href = hits[sel].p.u; }
    else if (e.key === 'Escape') { close(); }
  });
  wrap.addEventListener('mousedown', function (e) { if (e.target === wrap) close(); });
  Array.prototype.forEach.call(document.querySelectorAll('.wm-search-open'), function (b) { b.addEventListener('click', open); });
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && wrap.hidden && tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) { e.preventDefault(); open(); }
    else if (e.key === 'Escape' && !wrap.hidden) close();
  });
})();
