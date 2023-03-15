import express from 'express';
import conn from "./conexion.js";
import bodyParser from 'body-parser';
import cors from "cors";
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import md5 from 'md5';

dotenv.config();

const app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Bienvenido a IMDbX's NodeJs server")

});

// -----------------------------------------------LOGIN----------------------------------------------------
app.get('/mostrarUsuarios', function (req, res) {
  conn.query('SELECT * FROM usuario',
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    })
});


app.get("/login/(:usuario)/(:password)", function (req, res) {
      let usuario = req.params.usuario;
      let password = req.params.password;
  
      console.log(usuario);
      console.log(password);
  
      /* Códigos de respuesta:
       * 0: no existe usuario
       * 1: login correcto
       * -1: error inesperado o datos incorrectos
       * -2: contraseña incorrecta
       */
      //console.log('prueba '+md5(passwordRequest));
      conn.query("SELECT * FROM usuario where usuario = ? ",[usuario], function (err, results, fields) {
          if (err) throw err;
          else {
            console.log("Selected " + results.length + " row(s).");   
            if(results.length === 0){
              console.log('No existe el usuario');
              return res.send({ resultadoLogin: 0 });
            }
            else if(results.length === 1){
              password = md5(password);
              console.log('password ingresada (después de encriptación):'+password)
              if(results[0].password == password) {
                console.log('login exitoso');
                return res.send({ resultadoLogin: 1 });
              }
              else {
                console.log('contraseña incorrecta');
                return res.send({ resultadoLogin: -2 }); // -2 código de contraseña incorrecta           
              }
  
            }else {
              console.log('error inesperado o datos incorrectos');
              return res.send({ resultadoLogin: -1 });
            }
            //res.send((results));
            //console.log(results);
          }
        });
      
});


// -----------------------------------------------REGISTRO-----------------------------------------------------------------------

app.get("/consultarUsuario/(:usuario)", function (req, res) { // Consulta información usuario
  let usuario = req.params.usuario;
  conn.query("SELECT * FROM usuario where usuario = ? ", [usuario], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send((results));
  });
});

app.get("/consultarExistenciaUsuario/(:usuario)", function (req, res) { // Consulta cantidad de usuarios con nombre :usuario
  let usuario = req.params.usuario;
  conn.query("SELECT * FROM usuario where usuario = ? ", [usuario], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send({ cantidad: results.length });
  });

});



app.post("/registro", function (req, res) {
    let usuario = req.body.usuario;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;    
    //let password = req.body.password;
    //let rol = req.body.rol;
    let password = md5(req.body.password);

  conn.query(
    "insert into usuario(usuario, nombre, apellido, email, password, rol) VALUES (?,?,?,?,?,?);",
    [usuario, nombre, apellido, email, password, 1], // ROl: 0 -> administrador, 1 -> usuario normal
    function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.send({ insertarUsuario: false });
      } else {
        console.log("Inserted " + results.affectedRows + " row(s).");
        return res.send({ insertarUsuario: true });
      }
    }
  );
});


// -----------------------------------------------START ADD NEW MOVIE-----------------------------------------------------------------------

app.post("/AddNewMovie", async function (req, res) {
  let nombre = req.body.nombre;
  let director = req.body.director;
  let año = req.body.year;
  let resumen = req.body.resumen;
  let reparto = req.body.reparto;
  let imagen = req.body.base64;
  let nameImage = req.body.namefoto;
  console.log(req.body)

  const url = await saveImagePerfil(nameImage, imagen)
  console.log(url.Location)

  conn.query(
    "insert into pelicula(nombre, director, año, resumen, ilustracion) VALUES (?,?,?,?,?);",
    [nombre, director, año, resumen, url.Location],
    function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.send({ insertarPeli: false });
      } else {
        console.log("Inserted " + results.affectedRows + " row(s).");
        return res.send({ insertarPeli: true });
      }
    }
  );
});

// -----------------------------------------------END ADD NEW MOVIE-----------------------------------------------------------------------//

// -----------------------------------------------START S3 SAVE IMAGE-----------------------------------------------------------------------
const saveImagePerfil = async (id, base64) =>{
  var id = id
  var foto = base64
  //carpeta y nombre que quieran darle a la imagen
  var cadena = 'FotosPeliculas/' + id // fotos -> se llama la carpeta UBICACION
  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64')
  var s3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
  }) // se crea una variable que pueda tener acceso a las caracteristicas de S3
  const params = {
    Bucket: 'imagesayd', // nombre
    Key: cadena, // Nombre de ubicacion
    Body: buff, // Imagen enn bytes
    ContentType: 'image', // tipo de contenido
  }
  const response = await s3.upload(params).promise()
  return response
}

