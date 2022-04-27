import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./FormReg.scss";
import { Link } from "react-router-dom";
import { useProductContext } from "../../Context/ProductContextProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormReg({ regForm, forEditVal }) {
  const { saveEditedProd } = useProductContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    sendRating();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendRating = () => {
    let abc = forEditVal.rating + 1;
    let obj = {
      ...forEditVal,
      rating: abc,
    };
    saveEditedProd(obj);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="warning"
        className="btnForm"
      >
        Записаться на курсы
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="regForm"
      >
        <div className="formRegMain">
          <DialogTitle>
            Спасибо что выбрали SoftLine:{" "}
            <span className="formSpan">{regForm.name}</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{ color: "white", width: "208px" }}
            >
              Вы указали номер: <span className="formSpan">{regForm.num}</span>,
              <br /> В течении двух рабочих дней, наш сотрудник свяжется с Вами,
              <br /> Дополнительная информация о наших курсах была отправлена на
              Вашу почту: <span className="formSpan">{regForm.mail}</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "yellow" }}>
              Закрыть
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
