import { Container } from "@mui/material";
import React from "react";
import ProdList from "../../Component/Products/ProdList/ProdList";

const Courses = () => {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <ProdList />
    </Container>
  );
};

export default Courses;
