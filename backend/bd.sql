
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