
  /* data */

export   var localOBJ ={
    movies:[],
    magnet:[],
    seeds:[],
    size:[],
    subtype:[],
    type:[]
  }
  
  !localStorage.getItem("data") && localStorage.setItem("data",JSON.stringify(localOBJ))
  
   export  const localData =  JSON.parse( localStorage.getItem("data"))
/*data end*/



  /* suggestion */
   var suggestionARR = []

!localStorage.getItem("suggestion") && localStorage.setItem("data",JSON.stringify(suggestionARR))

export var suggestion = JSON.parse (localStorage.getItem("suggestion"));
 




