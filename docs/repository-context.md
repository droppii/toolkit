# Ngữ cảnh repository — toolkit

Bộ UI, hook và tài nguyên React Native dùng chung.

## 1. Trách nhiệm và luồng xử lý

Public exports tập hợp module trong assets/constants/hooks/uikit; ứng dụng sử dụng thư viện quyết định state nghiệp vụ và phát hành.

Giữ props, theme và peer dependency, tránh gắn endpoint hoặc quyền nghiệp vụ vào UI dùng chung. Kiểm tra consumer Android/iOS khi sửa native dependency và asset.

## 2. Điểm bắt đầu trong mã

- [assets](../assets).
- [constants](../constants).
- [hooks](../hooks).
- [uikit](../uikit).
- [package.json](../package.json).

Đọc hướng dẫn tại thư mục con trước khi sửa module tương ứng. Đối chiếu hợp đồng và nơi gọi khi thay đổi API, dữ liệu hoặc thư viện dùng chung.

## 3. Toolchain và kiểm chứng

Phiên bản và lệnh được quản lý trong manifest của từng package; giữ lockfile đang được đường build sử dụng. Với monorepo, chạy tại đúng package hoặc qua workspace. Không nâng toolchain chỉ để làm một lệnh cũ chạy được.

| Manifest | Toolchain được khai báo |
| --- | --- |
| [package.json](../package.json) | react 18.2.0; react-native 0.71.3; jest ^29.2.1; typescript 4.8.4 |

| Mục đích | Thư mục chạy | Lệnh | Điều kiện và tác động |
| --- | --- | --- | --- |
| lint | `.` | `yarn run lint` | Kiểm tra tĩnh; không thay thế kiểm thử hành vi. Script: `eslint .`. |
| test | `.` | `yarn run test` | Kiểm tra fixture, hook và môi trường trước khi chạy; không mặc định là test cô lập. Script: `jest`. |

Ghi kết quả và phạm vi thực sự đã chạy trong PR. Không ghi build, lint hoặc test thành công khi mới đọc cấu hình hay khi script không thực thi assertion.

## 4. Cấu hình và phát hành

Không có workflow GitHub Actions thực thi build/deploy được khai báo trong cây nguồn này. Cách phát hành phải được xác định từ cấu hình hosting, pipeline ngoài GitHub hoặc ứng dụng sử dụng package; không suy ra là tự triển khai khi push.

Dùng credential được cấp cho đúng môi trường. Không lưu secret hoặc dữ liệu cá nhân vào mã, tài liệu, ảnh chụp hay log. Migration, seed, publish, gửi thông báo và rollout là thao tác có tác động; chỉ thực hiện trong phạm vi công việc và môi trường đã được giao. Phiên bản đang phục vụ cần được xác định từ artifact/deployment, không chỉ từ default branch.

## 5. Tiêu chuẩn chung và duy trì

Áp dụng [Engineering Standards](https://github.com/droppii/engineering-knowledge/tree/docs/repository-context-pilot/handbook/standards/standards.md), [Principles](https://github.com/droppii/engineering-knowledge/tree/docs/repository-context-pilot/handbook/principles/principles.md) và [AI Context](https://github.com/droppii/engineering-knowledge/tree/docs/repository-context-pilot/handbook/ai-context/README.md). Cấu trúc đang có giải thích cách tìm mã; những phần chưa theo tiêu chuẩn cần được cải thiện khi sửa, không trở thành ngoại lệ mặc định.

Cập nhật tài liệu này trong cùng thay đổi khi module, toolchain, public contract, pipeline hoặc điều kiện kiểm thử thay đổi. Quyết định đặc thù cần được ghi ở repository; kiến thức và tiêu chuẩn dùng chung được duy trì tại Engineering Knowledge.
