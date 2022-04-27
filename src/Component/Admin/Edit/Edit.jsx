import React from "react";
import { useProductContext } from "../../../Context/ProductContextProvider";
import Form from "../Form/Form";
const Edit = () => {
  const { forEditVal, getOneProduct, saveEditedProd } = useProductContext();
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Изменить курс</h2>
      <Form
        saveValues={saveEditedProd}
        compForEdit={true}
        forEditVal={forEditVal}
        getOneProduct={getOneProduct}
      />
    </div>
  );
};

export default Edit;
