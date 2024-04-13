import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import SectionTitle from '../../components/SectionTitle';
import daoArret from "../../dao/daoArret.mjs";
import './style.css';
import Popover from '@mui/material/Popover';
import LineBoxClickable from '../../components/LineBoxClickable';


/**
 * Search component
 * This component is the search page of the application.
 */
function Search(props) {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [arrets, setArrets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    const [nearbyStops, setNearbyStops] = useState([]);
    const [locating, setLocating] = useState(false); // To show a loading spinner while locating

    useEffect(() => {
        daoArret.getArret().then((data) => {
            data.map((a,index) => {
                return { id: index, nom: a.nom, code: a.codelieu };
            });
            setArrets(data);
            setLoading(false);
        });
    }, []);


    /**
     * Ask the user for their location
     * If the browser supports geolocation, ask the user for their location (latitude and longitude)
     */
    const askUserLocation = () => {
        setLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

                const stops = await getNearbyStops(position.coords.latitude, position.coords.longitude);
                setNearbyStops(stops);
                setLocating(false);
            });
        } else {
            // React Pop-up
            setShowLocationPopup(true);
            setLocating(false);
        }

    }

    const onItemClick = (item) => {
        const nom = item.nom
        window.location.href = "/transport/"+nom
    }

    /**
     * Get nearby stops based on the user's location
     * @param {Number} latitude - The user's latitude
     * @param {Number} longitude - The user's longitude
     */
    const getNearbyStops = async (latitude, longitude) => {
        if (latitude != null && longitude != null) {
            try {
                // Await the promise to be resolved and get the data
                let data = await daoArret.getRoutePos(latitude, longitude);
    
                // Now that you have the data, you can access the names
                let stopNames = data.map(stop => stop.nom);
    
                return stopNames; // Returns the array of names if needed
            } catch (error) {
                console.error("Error fetching nearby stops:", error);
                return []; // Return an empty array or handle the error as needed
            }
        } else {
            return []; // Return an empty array or indicate somehow that the location is not available
        }
    }
    const title = "Search"
    const subtitle = "Which stop are you at?"

    return (
        <section id="searchbar">
            <SectionTitle title={title} subtitle={subtitle} />
            {!loading && <SearchBar placeholder="Bus stop" elements={arrets} onItemClick={onItemClick} />}
            <a id='locate-button' className={`button fill ${locating ? 'loading' : ''}`} onClick={askUserLocation}>
                <img src="/assets/location_icon.png" alt="Locate icon" />{locating ? 'Loading' : 'Locate me'}
            </a>
            {showLocationPopup && (
                <Popover
                    open={true}
                    onClose={() => setShowLocationPopup(false)}
                    anchorEl={document.getElementById('locate-button')}
                    anchorOrigin={{vertical: 'bottom',horizontal: 'center',}}
                    transformOrigin={{vertical: 'top',horizontal: 'center',}}
                >
                    {/* Contenu de la pop-up */}
                    <div style={{ padding: '16px' }}>
                        Please enable geolocation to use this feature.
                    </div>
                </Popover>
            )}
            <div className="section-line-boxes" id='favorites'>
                {nearbyStops.map((stop, index) => (
                    <LineBoxClickable
                        key = {index}
                        lineName="Stop"
                        lineStop={stop}
                        lineLink={`/transport/${stop}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Search;
