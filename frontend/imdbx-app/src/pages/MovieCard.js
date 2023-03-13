import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = props => {
    const {
        nombre_actor = 'unknown', año = 0, nombre = '', ilustracion = ''
    } = props.movie || {};

    return (
        <div className="movie-card-container border-gray rounded border mx-2 d-flex flex-row align-items-center p-0 bg-light">
            <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">
                <img src={ilustracion} alt="ProfilePic" className='img-thumbnail img-fluid rounded' style={{height: '90px', maxWidth: "90px", maxHeight: "88px", padding: "2px" }} />
            </div>
            <div className="col-md-7" style={{ height: '90%' }}>
                <label className='movie-lb-titulo'>Titulo: </label>
                <span className="movie-nombre text-dark font-weight-bold">{nombre}</span>
                <label className='movie-lb-titulo'>Año: </label>
                <span className="movie-año text-dark d-block font-weight-bold">{año}</span>
                <label className='movie-lb-titulo'>Actor: </label>
                <span className="movie-nombre-actor d-block font-weight-bold">{nombre_actor}</span>
            </div>
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        año: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired
    }).isRequired
};

export default MovieCard;