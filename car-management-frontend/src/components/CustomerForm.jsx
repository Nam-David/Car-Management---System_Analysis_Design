import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    Citizen_ID: "",
    Customer_Name: "",
    Email: "",
    Phone_No: "",
    Address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/customers", {
        // Gọi API backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Thêm khách hàng thành công!");
        // Xử lý sau khi thêm thành công (ví dụ: reset form, chuyển hướng, ...)
      } else {
        console.error("Lỗi khi thêm khách hàng:", response.status);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Thông tin khách hàng
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="CMND/CCCD"
            name="Citizen_ID"
            value={formData.Citizen_ID}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Họ và tên"
            name="Customer_Name"
            value={formData.Customer_Name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Số điện thoại"
            name="Phone_No"
            value={formData.Phone_No}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Địa chỉ"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Gửi
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CustomerForm;
