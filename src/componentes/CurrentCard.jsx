import React from "react";
import './CurrentCard.css';

export default function CurrentCard({ current }) {
    return (
        <div className="currentCard">
            <h1>{current[0].name}</h1>

            <div>
                <div className="min">
                    <p>Min</p>
                    <p>{current[0].min}°</p>
                </div>

                <div className="max">
                    <p>Max</p>
                    <p>{current[0].max}°</p>
                </div>
            </div>
            <div>
            <img className="iconoClima" src={"http://openweathermap.org/img/wn/" + current[0].img + "@2x.png"} width="80" height="80" alt="" />
       </div>
        </div>
    )
}