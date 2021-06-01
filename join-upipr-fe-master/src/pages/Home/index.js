import React from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom'; 
import useDebounce from '../../Hooks/useDebounce';
import footerImg from "../../images/mainFooter.png"

function HomePage() {
  // maintain all the states
  const [query, setQuery] = React.useState("")
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [active, setActive] = React.useState(-1)
  const [noResult, setNoResult] = React.useState(false)
  const forScroll = React.useRef()
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

  // debouncing to limit api call during live search with custom useDEbounce hook
  
  const debouncing = useDebounce(query)

  React.useEffect(()=>{
    if (debouncing.trim() !== "" && query !== "") {
      fetchData(debouncing)
      setNoResult(true)
    }
  
  }, [debouncing])


  // handling the cross button in search bar
  const handleCross = ()=>{
    setData([])
    setQuery("")
    setNoResult(false)

  }

  // handling arrows to scroll through result
  const handleArrows = (e)=>{
    switch (e.keyCode) {
      case 40: setActive( prev => prev +1)
                if(active >= data.length-1){
                  forScroll.current.scrollTop = 0
                  setActive(0)
                }
               else if(active >= 0){
                  forScroll.current.scrollTop += 80
                }
                break;
      case 38: setActive( prev => prev -1)
                if(active === 1){
                  forScroll.current.scrollTop = 0
                }
                else if(active <= 0){
                  setActive(-1)
                  forScroll.current.scrollTop = 0
                }else {
                  forScroll.current.scrollTop -= 60
                }
                break;
      case 13: let info;
      active > -1 ? info = data[active].name : info = null;
      info? history.push(`/person/${info}`): history.push(`/lol`)
                break;
      default:
        break;
    }
  }
  // console.log(noResult)

  return (
    <div className = "homepage">
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>

      {/*input box starts here  */}
      <div onKeyUp = {(e)=> handleArrows(e)}>
        <div className = 'search-input-container'>   
          <input className="search-input" value = {query} placeholder="Search by name" onChange = {(e)=>  setQuery(e.target.value)} />
          {data.length>0 && <div className = "search-input-cross" onClick = {handleCross}> X </div>}
          {isLoading? <div className = "search-input-loader"></div> : <div className = "search-img-wrapper"> <img src="https://image.flaticon.com/icons/png/512/49/49116.png" alt="search" className = "search-img" /></div> }
        </div>

        {/*search result container starts here  */}
        <div className = "search-result" ref = {forScroll}  style = {data.length > 0? {paddingTop: "20px", paddingBottom: "20px"}: null}>
          {data?.map((item, i)=> ( 
            <>
              <hr/>
              <div style = {active === i? {backgroundColor:"yellow", color:"#110B0B"}: null} onClick = {()=> history.push(`/person/${item.name}`)}  className = "search-options"><div> <span>{item.name}</span> <span>{item.birth_year}</span></div> <div><span>{item.gender}</span></div></div>
            </>
          ))}
          {noResult && data.length === 0 && (<div style = {{marginTop:"20px",marginLeft:"20%", color:"#babcbe"}}> No result found...</div>)}
        </div>
      </div>
      <div className = "search-footer">
        <img src = {footerImg} alt= "footer" />
      </div>
    </div>
  );
}

export default HomePage;
