import React, { Component, useState } from 'react';
import '../Catalogo.css';
import Pagination from './Pagination';
import MovieCard from './MovieCard';
import { InfoPeliculas } from './InfoPeliculas';
import Modal from 'react-modal';

class CatalogoPeliculas extends Component {
  state = { allMovies: [], currentMovies: [], currentPage: null, totalPages: null }

  componentDidMount() {
    const { data: allMovies = [] } = this.props.movies || [];
    this.setState({ allMovies });
  }

  onPageChanged = data => {
    const { allMovies } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentMovies = allMovies.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentMovies, totalPages });
  }

  modal(movie) {
    console.log("intento...")
    return (
      <>
        <Modal>
          <InfoPeliculas idPelicula={movie.idPelicula} />;
        </Modal>
      </>
    )
  }

  render() {
    const { allMovies, currentMovies, currentPage, totalPages } = this.state;
    const totalMovies = allMovies.length;

    if (totalMovies === 0) return null;

    const headerClass = ['text-light py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="containerC">
        <div className="rowS">
          <div className="rowHe">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalMovies}</strong> Peliculas
              </h2>
              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  página <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
            <div className="align-items-right">
              <Pagination totalRecords={totalMovies} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
          <div className='rowBo'>
            {currentMovies.map(movie => <div key={movie.idPelicula} onClick={() => this.modal(movie)}>
              <MovieCard key={movie.idPelicula} movie={movie} />
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogoPeliculas;