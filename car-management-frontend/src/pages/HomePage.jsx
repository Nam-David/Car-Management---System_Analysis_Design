import React, { useState, useEffect } from "react";
import CarList from "../components/CarList";

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách xe hơi từ backend
    fetch("http://localhost:3001/cars")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Lỗi HTTP! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dữ liệu xe hơi:", data);
        setCars(data);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu xe hơi:", error));
  }, []);

  return (
    <div>
      <h1>Danh sách xe hơi</h1>
      <CarList cars={cars} />
    </div>
  );
};

export default HomePage;
