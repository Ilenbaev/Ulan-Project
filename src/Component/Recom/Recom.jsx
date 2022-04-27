import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import "./Recom.scss";

const Recom = ({ products, forEditVal }) => {
  const [recomm, setRecomm] = useState("");

  let abc = products.filter((item) => {
    return item.id !== forEditVal.id;
  });

  useEffect(() => {
    setRecomm(abc[Math.floor(Math.random() * abc.length)]);
  }, [forEditVal]);

  return (
    <div className="recom">
      <h1 style={{ color: "aqua" }}>Так же рекомендуем</h1>
      <div className="recomInfo">
        <div className="cardCours">
          <div>
            <h3 style={{ color: "white" }}>
              Цена: {recomm.price}$
              <br />
              Курс
            </h3>
          </div>
          <div style={{ color: "white" }}>
            <h2>{recomm.language}</h2>
          </div>
          <div className="cardProf">
            <div style={{ color: "white" }}>
              <h3>Длительность: {recomm.time}</h3>
            </div>
            <div>
              <span style={{ color: "#CF0;", fontSize: "45px" }}>
                &#128526;
              </span>
            </div>
            <div className="bubble">
              <p>{recomm.type}</p>
            </div>
          </div>
          <div>
            <IconButton
              title="Узнать больше"
              component={Link}
              to={`/courses/info/${recomm.id}`}
              color="info"
            >
              <InfoIcon />
            </IconButton>
          </div>
        </div>

        <div style={{ color: "white" }} className="rightRec">
          <div>
            <h2>{recomm.language}</h2>
          </div>
          <div>
            <p>{recomm.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recom;
