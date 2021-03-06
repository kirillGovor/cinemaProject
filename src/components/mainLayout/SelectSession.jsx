import React from "react";
import { withRouter, Route, NavLink } from "react-router-dom";
import SelectOptions from "../ticketsPage/SelectOptions";
import SessionSeats from "../homePage/SessionSeats";

class SelectSession extends React.Component {
  render() {
    const { film } = this.props;
    return (
      <div>
        <SelectOptions />
        <div className="session-selection">
          <div>
            <div className="session-selection__film">
              <h4 className="select-options__title">{film.name}</h4>
              <img className="selection__img" src={film.url} alt={film.name} />
            </div>

            <div>Genre:</div>
            <div>Age limit:</div>
            <div> Director:</div>
            <div>Actors:</div>
            <div> Description:</div>
            <div>
              <button className="button session-selection__button">
                View Treiler
              </button>
            </div>
          </div>
          <div className="session-selection__showing">
            <div className="showing__place">
              <h4>Arena City Silver Screen </h4>

              <NavLink to={"/seats/" + film.id}>
                <div className="showing__place__screening">
                  <div>time</div>
                  <div> Session Type:</div>
                  <div> room: </div>
                </div>
              </NavLink>
              <NavLink to={"/seats/" + film.id}>
                <div className="showing__place__screening">
                  <div>time</div>
                  <div> Session Type:</div>
                  <div> room: </div>
                </div>
              </NavLink>
            </div>
            <div className="showing__place">
              <h4>Velcom cinema </h4>
              <NavLink to={"/seats/" + film.id}>
                <div className="showing__place__screening">
                  <div>time</div>
                  <div> Session Type:</div>
                  <div> room: </div>
                </div>
              </NavLink>
              <NavLink to={"/seats/" + film.id}>
                <div className="showing__place__screening">
                  <div>time</div>
                  <div> Session Type:</div>
                  <div> room: </div>
                </div>
              </NavLink>
            </div>
            <div className="showing__place">
              <h4>Belarus</h4>
              <NavLink to={"/seats/" + film.id}>
                <div className="showing__place__screening">
                  <div>time</div>
                  <div> Session Type:</div>
                  <div> room: </div>
                </div>
              </NavLink>
            </div>
            <div className="showing__place">
              <h4>Galileo Silver Screen</h4>
              <NavLink to={"/seats/" + film.id}>
                <div className="showing__place__screening">
                  <div>time</div>
                  <div> Session Type:</div>
                  <div> room: </div>
                </div>
              </NavLink>
              <NavLink to={"/seats/" + film.id}>
                <div className="showing__place__screening">
                  <div>time</div>
                  <div> Session Type:</div>
                  <div> room: </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <Route path="/seats/:id" component={SessionSeats} />
      </div>
    );
  }
}

export default withRouter(SelectSession);
