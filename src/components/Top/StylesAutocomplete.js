import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    label: {
      display: "block",
    },
    input: {
      width: 200,
    },
    listbox: {
      color: "black",
      width: 260,
      top: "10px",
      margin: 0,
      padding: "5px",
      zIndex: 1,
      left: "220px",
      listStyle: "none",
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      maxHeight: 200,
      "& li ":{
        padding: "5px",
        width:"220px"
  
      },
  
      border: "1px solid rgba(0,0,0,.25)",
      '& li[ data-focus="true"]': {
        backgroundColor: "#4a8df6",
        color: "white",
        cursor: "pointer",
        borderRadius:"3px",
   
   
    
      },
      "& li:active": {
        backgroundColor: "#2977f5",
        color: "white",
        borderRadius:"2px",
  
    
      },
    },
  }));
  