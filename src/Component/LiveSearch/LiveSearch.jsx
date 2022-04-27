import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useLocation, useSearchParams } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  border: "1px solid black",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const LiveSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // useSearchParams хук работающий с URL строкой

  const location = useLocation();
  // useLocation хук для работы на определенной странице

  const [inpSearch, setInpSearch] = useState(searchParams.get("q") || "");
  // создаем state который будет подставлятся в URL строке после знака "q"

  useEffect(() => {
    // мы создали useEffect для того что бы он перестал работать после переключения на другую страничку, то есть он должен "умереть"
    let currentParams = Object.fromEntries([...searchParams]);
    // console.log(currentParams);

    if (location.pathname === "/courses") {
      setSearchParams({
        ...currentParams,
        _page: 1,
        q: inpSearch,
      });
    }
  }, [inpSearch]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={inpSearch}
        onChange={(e) => setInpSearch(e.target.value)}
        placeholder="Поиск…"
        inputProps={{ "aria-label": "search" }}
        style={{ width: "160px" }}
      />
    </Search>
  );
};

export default LiveSearch;
