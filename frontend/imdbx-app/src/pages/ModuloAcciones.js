import React, { useEffect, useState } from 'react';
import { AgregarPeliculas } from './AgregarPeliculas';
import axios from 'axios';
import CatalogoPeliculas from './CatalogoPeliculas';
import { HomePage } from './HomePage';

export const ModuloAcciones = (props) => {

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([])


  useEffect(() => {
    axios.get("http://localhost:4000/obtenerPeliculas").then((response) => {
      setMovies(response.data);
      console.log(movies)
    });
  }, []);

  //Obtener peliculas del wathclist del usuario
  useEffect(()=>{
      console.log(props.idUsuario)
      axios.get(`http://localhost:4000/obtenerWatchlist/`,{params:{idusuario:props.idUsuario}})
      .then(res =>{
        setWatchlist(res.data)
      })
      .catch((err) => console.log(err));
  },[props.idUsuario])

  useEffect(() => {
    console.log(`Watchlist:`)
    console.log(watchlist)
  }, [watchlist])
  

  if (props.tipo === 0) {       // Agregar películas (admin)
    return <AgregarPeliculas />;
  } else if (props.tipo === 1) { // Ver catálogo de películas (usuario)    
    return <CatalogoPeliculas  movies={movies} key={props.tipo}/>;
  } else if (props.tipo === 3) {
    return <HomePage />;
  } else if (props.tipo === 4) {   
    return <CatalogoPeliculas movies={watchlist} key={props.tipo}/>;
  } else return <>else</>;

}