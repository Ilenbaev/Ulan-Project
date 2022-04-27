import React, { createContext, useContext, useReducer } from "react";
import { CART } from "../Helpers/Consts";
import { calcTotalPrice } from "../Helpers/Functions";

const cartContext = createContext();

export const useCart = () => {
  return useContext(cartContext);
};

const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CART.GET_CART_LENGTH:
      return {
        ...state,
        cartLength: action.payload,
      };
    case CART.GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function createCartFromLS() {
    // эта функция createCartFromLS = добавляет в LS объект под ключом cart

    let cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
    //тут идет проверка, если cart пуст, дай ему ключ products и totalPrice
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
      // и верни нам cart
    }
    return cart;
    // в итоге мы получаем объект Cart с ключами products и totalPrice в LS
  }

  // add and delete

  const addDelToCart = (prod) => {
    // эта функция добавляет и удаляет продукт из корзины с помощью LocalStorage

    let cart = createCartFromLS();
    // Эта функция createCartFromLS = сверху

    //здесь мы создаем новый объект
    let newProd = {
      item: prod,
      count: 1,
      subPrice: prod.price,
    };

    // здесь идет проверка,если в корзине есть такой предмет, то верни нам true
    let checkProdInCart = cart.products.some((obj) => {
      return obj.item.id === prod.id;
    });

    //после идет провка, если true то верни нам  cart.products без этого продукта
    if (checkProdInCart) {
      cart.products = cart.products.filter((obj) => {
        return obj.item.id !== prod.id;
      });
      // если false, то запуш в  cart.products наш newProd
    } else {
      cart.products.push(newProd);
    }

    //эта функция calcTotalPrice пробегает по все продуктам которые мы добавили в корзину,
    //ищет их цену и складывает
    cart.totalPrice = calcTotalPrice(cart.products);

    //после всех проверок обновленный cart снова отправляется в LS
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartLength();
    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  const getCartLength = () => {
    let cart = createCartFromLS();
    dispatch({
      type: CART.GET_CART_LENGTH,
      payload: cart.products.length,
    });
  };

  const isProdInCart = (id) => {
    let cart = createCartFromLS();
    let exist = cart.products.some((obj) => {
      return obj.item.id === id;
    });
    return exist;
  };

  const getCart = () => {
    let cart = createCartFromLS();
    dispatch({
      type: CART.GET_CART,
      payload: cart,
    });
  };

  const changeProductCount = (newCount, id) => {
    let cart = createCartFromLS();
    cart.products = cart.products.map((elem) => {
      if (elem.item.id === id) {
        elem.count = newCount;
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const deleteProdInCart = (id) => {
    let cart = createCartFromLS();
    cart.products = cart.products.filter((elem) => {
      return elem.item.id !== id;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
    getCartLength();
  };

  return (
    <cartContext.Provider
      value={{
        cartLength: state.cartLength,
        cart: state.cart,
        addDelToCart,
        getCartLength,
        isProdInCart,
        getCart,
        changeProductCount,
        deleteProdInCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
