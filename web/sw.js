// Service worker: lưu file vào bộ nhớ máy để chạy offline.
// Mỗi lần sửa app, ĐỔI số phiên bản (v1 -> v2) để máy người dùng tải bản mới.
const CACHE = 'aql-tra-cuu-v17';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './icon-maskable-512.png', './favicon.png', './sp-0-hd.webp', './sp-1-hd.webp', './sp-2-hd.webp', './sp-0.webp', './sp-1.webp', './sp-2.webp', './logo-oristar.svg', './giong-noi.mp3'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Ưu tiên bản đã lưu; không có thì tải mạng rồi lưu lại
// Âm thanh/video gửi yêu cầu theo đoạn (Range); iPhone chỉ phát được nếu trả lời 206
async function rangeReply(req) {
  const cache = await caches.open(CACHE);
  let res = await cache.match(req.url);
  if (!res) {
    try { const full = await fetch(req.url); if (!full.ok) return full; cache.put(req.url, full.clone()); res = full; }
    catch (err) { return fetch(req); }
  }
  const buf = await res.arrayBuffer(), total = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  let start = 0, end = total - 1;
  if (m) {
    if (m[1] !== '') { start = parseInt(m[1], 10); if (m[2] !== '') end = parseInt(m[2], 10); }
    else if (m[2] !== '') { start = Math.max(0, total - parseInt(m[2], 10)); }
  }
  end = Math.min(end, total - 1);
  if (start > end) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + total } });
  return new Response(buf.slice(start, end + 1), { status: 206, statusText: 'Partial Content', headers: {
    'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg', 'Content-Length': String(end - start + 1),
    'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes' } });
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.headers.has('range')) { e.respondWith(rangeReply(e.request)); return; }
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
