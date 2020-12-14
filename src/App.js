import React, { Component } from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header/Header";
import ListingsPage from "./components/Listings/ListingsPage";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // this.updateLogInStatus = this.updateLogInStatus.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      suggestMealPopOver: false,
      isAuthenticated: false,
      customerId: null,
    };
  }

render(){
  return (
    <div>        
        <Header data = {this.state}/>  
        <ListingsPage />
         {/* <Router> */}
          {/* <Switch> */}
            {/* <Route exact path="/login"  
              render={() => (<Login updateLogInStatus={this.updateLogInStatus} openFlag={true}/>) }
            /> */}
            {/* <Route path="/product-detail/:customerId/:productId" component={ProductFullDetail} /> */}
            {/* <Route path="/v2" render={() =>  <MealsPage />}/> */}
          {/* </Switch>     */}
        {/* </Router> */}

        {/* <Footer /> */}
      </div>
  );
}
}

export default App;
