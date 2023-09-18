import { Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

function Liker() {
    const [likes, setlikes] = useState(null)
    const like =(status)=>{
      setlikes(status)
      toast(status ? 'Liked' : 'Unliked', { type: status ? 'success' : 'warning' }, 3000)
    }
    return ( 
        <Typography
        variant="subtitle1"
        sx={{
          pt: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >

        <span className="h6">
            {/* <i className="bi bi-home">ssh banal@54.179.3.50 </i> */}
          <i onClick={()=>like(true) } style={{ backgroundColor: "", margin: "5px" }} className={ likes === true ? "bi bi-hand-thumbs-up-fill":"bi bi-hand-thumbs-up"}></i>
          <i onClick={()=> like(false)} style={{ backgroundColor: "", margin: "5px" }} className={ likes === false ? "bi bi-hand-thumbs-down-fill":"bi bi-hand-thumbs-down"}></i>
        </span>
      </Typography>
     );
}

export default Liker;