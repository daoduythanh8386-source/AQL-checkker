# AQL tra cứu (Oristar)

App tra cỡ mẫu AQL và tính khối lượng lỗi trách nhiệm. Icon: logo Oristar 3D. Tên app: **AQL tra cứu**.

| Nền tảng | Cách có app |
|---|---|
| Windows | File `.exe` cài đặt (có icon ngoài màn hình và Start Menu) hoặc bản chạy ngay |
| Android | File `.apk` |
| iPhone | Mở link GitHub Pages bằng Safari → Chia sẻ → Thêm vào MH chính |

## Cách đưa lên GitHub (làm 1 lần)
1. Vào github.com → **New repository** → đặt tên (ví dụ `aql-tra-cuu`) → **Create repository**.
2. Bấm **uploading an existing file**, kéo thả **toàn bộ nội dung thư mục này** (gồm cả thư mục `.github`) → **Commit changes**.
   - Nếu thư mục `.github` không lên được (hay gặp trên Mac vì bị ẩn): bấm **Add file → Create new file**, gõ tên `.github/workflows/build.yml`, dán nội dung từ `workflows-du-phong/build.yml`. Làm tương tự với `pages.yml`.
3. Vào **Settings → Pages → Source** chọn **GitHub Actions** (cho bản iPhone).

## Tạo file cài đặt (.exe và .apk)
**Cách 1 – tạo bản phát hành (khuyên dùng):** vào **Releases → Create a new release**, ở ô Tag gõ `v1.0.0` → **Publish release**. Đợi khoảng 10 đến 15 phút, file `.exe` và `.apk` tự xuất hiện trong chính bản phát hành đó. Gửi link trang Releases cho mọi người tải.

**Cách 2 – chạy tay:** vào tab **Actions → Build bo cai → Run workflow**. Xong thì mở lần chạy đó, kéo xuống mục **Artifacts** để tải về.

Muốn ra bản mới: tạo release mới với tag `v1.0.1`, `v1.0.2`...

## Cài app
- **Windows:** tải `AQL-tra-cuu-Setup-1.0.0.exe` → chạy → Next. Windows có thể hiện cảnh báo SmartScreen vì file chưa ký số: bấm **More info → Run anyway**. Hoặc tải `AQL-tra-cuu-Portable-1.0.0.exe` để chạy ngay không cần cài.
- **Android:** tải `AQL-tra-cuu.apk` về điện thoại → mở file → cho phép "Cài từ nguồn không xác định" khi máy hỏi → Cài đặt.
- **iPhone:** sau khi Pages chạy xong, link có dạng `https://TEN-GITHUB.github.io/TEN-REPO/`. Mở bằng Safari → nút Chia sẻ → **Thêm vào MH chính**. (Apple không cho cài file ngoài App Store nếu không có tài khoản nhà phát triển, nên iPhone dùng cách này.)

## Cấu trúc
- `web/` – mã nguồn app (sửa ở đây)
- `icons/` – bộ icon 3D đủ cỡ (web, Android, iOS, Windows)
- `electron/` – đóng gói Windows
- `android-app/` – đóng gói Android (Capacitor)
- `.github/workflows/` – quy trình tự build

## Khi sửa app
Sửa file trong `web/`, rồi nếu dùng bản web/iPhone thì đổi số phiên bản trong `web/sw.js` (`aql-tra-cuu-v17` → `v18`) để máy tự tải bản mới. Muốn có `.exe` và `.apk` mới thì tạo release mới như trên.
