/* wem theme — [4] local graph: the current note, the notes it links to or is
   linked from, and its folder. Data: /graph.json (built by Hugo on every deploy). */
(function () {
  'use strict';
  var box = document.querySelector('.wm-graph');
  if (!box) return;
  var src = (document.querySelector('meta[name="wm-graph"]') || {}).content;
  var me = box.dataset.page;
  var NS = 'http://www.w3.org/2000/svg';
  var data = null;

  function el(name, attrs) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function colour(n) {
    var s = getComputedStyle(document.documentElement);
    if (n.id === me) return s.getPropertyValue('--cyan');
    if (n.s) return s.getPropertyValue('--yel');
    return s.getPropertyValue('--pink');
  }
  function draw() {
    if (!data || !box.clientWidth) return;
    box.textContent = '';
    var byId = {}; data.nodes.forEach(function (n) { byId[n.id] = n; });
    var nb = {}, edges = [];
    data.links.forEach(function (l) {
      if (l.a === me || l.b === me) { var o = l.a === me ? l.b : l.a; if (byId[o]) { nb[o] = nb[o] || l.k; if (l.k === 'l') nb[o] = 'l'; } }
    });
    var ids = Object.keys(nb);
    // links between the neighbours themselves
    data.links.forEach(function (l) { if (nb[l.a] && nb[l.b]) edges.push(l); });
    var W = box.clientWidth, H = box.clientHeight, cx = W / 2, cy = H / 2;
    var R = Math.max(40, Math.min(W, H) / 2 - 34);
    var pos = {}; pos[me] = [cx, cy];
    ids.sort(function (a, b) { return (nb[a] === 't') - (nb[b] === 't') || a.localeCompare(b); });
    ids.forEach(function (id, i) {
      var ang = -Math.PI / 2 + (i / Math.max(ids.length, 1)) * Math.PI * 2 + (ids.length === 2 ? Math.PI / 4 : 0);
      var r = R * (ids.length > 8 ? (i % 2 ? .62 : 1) : .9);
      pos[id] = [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
    });
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Notes linked to this page' });
    ids.forEach(function (id) { svg.appendChild(el('line', { x1: cx, y1: cy, x2: pos[id][0], y2: pos[id][1], class: nb[id] })); });
    edges.forEach(function (l) { svg.appendChild(el('line', { x1: pos[l.a][0], y1: pos[l.a][1], x2: pos[l.b][0], y2: pos[l.b][1], class: l.k })); });
    [me].concat(ids).forEach(function (id) {
      var n = byId[id] || { id: id, n: document.title }, p = pos[id], isMe = id === me;
      var g = el('g', { class: 'n' });
      var c = el('circle', { cx: p[0], cy: p[1], r: isMe ? 8 : n.s ? 5.5 : 5, fill: colour(n), class: isMe ? 'me' : '' });
      var label = n.n.replace(/^.*→ */, '').trim(); if (label.length > 20) label = label.slice(0, 19) + '…';
      var t = el('text', { x: p[0], y: p[1] + (isMe ? 20 : 16) }); t.textContent = label;
      var tip = el('title', {}); tip.textContent = n.n;
      g.appendChild(tip); g.appendChild(c); g.appendChild(t);
      if (!isMe) g.addEventListener('click', function () { location.href = id; });
      svg.appendChild(g);
    });
    if (!ids.length) {
      var e = el('text', { x: cx, y: cy + 24 }); e.textContent = 'no links yet'; svg.appendChild(e);
    }
    box.appendChild(svg);
  }
  fetch(src).then(function (r) { return r.json(); }).then(function (d) { data = d; draw(); }).catch(function () {});
  window.addEventListener('resize', function () { requestAnimationFrame(draw); });
  window.addEventListener('wm:graph', function () { requestAnimationFrame(draw); });
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