// -----------------------------------------------END S3 SAVE IMAGE-----------------------------------------------------------------------//


// -----------------------------------------------START INSERT ACTORES-----------------------------------------------------------------------

app.post("/insertActores", async function (req, res) {
  let nombre = req.body.nombre;
  let imagen = req.body.base64;
  let nameImage = req.body.namefoto;
  let fechaNacimiento = req.body.fechaNacimiento;


  const url = await saveImagePerfil(nameImage, imagen)

  conn.query(
    "insert into actor(nombre, foto, fecha_nacimiento) VALUES (?,?,?);",
    [nombre, url.Location, fechaNacimiento],
    function (err, results, fields) {
      if (err) {
        console.log(err);
        return res.send({ ActorAgregado: false });
      } else {
        console.log("Inserted " + results.affectedRows + " row(s).");
        return res.send({ ActorAgregado: true });
      }
    }
  );
});

app.get("/obtenerPeliculas", function (req, res) { // Consulta información usuario  
  conn.query("select p.*, CASE WHEN (SELECT GROUP_CONCAT(nombre separator ', ') from actor a where a.idActor in (select idActor from pelicula_actor where idPelicula = p.idPelicula)) is NULL THEN 'unknown' ELSE (SELECT GROUP_CONCAT(nombre separator ', ') from actor a where a.idActor in (select idActor from pelicula_actor where idPelicula = p.idPelicula)) END as nombre_actor from pelicula p", [], function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    res.send(({ data: results }));
  });
});

// -----------------------------------------------END INSERT ACTORES-----------------------------------------------------------------------//

app.listen(4000);
console.log("Server running on port 4000");

/****-------------Info peliculas------------------------- */


app.post("/infopeliculas", function (req, res) {
  let idpelicula = req.body.idpelicula;
  conn.query("SELECT P.*, CASE WHEN C.comentario  is NULL THEN '' ELSE C.comentario END as comentario, CASE WHEN PUN.puntuacion  is NULL THEN '0' ELSE PUN.puntuacion END as puntuacion FROM pelicula P LEFT JOIN comentario C ON C.IDPELICULA = P.IDPELICULA LEFT JOIN puntuacion PUN ON PUN.IDPELICULA = P.IDPELICULA WHERE P.IDPELICULA = ?",
    [idpelicula],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("selected " + results.length + " row(s).");
      res.send(({ data: results }));
    });
});

app.post("/repartopelicula", function (req, res) {
  let idpelicula = req.body.idpelicula;
  conn.query("select a.* from actor a where idActor in (select idActor from pelicula_actor where idPelicula = ?)"
    , [idpelicula], function (err, results, fields) {
      if (err) throw err;
      else console.log("selected " + results.length + "row(s).");
      res.send(({ data: results }));
    });

});

app.get("/listadoPeliculas", function (req, res) {
  conn.query("SELECT IDPELICULA, NOMBRE FROM pelicula ",
    function (err, results, fields) {
      if (err) throw err;
      else console.log('Selected ' + results.length + ' row(s).');

      res.send(results)
      console.log('Done.');
    });
});



// ----------------------------WATCHLIST------------------------------------
app.get("/obtenerWatchlist/", (req,res) =>{
  let {idusuario} = req.query
  console.log(idusuario) 
  conn.query(
    "select p.*, CASE WHEN (SELECT GROUP_CONCAT(nombre separator ', ') from actor a where a.idActor in (select idActor from pelicula_actor where idPelicula = p.idPelicula)) is NULL THEN 'unknown' ELSE (SELECT GROUP_CONCAT(nombre separator ', ') from actor a where a.idActor in (select idActor from pelicula_actor where idPelicula = p.idPelicula)) END as nombre_actor from pelicula p, usuario u, watchlist w WHERE p.idPelicula = w.idPelicula AND u.idUsuario = w.idUsuario AND w.idUsuario = ?"
    ,[idusuario],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("Selected " + results.length + " row(s).");
      res.send(({ data: results })); 
    })
})

