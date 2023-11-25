import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import YouTube from "react-youtube"
import { TailSpin } from "react-loader-spinner";
import "../styles/Page.css"
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTRlM2U4MmI1ZjczNzdmMjM4YWFkYmRmYjA0ODMxMCIsInN1YiI6IjY1NWY5YzExMWRiYzg4MDBhZDlmMWEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JVXxK1enbz37rwFHOrLMCvTedq0RxkbJoaRZS3ZDCno'
    }
  }; 
export default function Page(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const valid = searchParams.get('v');
    const [data,setData]=useState(null)
    const [view,setView]=useState(null)
    const [v,setV]=useState(true)
    useEffect(()=>{
        const fetchData = async ()=>{
        try{        
            if(valid=="true"){
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
                const result = await response.json()
                const response2 = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
                const result2 = await response2.json()
                setV(true)
                setView(result2.results[0])
                setData(result)
            }
            else{
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options)
                const result = await response.json()
                console.log(result)
                setData(result)
                setV(false)
            }   
        }
        catch(e){
            alert("No se pudo conectar a la API 404")
               console.log(e)
            
        }
        };
        fetchData()
    },[])
   
    return(
        <>
        {v?data?(
        <div className="card-g">
        <div className="head">
            <div className="title">
                <a href={data.homepage}>
                {data.original_title}
                </a>/{data.original_language}
            </div>

        </div>
        <div className="body">
            <div className="poster">
                <img src={"https://image.tmdb.org/t/p/w500"+data.poster_path} alt={data.original_title} />
            </div>
            <div className="descripcion">
                <div className='descripcion2'><p>Descripcion:</p></div>
             
                {(data.overview!=" ")?(
                    <p>{data.overview}</p>
                ):(<p>No hay descripcion</p>)}

            
            </div>
        </div>
        <div className='productores'>
        <p>Productores:</p> 
        </div>
        <div className="company">
        {data.production_companies.map((item,index)=>(
                    <div className="company-cont" key={index}>
                        <div className="name">{item.name}</div>
                        <img src={"https://image.tmdb.org/t/p/w500"+item.logo_path} alt={item.name} />
                    </div>
                ))}
            </div>
        {view?(
            <YouTube id={view.id} videoId={view.key} />
        ):null}
    </div>
    ):(
         <TailSpin color="#005296" radius={"8px"} />
    ):data?(
        <div className="card-g">
        <div className="head">
            <div className="title">
                <a href={data.homepage}>
                {data.name}
                </a>/{data.original_language}
            </div>

        </div>
        <div className="body">
            <div className="poster">
                <img src={"https://image.tmdb.org/t/p/w500"+data.poster_path} alt={data.name} />
            </div>
            <div className="descripcion">
            <div className='descripcion2'><p>Descripcion:</p></div>
                {(data.overview!="")?(
                    <p>{data.overview}</p>
                ):(<p>No hay descripcion</p>)}
            </div>
        </div>
        <div className='productores'>
        <p>Productores:</p> </div>
        <div className="company">
        {data.production_companies.map((item,index)=>(
                    <div className="company-cont" key={index}>
                        <div className="name">{item.name}</div>
                        <img src={"https://image.tmdb.org/t/p/w500"+item.logo_path} alt={item.name} />
                    </div>
                ))}
            </div>
            {view ? (
    <div className="youtube-section">
        <div className="youtube-container">
            <YouTube id={view.id} videoId={view.key} className="youtube-video" />
        </div>
    </div>
) : null}</div>
        
        
    ):(
         <TailSpin color="#005296" radius={"8px"} />
    )} 
    </>
    )
}