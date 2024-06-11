import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";

const CarDetails = () => {
  const { id } = useParams(); // Lấy id xe từ URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Gọi API backend để lấy chi tiết xe hơi
    fetch(`http://localhost:3001/cars/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Lỗi HTTP! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Chi tiết xe hơi:", data);
        setCar(data);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu xe hơi:", error));
  }, [id]); // Gọi lại useEffect khi id thay đổi

  if (!car) {
    return <div>Loading...</div>; // Hiển thị loading nếu chưa có dữ liệu
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image="https://via.placeholder.com/600" // Thay thế bằng hình ảnh thật
        alt={car.model_car_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.model_car_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Giá: {car.price}
        </Typography>
        {/* Hiển thị thêm các thông tin chi tiết khác */}
      </CardContent>
    </Card>
  );
};

export default CarDetails;
