import React from "react";
import { useProductContext } from "../../../Context/ProductContextProvider";
import Form from "../Form/Form";

const Add = () => {
  const { addProduct } = useProductContext();
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Добавить курс</h2>
      <Form saveValues={addProduct} compForEdit={false} />
    </div>
  );
};

export default Add;
