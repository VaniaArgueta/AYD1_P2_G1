import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

export const LoginPage = () => {
	const navigate = useNavigate();

	const [usuario, setUsuario] = useState('');
	const [password, setPassword] = useState('');
  
  function onSubmit(e) {
    e.preventDefault();

	//console.log(usuario);
    //console.log(password);

	const url = 'http://localhost:4000/login/'+usuario+'/'+password;

	/* Códigos de respuesta:
     * 0: no existe usuario
     * 1: login correcto
     * -1: error inesperado o datos incorrectos
     * -2: contraseña incorrecta
     */

	fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);    
            //setDatosAPI(data);  
			if(data && data.resultadoLogin){
				console.info(data.resultadoLogin);
				if(data.resultadoLogin == 0){
					alert('No existe usuario');
				}else if(data.resultadoLogin== 1){
					alert('Login exitoso');
					navigate('/dashboard/'+usuario, {
						replace: true,
						state: {
							logged: true,
							usuario,
						},
					});

				}else if(data.resultadoLogin== -1){
					alert('Error inesperado o datos incorrectos');
				}else if(data.resultadoLogin== -2){
					alert('Password incorrecta');
				}else alert('error inesperado o datos incorrectos');

			}   
			
            })
          .catch((err) => console.log(err));

		  
	/**/
	setUsuario('');
    setPassword('');

  }


	return (
		<>
		<div className='contenedorFormulario'>
      <br />      
      <br />	  
      <form onSubmit={onSubmit} >
	  <h1>Iniciar Sesión</h1>
        <div className="mb-3">
          <label htmlFor="inputNombre" className="form-label">Usuario</label>
          <input type="text" 
                  className="form-control" id="inputNombre" 
                  value={ usuario }
				  required
                  onChange={ (e) => setUsuario(e.target.value) }/>
        </div>
		<div className="mb-3">
          <label htmlFor="inputPass" className="form-label">Password</label>
          <input type="password" 
                  className="form-control" id="inputPass" 
                  value={ password }
				  required
                  onChange={ (e) => setPassword(e.target.value) }/>
        </div>
       
        <button type="submit" className="btn btn-primary">LogIn</button>
      </form>
    </div>		
		</>
	);
};