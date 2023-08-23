


    
    
 

 const TotalAmountLeftReducer = (state= 0,{type,payload}) =>{
    switch (type) {
        case "TOTAL_AMOUNT_LEFT":{
            return state+Number(payload);
          
        }
        case "RESET_STORE": {
            return 0; 
          }
        default:
            return state;
    }
}
export default TotalAmountLeftReducer