import "../styles/Header.css"
import {useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import { IoMdSearch } from "react-icons/io";

export default function Header(){
    const [data,setData] = useState(null)
    const navigate = useNavigate();
    let neewQ = "";
     function cambiarUrl (value){
        for(let i in value){
            if(value[i].charCodeAt(0) == 32 ){
                neewQ+="-"
            }else{
                neewQ+=value[i]
            }
        }
        navigate("/search?query="+neewQ)
    }
    return (
        <div className="container">
            <div className="subcontainer">
                <div className="logo">Vueflix</div>
                <div className="search">
                        <input type="text" id="query" onKeyUp={(e)=>{
                             if(e.code=="Enter"){
                                cambiarUrl(e.target.value)
                            }
                        }}/>
                        <button onClick={(e)=>{
                            cambiarUrl(document.getElementById("query").value)
                        }}><IoMdSearch /></button>
                </div>
            </div>
        </div>
    )
}