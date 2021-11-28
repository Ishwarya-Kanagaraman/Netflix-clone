import "./listItem.scss";
// import StatusVideo from "../../videos/StatusVideo.mp4"
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
function ListItem({ index,item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie,setMovie]=useState({})
  useEffect(()=>{
   const  getMovie=async()=>{
     try{
        const res = await axios.get("/movies/find/"+item,{
          headers:{
              token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjljZmQ5OGZkYjkzOWM5NGRhN2YxOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDUzMTU4NSwiZXhwIjoxNjM0OTYzNTg1fQ.vuHiL_Mg6TglQNHytIXDw0y4MPF0oR9U9-woYBvPKRg"
          }
      });
      setMovie(res.data)
     }catch(err){
       console.log(err)
     }
   }
   getMovie();
  },[item])
// console.log(movie)
  return (
    <Link to={{ pathname: "/watch", movie:movie}}>
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    >
      <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon"/>
              <Add className="icon"/>
              <ThumbUpAltOutlined className="icon"/>
              <ThumbDownOutlined className="icon"/>
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
             {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
      
    </div>
    </Link>
  );
}

export default ListItem;
