import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import { Button, Typography } from "@mui/material";
import "./Filter.scss";

const Filter = ({
  type,
  setType,
  setPage,
  slider,
  setSlider,
  maxSliderValue,
  minSliderValue,
  handleReset,
}) => {
  const [filterDisp, setFilterDisp] = useState(false);

  const changeDisp = () => {
    if (filterDisp) {
      setFilterDisp(false);
    } else {
      setFilterDisp(true);
    }
  };

  return (
    <div
      style={{ textAlign: "center", paddingTop: "270px" }}
      className="filter"
    >
      <Button
        sx={{
          p: 1,
          m: 1,
          fontSize: "1rem",
          fontWeight: "900",
          color: "#991199",
        }}
        onClick={changeDisp}
      >
        <h3>Сортировка</h3>
      </Button>
      <br />
      <div
        style={{ display: filterDisp ? "block" : "none", textAlign: "center" }}
      >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Статус</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="Идет набор"
              control={<Radio />}
              label="Идет набор"
            />
            <FormControlLabel value="Скоро" control={<Radio />} label="Скоро" />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <Typography color="text.secondary">Price</Typography>
        <Slider
          className="slider"
          sx={{ maxWidth: "350px" }}
          value={slider}
          onChange={(e, newValue) => {
            setSlider(newValue);
            setPage(1);
          }}
          valueLabelDisplay="auto"
          max={maxSliderValue}
          min={minSliderValue}
        />
        <br />
        <Button onClick={handleReset} variant="outlined" className="btnFilter">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Filter;
