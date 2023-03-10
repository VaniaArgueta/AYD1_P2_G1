import React, { useRef } from 'react';
import logo from './logo.svg';

import { Link, Outlet, useLocation, useNavigate, } from 'react-router-dom';

export const Navbar = () => {
	const spanUser = useRef();

	const { state } = useLocation();
	const navigate = useNavigate();

	console.log(state);

	const onLogout = () => {
		navigate('/login', {
			replace: true,
		});
	};

	return (
		<>
			<header style={{ height: '90px' }}>
				<div className='banner'>
					<img src={logo} className="App-logo" alt="logo" style={{ height: "10vmin" }} />
					<h1 className='titulo'>IMDbX</h1>
				</div>

				{state?.logged ? (
					<div className='user'>
						<span ref={spanUser} id="spanUsuario" className='username'>{state?.usuario}</span>
						<button className='btn-logout' onClick={onLogout}>
							Cerrar sesión
						</button>
					</div>
				) : (
					<nav>
						<Link to='/login'>Iniciar sesión</Link>
						<Link to='/register'>Registrarse</Link>
					</nav>
				)}
			</header>

			<Outlet />
		</>
	);
};