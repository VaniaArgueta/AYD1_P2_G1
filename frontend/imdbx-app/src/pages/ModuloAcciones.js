import React, { useEffect, useState } from 'react';
import { AgregarPeliculas } from './AgregarPeliculas';
import { InfoPeliculas } from './InfoPeliculas';
import axios from 'axios';
import CatalogoPeliculas from './CatalogoPeliculas';

export const ModuloAcciones = (props) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/obtenerPeliculas").then((response) => {
      setMovies(response.data);
    });
  }, []);

  if (props.tipo === 0) {       // Agregar películas (admin)
    return <AgregarPeliculas />;
  } else if (props.tipo === 1) { // Ver catálogo de películas (usuario)    
    return <CatalogoPeliculas movies={movies} />;
  } else if (props.tipo === 2) { // Ver información de la película al seleccionar (usuario)
    return <InfoPeliculas />;
  } else if (props.tipo === 3) {
    return <>3</>;
  } else if (props.tipo == 4) {
    return <>4</>;
  } else return <>else</>;

}