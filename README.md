# Lời Chúa Như Chân Lý Giải Thích Thế Giới

Một ứng dụng web nghiên cứu thần học và triết học Kitô giáo, được xây dựng với **Next.js 16**, phong cách thiết kế **"Scholastic Catholic"**, và tối ưu hóa cho trải nghiệm chiêm niệm.

## 🌟 Tính Năng Nổi Bật

### 1. Giao Diện "Scholastic" (Triết Học Kinh Viện)
- **Màu sắc**: Xanh Marian (#003DA5), Vàng Vatican (#C9A978), và nền Giấy Cói (#FAFAF5).
- **Typography**: Kết hợp `Playfair Display` (tiêu đề), `Lora` (nội dung), và `Inter` (UI) cho trải nghiệm đọc tối ưu.
- **Bố cục**: Text căn đều (Justified), thụt đầu dòng treo (Hanging Indents) cho danh sách tham khảo.

### 2. Trải Nghiệm Đọc Sâu
- **Điều hướng thông minh**:
  - **Desktop**: Mục lục bên trượt theo nội dung (Sticky Sidebar) và đánh dấu phần đang đọc.
  - **Mobile**: Menu trượt (Drawer) hiển thị tiêu đề chi tiết của từng chương.
  - **Tiến độ**: Thanh Progress Bar vàng chạy trên cùng màn hình.
- **Trích dẫn tương tác**:
  - Click vào số trích dẫn (ví dụ `[1]`) để nhảy ngay đến nguồn tài liệu.
  - Hiệu ứng highlight dòng tài liệu khi được chọn.

### 3. Tối Ưu Hóa
- **Responsive**: Giao diện thích ứng hoàn hảo trên mọi thiết bị (Table chuyển thành Card trên mobile).
- **SEO**: Cấu trúc HTML ngữ nghĩa (Semantic HTML).

## 🛠 Công Nghệ Sử Dụng

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🚀 Cài Đặt và Chạy Local

1.  **Cài đặt dependencies**:
    ```bash
    npm install
    ```

2.  **Chạy server phát triển**:
    ```bash
    npm run dev
    ```
    Truy cập [http://localhost:3000](http://localhost:3000).

3.  **Build production**:
    ```bash
    npm run build
    ```
