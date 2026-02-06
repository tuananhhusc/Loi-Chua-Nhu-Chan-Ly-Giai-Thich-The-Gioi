# Hướng Dẫn Deploy Lên GitHub Pages

Dưới đây là các bước để đưa trang web này lên GitHub Pages miễn phí.

## Bước 1: Chuẩn bị Cấu Hình Next.js

GitHub Pages chỉ phục vụ file tĩnh (HTML/CSS/JS), nên chúng ta cần cấu hình Next.js để xuất ra file tĩnh (`Static Export`).

Mở file `next.config.ts` và sửa thành như sau:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // Bắt buộc: Xuất ra thư mục 'out' tĩnh
  images: {
    unoptimized: true, // Bắt buộc: Tính năng Image Optimization của Next.js không chạy trên GitHub Pages
  },
  // Nếu bạn deploy vào thư mục con (ví dụ: username.github.io/ten-repo), hãy bỏ comment dòng dưới:
  // basePath: "/ten-repo",
};

export default nextConfig;
```

## Bước 2: Tạo Repository trên GitHub

1.  Đăng nhập GitHub và tạo một **New Repository** (đặt tên ví dụ: `chan-ly-web`).
2.  Lấy đường dẫn repo (ví dụ: `https://github.com/username/chan-ly-web.git`).

## Bước 3: Đẩy Code Lên GitHub

Mở terminal tại thư mục dự án (`d:/Chanly/app`) và chạy các lệnh sau:

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit code
git commit -m "Initial commit"

# Đổi nhánh chính thành main
git branch -M main

# Thêm remote (thay URL bằng repo của bạn)
git remote add origin https://github.com/username/chan-ly-web.git

# Đẩy code lên
git push -u origin main
```

## Bước 4: Deploy (Tự Động với GitHub Actions)

Cách chuyên nghiệp nhất là dùng GitHub Actions để tự động deploy mỗi khi bạn push code.

1.  Tại thư mục gốc dự án, tạo file theo đường dẫn: `.github/workflows/deploy.yml`
2.  Dán nội dung sau vào file `deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3.  Commit và đẩy file này lên GitHub:
    ```bash
    git add .github/workflows/deploy.yml
    git commit -m "Add deploy workflow"
    git push
    ```

4.  Vào GitHub Repo của bạn -> **Settings** -> **Pages**.
    - Mục **Build and deployment** / **Source**, chọn **GitHub Actions**.

Sau vài phút, GitHub sẽ cung cấp cho bạn đường link trang web (thường là `https://username.github.io/chan-ly-web`).
