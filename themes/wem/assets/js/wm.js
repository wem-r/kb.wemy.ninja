/* wem theme — window-manager behaviour: theme toggle, tree, toc, scroll %,
   copy buttons, tile focus, phone tabs, keyboard shortcuts. No dependencies. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var here = decodeURIComponent(location.pathname);

  /* ---------- theme toggle ---------- */
  var root = document.documentElement;
  function paintToggle() { $$('.wm-theme-toggle .lbl').forEach(function (e) { e.textContent = root.dataset.theme; }); }
  $$('.wm-theme-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      store.set('wm-theme', root.dataset.theme);
      paintToggle();
    });
  });
  paintToggle();

  /* ---------- [1] tree ---------- */
  var tree = $('.wm-tree');
  if (tree) {
    var openSet = {};
    try { openSet = JSON.parse(store.get('wm-tree-open') || '{}') || {}; } catch (e) { openSet = {}; }
    var saveOpen = function () { store.set('wm-tree-open', JSON.stringify(openSet)); };
    $$('.tn', tree).forEach(function (tn) {
      if (openSet[tn.dataset.path]) setOpen(tn, true);
    });
    // current page: select it and open every folder above it
    var cur = $$('[data-path]', tree).filter(function (e) { return decodeURIComponent(e.dataset.path) === here; })[0];
    if (cur) {
      var row = cur.classList.contains('tn') ? $('.tr', cur) : cur;
      row.classList.add('sel');
      row.setAttribute('aria-current', 'page');
      for (var p = cur.parentElement; p && p !== tree; p = p.parentElement) {
        if (p.classList.contains('tn')) setOpen(p, true);
      }
      if (cur.classList.contains('tn')) setOpen(cur, true);
      requestAnimationFrame(function () {
        var box = tree.closest('.wm-tb');
        var top = row.getBoundingClientRect().top - box.getBoundingClientRect().top;
        if (top > box.clientHeight - 40) box.scrollTop = top - box.clientHeight / 3;
      });
    }
    tree.addEventListener('click', function (ev) {
      var bx = ev.target.closest('.bx');
      if (!bx) return;
      var tn = bx.closest('.tn');
      var open = !tn.classList.contains('open');
      setOpen(tn, open);
      if (open) openSet[tn.dataset.path] = 1; else delete openSet[tn.dataset.path];
      saveOpen();
    });
  }
  function setOpen(tn, open) {
    tn.classList.toggle('open', open);
    var r = $('.tr', tn); if (r) r.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  /* ---------- [2] note: scroll %, [3] toc scrollspy ---------- */
  var scroller = $('#wm-scroll');
  var pct = $('#wm-pct');
  var tocLinks = $$('.wm-toc a[href^="#"]');
  var heads = tocLinks.map(function (a) { return document.getElementById(decodeURIComponent(a.hash.slice(1))); });
  function onScroll() {
    if (!scroller) return;
    var max = scroller.scrollHeight - scroller.clientHeight;
    if (pct) pct.textContent = max <= 0 ? 'all' : scroller.scrollTop <= 2 ? 'top' : scroller.scrollTop >= max - 2 ? 'bot' : Math.round(scroller.scrollTop / max * 100) + '%';
    if (!tocLinks.length) return;
    var line = scroller.getBoundingClientRect().top + 80, on = -1;
    heads.forEach(function (h, i) { if (h && h.getBoundingClientRect().top <= line) on = i; });
    if (scroller.scrollTop >= max - 2) on = heads.length - 1;
    tocLinks.forEach(function (a, i) { a.classList.toggle('on', i === on); });
    var act = tocLinks[on];
    if (act) {
      var box = act.closest('.wm-tb'), r = act.getBoundingClientRect(), b = box.getBoundingClientRect();
      if (r.top < b.top || r.bottom > b.bottom) box.scrollTop += r.top - b.top - b.height / 3;
    }
  }
  if (scroller) {
    scroller.addEventListener('scroll', function () { requestAnimationFrame(onScroll); }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---------- copy buttons (terminal: commands only) ---------- */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('.wm-copy');
    if (!b) return;
    var box = b.closest('.wm-code, .wm-term'), text;
    if (box.classList.contains('wm-term')) {
      text = $$('.line', box).filter(function (l) { return !l.classList.contains('go'); })
        .map(function (l) { var c = $('.cmd', l); return c ? c.textContent : ''; }).join('\n');
    } else {
      var code = $('pre code', box) || $('pre', box);
      text = code ? code.innerText : '';
    }
    text = text.replace(/\n+$/, '');
    var done = function () { b.textContent = 'copied'; b.classList.add('ok'); setTimeout(function () { b.textContent = 'copy'; b.classList.remove('ok'); }, 1400); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { b.textContent = 'failed'; });
  });

  /* ---------- tile focus + phone tabs ---------- */
  var desk = $('#wm-desk');
  if (desk) {
    desk.addEventListener('mousedown', function (ev) {
      var t = ev.target.closest('.wm-t');
      if (!t || t.classList.contains('focus')) return;
      $$('.wm-t', desk).forEach(function (x) { x.classList.toggle('focus', x === t); });
    });
    var show = function (name) {
      $$('.wm-t', desk).forEach(function (t) { t.classList.toggle('shown', t.dataset.tab === name); });
      $$('.wm-tabs button', desk).forEach(function (b) { b.classList.toggle('on', b.dataset.show === name); });
      if (name === 'graph') window.dispatchEvent(new Event('wm:graph'));
    };
    $$('.wm-tabs button', desk).forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.show); }); });
    show('note');
    // on phones, following a tree / toc link returns to the note
    $$('.wm-toc a').forEach(function (a) { a.addEventListener('click', function () { show('note'); }); });
  }

  /* ---------- 404: show the address asked for ---------- */
  $$('.wm-404-path').forEach(function (e) { e.textContent = here; });

  /* ---------- keyboard: 1-9 workspaces, / search, j/k scroll, g/G top/bottom ---------- */
  document.addEventListener('keydown', function (ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var tag = (ev.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || ev.target.isContentEditable) return;
    if (/^[1-9]$/.test(ev.key)) {
      var ws = $('.wm-ws a[data-key="' + ev.key + '"]');
      if (ws) { ev.preventDefault(); location.href = ws.href; }
    } else if (scroller && (ev.key === 'j' || ev.key === 'k')) {
      scroller.scrollBy({ top: ev.key === 'j' ? 60 : -60 });
    } else if (scroller && ev.key === 'g') {
      scroller.scrollTo({ top: 0 });
    } else if (scroller && ev.key === 'G') {
      scroller.scrollTo({ top: scroller.scrollHeight });
    }
  });
})();
