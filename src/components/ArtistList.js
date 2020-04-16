import React from 'react';
import '../style.css';
import './ArtistList.css';
import ButtonAddFest from './Buttons/ButtonAddFest';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArtisItem from './ArtistItem';
import ButtonReturn from './Buttons/ButtonReturn';


class ArtistList extends React.Component {
    state = {
        artist: []
    }
    componentDidMount() {
        axios.get('https://api-festival.herokuapp.com/api/artists')
        .then(response => response.data)
        .then(data => {
            this.setState({ artist: data })
        })
    }
    
    render() {
        return (
            <div>
                <div className="CenteredItem">
                <Link to="/add-event"><ButtonAddFest /></Link>
                </div>
                <div className="ArtistList container">
                    <h3>Liste des artistes du festival</h3>
                    <Link to="/add-event"><ButtonReturn /></Link>
                </div>
                <div id="list" className="container ContainerBody">
                    {this.state.artist.map((item, index) =>
                    <ArtisItem
                        key={index}
                        idartist={item.idartist}
                        name={item.name}
                        image_url={item.image_url}
                        music_url={item.music_url}
                    />
                    )}
                </div>
            </div>
        );
    }
    
}

export default ArtistList;