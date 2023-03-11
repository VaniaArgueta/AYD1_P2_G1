import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

export const InfoPeliculas = (prop) => {
  
  const url = "http://localhost:3000/infopeliculas";
  const listPelis = "http://localhost:3000/listadoPeliculas";
  const elenco ="http://localhost:3000/repartopelicula"

  const [datosAPI,setDatosAPI] = useState([]);

 /* React.useEffect(
    ()=>{
      axios.get(url).then((response)=>{
        setDatosAPI(response.data);
      });
    }
  );
*/
  function loadListPelis(item){
    console.log(item);
    axios.get(listPelis).then((response) => {
      setDatosAPI(response.data);      
    });

  }
  /*function charge(item) {
    console.log(item);
    axios.get(url,prop.idpelicula).then((response) => {
      setDatosAPI(response.data);      
    });
  }*/
  return (
    <div>
      <p className="datosPrincipales">INFO PELÍCULAS</p>
      <div>
      <label for="infpelis" >Catalogo de peliculas</label>
        {
          datosAPI.map((item,index) =>{
            return(
             <select name="infpelis" key={index} onload={()=>(loadListPelis(item))}>
                <option value={item.idpelicula}>{item.nombre}</option>
              </select>
            )
          })
        }
      </div>
      
    </div>
    
  )
}