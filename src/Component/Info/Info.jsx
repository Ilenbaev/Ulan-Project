import { Box, Container, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProductContext } from "../../Context/ProductContextProvider";
import { useAuth } from "../../Context/AuthContextProvider";
import { notify } from "../Toastify/Toastify";
import { useUserContext } from "../../Context/ComContextProvider";
import "./Info.scss";
import infoJob from "../img/infoJob.webp";
import Recom from "../Recom/Recom";
import FormReg from "../FormReg/FormReg";

const Info = () => {
  const { prodId } = useParams();
  const { getOneProduct, forEditVal, products, getProducts } =
    useProductContext();
  const { addCommit, product, getCommit, deleteCommit } = useUserContext();

  const { currentUser } = useAuth();

  const inpVal = {
    name: "",
    num: "",
    mail: "",
  };

  const [regForm, setRegForm] = useState(inpVal);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getCommit(prodId);
  }, [prodId]);

  const [inpValues, setInpValues] = useState({
    commit: "",
    user: "",
    prodId: prodId,
  });

  useEffect(() => {
    getOneProduct(prodId);
  }, [prodId]);

  useEffect(() => {
    setInpValues({
      ...inpValues,
      user: currentUser.user,
    });
  }, [currentUser]);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };

    setInpValues(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inpValues.commit.trim()) {
      notify("error", "Заполните все поля");
      return;
    }
    let obj = {
      ...inpValues,
    };
    addCommit(obj);
  };

  const handleForm = (e) => {
    let obj = {
      ...regForm,
      [e.target.name]: e.target.value,
    };
    setRegForm(obj);
  };

  return (
    <>
      {forEditVal ? (
        <div>
          <div className="mainInfo">
            <Container sx={{ flexGrow: 1 }}>
              <div>
                <div className="info">
                  <div className="leftInfo">
                    <div className="leftName">
                      <h1>Профессия {forEditVal.language}</h1>
                    </div>
                    <div className="leftDisc">
                      <p>{forEditVal.description}</p>
                    </div>
                  </div>

                  <div className="rightInfo">
                    <div className="rightImg">
                      <img
                        src={forEditVal.img}
                        alt={forEditVal.language}
                        width="500px"
                      />
                    </div>
                  </div>
                </div>

                <div className="infoJob">
                  <div className="rightBlock">
                    <img src={infoJob} alt="" />
                  </div>
                  <div className="leftBlock">
                    <h2>Помощь в трудоустройстве</h2>
                    <p>
                      Совместно с HR специалистами в IT сфере мы разработали
                      программу "Старт карьеры в IT": 1. Обзор рынка труда в IT
                      сфере 2. Составление резюме и мотивационного письма 3.
                      Личный бренд на профессиональных платформах 4. Оформление
                      портфолио 5. Прохождение тех.собеседования с менторами
                      SoftLine Academy
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <div className="mainForm">
            <Container sx={{ flexGrow: 1 }}>
              <div className="infoForm">
                <div className="leftForm">
                  <div>
                    <h1>
                      Стоимость
                      <br /> обучения:
                    </h1>
                  </div>
                  <br />
                  <br />

                  <div>
                    {forEditVal.time == "6 месяцев" ? (
                      <h2>{Math.round(forEditVal.price / 6)}</h2>
                    ) : forEditVal.time == "2 месяца" ? (
                      <h2>{Math.round(forEditVal.price / 2)}</h2>
                    ) : forEditVal.time == "3 месяца" ? (
                      <h2>{Math.round(forEditVal.price / 3)}</h2>
                    ) : null}
                    <p>$/месяц</p>
                    <br />
                    <br />
                    <br />
                    <p>Можно оплачивать частями</p>
                  </div>
                </div>
                <div className="rightForm">
                  <div className="rightFirst">
                    <div>
                      <h3>Старт курса: {forEditVal.month}</h3>
                    </div>
                    <div>
                      <h3>Осталось мест: {forEditVal.place}</h3>
                    </div>
                  </div>
                  <div className="rightTwo">
                    <h2>
                      Записаться на курс или
                      <br /> получить бесплатную консультацию
                    </h2>
                  </div>
                  <div className="rightThree">
                    Имя
                    <br />
                    <input
                      name="name"
                      type="text"
                      placeholder="Имя"
                      className="formInput"
                      onChange={(e) => handleForm(e)}
                    />
                    <br />
                    Номер телефона
                    <br />
                    <input
                      name="num"
                      type="number"
                      placeholder="+(996)ххх-хх-хх-хх"
                      className="formInput"
                      onChange={(e) => handleForm(e)}
                    />
                    <br />
                    Email
                    <br />
                    <input
                      name="mail"
                      type="text"
                      placeholder="example@site.com"
                      className="formInput"
                      onChange={(e) => handleForm(e)}
                    />
                  </div>
                  <FormReg regForm={regForm} forEditVal={forEditVal} />
                  <br />
                </div>
              </div>
            </Container>
          </div>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px 0",
            }}
          >
            <Card
              sx={{
                maxWidth: 800,
                border: "1px solid grey",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CardContent className="commitBox">
                <form onSubmit={(e) => handleSubmit(e)}>
                  {product.map((item) => (
                    <Box key={item.id} className="commitBox1">
                      <div>
                        <span style={{ color: "#CF0;", fontSize: "45px" }}>
                          &#128526;
                        </span>
                      </div>
                      <div>
                        <p style={{ fontWeight: "bold" }}>{item.user}</p>
                        <p style={{ opacity: "0.6" }}>
                          {new Date().toLocaleString()}
                        </p>
                        <p>{item.commit}</p>
                        {item.user === currentUser.user ? (
                          <IconButton onClick={() => deleteCommit(item)}>
                            <DeleteIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </div>
                    </Box>
                  ))}
                  <TextField
                    name="commit"
                    id="outlined-basic"
                    label="Коммент"
                    variant="outlined"
                    multiline
                    rows={2}
                    onChange={(e) => handleChange(e)}
                    sx={{ my: 1, maxWidth: "350px" }}
                  />

                  <br />
                  <Button type="submit" variant="contained">
                    Добавить комент
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>

          <Recom
            products={products}
            getProducts={getProducts}
            forEditVal={forEditVal}
          />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Info;
