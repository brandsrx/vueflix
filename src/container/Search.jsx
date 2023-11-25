import { useState,useEffect } from 'react'
import { useLocation,useParams ,Link} from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";
import "../styles/home.css"
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTRlM2U4MmI1ZjczNzdmMjM4YWFkYmRmYjA0ODMxMCIsInN1YiI6IjY1NWY5YzExMWRiYzg4MDBhZDlmMWEwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JVXxK1enbz37rwFHOrLMCvTedq0RxkbJoaRZS3ZDCno'
    }
  }; 
export default function Query(props){
    const [data,setData] = useState(null)
    const { query2 } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query= searchParams.get('query');
    
    useEffect(()=>{
        const fetchData = async ()=>{
          try{
            
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query.replace("&"," ")}`, options)
            const result = await response.json()
            setData(result)
          }
          catch(e){
            alert("No se pudo obtener el API")
          }
        };
        fetchData()
      },[query2])
    return(
        <div className="home"> 
            {data?(
            <div>
            <p>Resultados : {data.results.length}</p>
            <div className="movies">
                 {data?data.results.map((item,index)=>(
          <div className="card" key={index}>
            <div className="card-body">
              <div className="poster">
                <Link to={"/page?id="+item.id+"&v=true"}><img src={"https://image.tmdb.org/t/p/w500"+item.poster_path} alt={item.title} /></Link>
              </div>
            </div>
            <div className="card-title">{item.title}</div>
          </div>
       )):(
        <TailSpin color="#005296" radius={"8px"} />
       )}
            </div>
        </div>
        ):(
            <TailSpin color="#005296" radius={"8px"} />
        )}
        </div>
    )
}