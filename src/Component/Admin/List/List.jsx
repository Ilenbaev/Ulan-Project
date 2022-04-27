import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { useProductContext } from "../../../Context/ProductContextProvider";

const List = () => {
  const { products, getProducts, deleteProduct } = useProductContext();

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (prod) => {
    let answer = true;
    if (answer) deleteProduct(prod);
  };

  return (
    <div>
      {products && products.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: "70px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Язык программирования
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Статус
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Длительность
                </TableCell>

                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Цена
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Опции
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.language}
                  </TableCell>
                  <TableCell align="center">{item.type}</TableCell>
                  <TableCell align="center">{item.time}</TableCell>

                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(item)}>
                      <DeleteIcon />
                    </IconButton>
                    <Link to={`edit/${item.id}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <hr />
          <Link to="/admin/add">
            <IconButton style={{ margin: "20px" }}>
              <AddIcon fontSize="large" />
              <Box
                style={{
                  marginLeft: "20px",
                  textDecoration: "none",
                  fontSize: 22,
                  color: "black",
                }}
              >
                Добавить курс
              </Box>
            </IconButton>
          </Link>
        </TableContainer>
      ) : (
        <Link to="/admin/add">
          <IconButton style={{ margin: "20px" }}>
            <AddIcon fontSize="large" />
            <Box
              style={{
                marginLeft: "20px",
                textDecoration: "none",
                fontSize: 22,
                color: "black",
              }}
            >
              Добавить курс
            </Box>
          </IconButton>
        </Link>
      )}
    </div>
  );
};

export default List;
