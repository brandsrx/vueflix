import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./container/Home"
import Header from "./container/Header"
import "./app.css"
import Page from "./container/Page"
import Query from "./container/Search"
export default function App(){

  return( 
    <BrowserRouter>
      <Header></Header>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/page" element={<Page/>}/>
          <Route path="/search" element={<Query/>}/>
      </Routes>
    </BrowserRouter>
  )
}