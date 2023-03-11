
create database ayd1_p2;

use ayd1_p2;

create table usuario(	
    idUsuario integer AUTO_INCREMENT PRIMARY KEY,
    usuario varchar(20) not null,
    nombre varchar(200) not null,
    apellido varchar(200) not null,
    email varchar(50) not null,
    password varchar(15) not null,
    rol smallint not null
);

CREATE TABLE pelicula (
  `idPelicula` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `director` VARCHAR(100) NULL,
  `año` INT NULL,
  `resumen` TEXT NULL,
  `ilustracion` VARCHAR(500) NULL
);
  
CREATE TABLE actor (
  `idActor` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(200) NOT NULL,
  `foto` TEXT NULL,
  `fecha_nacimiento` DATE NULL
);
  
CREATE TABLE watchlist (
  `idWatchlist` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idUsuario` INT NOT NULL,
  `idPelicula` INT NOT NULL,
  CONSTRAINT `fk_watchlist_usuario` 
    FOREIGN KEY (`idUsuario`)
    REFERENCES usuario (`idUsuario`),
  CONSTRAINT `fk_watchlist_pelicula` 
    FOREIGN KEY (`idPelicula`)
    REFERENCES pelicula (`idPelicula`)
);


CREATE TABLE pelicula_actor (
  `idPelicula_actor` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPelicula` INT(11) NOT NULL,
  `idActor` INT(11) NOT NULL,
  CONSTRAINT `fk_pelicula`
    FOREIGN KEY (`idPelicula`)
    REFERENCES pelicula (`idPelicula`),
  CONSTRAINT `fk_actor`
    FOREIGN KEY (`idActor`)
    REFERENCES actor (`idActor`)
);


CREATE TABLE comentario (
  `idComentario` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idUsuario` INT NOT NULL,
  `idPelicula` INT NOT NULL,
  `comentario` TEXT NULL,
  CONSTRAINT `fk_comentario_usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES usuario (`idUsuario`),
  CONSTRAINT `fk_comentario_pelicula`
    FOREIGN KEY (`idPelicula`)
    REFERENCES pelicula (`idPelicula`)
);

CREATE TABLE puntuacion (
  `idPuntuacion` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idUsuario` INT NOT NULL,
  `idPelicula` INT NOT NULL,
  `puntuacion` TEXT NULL,
  CONSTRAINT `fk_puntuacion_usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES usuario (`idUsuario`),
  CONSTRAINT `fk_puntuacion_pelicula`
    FOREIGN KEY (`idPelicula`)
    REFERENCES pelicula (`idPelicula`),
  UNIQUE (idUsuario,idPelicula)
);

-- 
alter table usuario  modify column password varchar(200) not null;