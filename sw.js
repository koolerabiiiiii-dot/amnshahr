// امن‌شهر — سرویس‌ورکر برای کار بدون اینترنت پس از اولین بارگذاری.
// نسخه‌ی کش را با هر تغییر بزرگ در فایل‌های اصلی بالا ببرید (مثلاً v2).
const VERSION = 'amnshahr-v2';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // فایل‌های همین سایت
  if (url.origin === self.location.origin) {
    // صفحه‌ی اصلی: ابتدا شبکه، و اگر آفلاین بود نسخه‌ی ذخیره‌شده
    if (req.mode === 'navigate') {
      event.respondWith(
        fetch(req)
          .then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put('./index.html', copy));
            return res;
          })
          .catch(() => caches.match('./index.html'))
      );
      return;
    }
    // بقیه‌ی فایل‌ها: از کش، و اگر نبود از شبکه
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  // منابع بیرونی (فونت و Tailwind): نمایش سریع از کش و به‌روزرسانی در پس‌زمینه
  event.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req).then((hit) => {
        const network = fetch(req)
          .then((res) => { cache.put(req, res.clone()); return res; })
          .catch(() => hit);
        return hit || network;
      })
    )
  );
});
