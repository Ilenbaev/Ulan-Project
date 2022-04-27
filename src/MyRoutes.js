import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayouts from "./Layouts/MainLayouts";
import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/Home/Home";
import List from "./Component/Admin/List/List.jsx";
import Add from "./Component/Admin/Add/Add.jsx";
import Edit from "./Component/Admin/Edit/Edit.jsx";
import Courses from "./Pages/Courses/Courses";

import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import Cart from "./Component/Cart/Cart";
import Favorite from "./Component/Favorite/Favorite";
import Info from "./Component/Info/Info";
import Bank from "./Component/Bank/Bank";
import Recom from "./Component/Recom/Recom";
import FormReg from "./Component/FormReg/FormReg";
import History from "./Component/History/History";

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="recom" element={<Recom />} />
        <Route path="formReg" element={<FormReg />} />
        <Route path="history" element={<History />} />
        <Route path="/courses/info/:prodId" element={<Info />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MyRoutes;
