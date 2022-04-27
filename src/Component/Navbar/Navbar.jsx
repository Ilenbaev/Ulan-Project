import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "../img/navbarfon.jpg";
import { Link, NavLink } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import "./Navbar.scss";
import { Badge, Button } from "@mui/material";
import LiveSearch from "../LiveSearch/LiveSearch";
import { useAuth } from "../../Context/AuthContextProvider";
import SettingsIcon from "@mui/icons-material/Settings";
import { useCart } from "../../Context/CartContextProvider";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useFavorite } from "../../Context/FavoriteContextProvider";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { currentUser, logOutUser } = useAuth();

  const { getCartLength, cartLength } = useCart();
  const { getFavoriteLength, favoriteLength } = useFavorite();

  React.useEffect(() => {
    getCartLength();
  }, []);

  React.useEffect(() => {
    getFavoriteLength();
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const clearLC = () => {
    localStorage.setItem("block", false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {currentUser?.isLogged && (
        <MenuItem onClick={handleMenuClose}>{currentUser?.user}</MenuItem>
      )}

      {currentUser?.isLogged && (
        <MenuItem>
          <NavLink
            to="/cart"
            style={{ color: "white", textDecoration: "none" }}
          >
            <IconButton
              style={{ color: "black", width: "80px" }}
              aria-label="show 4 new mails"
            >
              <Badge badgeContent={+cartLength} color="error">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
            <span style={{ color: "black", margin: "0" }}>Корзина</span>
          </NavLink>
        </MenuItem>
      )}

      {currentUser?.user && (
        <MenuItem>
          <Link to="/favorite" style={{ color: "white" }}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              style={{ color: "black", width: "80px" }}
            >
              <Badge badgeContent={+favoriteLength} color="error">
                <BookmarkIcon />
              </Badge>
            </IconButton>
            <span style={{ color: "black", margin: "0" }}>Избранное</span>
          </Link>
        </MenuItem>
      )}

      {currentUser?.isLogged && (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            logOutUser();
          }}
        >
          Выйти
        </MenuItem>
      )}
      {!currentUser?.isLogged && (
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            className="mobile-link"
            to="/register"
            style={{ textDecoration: "none", color: "black" }}
          >
            Регистрация
          </NavLink>
        </MenuItem>
      )}
      {!currentUser?.isLogged && (
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            className="mobile-link"
            to="/login"
            style={{ textDecoration: "none", color: "black" }}
          >
            Войти
          </NavLink>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/courses" style={{ textDecoration: "none" }}>
          <IconButton
            style={{ color: "black" }}
            size="large"
            aria-label="show 4 new mails"
          >
            <SchoolIcon />
          </IconButton>
          <span style={{ color: "black", margin: 0 }}>Курсы</span>
        </NavLink>
      </MenuItem>

      {currentUser?.isAdmin && (
        <MenuItem>
          <NavLink to="/admin" style={{ textDecoration: "none" }}>
            <IconButton
              style={{ color: "black" }}
              size="large"
              aria-label="show 4 new mails"
            >
              <SettingsIcon />
            </IconButton>
            <span style={{ color: "black", margin: 0 }}>Admin</span>
          </NavLink>
        </MenuItem>
      )}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="error"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ zIndex: "3" }} className="navbar">
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: "white",
          }}
        >
          <NavLink to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: "block" } }}
            >
              <img src={logo} width="200px" alt="" />
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              className="navbar_btn"
              sx={{
                mx: 1,
                color: "darkRed",
                display: "block",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              component={NavLink}
              to="/courses"
              onClick={clearLC}
            >
              Курсы
            </Button>

            {currentUser?.isAdmin && (
              <Button
                sx={{
                  mx: 1,
                  color: "darkRed",
                  display: "block",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                component={NavLink}
                to="/admin"
              >
                Admin
              </Button>
            )}

            <LiveSearch />

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              style={{ color: "black" }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              style={{ color: "black" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
