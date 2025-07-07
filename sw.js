// Đặt tên cho bộ nhớ cache
const CACHE_NAME = 'html369tool-cache-v1';

// Liệt kê tất cả các file bạn muốn lưu vào cache
// Đây là những file cần thiết để ứng dụng của bạn có thể chạy offline
const urlsToCache = [
  '/html369TOOL/',
  '/html369TOOL/index.html',
  '/html369TOOL/GeminiTransSubs.html',
  '/html369TOOL/CreatEpubFromHTML.html',
  '/html369TOOL/Find&ReplaceTXT.html',
  // Bạn không cần cache link của Gemini vì nó là link bên ngoài
  // Nếu bạn có các file CSS, JS hoặc hình ảnh riêng, hãy thêm chúng vào đây.
  // Ví dụ: '/html369TOOL/style.css'
];

// Sự kiện install: được gọi khi service worker được cài đặt
self.addEventListener('install', event => {
  // Chờ cho đến khi tất cả các file được cache thành công
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Sự kiện fetch: được gọi mỗi khi có một yêu cầu mạng từ trang của bạn
self.addEventListener('fetch', event => {
  event.respondWith(
    // Kiểm tra xem yêu cầu có khớp với bất kỳ thứ gì trong cache không
    caches.match(event.request)
      .then(response => {
        // Nếu có trong cache, trả về file từ cache
        if (response) {
          return response;
        }
        // Nếu không, thực hiện yêu cầu mạng như bình thường
        return fetch(event.request);
      })
  );
});