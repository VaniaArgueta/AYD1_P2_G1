import React, { useEffect, useState } from 'react';
import '../InfoPelicula.css';
import axios from 'axios';

export const InfoActor = (props) => {
    const [movies, setMovies] = useState([]);

    var lista = [
        {
            idPelicula: 0,
            nombre:''
        }
    ];        

    const [listaPelis, setListaPelis] = useState(lista.map(o => (
        <li key={o.idPelicula}>{o.nombre}</li>
      )));   

    const url = "http://localhost:4000/consultarPeliculasActor/"+props.actor.idActor;

    const handleFitrarDatos = () => {

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
        console.log(data);             
        if(data){              
            console.warn(data);
            lista = data;
            console.log(lista);
            setListaPelis(lista.map(o => (
                <li key={o.idPelicula}>{o.nombre}</li>
            )));
            //console.log('general');
            console.log(listaPelis);
        }
        })
        .catch((err) => console.log(err));
      }

    return (
        <div>
          <p className="info-lb-label">Información de Actor</p>
          <p className="info-lb-label">Nombre Completo: {props.actor.nombre}</p>
          <p className="info-lb-label">Fecha de Nacimiento: {props.actor.fecha_nacimiento}</p>
          <img src={props.actor.foto} alt="ProfilePic" className='img-thumbnail img-fluid rounded' style={{ width: "200px", height: "200px", padding: "2px" }} />
        <div>
        <button className='btn btn-outline-light btn-lg' onClick={handleFitrarDatos}>Ver 5 películas más recientes</button>
            <br/>
            <ol className='listaP'>
                    {listaPelis}
            </ol>
        </div>
        </div>
      )
}

export default InfoActor;