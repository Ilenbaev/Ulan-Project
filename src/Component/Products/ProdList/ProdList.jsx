import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Filter from "../Filter/Filter";
import OneProduct from "../OneProduct/OneProduct";
import Pagination from "@mui/material/Pagination";
import { useProductContext } from "../../../Context/ProductContextProvider";
import { PRODUCTS_LIMIT } from "../../../Helpers/Consts";
import "./ProdList.scss";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const maxSliderValue = 900;
const minSliderValue = 1;

const ProdList = () => {
  const { getProducts, products, pageTotalCount } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(+searchParams.get("_page") || 1);

  const [type, setType] = useState(searchParams.get("type") || "all");

  const [slider, setSlider] = useState(
    +searchParams.get("price_gte") || minSliderValue
  );

  const paramsWithType = () => {
    return {
      _limit: PRODUCTS_LIMIT,
      _page: page,
      type: type,
      price_gte: slider,
      q: searchParams.get("q") || "",
    };
  };

  const paramsNoType = () => {
    return {
      _limit: PRODUCTS_LIMIT,
      _page: page,
      price_gte: slider,
      q: searchParams.get("q") || "",
    };
  };

  useEffect(() => {
    if (searchParams.get("type")) {
      setSearchParams(paramsWithType());
    } else {
      setSearchParams(paramsNoType());
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    if (type === "all") {
      setSearchParams(paramsNoType());
    } else {
      setSearchParams(paramsWithType());
    }
  }, [page, type, slider]);

  const handleReset = () => {
    setType("all");
    setSlider(minSliderValue);
    setSearchParams({
      _page: page,
      _limit: PRODUCTS_LIMIT,
      price_gte: minSliderValue,
      q: "",
    });
  };

  return (
    <div>
      <div className="productList">
        <div className="leftProduct">
          <h1>
            Курсы
            <br /> для новичков
          </h1>
        </div>
        <div className="stage">
          <div className="box bounce-1">
            <PriorityHighIcon fontSize="h6" className="prodicon" />
            <QuestionMarkIcon fontSize="h6" className="prodicon" />
          </div>
        </div>
      </div>
      <Filter
        setPage={setPage}
        type={type}
        setType={setType}
        slider={slider}
        setSlider={setSlider}
        maxSliderValue={maxSliderValue}
        minSliderValue={minSliderValue}
        handleReset={handleReset}
      />
      <br />

      <Grid container spacing={2}>
        {products && products.length > 0 ? (
          products.map((item) => <OneProduct key={item.id} item={item} />)
        ) : (
          <h3>Нчего не найдено</h3>
        )}
      </Grid>

      <div style={{ margin: "50px 0", textAlign: "center" }}>
        <Pagination
          count={pageTotalCount}
          color="secondary"
          sx={{ display: "inline-block" }}
          onChange={(event, pageVal) => setPage(pageVal)}
          page={page}
        />
      </div>
    </div>
  );
};

export default ProdList;
