/* ============================================================================
   SalesGenius PROOF WALL — global, reusable testimonial section
   ============================================================================
   HOW TO INSTALL ON ANY FUNNEL PAGE (2 lines):

     <div class="sg-proof-wall"></div>
     <script src="https://YOUR-MAIN-DOMAIN/assets/proof-wall.js"></script>

   Options (attributes on the div):
     data-base="https://YOUR-MAIN-DOMAIN"  -> required on OTHER domains, so
                                              self-hosted videos/images resolve.
                                              Omit (or "") on the main funnel.
     data-max="6"                          -> show only the first N items.
     data-disclaimer="off"                 -> hide the results disclaimer line.

   TO ADD/REMOVE/REORDER PROOF: edit the ITEMS array below. Every funnel that
   loads this file updates automatically on next visit. Order = display order
   (videos first, then screenshots, per Emma).

   Item shapes:
     {type:'vimeo',  id:'123', h:'hash',  cap:'Caption'}
     {type:'grain',  id:'shareId',        cap:'Caption'}
     {type:'mp4',    src:'assets/video/x.mp4', cap:'Caption', vertical:true|false}
     {type:'img',    src:'assets/img/proof/x.png', alt:'Alt text'}
   ==========================================================================*/
(function () {
  var ITEMS = [
    // ---- VIDEOS (order: strongest first) ----
    { type: 'grain', id: 'hEVAIdmTPh7RnRAm6KI1kIjqId8SyhzuREP22pQl', cap: 'Joe &amp; Kyle &mdash; their AI install wins' },
    { type: 'vimeo', id: '1181221035', h: '5b16d8c67c', cap: 'Clair &mdash; from $20K to $115K' },
    { type: 'mp4', src: 'assets/video/amir-3-appointments.mp4', cap: 'Amir &mdash; 3 appointments in under a week' },
    { type: 'vimeo', id: '992207161', h: 'a074eb8a85', cap: 'Nicole &mdash; 5 deals closed' },
    { type: 'vimeo', id: '1168284954', h: '17bd8eecc0', cap: 'High-quality leads at $11 each &mdash; 5 in 5 days' },
    { type: 'vimeo', id: '1181227890', h: 'bab317faef', cap: 'Oudi &mdash; what going all-in on AI has been like' },
    { type: 'vimeo', id: '1165402967', h: 'd4f4d673dd', cap: 'Myles ($350K &rarr; $725K GCI) &mdash; &ldquo;amazing leads&rdquo;' },
    { type: 'mp4', src: 'assets/video/dorian-shoutout.mp4', cap: 'Dorian &mdash; why he trusts SG' },
    { type: 'mp4', src: 'assets/video/peter-back-in-production.mp4', cap: 'Peter &mdash; back in production after months out' },
    { type: 'mp4', src: 'assets/video/james-lead-conversion.mp4', cap: 'James &mdash; stopped guessing which leads mattered', vertical: true },
    { type: 'mp4', src: 'assets/video/shar-low-resistance.mp4', cap: 'Shar &mdash; a low-resistance way to talk to leads' },
    // ---- SCREENSHOTS ----
    { type: 'img', src: 'assets/img/proof/proof-first-deal-sms.jpg', alt: "Client text: 'Just did my first deal with a lead from the sg ads!!'" },
    { type: 'img', src: 'assets/img/proof/proof-lofty-q1.png', alt: 'Lofty agent email: record Q1, about $7M of firm deals and 5 live listings' },
    { type: 'img', src: 'assets/img/proof/proof-chat-wall-2.png', alt: "Live training chat: 'This is crazy good' and 'Really cool'" },
    { type: 'img', src: 'assets/img/proof/proof-steph.png', alt: "Steph Cadmus: 'Totally worth paying for it!'" },
    // ---- PENDING (auto-hidden until the files exist) ----
    { type: 'img', src: 'assets/img/proof/proof-chat-wall-1.png', alt: "Live training chat: 'holy shit' and 'WOW'" },
    { type: 'img', src: 'assets/img/proof/proof-email-charlotte.png', alt: "Charlotte Bittner, REALTOR: 'My mind is blown'" },
    { type: 'img', src: 'assets/img/proof/proof-email-eric.png', alt: "Eric Landry: 'I think what you're doing is brilliant'" },
    { type: 'img', src: 'assets/img/proof/proof-zoom-room.png', alt: 'A packed live SalesGenius AI training on Zoom' }
  ];

  var DISCLAIMER = 'Results above came from SalesGenius-built campaigns and systems &mdash; the same ones we install with you. Your results depend on your market and your follow-through.';

  var CSS = '.sgpw-grid{display:grid;grid-template-columns:1fr;gap:16px;margin:30px auto 0;max-width:1120px}' +
    '@media(min-width:720px){.sgpw-grid{grid-template-columns:repeat(3,1fr)}}' +
    '.sgpw-tile{position:relative;aspect-ratio:16/9;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.16);background:#141418}' +
    '.sgpw-tile iframe,.sgpw-tile video{position:absolute;inset:0;width:100%;height:100%;border:0}' +
    '.sgpw-tile.sgpw-contain video{object-fit:contain;background:#000}' +
    '.sgpw-shot{display:flex;align-items:center;justify-content:center;padding:12px}' +
    '.sgpw-shot img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px}' +
    '.sgpw-cap{color:#A7A7B0;font-size:13px;text-align:center;margin-top:10px;font-family:Inter,-apple-system,sans-serif;line-height:1.4}' +
    '.sgpw-note{color:#A7A7B0;font-size:14px;text-align:center;margin-top:24px;font-family:Inter,-apple-system,sans-serif;line-height:1.5}';

  function abs(base, src) {
    if (!base || /^https?:\/\//.test(src)) return src;
    return base.replace(/\/$/, '') + '/' + src.replace(/^\//, '');
  }

  function tile(item, base) {
    var wrap = document.createElement('div');
    if (item.type === 'img') {
      var t = document.createElement('div');
      t.className = 'sgpw-tile sgpw-shot';
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.src = abs(base, item.src);
      img.alt = item.alt || '';
      img.onerror = function () { wrap.style.display = 'none'; };
      t.appendChild(img);
      wrap.appendChild(t);
      return wrap;
    }
    var t2 = document.createElement('div');
    t2.className = 'sgpw-tile' + (item.vertical ? ' sgpw-contain' : '');
    if (item.type === 'vimeo') {
      var f = document.createElement('iframe');
      f.loading = 'lazy';
      f.src = 'https://player.vimeo.com/video/' + item.id + '?h=' + item.h + '&title=0&byline=0&portrait=0&dnt=1';
      f.allow = 'fullscreen; picture-in-picture';
      f.allowFullscreen = true;
      t2.appendChild(f);
    } else if (item.type === 'grain') {
      var g = document.createElement('iframe');
      g.loading = 'lazy';
      g.src = 'https://grain.com/_/embed/highlight/' + item.id + '?autoplay=false&origin=user_iframe';
      g.allow = 'fullscreen';
      g.allowFullscreen = true;
      t2.appendChild(g);
    } else if (item.type === 'mp4') {
      var v = document.createElement('video');
      v.controls = true;
      v.playsInline = true;
      v.preload = 'metadata';
      var srcEl = document.createElement('source');
      srcEl.src = abs(base, item.src);
      srcEl.type = 'video/mp4';
      v.appendChild(srcEl);
      t2.appendChild(v);
    }
    wrap.appendChild(t2);
    if (item.cap) {
      var c = document.createElement('p');
      c.className = 'sgpw-cap';
      c.innerHTML = item.cap;
      wrap.appendChild(c);
    }
    return wrap;
  }

  function render() {
    var mounts = document.querySelectorAll('.sg-proof-wall');
    if (!mounts.length) return;
    if (!document.getElementById('sgpw-css')) {
      var st = document.createElement('style');
      st.id = 'sgpw-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    mounts.forEach(function (mount) {
      var base = mount.getAttribute('data-base') || '';
      var max = parseInt(mount.getAttribute('data-max') || '0', 10);
      var items = max > 0 ? ITEMS.slice(0, max) : ITEMS;
      var grid = document.createElement('div');
      grid.className = 'sgpw-grid';
      items.forEach(function (it) { grid.appendChild(tile(it, base)); });
      mount.appendChild(grid);
      if (mount.getAttribute('data-disclaimer') !== 'off') {
        var note = document.createElement('p');
        note.className = 'sgpw-note';
        note.innerHTML = DISCLAIMER;
        mount.appendChild(note);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
