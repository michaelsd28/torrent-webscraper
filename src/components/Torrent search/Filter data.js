

export function filterDATA (filter,event){



    let newData = {
        movies:[],
        magnet:[],
        type:[],
        subtype:[],
        seeds:[],
        size:[]
      };
    
  
    const filtered_titles =  filter.movies.map((title,index) => {

      try{
        if(title.includes(event)){
    
          newData.movies.push(title)
          newData.magnet.push(filter.magnet[index])
          newData.type.push(filter.type[index])
          newData.subtype.push(filter.subtype[index])
          newData.seeds.push(filter.seeds[index])
          newData.size.push(filter.size[index])
    
    
    
        }
      }catch(error){console.log(error,`      newData.movies.push(title)
      `)}

    
        
      
      });
    

      return newData

}

