import { ArrowBackOutlined } from "@mui/icons-material";
import "./watch.scss";
// import StatusVideo from "../../videos/StatusVideo.mp4";
import { useLocation,Link } from "react-router-dom";
export default function Watch() {

  const location=useLocation();
  console.log(location)
  const movie=location.movie;
  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie.video}
      />
    </div>
  );
}
