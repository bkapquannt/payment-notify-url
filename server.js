// server.js
const express = require('express');
const app = express();

app.use(express.json()); // để đọc dữ liệu JSON gửi tới

// Notify URL - webhook nhận trạng thái thanh toán
app.post('/api/payment/callback', (req, res) => {
  const data = req.body;

  console.log("📥 Dữ liệu nhận từ cổng thanh toán:", data);

  // Ví dụ: lấy orderId & trạng thái từ dữ liệu
  const orderId = data.app_trans_id || data.order_id;
  const status = data.status; // 1 = thành công, 2 = thất bại

  if (status === 1) {
    console.log(`✅ Đơn hàng ${orderId} đã thanh toán thành công.`);
    // TODO: cập nhật đơn hàng trong database
  } else {
    console.log(`❌ Đơn hàng ${orderId} thanh toán thất bại.`);
  }

  res.status(200).send('OK'); // trả về cho cổng thanh toán biết đã nhận thông báo
});

// Khởi chạy server
app.listen(3000, () => console.log('🚀 Notify URL đang chạy ở http://localhost:3000'));