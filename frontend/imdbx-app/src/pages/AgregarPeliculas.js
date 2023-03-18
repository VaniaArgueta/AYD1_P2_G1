import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form, Divider, Button, Grid } from "semantic-ui-react";
import FileInput from "./FileInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownMenu from "./DropdownMenu";
import Modal1 from "./Modal";


export const AgregarPeliculas = (props) => {
    const navigate = useNavigate();
    const url = "http://localhost:4000/AddNewMovie";
    const url1 = "http://localhost:4000/Obtener";
    const [name, setName] = useState('');
	const [director, setDirector] = useState('');
	const [year, setYear] = useState('');
	const [resumen, setResumen] = useState('');
	const [reparto, setReparto] = useState('');
    const [selectOptions, setSelectOptions] = useState([])
    const [userData, setUserData] = useState({
      image: []
    })
    const [actores, setActores] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [ImgUrl, setImgUrl] = useState("");
    const [showModal, setShowModal] = useState(false);

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
        director: director,
        year: year,
        resumen: resumen,
        reparto: reparto,
        base64:base64Image.split(',')[1],
        namefoto: userData.image[0].name
        })  
        .then((response) => {
            if (response.data.insertarPeli === true){
                alert("Pelicula Agregada con Exito");
                setImgUrl("");
                setBase64Image("");
                navigate("/dashboard/"+props.user);
            }else{
                alert("Error al intentar agregar la pelicula");
            }

        }).catch(err => {
            console.log(err);
        });
        setName('');
        setDirector('');
        setYear('');
        setResumen('');
        setReparto('');
    }

    const AgregarActor = () => { 
        let nuevo = ""
        if (reparto == ""){
            nuevo = actores.actores
        }else{
            nuevo = reparto + "," + actores.actores
        }
        console.log(nuevo)
        setReparto(nuevo)
    }

    const handleSelectChange = (event) => {
        let choice = event.target.value;
        if (choice === "") { return }
        console.log(choice)
        let arr = choice.split("$");
        setActores({
            ...actores,
            ["actores"]: arr[0]
        });
        console.log(actores)
    }

    useEffect(() => {
        axios.get(url1)
        .then(response => {
            console.log(response);
            setSelectOptions(response.data);
        }).catch(err => {
            console.log("ERROR"+err);
        });
        
    }, [])

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
                                    <label htmlFor="inputNombre" className="form-label" style={{color: 'white'}}>Nombre de la Pelicula</label>
                                    <input type="text" 
                                        className="form-control" id="inputNombre" 
                                        value={ name }
                                        required
                                        onChange={ (e) => setName(e.target.value) }/>
                                </Grid.Row>
                                <Grid.Row>
                                    <label htmlFor="inputDirector" className="form-label" style={{color: 'white'}}>Director</label>
                                    <input type="text" 
                                        className="form-control" id="inputDirector" 
                                        value={ director }
                                        required
                                        onChange={ (e) => setDirector(e.target.value) }/>
                                </Grid.Row>
                                <Grid.Row>
                                    <label htmlFor="inputYear" className="form-label" style={{color: 'white'}}>Año de Estreno</label>
                                    <input type="text" 
                                        className="form-control" id="inputYear" 
                                        value={ year }
                                        required
                                        onChange={ (e) => setYear(e.target.value) }/>
                                </Grid.Row>
                                <Grid.Row>
                                    <label htmlFor="inputResumen" className="form-label" style={{color: 'white'}}>Resumen</label>
                                    <textarea type="text" 
                                        className="form-control" id="inputResumen" 
                                        value={ resumen }
                                        required
                                        onChange={ (e) => setResumen(e.target.value) }/>
                                </Grid.Row>
                                <Grid.Row>
                                <label htmlFor="inputReparto" className="form-label" style={{color: 'white'}}>Reparto</label>
                                <input type="text" 
                                    className="form-control" id="inputReparto" 
                                    value={ reparto }
                                    required
                                    onChange={ (e) => setReparto(e.target.value) }/>
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
                                <div className="Register-Form-Button datosPrincipales">
                                    <Button className="ui black button" type="submit" onClick={sendData}>Agregar Pelicula</Button>
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <br></br>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid>
                                    <Grid.Column width={12}>
                                        <DropdownMenu options={selectOptions} change={handleSelectChange} title={"Actores"} placeholder={"Seleccione los actores"} />
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Button className="ui black button" type="submit" onClick={AgregarActor}>Agregar Reparto</Button>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                            <br></br>
                            <Grid.Row>
                                <div className="Register-Form-Button datosPrincipales">
                                    <button className="ui black button" type="submit" onClick={() => setShowModal(true)}>Agregar Nuevo Actor</button>
                                    <Modal1 showModal={showModal} setShowModal={setShowModal} />
                                </div>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        </div>
    </>
  )
}