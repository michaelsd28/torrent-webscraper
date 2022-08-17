

  export function devideString(obj){

    let nyaaArray = [];
    let mapNyaa = obj.type.map((item) => {
      let newItem = item.split(" - ");
  
      nyaaArray.push(newItem);
    });


    let type = nyaaArray.map((item, index) => {
      return item[0];
    });

    let subtype = nyaaArray.map((item, index) => {
      return item[1];
  
    });




    return {
        type:type,
        subtype:subtype

    }
  }
