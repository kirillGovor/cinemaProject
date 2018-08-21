import React from "react";
import { NavLink } from "react-router-dom";
import openmenu from "./openmenu.svg";
import closemenu from "./closemenu.svg";
import user from "./user.svg";
// import SelectCity from "./SelectCity";
import SignOutButton from "./SignOut";
import withAuthorization from "../Session/withAuthorization";
import { db } from "../firebase";
import { auth } from "../firebase";
import ToolTip from "react-portal-tooltip";
import { style } from "./styleTooltip";
import Animate from "rc-animate";
// import Transition from "react-transition-group/Transition";

class PagesLinks extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      sideDrawerOpen: false,
      isTooltipActive: false,
      visible: true
    };
  }

  showTooltip() {
    this.setState({ isTooltipActive: true });
  }
  hideTooltip() {
    this.setState({ isTooltipActive: false });
  }

  onAppear = key => {
    console.log("appear", key);
  };

  onEnter = key => {
    console.log("enter", key);
  };

  onLeave = key => {
    console.log("leave", key);
  };
  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  closeMenu = e => {
    this.setState({ sideDrawOpen: false });
    console.log(e.target);
  };
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    const { sideDrawerOpen } = this.state;
    return (
      <div className="headerMenu">
        <div className="header__menu-button">
          <NavLink to="/cinemas">
            <button className="menu-button">Cinemas</button>
          </NavLink>
          <NavLink to="/movies" activeClassName="ActivePageLink">
            <button className="menu-button">Movies</button>
          </NavLink>
          <NavLink to="/buy-tickets">
            <button className="menu-button">Tickets</button>
          </NavLink>
          <NavLink exact to="/">
            <button className="menu-button">Home</button>
          </NavLink>
          <button
            className="menu-button"
            type="button"
            onClick={auth.doSignOut}
            id="signOut"
            onMouseEnter={this.showTooltip.bind(this)}
            onMouseLeave={this.hideTooltip.bind(this)}
          >
            Sign Out
          </button>
          {/* <SignOutButton /> */}
          <ToolTip
            active={this.state.isTooltipActive}
            position="left"
            arrow="center"
            parent="#signOut"
            className="toolTip"
            style={style}
          >
            <div>
              <p>Are you sure? You will not be able to use the services!</p>
            </div>
          </ToolTip>

          {/* <SelectCity /> */}
          <NavLink to="/account">
            <img src={user} className="user" alt="closemenu" />
          </NavLink>
        </div>

        <div className="changeMenubtn">
          <button
            className="media-btn__isOpen"
            onClick={this.drawerToggleClickHandler}
          >
            {!this.state.sideDrawerOpen && (
              <img src={openmenu} className="menu" alt="closemenu" />
            )}
          </button>
        </div>

        {this.state.sideDrawerOpen && (
          <div className="header__menu-button--media">
            {this.state.sideDrawerOpen && (
              <button
                className="media-btn__close"
                onClick={this.drawerToggleClickHandler}
              >
                <img src={closemenu} className="menu" alt="openmenu" />
              </button>
            )}
            <Animate
              component=""
              showProp="visible"
              onAppear={this.onAppear}
              onEnter={this.onEnter}
              onLeave={this.onLeave}
              transitionAppear
              transitionName="fade"
            >
              <div visible={this.state.visible}>
                <NavLink to="/account">
                  <img src={user} className="user" alt="closemenu" />
                </NavLink>
                <NavLink to="/cinemas">
                  <button className="menu-button">Cinemas</button>
                </NavLink>
                <NavLink to="/movies">
                  <button className="menu-button">Movies</button>
                </NavLink>
                <NavLink to="/buy-tickets">
                  <button className="menu-button">Tickets</button>
                </NavLink>
                {/* <button className="menu-button">Coming Soon</button> */}
                <NavLink to="/">
                  <button className="menu-button">Home</button>
                </NavLink>
                <SignOutButton />
              </div>
            </Animate>
            {/* <SelectCity /> */}
          </div>
        )}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(PagesLinks);
