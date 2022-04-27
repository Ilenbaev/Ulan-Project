import "./App.css";
import Toastify from "./Component/Toastify/Toastify";
import AuthContextProvider from "./Context/AuthContextProvider";
import CartContextProvider from "./Context/CartContextProvider";
import Comment from "./Context/ComContextProvider";
import FavoriteContextProvider from "./Context/FavoriteContextProvider";
import ProductContextProvider from "./Context/ProductContextProvider";
import MyRoutes from "./MyRoutes";

function App() {
  return (
    <Comment>
      <FavoriteContextProvider>
        <CartContextProvider>
          <AuthContextProvider>
            <ProductContextProvider>
              <Toastify />
              <MyRoutes />
            </ProductContextProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </FavoriteContextProvider>
    </Comment>
  );
}

export default App;
