import React from 'react';
import axios from 'axios';
import { useState } from 'react';

export const RegisterPage = () => {
	const [usuario, setUsuario] = useState('');
	const [apellido, setApellido] = useState('');
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	  function comprobarUsuario() {
		fetch('http://localhost:4000/consultarExistenciaUsuario/'+usuario)
			.then((response) => response.json())
			.then((data) => {
			  console.warn(data);    
			  console.warn(data.cantidad);
			  if(data && data.cantidad){
				  console.info(data.cantidad);
				    if(data.cantidad > 0){
						alert('Usuario ya existe');						
					}else{
						alert('usuario disponible');
					}
			  }else{alert('Error inesperado al comprobar existencia de usuario');   }			  
			  })
			.catch((err) => console.log(err));
	}

	const url = 'http://localhost:4000/registro';

	  function onSubmit(e) {
		e.preventDefault();
		  
		  if(password == password2){
			axios
						.post(url, {
							usuario: usuario,
							nombre: nombre,
							apellido: apellido,
							email: email,
							password: password     
						})
						.then((response) => {
							console.log(response.data);
							console.log(response.data.insertarUsuario);
							if(response.data.insertarUsuario) alert('Usuario registrado');
							else  alert('Error inesperado al registrar usuario');			
						}); 

			
		  }else alert('La confirmación de contraseña no coincide');

		  setUsuario('');
		  setNombre('');
		  setApellido('');
		  setEmail('');
		  setPassword('');
		  setPassword2('');
	  }

	return (
		<div className='contenedorFormulario'>
      <br />      
      <br />	  
      <form onSubmit={onSubmit} >
	  <h1>Nuevo Usuario</h1>
        <div className="mb-3">
          <label htmlFor="inputUsuario" className="form-label">Usuario</label>
          <input type="text" 
                  className="form-control" id="inputUsuario" 
                  value={ usuario }
				  required
                  onChange={ (e) => setUsuario(e.target.value) }/>
				  
        </div>
		<div className="mb-3">
          <label htmlFor="inputNombre" className="form-label">Nombre</label>
          <input type="text" 
                  className="form-control" id="inputNombre" 
                  value={ nombre }
				  required
                  onChange={ (e) => setNombre(e.target.value) }/>
        </div>
		<div className="mb-3">
          <label htmlFor="inputApellido" className="form-label">Apellido</label>
          <input type="text" 
                  className="form-control" id="inputApellido" 
                  value={ apellido }
				  required
                  onChange={ (e) => setApellido(e.target.value) }/>
        </div>
		<div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
          <input type="text" 
                  className="form-control" id="inputEmail" 
                  value={ email }
				  required
                  onChange={ (e) => setEmail(e.target.value) }/>
        </div>
		<div className="mb-3">
          <label htmlFor="inputPass" className="form-label">Password</label>
          <input type="password" 
                  className="form-control" id="inputPass" 
                  value={ password }
				  required
                  onChange={ (e) => setPassword(e.target.value) }/>
        </div>
		<div className="mb-3">
          <label htmlFor="inputPass2" className="form-label">Confirmar Password</label>
          <input type="password" 
                  className="form-control" id="inputPass2" 
                  value={ password2 }
				  required
                  onChange={ (e) => setPassword2(e.target.value) }/>
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
	);
};