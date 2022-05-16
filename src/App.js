/* import React, { useState } from 'react';
import './App.css';
import Nav from './componentes/Nav';
import Cards from './componentes/Cards';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

export default function App() {

  const [cities, setCities] = useState([]); // cities va ser un arrelo y a useState le paso por parametro el valor de inicializacion []
  // aca cities = [];
  // setCities f (){} pasa a ser una funcion que modifica el estado

  // Aca vamos a hacer la funcion que le pasamos al Nav y que este le va a pasar al SearchBar

  const apiKey = 'b45b6d63e0b89420ef184329e640c59f'

  function onSearch(city) { // recibe un argumento que es la ciudad
    // ahora se lo tengo que solicitar a la Api
    // es un metodo que nos permite hacerle consultas a una Api externa.
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(response_json => {
        if (response_json.main !== undefined) {
          const city = {
            min: Math.round(response_json.main.temp_min),
            max: Math.round(response_json.main.temp_max),
            img: response_json.weather[0].icon,
            id: response_json.id,
            wind: response_json.wind.speed,
            temp: response_json.main.temp,
            name: response_json.name,
            weather: response_json.weather[0].main,
            clouds: response_json.clouds.all,
            latitude: response_json.coord.lat,
            longitude: response_json.coord.lon
          };
          setCities(oldCities => [...oldCities, city]);// olCities (es un nombre) es una funcion porque setCities es una funcion que lo que hace es devolver lo que habia en el estado mas lo que le agragamos 
        } else {
          alert('Ciudad no encontrada');
        }
      })
      .catch(e => console.log(e));
  }

  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id))
  }

  return ( // LO UNICO QUE SE VA A RENDERIZAR // a Nav le paso la funcion porque es el que tiene el searchbar, SE DEFINE ACA LA FUNCION PORQUE ES DONDE ESTA EL STATE CON LAS CIUDADES
    <div className="App">
      <Route path = "/">
      <Nav onSearch={onSearch} />
      </Route>
      <Cards cities={cities} onClose={onClose} />
    </div>
  );
}
 */
//<Route path='/App' render={() =>  <Nav onSearch={onSearch}}/>}/>


import React, { useState, useEffect } from 'react';
//import './App.css';
import Nav from './componentes/Nav.jsx';
import Cards from './componentes/Cards.jsx';
// importo los componentes About y City
import About from './componentes/About.jsx';
// importo Route:
import { Route } from 'react-router-dom';
import Ciudad from './componentes/Ciudad';
import CurrentCard from './componentes/CurrentCard.jsx';

const apiKey = 'b45b6d63e0b89420ef184329e640c59f';

function App() {
  const [cities, setCities] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    let latitude = null
    let longitude = null

    const fetchData = position => {
      latitude = position.coords.latitude
      longitude = position.coords.longitude

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(r => r.json()).then(resource => {
          if (resource.main !== undefined) {
            const city = {
              min: Math.round(resource.main.temp_min),
              max: Math.round(resource.main.temp_max),
              img: resource.weather[0].icon,
              id: resource.id,
              country: resource.sys.country,
              timezone: (resource.timezone), //si uso date y la funcion de geololacitation se pone la hora de medellin
              wind: resource.wind.speed,
              temp: resource.main.temp,
              name: resource.name,
              weather: resource.weather[0].main,
              clouds: resource.clouds.all,
              latitud: resource.coord.lat,
              longitud: resource.coord.lon,
              feels_like: Math.round(resource.main.feels_like),
              description: resource.weather[0].description,

            };

            if (!current.length) {
              return setCurrent([...current, city])
            }
          }
        })
    }

    const onLoad = () => {
      navigator.geolocation.getCurrentPosition(fetchData);
    }

    onLoad();

  }, [current]); //solo se ejecutara al recargar la pagina

  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }

  function onSearch(ciudad) {
    //Llamado a la API del clima
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if (recurso.main !== undefined) {
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          if (cities.find((e) => e.id === ciudad.id)) {
            alert(`Ciudad ${ciudad.name} duplicada`)
          } else {
            return setCities((oldCities) => [...oldCities, ciudad]);
          }
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if (ciudad.length > 0) {
      return ciudad[0];
    } else {
      return null;
    }
  }
  return (
    <div className="App">
      <Route path='/cities' render={() => <Nav onSearch={onSearch} />} />
      <Route path='/cities' render={() => <CurrentCard current={current} />} />
      <Route exact path='/' component={About} />
      <Route exact path='/cities' render={() => <Cards cities={cities} onClose={onClose} />} />
      <Route exact path='/cities/:ciudadId'
        render={({ match }) => (<Ciudad ciudad={onFilter(match.params.ciudadId)} />)} />
      

    </div>
  );
}

export default App;