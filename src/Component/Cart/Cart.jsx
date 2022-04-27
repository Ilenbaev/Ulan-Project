import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import { Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useCart } from "../../Context/CartContextProvider";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import "./Cart.scss";
import { useProductContext } from "../../Context/ProductContextProvider";

const Cart = () => {
  const { cart, getCart, deleteProdInCart } = useCart();

  const { saveEditedProd } = useProductContext();

  const [block, setBlock] = useState(false);
  // console.log(block);

  useEffect(() => {
    let abc = JSON.parse(localStorage.getItem("block"));
    if (abc == false) {
      setBlock(false);
      // console.log("hi false");
    } else {
      setBlock(true);
      // console.log("hi true");
    }
  }, [block]);

  const handleTrue = () => {
    localStorage.setItem("block", true);
    setBlock(true);
  };

  const handleFalse = () => {
    localStorage.setItem("block", false);
    setBlock(false);
  };

  useEffect(() => {
    getCart();
  }, []);

  const sendRating = () => {
    cart.products.map((elem) => {
      let abc = elem.item.rating + 1;
      let obj = {
        ...elem.item,
        rating: abc,
      };
      saveEditedProd(obj);
    });
    handleTrue();
  };

  return (
    <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
      {cart?.products.length > 0 ? (
        <>
          <TableContainer component={Paper} style={{ marginTop: "50px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Курс</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Статус
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Продолжительность
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Цена
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Удалить
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.products.map((elem) => (
                  <TableRow
                    key={elem.item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {elem.item.language}
                    </TableCell>
                    <TableCell align="center">{elem.item.type}</TableCell>

                    <TableCell align="right">{elem.item.time}</TableCell>
                    <TableCell align="right">{elem.item.price}</TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => deleteProdInCart(elem.item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            className="cartBox"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" style={{ marginTop: 30 }}>
              Общая стоимость: ${cart.totalPrice}
            </Typography>
            <Button
              variant="contained"
              color="error"
              style={{ marginTop: 30 }}
              component={Link}
              to="/bank"
              onClick={sendRating}
              sx={{
                p: 1,
                marginBottom: 4,
                fontSize: "1.5rem",
                fontWeight: "900",
              }}
            >
              Купить курсы
            </Button>
          </Box>

          {/* История покупок  */}

          <div
            style={{
              display: block == false ? "none" : "block",
              textAlign: "center",
            }}
          >
            <h1>Купленные Вами Курсы</h1>
            <div className="buyProduct">
              {cart.products.map((elem) => (
                <Box key={elem.item.id} style={{ maxWidth: "350px" }}>
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
              onClick={handleFalse}
              variant="contained"
              style={{ margin: "30px" }}
            >
              Очистить список покупок
            </Button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Ваша корзина пуста</h1>
          <img
            width="40%"
            src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F02%2F11%2FGettyImages-84909131-2000.jpg&q=60"
            alt=""
          />
          <br />
          <Button variant="contained" component={Link} to="/courses">
            Посмотреть товар
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
