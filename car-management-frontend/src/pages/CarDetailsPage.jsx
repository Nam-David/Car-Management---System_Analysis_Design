import React from "react";
import CarDetails from "../components/CarDetails";
import CustomerForm from "../components/CustomerForm";

const CarDetailsPage = () => {
  return (
    <div>
      <CarDetails />
      <CustomerForm /> {/* Render form thông tin khách hàng */}
    </div>
  );
};

export default CarDetailsPage;
