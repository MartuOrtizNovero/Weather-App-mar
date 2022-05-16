import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ min, max, name, img, onClose, id }) {
  return (
    <div className="card">

      <div>
        <button onClick={onClose} className="boton">x</button>
      </div>

      <Link to={`/cities/${id}`} style={{ textDecoration: 'none' }}>
          <h5 className="card-title">{name}</h5>
      </Link>

      <div className="card-body" >

        <div className="temperaturas">
          <div className="min">
            <p>Min</p>
            <p>{min}°</p>
          </div>

          <div className="max">
            <p>Max</p>
            <p>{max}°</p>
          </div>
        </div>

        <div>
            <img className="iconoClima" src={"http://openweathermap.org/img/wn/" + img + "@2x.png"} width="80" height="80" alt="" />
       </div>
       
      </div>
    </div>
  );
};
