import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form, Divider, Button, Grid } from "semantic-ui-react";
import FileInput from "./FileInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AgregarPeliculas = (props) => {
    const navigate = useNavigate();
    const url = "http://localhost:4000/AddNewMovie";
    const [userData, setUserData] = useState({
      name: "",
      director: "",
      year: "",
      resumen: "",
      reparto: "",
      image: []
})
const [base64Image, setBase64Image] = useState('');
const [ImgUrl, setImgUrl] = useState("");

const handleInputChange = (event) => {
    setUserData({
        ...userData,
        [event.target.name]: event.target.value
    });
}

const handleFilesChange = (event) => {
    const files = event.target.files;
    if(!event.target.files[0]){
        return;
    }
    
    if (userData.image.length > 0) {
        userData.image[0] = (event.target.files[0]);
    } else {
        userData.image.push(event.target.files[0]);
    }
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    const file =  files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64Image(reader.result);
    };
}
const resetUserData = () => {
    setUserData({
      name: "",
      director: "",
      year: "",
      resumen: "",
      reparto: "",
      image: []
    });
  };
const sendData = () => { 
    console.log(userData.image[0].name)
    axios.post(url, {
      nombre: userData.name, 
      director: userData.director,
      year: userData.year,
      resumen: userData.resumen,
      reparto: userData.reparto,
      base64:base64Image.split(',')[1],
      namefoto: userData.image[0].name
    })  
    .then((response) => {
        if (response.data.insertarPeli === true){
            alert("Pelicula Agregada con Exito");
            resetUserData()
            setImgUrl("");
            setBase64Image("");
            navigate("/dashboard/"+props.user);
        }else{
            alert("Error al intentar agregar la pelicula");
        }

    }).catch(err => {
        console.log(err);
    });
}

  return (
    <>
        <div className="Register-Form" >
            <div className="Login-Form-Header">
                <div className="Login-Forn-Header-Text">
                    <label className="datosPrincipales"> Agregar Pelicula Nueva</label>
                </div>
            </div>
            <Divider />
            <div className="Register-Form-Body mb-10">
                <Form>
                    <Grid>
                        <Grid.Column width={9}>
                            <Grid.Row>
                                <Form.Input required
                                    size="large"
                                    type='text'
                                    name='name'
                                    label="Nombre"
                                    labelPosition="left"
                                    autoComplete="name"
                                    onChange={handleInputChange} 
                                    style={{color: 'white'}}
                                    />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input required
                                    size="large"
                                    type='text'
                                    name='director'
                                    label="Director"
                                    labelPosition="left"
                                    autoComplete="director"
                                    onChange={handleInputChange}
                                    style={{color: 'white'}}
                                    />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input required
                                    size="large"
                                    type='text'
                                    name='year'
                                    label="Año de estreno"
                                    labelPosition="left"
                                    autoComplete="year"
                                    onChange={handleInputChange}
                                    style={{color: 'white'}}
                                    />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input required
                                    size="large"
                                    type='text'
                                    name='resumen'
                                    label="Resumen"
                                    labelPosition="left"
                                    autoComplete="resumen"
                                    onChange={handleInputChange} 
                                    style={{color: 'white'}}
                                    />
                            </Grid.Row>
                            <Grid.Row>
                                <Form.Input required
                                    size="large"
                                    type='text'
                                    name='reparto'
                                    label="Reparto"
                                    labelPosition="left"
                                    autoComplete="reparto"
                                    onChange={handleInputChange} 
                                    style={{color: 'white'}}
                                    />
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={6} >
                            <Grid.Row>
                                <FileInput change={handleFilesChange} ImgUrl={ImgUrl} title={"Poster"}></FileInput>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Row>
                            <div className="Register-Form-Button datosPrincipales">
                                <Button className="ui black button" type="submit" onClick={sendData}>Agregar Pelicula</Button>
                            </div>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        </div>
    </>
  )
}