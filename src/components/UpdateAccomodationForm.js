import React from 'react';
import '../style.css';
import ButtonReturn from './Buttons/ButtonReturn';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

class UpdateAccomodationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [{
                namePackage: '',
                nameAccomodation: '',
                passPrice: '',
                priceByNight: '',
                price: '',
                date: '',
                hour: '',
                image1: '',
                image2: '',
                image3: '',
                image4: '',
                numberPlace: '',
                km: '',
                placeAvailable: '',
                airbnb: false,
                description: ''
            }]
        }
    }

    componentDidMount() {        
        const params = this.props.match.params;
        axios.get(`https://api-festit.herokuapp.com/api/accomodation`)
        .then(response => response.data)
        .then(data => {
            this.setState({ inputs: data.filter(item => item.idaccomodation === Number(params.idaccomodation)) });
        })     
    }

    onChange = (event) => {
        this.setState({ inputs: [{ [event.target.name]: event.target.value }] });
    }

    submitForm = (event) => {
        event.preventDefault();
        const params = this.props.match.params;
        const url = `https://api-festit.herokuapp.com/api/accomodation/${params.idaccomodation}`;
        axios.put(url, this.state.inputs[0])
            .then(res => res.data)
            .then(res => {
                alert(`L'hébergement a bien été modifié !`);
            })
            .catch(event => {
                alert(`Erreur lors de la modification de l'hébergement : ${event.message}`);
            });
    }

    render() {
        console.log(this.state.inputs[0], 'state');
        return (
            <div>
                <div className="container ActionBloc">
                    <p className="title">Ajouter un hébergement</p>
                    <Link to="/accomodations"><ButtonReturn /></Link>
                </div>
                <div className="container ContainerBody">
                    <form onSubmit={this.submitForm}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="nameAccomodation">Nom de l'hébergement</label>
                                <input
                                type="text"
                                className="form-control"
                                name="nameAccomodation"
                                onChange={this.onChange}
                                value={this.state.inputs[0].nameAccomodation}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="namePackage">Nom du package festival</label>
                                <input
                                type="text"
                                className="form-control"
                                name="namePackage"
                                onChange={this.onChange}
                                value={this.state.inputs[0].namePackage}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="priceByNight">Prix par nuit</label>
                                <input
                                type="number"
                                className="form-control"
                                name="priceByNight"
                                onChange={this.onChange}
                                value={this.state.inputs[0].priceByNight}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="price">Prix global</label>
                                <input
                                type="number"
                                className="form-control"
                                name="price"
                                onChange={this.onChange}
                                value={this.state.inputs[0].price}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="passPrice">Prix avec le pass</label>
                                <input
                                type="number"
                                className="form-control"
                                name="passPrice"
                                onChange={this.onChange}
                                value={this.state.inputs[0].passPrice}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="date">Date de disponibilité</label>
                                <input
                                type="date"
                                className="form-control"
                                name="date"
                                onChange={this.onChange}
                                value={this.state.inputs[0].date}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="hour">Horaire de check-in</label>
                                <input
                                type="text"
                                className="form-control"
                                name="hour"
                                onChange={this.onChange}
                                value={this.state.inputs[0].hour}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="numberPlace">Nombre de place</label>
                                <input
                                type="number"
                                className="form-control"
                                name="numberPlace"
                                onChange={this.onChange}
                                value={this.state.inputs[0].numberPlace}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="placeAvailable">Nombre de places disponibles</label>
                                <input
                                type="number"
                                className="form-control"
                                name="placeAvailable"
                                onChange={this.onChange}
                                value={this.state.inputs[0].placeAvailable}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="km">Distance du festival (km)</label>
                                <input
                                type="number"
                                className="form-control"
                                name="km"
                                onChange={this.onChange}
                                value={this.state.inputs[0].km}
                                />
                            </div>
                            <div className=" col-md-6">
                                <label htmlFor="airbnb">Partenariat Airbnb</label><br/>
                                <BootstrapSwitchButton
                                checked={false}
                                name="airbnb"
                                data-toggle="toggle"
                                onstyle="success"
                                onChange={(checked) => {
                                    this.setState({ inputs: [{ airbnb: checked }] })
                                }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                            className="form-control"
                            name="description"
                            rows="4"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.inputs[0].description}
                            >
                            </textarea>
                        </div>
                        <p className="mandatory">Tous les champs ci-dessus sont obligatoires</p>
                        <div className="form-group">
                            <label htmlFor="image1">Image 1 de l'hébergement</label>
                            <input
                            type="text"
                            className="form-control"
                            name="image1"
                            placeholder="https://..."
                            onChange={this.onChange}
                            value={this.state.inputs[0].image1}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image2">Image 2 de l'hébergement</label>
                            <input
                            type="text"
                            className="form-control"
                            name="image2"
                            placeholder="https://..."
                            onChange={this.onChange}
                            value={this.state.inputs[0].image2}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image3">Image 3 de l'hébergement</label>
                            <input
                            type="text"
                            className="form-control"
                            name="image3"
                            placeholder="https://..."
                            onChange={this.onChange}
                            value={this.state.inputs[0].image3}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image4">Image 4 de l'hébergement</label>
                            <input
                            type="text"
                            className="form-control"
                            name="image4"
                            placeholder="https://..."
                            onChange={this.onChange}
                            value={this.state.inputs[0].image4}
                            />
                        </div>
                        <div className="col-sm-4 offset-sm-4">
                            <input type="submit" className="SaveForm" value="Modifier" />
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}

export default UpdateAccomodationForm; 