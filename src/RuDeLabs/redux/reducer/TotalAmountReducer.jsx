


    
    
 

 const TotalAmountReducer = (state= 0,{type,payload}) =>{
    switch (type) {
        case "TOTAL_AMOUNT":{
            if(payload.sign==="+")
            return state+Number(payload.val);
            else 
            return state-Number(payload.val);
        }
        case "RESET_STORE": {
            return 0; 
          }
        default:
            return state;
    }
}
export default TotalAmountReducer