import React from "react";
import "./Home.scss";
import SchoolIcon from "@mui/icons-material/School";
import { IconButton } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ComputerIcon from "@mui/icons-material/Computer";
import CoPresentIcon from "@mui/icons-material/CoPresent";

const Home = () => {
  return (
    <div>
      <div className="homeimg">
        <h1>Академия IT профессий</h1>
        <h3>
          - Обучись с нуля до начинающего специалиста в любой IT профессии
          <br />
          - Работай над реальными IT проектами в лаборатории SoftLine
          <br />- Получи рекомендации по трудоустройству в IT компании
        </h3>
      </div>

      <div className="home_body ">
        <div className="home_body_name">
          <h2>SoftLine в цифрах</h2>
        </div>
        <div className="home_body_info">
          <div className="home_box">
            <span> 8</span>
            <hr /> различных IT профессий
          </div>
          <div className="home_box">
            <span>250+</span>
            <hr /> активных студентов
          </div>
          <div className="home_box">
            <span> 40+</span>
            <hr /> трудоустроенных студентов
          </div>
          <div className="home_box">
            <span> 20+</span>
            <hr /> менторов с 3+ лет опыта работы
          </div>
        </div>
      </div>

      <div className="main">
        <div>
          <h2>Преимущества обучения в SoftLine</h2>
        </div>

        <div className="main_box">
          <div className="main_left">
            <div className="main1">
              <IconButton color="error">
                <SchoolIcon fontSize="h6" className="mainicon" />
              </IconButton>
            </div>
            <div>
              <h2>Обучение с нуля до Junior</h2>
              <p>
                Пройди обучение по авторской программе SoftLine и стань Junior
                специалистом
              </p>
            </div>
          </div>

          <div className="main_left">
            <div className="main1">
              <IconButton color="error">
                <SupportAgentIcon fontSize="h6" className="mainicon" />
              </IconButton>
            </div>
            <div>
              <h2>Команда тех.поддержки</h2>
              <p>
                Получи дополнительные занятия от команды технической поддержки
              </p>
            </div>
          </div>

          <div className="main_left">
            <div className="main1">
              <IconButton color="error">
                <ComputerIcon fontSize="h6" className="mainicon" />
              </IconButton>
            </div>
            <div>
              <h2>Стажировка в SoftLine Lab</h2>
              <p>Работай над реальными проектами в лаборатории SoftLine</p>
            </div>
          </div>

          <div className="main_left">
            <div className="main1">
              <IconButton color="error">
                <CoPresentIcon fontSize="h6" className="mainicon" />
              </IconButton>
            </div>
            <div>
              <h2>Трудоустройство с HR</h2>
              <p>
                Получи курс от HR специалиста и найди работу в крупных IT
                компании
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
<h1>it is Home page</h1>;
