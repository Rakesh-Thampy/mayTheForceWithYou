import React from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom'; 


function HomePage() {
  // maintain all the states
  const [query, setQuery] = React.useState("")
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [active, setActive] = React.useState(-1)

  // calling history
  const history = useHistory()

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
    let code = e.keyCode
    if(code !== 40 && code !== 13 && code !== 38){
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fetchData(value)
      }, 500);
    }
    
  }
  // handling the search query 
  const handleChange = (e)=>{
    setQuery(e.target.value)
  }


  // handling the cross button in search bar
  const handleCross = ()=>{
    setData([])
    setQuery("")

  }

  // handling arrows to scroll through result
  const handleArrows = (e)=>{
    switch (e.keyCode) {
      case 40: setActive( prev => prev +1)
                break;
      case 38: setActive( prev => prev -1)
                break;
      case 13: let info = data[active].name
                history.push(`/person/${info}`)
                break;
      default:
        break;
    }
  }


  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      {/*input box starts here  */}
      <div onKeyUp = {(e)=> handleArrows(e)}>
        <div className = 'search-input-container'>   
          <input className="search-input" value = {query} placeholder="Search by name" onChange = {(e)=> handleChange(e)} onKeyUp = {(e)=>  debounce(e)} />
          {data.length>0 && <div className = "search-input-cross" onClick = {handleCross}> X </div>}
          {isLoading? <div className = "search-input-loader"></div> : <div className = "search-img-wrapper"> <img src="https://image.flaticon.com/icons/png/512/49/49116.png" alt="search" className = "search-img" /></div> }
        </div>
      {/*search result container starts here  */}
        <div className = "search-result" style = {data.length > 0? {paddingTop: "20px"}: null}>
          {data?.map((item, i)=> ( 
            <div style = {active === i? {backgroundColor:"yellow", color:"#110B0B"}: null} onClick = {()=> history.push(`/person/${item.name}`)}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
