import React, { Component } from "react";

//////////////////////////////////////////////////////////////////////
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base_index: 0,
      isAuthenticated: false,
      customerId: null,
      username: null,
    };
  }


  //////////////////////////////////////////////////////////////////////
  render() {
    // Render your page inside
    // the layout provider
    const { isAuthenticated, username,  } = this.props.data;

    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    function myFunction() {
      var x = document.getElementById("mobileNavbar");
      console.log(x);
      if (x.className === "mobileNavbar") {
        x.className += " visible";
      } else {
        x.className = "mobileNavbar";
      }
    }

    var login_on_desktop_navbar;
    var login_on_burger_navbar;

    console.log(login_on_desktop_navbar);
    return (
      // <Router>
      <div>
        <div>
          Offer1
        </div>
        <div>
          <i
            className="fa fa-bars"
            style={{ color: "#AAAAAA", right: "1%" }}
          ></i>
        </div>
        <hr></hr>
      </div>
    );
  }

}
export default Header;
