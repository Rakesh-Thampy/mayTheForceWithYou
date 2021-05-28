import React from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from 'axios'

function HomePage() {
  // maintain all the states
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)

  // function to fetch data
  const fetchData = (val)=>{ 
    setLoading(true)
    axios.get(`https://swapi.dev/api/people/?search=${val}`)
    .then(res=> setData(res.data.results))
    .catch((err)=> console.log(err))
    .finally(()=> setLoading(false))
  }

  // debouncing to limit api call during live search
  let timer
  function debounce(e){
    let {value} = e.target
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fetchData(value)
    }, 500);
  }

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input className="search-input" placeholder="Search by name"onKeyUp = {(e)=> debounce(e)} />
      <div className = "search-result">
        {data?.map((item)=> (
          <p>{item.name}</p>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
