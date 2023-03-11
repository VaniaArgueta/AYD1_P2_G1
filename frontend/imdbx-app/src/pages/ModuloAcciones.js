import React from 'react';
import { AgregarPeliculas } from './AgregarPeliculas';
import {CatalogoPeliculas} from './CatalogoPeliculas';
import {InfoPeliculas} from './InfoPeliculas';

export const ModuloAcciones = (props) => {
   

    if(props.tipo === 0){       // Agregar películas (admin)
        return <AgregarPeliculas idUsuario={props.idUsuario} rol={props.rol} nombreCompleto={props.nombreCompleto} tipo={props.tipo} user={props.usuario} />;
      }else if(props.tipo === 1){ // Ver catálogo de películas (usuario)
        return <CatalogoPeliculas/>;
      }else if(props.tipo === 2){ // Ver información de la película al seleccionar (usuario)
        return <InfoPeliculas/>;
      }else if(props.tipo === 3){
        return <>3</>;
      } else if(props.tipo == 4){
       return <>4</>;
      }else return <>else</>;

}