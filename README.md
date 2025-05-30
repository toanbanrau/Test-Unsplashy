# 🧠 Week 1 – Bài Tập React Nâng Cao (Không dùng ChatGPT để code)

## 1. 🧮 Counter App – Multi Mode & History

### Mô tả:
Xây dựng một ứng dụng đếm số nâng cao gồm nhiều chế độ đếm và hiển thị lịch sử.

### Tính năng yêu cầu:
- 3 chế độ đếm:
  - `Normal`: Tăng/giảm 1
  - `Double`: Tăng/giảm 2
  - `Async`: Tăng/giảm sau 2s
- Cho phép reset về 0
- Hiển thị:
  - Tổng số lần người dùng đã thao tác
  - Lịch sử đếm (`+1`, `-2`, `reset`, thời gian thao tác)
- Chia thành 3 component: `CounterDisplay`, `CounterControls`, `CounterHistory`
- Bonus: Dùng `Context` để quản lý state

### Gợi ý dùng:
`useState`, `useEffect`, `setTimeout`, `Date`, optional `useContext`

---

## 2. ⏰ Clock App – Timezone Switcher & Pausable Clock

### Mô tả:
Đồng hồ kỹ thuật số có thể dừng/chạy, đổi múi giờ và chế độ 12h/24h.

### Tính năng yêu cầu:
- Hiển thị giờ hiện tại:
  - Toggle giữa 12h và 24h
  - Toggle múi giờ: UTC, UTC+7, UTC-5
- Nút “Pause” và “Resume” đồng hồ
- Mỗi lần Pause → Ghi lại thời gian vào `PauseLog`
- Bonus: Cho người dùng chọn `timezone` từ dropdown (dynamic option), filter range time pause log

### Chia component:
- `ClockDisplay`, `ClockControls`, `PauseLog`

### Gợi ý dùng:
`setInterval`, `clearInterval`, `Intl.DateTimeFormat`, `useRef`, `useEffect`

---

## 3. ✅ Todo App – Status Kanban + Persistence

### Mô tả:
Todo App nâng cao với trạng thái dạng Kanban + lưu localStorage.

### Tính năng yêu cầu:
- Mỗi Todo có: `id`, `title`, `description`, `status` (`todo`, `in progress`, `done`)
- Có thể:
  - Thêm mới todo (form nhập vào)
  - Di chuyển todo giữa các cột (drag hoặc select box)
  - Sửa nội dung todo (click vào => chuyển thành input)
  - Xóa todo
- Giao diện dạng 3 cột theo status (giống Trello lite)
- Dùng `localStorage` để lưu danh sách todos
- Chia thành các components: `TodoForm`, `TodoItem`, `TodoColumn`, `TodoBoard`
- Bonus: Sort theo thời gian tạo mới nhất

### Gợi ý dùng:
`useState`, `useEffect`, `localStorage`, optional `useReducer`, `custom hook`

---

## ❗ Quy định khi làm bài:
- Không dùng bất kỳ thư viện UI nào (chỉ CSS thuần hoặc Tailwind)
- Không copy code từ GPT hay StackOverflow
- Ghi nhật ký làm việc vào file `progress.md`
- Commit rõ ràng, đúng convention (ít nhất 5 commit/bài)
- Nộp bài trước cuối tuần (thứ 6)

---

## ✅ Sau khi nộp sẽ được kiểm tra:
- Hỏi trực tiếp về logic code
- Được yêu cầu thay đổi/đổi yêu cầu nhẹ để test khả năng hiểu
- Đánh giá cách chia component và quản lý state
"""
