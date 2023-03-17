import React, { Component } from 'react';
import '../Catalogo.css';
import Pagination from './Pagination';
import MovieCard from './MovieCard';
import InfoPeliculas from './InfoPeliculas';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
class CatalogoPeliculas extends Component {
  state = { allMovies: [], currentMovies: [], currentPage: null, totalPages: null, showModal: false, idMovie: 0, datosAPI: [], datosRepartoAPI: [], filter: '' }

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

  showModal(movie) {
    this.chargeInfoMovie(movie);
  }

  chargeInfoMovie(movie) {
    axios.post("http://localhost:4000/infopeliculas", {
      idpelicula: movie.idPelicula
    }).then((response) => {
      const { data: datosAPI = [] } = response.data || [];
      this.setState({ datosAPI });
    });

    axios.post("http://localhost:4000/repartopelicula", {
      idpelicula: movie.idPelicula
    }).then((response) => {
      const { data: datosRepartoAPI = [] } = response.data || [];
      const showModal = true;
      const idMovie = movie.idPelicula;
      const filter = '';
      this.setState({ showModal, idMovie, datosRepartoAPI,filter });
    });

    axios.get(`http://localhost:4000/verificarPeliculaWatchlist/`,{params:{idusuario:this.props.idusuario,idpelicula:movie.idPelicula}})
      .then(res =>{
        //console.log(res.data.data[0]) 
        let textBtnWatchlist = ""
        const existeWatchlist = res.data.data[0].existe
        if(existeWatchlist === 1){
          textBtnWatchlist = "Quitar de watchlist"
        }else{
          textBtnWatchlist = "Agregar a watchlist"
        }
        this.setState({existeWatchlist,textBtnWatchlist})
      })
      .catch((err) => console.log(err));
  }

  onClose() {
    const { allMovies, currentMovies, currentPage, totalPages } = this.state;
    const showModal = false;
    const idMovie = 0;
    this.setState({ allMovies, currentPage, currentMovies, totalPages, showModal, idMovie });
  }

  handleChange(e) {
    const filter = e.target.value;
    this.setState({ filter });
  }

  modificarWatchlist = () =>{
    console.log(this.state.existeWatchlist)
    axios.post("http://localhost:4000/modificarWatchlist", {
      idpelicula: this.state.idMovie,
      idusuario: this.props.idusuario,
      tipoOperacion: !this.state.existeWatchlist
    }).then((res) => {
      this.setState({existeWatchlist:!this.state.existeWatchlist})
      alert(res.data)
    });
  }

  render() {
    const { allMovies, currentMovies, currentPage, totalPages } = this.state;
    const totalMovies = allMovies.length;

    if (totalMovies === 0) return null;
    const headerClass = ['text-light py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    return (
      <>
        <div className="containerC">

          {
            this.state.showModal === true ?
              (
                <div>
                  <Button variant="contained" className="btn btn-outline-light btn-lg" startIcon={<ArrowBackIcon />} onClick={() => this.onClose()}>Regresar</Button>
                  <Button variant="contained" className="btn btn-outline-light btn-lg"style={{"float":"right"}} onClick={()=>this.modificarWatchlist()}>{this.state.textBtnWatchlist}</Button>
                  <InfoPeliculas datosAPI={this.state.datosAPI} datosRepartoAPI={this.state.datosRepartoAPI} />
                </div>
              ) :
              (

                <div className="rowS">
                  <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <h2 className={headerClass}><strong className="text-secondary">{totalMovies}</strong> Peliculas  </h2>
                      {currentPage && (
                        <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                          |  página <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                        </span>
                      )}
                    </div>
                    <div className="d-flex flex-row py-4 align-items-center">
                      <Pagination totalRecords={totalMovies} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                    </div>
                  </div>
                  <div style={{ lineHeight: '2', paddingInlineStart: '45px', borderRadius: '10px', paddingBottom: '10px' }}>
                    <input type="text" placeholder='Filtro de Pelicula' onChange={e => this.handleChange(e)} />
                  </div>
                  {
                    this.state.filter === '' ?
                      (<div className='rowBo'>
                        {currentMovies.filter(movieFilter => movieFilter.nombre.includes(this.state.filter)).map(
                          (movie) => <div className='col-sm-6 col-md-8' key={movie.idPelicula} onClick={(e) => this.showModal(movie)}>
                            <MovieCard key={movie.idPelicula} movie={movie} />
                          </div>)}
                      </div>
                      ) :
                      (
                        <div className='rowBo'>
                          {allMovies.filter(movieFilter => movieFilter.nombre.includes(this.state.filter)).map(
                            (movie) => <div className='col-sm-6 col-md-8' key={movie.idPelicula} onClick={(e) => this.showModal(movie)}>
                              <MovieCard key={movie.idPelicula} movie={movie} />
                            </div>)}
                        </div>
                      )}
                </div>
              )
          }
        </div>
      </>
    );
  }
}

export default CatalogoPeliculas;