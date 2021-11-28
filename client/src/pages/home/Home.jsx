import  List  from "../../components/List/List"
import React,{useState,useEffect} from 'react'
import axios from "axios"
import Featured from '../../components/featured/Featured'
import Navbar from '../../components/Navbar/Navbar'
import "./home.scss"
const Home = ({type}) => {
    const [lists,setLists]=useState([])
    const [genre,setGenre]=useState(null)
    useEffect(()=>{
        const getRandomLists=async()=>{
            try{
                const res= await axios.get(
                    `lists${type ? "?type="+type:''}${genre  ? "&genre="+genre:""}`,{
                        headers:{
                            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjljZmQ5OGZkYjkzOWM5NGRhN2YxOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDUzMTU4NSwiZXhwIjoxNjM0OTYzNTg1fQ.vuHiL_Mg6TglQNHytIXDw0y4MPF0oR9U9-woYBvPKRg"
                        }
                    }
                    );
                    console.log(res.data)
                    setLists(res.data);
            }catch(err){
                console.log(err)
            }
        }
        getRandomLists();
    },[genre,type])
    return (
        <div className="home">
          <Navbar/>
          <Featured type={type} setGenre={setGenre} />
          {lists.map((list,i)=>(
              <List key={i} list={list} />
          ))}
        </div>
    )
   
}

export default Home
