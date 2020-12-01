import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./Canteen.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store";

import Default from "./pages/Default";
import Homepage from "./pages/User/Homepage";
import UserForm from "./components/login/UserForm";
import OrdersManager from "./pages/admin/OrdersManager";
import FoodStore from "./pages/admin/FoodStore";
import CardManager from "./pages/admin/CardManager";
import AdminHome from "./pages/admin/AdminHome";
import AccountManager from "./pages/admin/AccountManager";
import MyAccount from "./pages/User/MyAccount";
import ImgDropAndCrop from "./components/dragndrop/ImgDrop";
import ImgDrop from "./components/dragndrop/ImgDrop";
import productdata from "./productdata";
import CardEdit from "./components/CardEdit";
import ItemEdit from "./components/ItemEdit";
import Shop from "./pages/User/Shop";
import CartPage from "./pages/User/CartPage";
import CardProfile from "./pages/User/CardProfile";
import SendImage from "./components/Dropzone";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <div className="App">
            {/* <AppNavBar/> */}
            <Switch>
              <Route exact path="/dropzone" component={SendImage} />
              <Route exact path="/" component={Homepage} />
              <Route exact path="/admin" component={AdminHome} />
              <Route exact path="/admin/foodStore" component={FoodStore} />
              <Route
                exact
                path="/admin/foodStore/itemedit"
                component={ItemEdit}
              />
              <Route exact path="/admin/cardManager" component={CardManager} />
              <Route
                exact
                path="/admin/cardManager/editcard"
                component={CardEdit}
              />
              <Route
                exact
                path="/admin/ordersManager"
                component={OrdersManager}
              />
              <Route
                exact
                path="/user/:userId/myaccount"
                component={MyAccount}
              />
              <Route
                exact
                path="/user/:userId/cardprofile"
                component={CardProfile}
              />
              <Route exact path="/user/:userId/shop" component={Shop} />
              <Route exact path="/user/:userId/mycart" component={CartPage} />

              {/* <Route exact path="/cart" component={Cart} /> */}
              <Route
                exact
                path="/admin/accountManager"
                component={AccountManager}
              />
              <Route exact path="/signup" component={UserForm} />
              <Route component={Default} />
            </Switch>
            {/* <ItemModel />
            <ShoppingList /> */}
          </div>
        </Provider>
      </React.Fragment>
    );
  }
}
export default App;
