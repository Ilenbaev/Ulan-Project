import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { notify } from "../../Toastify/Toastify";

const initValues = {
  language: "",
  time: "",
  type: "",
  price: "",
  month: "",
  place: "",
  description: "",
  img: "",
  like: [],
  rating: 0,
};

const Form = ({ saveValues, compForEdit, forEditVal, getOneProduct }) => {
  const [inpValues, setInpValues] = useState(initValues);
  const { id } = useParams();

  useEffect(() => {
    if (compForEdit) {
      getOneProduct(id);
    }
  }, []);

  useEffect(() => {
    if (compForEdit && forEditVal) {
      setInpValues(forEditVal);
    }
  }, [forEditVal]);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !inpValues.language ||
      !inpValues.time ||
      !inpValues.description ||
      !inpValues.price ||
      !inpValues.type ||
      !inpValues.img ||
      !inpValues.place ||
      !inpValues.month
    ) {
      notify("error", "Заполните все поля");
      return;
    }
    let obj = {
      ...inpValues,
      price: +inpValues.price,
    };
    saveValues(obj);
  };

  return (
    <Container maxWidth="lg">
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          name="language"
          value={inpValues.language}
          onChange={(e) => handleChange(e)}
          id="outlined-basic"
          label="Язык программирования"
          variant="outlined"
          sx={{ my: 1 }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Длительность</InputLabel>
          <Select
            type="text"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="time"
            value={inpValues.time}
            label="Длительность"
            onChange={(e) => handleChange(e)}
            sx={{ my: 1 }}
          >
            <MenuItem value={"2 месяца"}>2 месяца</MenuItem>
            <MenuItem value={"3 месяца"}>3 месяца</MenuItem>
            <MenuItem value={"6 месяцев"}>6 месяцев</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Статус</InputLabel>
          <Select
            type="text"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="type"
            value={inpValues.type}
            label="Статус"
            onChange={(e) => handleChange(e)}
            sx={{ my: 1 }}
          >
            <MenuItem value={"Идет набор"}>Идет набор</MenuItem>
            <MenuItem value={"Скоро"}>Скоро</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          name="price"
          value={inpValues.price}
          onChange={(e) => handleChange(e)}
          id="outlined-basic"
          label="Цена"
          variant="outlined"
          sx={{ my: 1 }}
        />

        <TextField
          type="text"
          name="month"
          value={inpValues.month}
          onChange={(e) => handleChange(e)}
          id="outlined-basic"
          label="Месяц"
          variant="outlined"
          sx={{ my: 1 }}
        />

        <TextField
          type="number"
          name="place"
          value={inpValues.place}
          onChange={(e) => handleChange(e)}
          id="outlined-basic"
          label="Осталось мест"
          variant="outlined"
          sx={{ my: 1 }}
        />

        <TextField
          type="text"
          name="img"
          value={inpValues.img}
          onChange={(e) => handleChange(e)}
          id="outlined-basic"
          label="Картинка"
          variant="outlined"
          sx={{ my: 1 }}
        />

        <TextField
          name="description"
          value={inpValues.description}
          onChange={(e) => handleChange(e)}
          id="outlined-basic"
          label="Описание"
          variant="outlined"
          multiline
          rows={3}
          sx={{ my: 1 }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            style={{ width: "400px", marginBottom: "20px" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Form;
