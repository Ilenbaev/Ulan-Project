import React, { useState } from "react";
import "./OneProduct.scss";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Icon, IconButton } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../../../Context/CartContextProvider";
import { useAuth } from "../../../Context/AuthContextProvider";
import { useFavorite } from "../../../Context/FavoriteContextProvider";
import InfoIcon from "@mui/icons-material/Info";
import { useProductContext } from "../../../Context/ProductContextProvider";
import { Link } from "react-router-dom";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const OneProduct = ({ item }) => {
  const { addDelToCart, isProdInCart } = useCart();
  const { addDelToFavorite, isProdInFavorite, sendHistory } = useFavorite();
  const [inCart, setInCart] = React.useState(isProdInCart(item.id));
  const [inFavorite, setInFavorite] = React.useState(isProdInFavorite(item.id));
  const { currentUser } = useAuth();

  const { saveEditedProd } = useProductContext();

  const likeAdd = (card) => {
    if (card.like.includes(`${currentUser.user}`)) {
      let avc = card.like.filter((item) => item !== currentUser.user);

      let obj = {
        ...card,
        like: avc,
      };
      saveEditedProd(obj);
    } else {
      let arr = card.like;
      arr.push(currentUser.user);
      let num = item.like.length;
      let sum = item.rating + num;
      let obj = {
        ...card,
        like: arr,
        rating: sum,
      };
      saveEditedProd(obj);
    }
  };

  const handleSendHistory = (item) => {
    sendHistory(item);
  };

  return (
    <>
      <div className="cardCours">
        <div>
          <h3>
            Цена: {item.price}$
            <br />
            Курс
          </h3>
        </div>
        <div>
          <h2>{item.language}</h2>
        </div>
        <div className="cardProf">
          <div>
            <h3>Длительность: {item.time}</h3>
          </div>
          <div>
            <span style={{ color: "#CF0;", fontSize: "45px" }}>&#128526;</span>
          </div>
          <div className="bubble">
            <p>{item.type}</p>
          </div>
        </div>
        <div>
          {currentUser.user == null ? (
            ""
          ) : (
            <IconButton
              title="Добавить в корзину"
              color={inCart ? "secondary" : "inherit"}
              onClick={() => {
                addDelToCart(item);
                setInCart(isProdInCart(item.id));
              }}
            >
              <ShoppingBasketIcon />
            </IconButton>
          )}

          {currentUser.user == null ? (
            ""
          ) : (
            <IconButton
              title="Добавить в избранное"
              color={inFavorite ? "secondary" : "inherit"}
              onClick={() => {
                addDelToFavorite(item);
                setInFavorite(isProdInFavorite(item.id));
              }}
            >
              <BookmarkIcon />
            </IconButton>
          )}

          <IconButton
            title="Узнать больше"
            component={Link}
            to={`info/${item.id}`}
            onClick={() => handleSendHistory(item)}
          >
            <InfoIcon />
          </IconButton>

          {currentUser.user == null ? (
            <IconButton>
              <FavoriteIcon /> {item.like.length}
            </IconButton>
          ) : (
            <IconButton onClick={() => likeAdd(item)}>
              <FavoriteIcon
                color={
                  item.like.includes(`${currentUser.user}`)
                    ? "error"
                    : "inherit"
                }
              />
              {item.like.length}
            </IconButton>
          )}

          <IconButton style={{ marginLeft: "40px" }}>
            <TrendingUpIcon /> {item.rating / 10}
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default OneProduct;
