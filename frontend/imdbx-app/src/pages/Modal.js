import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form, Divider, Grid } from "semantic-ui-react";
import FileInput from "./FileInput";
import axios from "axios";

function Modal1({ showModal, setShowModal }) {
    const handleCloseModal = () => setShowModal(false);
    const url = "http://localhost:4000/insertActores";
    const [name, setName] = useState('');
	const [year, setYear] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [ImgUrl, setImgUrl] = useState("");
    const [userData, setUserData] = useState({
        image: []})
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
    const sendData = () => { 
        console.log(userData.image[0].name)
        axios.post(url, {
        nombre: name, 
        fechaNacimiento: year,
        base64:base64Image.split(',')[1],
        namefoto: userData.image[0].name
        })  
        .then((response) => {
            if (response.data.ActorAgregado === true){
                alert("Pelicula Agregada con Exito");
                setImgUrl("");
                setBase64Image("");
                handleCloseModal();
            }else{
                alert("Error al intentar agregar la pelicula");
            }

        }).catch(err => {
            console.log(err);
        });
        setName('');
        setYear('');
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Actores</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                                            <label htmlFor="inputNombre" className="form-label" >Nombre del Actor</label>
                                            <input type="text" 
                                                className="form-control" id="inputNombre" 
                                                value={ name }
                                                required
                                                onChange={ (e) => setName(e.target.value) }/>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <label htmlFor="inputYear" className="form-label" >Fecha de Nacimiento (YYYY-MM-DD)</label>
                                            <input type="text" 
                                                className="form-control" id="inputYear" 
                                                value={ year }
                                                required
                                                onChange={ (e) => setYear(e.target.value) }/>
                                        </Grid.Row>
                                </Grid.Column>
                                <Grid.Column width={1}></Grid.Column>
                                <Grid.Column width={6} >
                                    <Grid.Row>
                                        <FileInput change={handleFilesChange} ImgUrl={ImgUrl} title={"Poster"}></FileInput>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <br></br>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <br></br>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={sendData}>
                Guardar Actor
              </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Modal1;