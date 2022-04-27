import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, APILIKE, PRODUCTS_LIMIT } from "../Helpers/Consts";

export const userContext = createContext();

export const useUserContext = () => {
  return useContext(userContext);
};

const INIT_STATE = {
  commit: [],
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return {
        ...state,
        product: action.payload.data,
      };
  }
}

const Comment = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getCommit = async (id) => {
    try {
      let res = await axios.get(`${APILIKE}?prodId=${id}`);
      dispatch({
        type: ACTIONS.GET_PRODUCTS,
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addCommit = async (newProduct) => {
    try {
      let res = await axios.post(APILIKE, newProduct);
      getCommit(newProduct.prodId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommit = async (item) => {
    try {
      let res = await axios.delete(`${APILIKE}/${item.id}`);
      getCommit(item.prodId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <userContext.Provider
      value={{
        addCommit,
        getCommit,
        deleteCommit,
        product: state.product,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default Comment;
