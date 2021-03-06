import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import SelectSession from "./SelectSession";
import ToolTip from "react-portal-tooltip";
import { style } from "./styleTooltip";

class SelectFilms extends React.Component {
  state = {
    defaultInput: this.props.defaultInput,
    filmNameArr: [],
    searchableMovies: [],
    film: {},
    isTooltipActive: false
  };

  searchChanged = e => {
    const { moviesNow, moviesSoon } = this.props;
    const filmNameArr = moviesNow
      .map(film => film.name)
      .concat(moviesSoon.map(filmSoon => filmSoon.name));
    if (!e.target.value) {
      this.setState({ searchableMovies: [] });
      return;
    }

    const searchableMovies = filmNameArr.filter(film =>
      film.toLowerCase().startsWith(e.target.value.toLowerCase())
    );

    this.setState({ searchableMovies });
  };

  handleCreateFilm = e => {
    const { moviesNow, moviesSoon } = this.props;
    const { history } = this.props;
    const movie = moviesNow.find(movie => movie.name === e);
    const filmsSoon = moviesSoon.find(filmsSoon => filmsSoon.name === e);
    if (movie) {
      history.push(`/movie/:${movie.id}`);
      this.setState({
        film: movie
      });
    }
    if (filmsSoon) {
      history.push(`/movie/:${filmsSoon.id}`);
      this.setState({
        film: filmsSoon
      });
    }
  };
  showTooltip() {
    this.setState({ isTooltipActive: true });
  }
  hideTooltip() {
    this.setState({ isTooltipActive: false });
  }
  render() {
    const { film } = this.state;
    const { searchableMovies } = this.state;
    const films = searchableMovies.map((name, i) => {
      return (
        <div
          className="searchfilm"
          key={i}
          id={name.id}
          onClick={() => this.handleCreateFilm(name)}
        >
          {name}
        </div>
      );
    });
    return (
      <div>
        <form className="header__search">
          {films.length > 0 ? (
            <div className="filmNameSearch">{films}</div>
          ) : null}

          <input
            className="header__search__inp"
            type="text"
            defaultValue={this.state.defaultInput}
            placeholder="Search films"
            onChange={this.searchChanged}
            id="find"
            onMouseEnter={this.showTooltip.bind(this)}
            onMouseLeave={this.hideTooltip.bind(this)}
          />
          <ToolTip
            active={this.state.isTooltipActive}
            position="left"
            arrow="center"
            parent="#find"
            className="toolTip"
            style={style}
          >
            <div>
              <p>You can find films!</p>
            </div>
          </ToolTip>
        </form>
        <Switch>
          <Route path={`/movie/:${film.id}`}>
            <SelectSession id={film.id} film={this.state.film} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(SelectFilms);
