import React, { createContext, useContext, useReducer, useState } from "react";
import { FAV } from "../Helpers/Consts";

const favoriteContext = createContext();

export const useFavorite = () => {
  return useContext(favoriteContext);
};

const INIT_STATE = {
  favorite: JSON.parse(localStorage.getItem("favorite")),
  favoriteLength: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case FAV.GET_FAV_LENGTH:
      return {
        ...state,
        favoriteLength: action.payload,
      };
    case FAV.GET_FAV:
      return {
        ...state,
        favorite: action.payload,
      };
    default:
      return state;
  }
}

const FavoriteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [historyProduct, setHistoryProduct] = useState("");

  function createFavoriteFromLS() {
    let favorite = JSON.parse(localStorage.getItem("favorite"));

    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
      localStorage.setItem("favorite", JSON.stringify(favorite));
    }
    return favorite;
  }

  const addDelToFavorite = (prod) => {
    let favorite = createFavoriteFromLS();

    let newProd = {
      item: prod,
    };

    let checkProdInFavorite = favorite.products.some((obj) => {
      return obj.item.id === prod.id;
    });
    if (checkProdInFavorite) {
      favorite.products = favorite.products.filter((obj) => {
        return obj.item.id !== prod.id;
      });
    } else {
      favorite.products.push(newProd);
    }

    localStorage.setItem("favorite", JSON.stringify(favorite));
    getFavoriteLength();
    dispatch({
      type: FAV.GET_FAV,
      payload: favorite,
    });
  };

  const getFavoriteLength = () => {
    let favorite = createFavoriteFromLS();
    dispatch({
      type: FAV.GET_FAV_LENGTH,
      payload: favorite.products.length,
    });
  };

  const isProdInFavorite = (id) => {
    let favorite = createFavoriteFromLS();
    let exist = favorite.products.some((obj) => {
      return obj.item.id === id;
    });
    return exist;
  };

  const getFavorite = () => {
    let favorite = createFavoriteFromLS();
    dispatch({
      type: FAV.GET_FAV,
      payload: favorite,
    });
  };

  const deleteProdInFavorite = (id) => {
    let favorite = createFavoriteFromLS();
    favorite.products = favorite.products.filter((elem) => {
      return elem.item.id !== id;
    });
    localStorage.setItem("favorite", JSON.stringify(favorite));
    getFavorite();
    getFavoriteLength();
  };

  const sendHistory = (item) => {
    let history = JSON.parse(localStorage.getItem("history"));

    if (!history) {
      history = {
        products: [],
      };
      localStorage.setItem("history", JSON.stringify(history));
    }

    let newProd = {
      item: item,
    };

    let checkProdInHistory = history.products.some((obj) => {
      return obj.item.id === item.id;
    });

    if (checkProdInHistory) {
      history.products = history.products.filter((obj) => {
        return history.products;
      });
    } else {
      history.products.push(newProd);
    }

    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <favoriteContext.Provider
      value={{
        favoriteLength: state.favoriteLength,
        favorite: state.favorite,
        addDelToFavorite,
        getFavoriteLength,
        isProdInFavorite,
        getFavorite,
        deleteProdInFavorite,
        sendHistory,
      }}
    >
      {children}
    </favoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
