# راه‌اندازی ریپو و انتشار امن‌شهر

## ۱. ساخت ریپو در GitHub
در https://github.com/new یک ریپوی عمومی با نام `amnshahr` بسازید. گزینه‌های README، .gitignore و License را خالی بگذارید.

## ۲. ارسال فایل‌ها (در ترمینال داخل پوشه‌ی amnshahr)
```bash
git init -b main
git add .
git commit -m "نسخه‌ی اول: سایت امن‌شهر"
git remote add origin https://github.com/koolerabiiiiii-dot/amnshahr.git
git push -u origin main
```

## ۳. فعال‌سازی GitHub Pages
Settings → Pages → Source: Deploy from a branch → main / (root) → Save

آدرس سایت بعد از چند دقیقه:
https://koolerabiiiiii-dot.github.io/amnshahr/

## به‌روزرسانی بعدی
```bash
git add .
git commit -m "توضیح تغییر"
git push
```
