import { Button } from "@mui/material";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { notify } from "../Toastify/Toastify";
import "./Bank.scss";

const Bank = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleClick = () => {
    if (
      state.cvc.trim() !== "" &&
      state.expiry.trim() !== "" &&
      state.focus.trim() !== "" &&
      state.name.trim() !== "" &&
      state.number.trim() !== ""
    ) {
      notify("success", "Оплата прошла успешно!");
      navigate("/cart");
    } else {
      notify("error", "Заполните поля!");
      return;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div id="PaymentForm" className="bank">
        <div>
          <Cards
            cvc={state.cvc}
            expiry={state.expiry}
            focused={state.focus}
            name={state.name}
            number={state.number}
          />
        </div>
        <form style={{ textAlign: "center", marginLeft: "20px" }}>
          <input
            style={{ margin: "5px 0" }}
            type="text"
            name="number"
            placeholder="Number"
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => handleInputFocus(e)}
          />
          <br />
          <input
            style={{ margin: "5px 0" }}
            type="name"
            name="name"
            placeholder="Name"
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => handleInputFocus(e)}
          />
          <br />

          <input
            style={{ margin: "5px 0" }}
            type="expiry"
            name="expiry"
            placeholder="Valid num"
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => handleInputFocus(e)}
          />
          <br />
          <input
            style={{ margin: "5px 0" }}
            type="cvc"
            name="cvc"
            placeholder="CvC"
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => handleInputFocus(e)}
          />
          <br />
          <Button
            variant="contained"
            onClick={() => handleClick()}
            sx={{ my: 1 }}
          >
            Оплатить
          </Button>
        </form>
      </div>
    </Box>
  );
};
export default Bank;
