import React, { useState } from "react";
import './SearchBar.css'

export default function SearchBar({onSearch}) {  // recibe una propiedad onSearch
  const [city, setCity] = useState ("");
  return (
    <form onSubmit={(e) => {  // el onSubmit actualiza la pagina siempre entones pongo el preventDefault para evitar que se actualice la pag
      e.preventDefault();
      onSearch(city);      // ACA ES DONDE SE EJECUTO LA FUNCION ONSEARCH y esta moficicanto la variable cities de App
      setCity("");  // para limpiar el input
    }}>
      <input
        type="text"
        placeholder="City..."
        value = {city}
        onChange={e => setCity(e.target.value)}
        className = "searchbar"
      />
      <input type="submit" value="Add" className="boton2"/>
    </form>
  );
}
// ACA ES PARA QUE NO SE REPITA LA CIUDAD
/* if(cities.find((e) => e.id === ciudad.id)){
  alert(`Ciudad ${ciudad.name} duplicada`)
} else {
  return setCities((oldCities) => [...oldCities, ciudad]);
} */