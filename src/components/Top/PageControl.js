import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function PageControl() {
  const [state, setstate] = useState(1);
  return (
    <div className="container justify-content-center control-button">
      <Button
        onClick={() => {
          if(state>1){
            setstate(prev => prev -= 1);
          }
       
     
        }}

        className=" back-search material-buttons"
        variant="contained"
        color="default"
      >

        <i className="fas fa-arrow-left"></i>
        Back
      </Button>
      
      <div style={{color:"#e0ebeb", padding: " 10px 25px 10px 25px" }}>  <h6>Current page <strong  style={{color:"#5dacbd"}}>{state}</strong></h6></div>

      <Button
        onClick={() => {
          setstate(prev => prev += 1);
      
        }}
        className="back-search"
        variant="contained"
        color="default"
      >
        Next
        <i className="fas fa-arrow-right"></i>
      </Button>
    </div>
  );
}

export default PageControl;
