import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import SelectSession from "./SelectSession";
import { connect } from "react-redux";
import { requestFilms } from "../mainLayout/actions/filmsNow-actions";
import { requestFilmsSoon } from "../mainLayout/actons_filmsSoon/filmsSoon-actions";
import { createFilm } from "./header_actions/actions";

class SelectFilms extends React.Component {
  state = {
    defaultInput: this.props.defaultInput,
    filmNameArr: [],
    searchableMovies: [],
    film: {}
  };
  componentDidMount = () => {
    const { onAddFilms, onAddTodo } = this.props;
    onAddFilms({ ...this.state });
    onAddTodo({ ...this.state });
  };
  searchChanged = e => {
    const obj = Object.assign({}, this.props.movies.movies[0]);
    const moviesNow = Object.values(obj);
    const object = Object.assign({}, this.props.dataSoon.moviesSoon[0]);
    const filmsSoon = Object.values(object);
    const filmNameArr = moviesNow
      .map(film => film.name)
      .concat(filmsSoon.map(filmSoon => filmSoon.name));

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
    const obj = Object.assign({}, this.props.movies.movies[0]);
    const moviesNow = Object.values(obj);
    const object = Object.assign({}, this.props.dataSoon.moviesSoon[0]);
    const filmsSoon = Object.values(object);
    const { history } = this.props;
    const movie = moviesNow.find(movie => movie.name === e);
    const movieSoon = filmsSoon.find(movieSoon => movieSoon.name === e);
    if (movie) {
      history.push(`/movie/:${movie.id}`);
      this.setState({
        film: movie
      });
      const { onCreateFilm } = this.props;
      onCreateFilm({ ...this.state });
    }
    if (movieSoon) {
      history.push(`/movie/:${movieSoon.id}`);
      this.setState({
        film: movieSoon
      });
      const { onCreateFilm } = this.props;
      onCreateFilm({ ...this.state });
    }
  };
  render() {
    const { film } = this.state;
    console.log(this.props.selectMovie);
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
          />
        </form>
        <Switch>
          <Route path={`/movie/:${film.id}`}>
            <SelectSession film={film} />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectMovie: state.selectMovie,
    movies: state.movies,
    dataSoon: state.dataSoon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateFilm: selectMovie => {
      dispatch(createFilm(selectMovie));
    },
    onAddFilms: dataSoon => {
      dispatch(requestFilmsSoon(dataSoon));
    },
    onAddTodo: movies => {
      dispatch(requestFilms(movies));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SelectFilms));
