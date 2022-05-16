import React from "react";
import {Link} from "react-router-dom"
import './Ciudad.css'
//creo el componente funcional City que mostrará los detalles de una ciudad
//recibida por props en la ruta /ciudad/{ciudadId}
export default function Ciudad({ ciudad }){
    return(
        <div className="cardd">
            <h2 className="card-title">{ciudad.name}</h2>
            <div className="contenido">
                <div>Temperatura: {ciudad.temp}</div>
                <div>Clima: {ciudad.weather}</div>
                <div>Viento: {ciudad.wind}</div>
                <div>Nubosidad: {ciudad.clouds}</div>
                <Link to="/cities"> <button>Return</button> </Link>
            </div>
        </div>
    )
}