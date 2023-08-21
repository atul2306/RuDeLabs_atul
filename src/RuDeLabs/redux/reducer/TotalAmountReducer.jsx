


    
    
 

 const TotalAmountReducer = (state= 0,{type,payload}) =>{
    console.log(payload);
    switch (type) {
        case "TOTAL_AMOUNT":{
            return state+Number(payload);
        }
        case "RESET_STORE": {
            return 0; 
          }
        default:
            return state;
    }
}
export default TotalAmountReducer