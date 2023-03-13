import React from 'react'
import './../App.css';
import { ModuloAcciones } from './ModuloAcciones';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DashboardPage = (props) => {
  const [idUsuario, setIdUsuario] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [rol, setRol] = useState(0);
  const { user } = useParams();
  const [tipo, setTipo] = useState(3);

  const url = 'http://localhost:4000/consultarUsuario/' + user;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data) {
        setIdUsuario(data[0].idUsuario);
        setNombreCompleto(data[0].nombre + ' ' + data[0].apellido);
        setRol(data[0].rol);
      }
    })
    .catch((err) => console.log(err));
  return (
    <>

      <div className="container">
        <div className="uno centrado">
          <img src="https://photobucketsemi1g11.s3.us-east-2.amazonaws.com/862galaxia00.jpg" alt="ProfilePic" className='img-thumbnail img-fluid rounded' style={{ width: "300px", height: "300px", padding: "2px" }} />
          <br /><div><br /></div>

          <div className='centrado datosPrincipales' >
            <p>Usuario: {user}</p>
            <p>Nombre Completo: {nombreCompleto}</p>
            {rol === 0 ? (<p>Rol: Administrador</p>) : (<p>Rol: Usuario</p>)}
          </div>

          <div className="btn-group" role="group" aria-label="Basic outlined example">
            {
              rol === 0 ?
                (
                  <button type="button" className="btn btn-outline-light btn-lg" onClick={() => setTipo(0)}>Agregar Películas</button>
                )
                :
                (
                  <>
                    <button type="button" className="btn btn-outline-light btn-lg" onClick={() => setTipo(1)}>Catálogo de Películas</button>
                  </>
                )
            }
          </div>
        </div>
        <div className="dos">
          <ModuloAcciones idUsuario={idUsuario} usuario={user} rol={rol} nombreCompleto={nombreCompleto} tipo={tipo} />
        </div>
      </div>
    </>
  )
}