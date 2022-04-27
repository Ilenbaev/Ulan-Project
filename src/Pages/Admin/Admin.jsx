import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <Container sx={{ flexGrow: 1 }} maxWidth="lg">
      <Outlet />
    </Container>
  );
};

export default Admin;
