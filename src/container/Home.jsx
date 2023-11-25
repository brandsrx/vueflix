import { useState,useEffect } from 'react'
import {Link} from "react-router-dom"
import { TailSpin } from "react-loader-spinner";
import "../styles/home.css"
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTRlM2U4MmI1ZjczNzdmMjM4YWFkYmRmYjA0ODMxMCIsInN1YiI6IjY1NWY5YzExMWRiYzg4MDBhZDlmMWEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JVXxK1enbz37rwFHOrLMCvTedq0RxkbJoaRZS3ZDCno'
  }
}; 
function Home() {
  const [data,setData]=useState(null)
  const [dataTv,setDataTv]=useState(null)
  const [valid,setValid]=useState(true)
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        
        const response = await fetch('https://api.themoviedb.org/3/discover/movie', options)
        const result = await response.json()
        setData(result)
        console.log(result)
        
      }
      catch(e){
        console.log(e)
      }
    };
    fetchData()
  },[])
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        
        const response = await fetch('https://api.themoviedb.org/3/discover/tv', options)
        const result = await response.json()
        setDataTv(result)
      }
      catch(e){
        alert("No se pudo obtener el API")
      }
    };
    fetchData()
  },[])
  return (
    <div className="home">
        <div className="opc">
            Todo: <div className="btn-container">
                <button className={valid?"valid":""} onClick={()=>{setValid(true)}}>Peliculas</button>
                <button className={valid?"":"valid"} onClick={()=>{setValid(false)}}>Television</button>
            </div>
        </div>
        {valid?(
            <div className="movies">
                 {data?data.results.map((item,index)=>(
          <div className="card" key={index} idmovie={item.id}>
            <div className="card-body">
              <div className="poster">
                <Link to={"/page?id="+item.id+"&v="+valid}><img src={"https://image.tmdb.org/t/p/w500"+item.poster_path} alt={item.title} /></Link>
              </div>
            </div>
            <div className="card-title">{item.title}</div>
          </div>
       )):(
        <TailSpin color="#005296" radius={"8px"} />
       )}
            </div>
        ):(
            <div className="movies">
                 {dataTv?dataTv.results.map((item,index)=>(
          <div className="card" key={index}>
            <div className="card-body">
              <div className="poster">
                <Link to={"/page?id="+item.id+"&v="+valid}><img src={"https://image.tmdb.org/t/p/w500"+item.poster_path} alt={item.name} /></Link>
              </div>
            </div>
            <div className="card-title">{item.name}</div>
          </div>
       )):(
        <TailSpin color="#005296" radius={"8px"} />
       )}
            </div>
        )}
    </div>
  )
}
export default Home
