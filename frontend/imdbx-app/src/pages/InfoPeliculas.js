import React, { Component, useState ,useEffect} from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import '../InfoPelicula.css';
import axios from "axios";

class InfoPeliculas extends Component {
  urlSetComment = "http://localhost:4000/AddComentario"
  urlSetPuntuacion ="http://localhost:4000/AddPuntuacion"
  urlGetData = "http://localhost:4000/GetComentarioPuntuacion"
  /*[useRouteLoaderData,setUserData] = useState({
    idPelicula:"",

  })*/
/*
  [userData,setUserData]=useState({
    idPelicula: "",
    idUsuario: "",
    comentario:"",
    puntuacion:""
  })   */
  state = { datosAPI: [], datosRepartoAPI: [], datosComentariosPuntAPI:[]}

  componentDidMount() {
    const datosAPI = this.props.datosAPI || [];
    this.setState({ datosAPI });

    const datosRepartoAPI = this.props.datosRepartoAPI || [];
    this.setState({ datosRepartoAPI });

    const datosComentariosPuntAPI = this.props.datosComentariosPuntAPI||[];
    this.setState({datosComentariosPuntAPI});
  };

  showModal(actor) {
    //aqui cargar la informacion del actor para mandarlo a otro componente
    
    console.log(actor)
  }

  
  sendData(){
    insertComentario();
    insertPuntuacion();
  }

  insertComentario = ()=>{
      
      axios.post(this.urlSetComment,{
        idPelicula: this.idPelicula,
        idUsuario: this.idUsuario,
        comentario: this.comentario
      }).then((res)=>{
        alert(res.data)
      })
  }


  insertPuntuacion = ()=>{
    
    axios.post(this.urlSetComment,{
      idPelicula: this.idPelicula,
      idUsuario: this.idUsuario,
      comentario: this.puntuacion
    }).then((res)=>{
      alert(res.data)
    })

    
  }

  // useEffect(()=>{
  //   chargeComentPuntuMovie(comentpunt);
  //   console.log(comentpunt);
  // },[])
 
  
  

  chargeComentPuntuMovie(comentpunt){
    axios.get(this.urlGetData, {
      idpelicula: comentpunt.idpelicula//this.props.idPelicula
    }).then((response) => {
      const { data: datosAPI = [] } = response.data || [];
      this.setState({ datosAPI });
    })
  }
  render() {
    
    useEffect(()=>{
    chargeComentPuntuMovie(comentpunt);
    console.log(comentpunt);
    },[])
    const { datosAPI, datosRepartoAPI,datosComentariosPuntAPI } = this.state;
    
    console.log(datosAPI)
    console.log(datosRepartoAPI)
    console.log(datosComentariosPuntAPI)

    return (
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
                datosRepartoAPI.map((actor) =>
                  <div className='div-actor' key={actor.idActor} onClick={(e) => this.showModal(actor)}>
                    {actor.nombre}
                  </div>
                )}</span>
              <label className='info-lb-label'>Resumen: </label>
              <span className="info-value d-block">[ {movie.resumen} ]</span>
            </div>
            
          </div>
          <div className="col-md-7"> 
          
              <label className='info-lb-label'>Nuevo Comentario:</label>
              <textarea id ="comentario" ></textarea>
              <label className='info-lb-label'>Puntuacion:</label>
              <select id="idpuntuacion">
                <option value="1">Muy Mala</option>
                <option value="2">Mala</option>
                <option value="3">Regular</option>
                <option value="4">Buena</option>
                <option value="5">Excelente</option>
              </select>
              <div className="Register-Form-Button datosPrincipales">
                 <button className="ui black button" type="submit" >Guardar Comentario</button>
              </div>
              
          </div>
          <div>

              <ul>
                {
                  //datosComentariosPuntAPI.map(())
                }
              </ul>

            
          </div>
        </div>)
        }
      </div>
    )
  }
}

export default InfoPeliculas;