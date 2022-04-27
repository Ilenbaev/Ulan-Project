import * as React from "react";

import { Container, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFavorite } from "../../Context/FavoriteContextProvider";
import History from "../History/History";

const Favorite = () => {
  const { favorite, getFavorite, deleteProdInFavorite, historyProduct } =
    useFavorite();

  React.useEffect(() => {
    getFavorite();
  }, []);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ flexGrow: 1 }}
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {favorite?.products.length > 0 ? (
          <>
            {favorite.products.map((elem) => (
              <div style={{ margin: "20px", textAlign: "center" }}>
                <div>
                  <div>
                    <img src={elem.item.img} width="240" height="350" alt="" />
                  </div>
                  <div>
                    <h4>{elem.item.language}</h4>
                    <p>{elem.item.type}</p>
                    <IconButton
                      style={{ fontSize: "16px" }}
                      onClick={() => deleteProdInFavorite(elem.item.id)}
                    >
                      <DeleteIcon /> Удалить из избранного
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1>
            Вы еще ничего не добавили в избранное... <hr />
          </h1>
        )}
      </Container>
      <hr />
      <History historyProduct={historyProduct} />
    </>
  );
};

export default Favorite;
