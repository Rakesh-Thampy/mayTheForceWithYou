import React from 'react';
import './index.css';
import StarwarsImage from '../../images/starWars_bg.png'
import { useParams } from 'react-router';
import axios from 'axios'
import LoadingImg from '../../images/loader.gif'


function Person() {
  // maintaing states
  const {id} = useParams()
  const [isLoading, setLoading] = React.useState(true)
  const [data, setData] = React.useState({})
  

  React.useEffect(()=>{
    fetchName(id)
    setTimeout(() => {
       setLoading(false)
    }, 4000);
  },[id])

//  fetch data accoding to name in url
  function fetchName(name){
    axios.get(`https://swapi.dev/api/people/?search=${name}`)
    .then(res=> setData(res.data.results[0]))
    .catch((err)=> console.log(err))
  }
// starting loading page
  if (isLoading) {
    return(
      <img src={LoadingImg} alt="loading" />
    )
  }else{
    return (
      <div className="person">
        <div className = "person_card">
          <h1> {data.name}</h1>
          <div>
            <h2> <span>Birth year:</span> {data.birth_year}</h2>
            <h2> <span>Eye color:</span> {data.eye_color}</h2>
          </div>
          <div>
            <h2> <span>Gender:</span> {data.gender}</h2>
            <h2> <span>Height: </span> {data.height}</h2>
          </div>
          <div>
            <h2> <span>Mass:</span> {data.mass}</h2>
            <h2> <span>Skin color:</span> {data.skin_color}</h2>
          </div>

        </div>
        <div className = "person-footer">
          <img src={StarwarsImage} alt="img" />
        </div>
      </div>
    )
  }
}


export default Person;
