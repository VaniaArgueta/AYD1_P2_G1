import React, { Component } from 'react'
import '../InfoPelicula.css';
import InfoActor from './InfoActor';
import { ModuloReparto } from './ModuloReparto';
import { ModuloAcciones } from './ModuloAcciones';

class InfoPeliculas extends Component {

  state = { datosAPI: [], datosRepartoAPI: [], showModal: false, actor:null }

  componentDidMount() {
    const datosAPI = this.props.datosAPI || [];
    this.setState({ datosAPI });

    const datosRepartoAPI = this.props.datosRepartoAPI || [];
    this.setState({ datosRepartoAPI });
  };

  showModal(actor) {
    //aqui cargar la informacion del actor para mandarlo a otro componente
    console.log(actor);
    this.setState({actor:actor});
    this.setState({ showModal: true });
  }
  render() {
    const { datosAPI, datosRepartoAPI,showModal,actor } = this.state;
    console.log(datosAPI)
    console.log(datosRepartoAPI)
    return (
      <>
      <div>
        <p className="info-lb-label">INFORMACIÓN</p>
        {datosAPI.map((movie) => <div className='containerI' key={movie.idPelicula}>
          <div className="info-card-container border-gray rounded border mx-2 d-flex flex-row align-items-center ">
            <div className="h-100 position-relative border-gray border-right px-2 rounded-left" style={{ background: '#06263b' }}>
              <img src={movie.ilustracion} alt="ProfilePic" className='img-thumbnail img-fluid rounded' style={{width:'250px', maxWidth: "250px", height: "300px", maxHeight: "400px", padding: "2px" }} />
            </div>
            <div className="col-md-7" style={{ height: '90%', background: '#06263b' }}>
              <label className='info-lb-label'>Titulo: </label>
              <span className="info-value d-block">{movie.nombre}</span>
              <label className='info-lb-label'>Año: </label>
              <span className="info-value d-block">{movie.año}</span>
              <label className='info-lb-label'>Director: </label>
              <span className="info-value d-block">{movie.director}</span>
              <label className='info-lb-label'>Actores: </label>
              <span className="info-value d-block">{
                datosRepartoAPI.map((actor,key) =>
                <div className='div-actor' key={actor.idActor} onClick={(e) => this.showModal(actor)}>
                    {actor.nombre}                    
                  </div>                                    
                )}</span>
              <label className='info-lb-label'>Resumen: </label>
              <span className="info-value d-block">[ {movie.resumen} ]</span>
            </div>
          </div>
        </div>)
        }
      </div>
      {showModal === true ?(<ModuloReparto  tipo={0} actor={actor}  />):(<>false</>)}
      </>
    )
  }
}

export default InfoPeliculas;