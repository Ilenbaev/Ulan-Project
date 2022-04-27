import { Box, Button, ImageListItem, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import "./History.scss";

const History = () => {
  let abc = JSON.parse(localStorage.getItem("history"));
  console.log(abc);

  const handleDel = () => {
    localStorage.removeItem("history");
  };

  return (
    <div>
      <h1>История просмотров</h1>
      {abc === null ? (
        <>
          <h1>Вы еще ничего не смотрели...</h1>
          <Button
            component={Link}
            to="/courses"
            variant="outlined"
            style={{ margin: "20px 0", color: "black" }}
          >
            перейти к выбору курса
          </Button>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div className="historyList">
            {abc.products.map((elem) => (
              <Box key={elem.item.id} className="historyBox">
                <ImageListItem>
                  <img
                    src={elem.item.img}
                    alt={elem.item.language}
                    loading="lazy"
                    style={{ height: "250px" }}
                  />
                  <ImageListItemBar title={elem.item.language} />
                </ImageListItem>
              </Box>
            ))}
          </div>
          <Button
            component={Link}
            to="/courses"
            onClick={handleDel}
            variant="outlined"
            style={{ margin: "20px 0", color: "black" }}
          >
            очистить историю просмотра
          </Button>
        </div>
      )}
    </div>
  );
};

export default History;
