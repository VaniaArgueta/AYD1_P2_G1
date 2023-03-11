import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

export const InfoPeliculas = (prop) => {
  
  const url = "http://localhost:4000/infopeliculas";
  const listPelis = "http://localhost:4000/listadoPeliculas";
  const elenco ="http://localhost:4000/repartopelicula"

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
  function chargeInfoPelis(item) {
    console.log(item);
    axios.get(url,prop.idpelicula).then((response) => {
      setDatosAPI(response.data);      
    });
  }
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
      <div >
          {
            datosAPI.map((item,index)=>{
              return(
                <div key={index} onClick={() => (chargeInfoPelis(item))}>
              
                <table >
                    <tr >
                      <td><p>Titulo:</p></td>
                      <td>{item.nombre}</td>
                    </tr>
                    <tr>
                      <td><p>A&ntilde;o de estreno:</p></td>
                      <td><p>{item.año}</p></td>
                    </tr>
                    <tr>
                      <td><p><input type="image" src={item.ilustracion}></input></p></td>
                    </tr>
                    <tr>
                      <td><p>Resume:</p></td>
                      <td><p>{item.resumen}</p></td>
                    </tr>
                </table>

              </div>
              )
            })
          }
      </div>
      
    </div>
    
  )
}