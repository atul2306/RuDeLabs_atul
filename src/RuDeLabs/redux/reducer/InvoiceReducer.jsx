

const initialState= {
    invoices:[]
}
    
    
 

 const InvoiceReducer = (state= initialState,{type,payload}) =>{
    switch (type) {
        case "ADD_INVOICE":{
            return {
                ...state,
                invoices: [...state.invoices, payload]
            };
        }
        case "RESET_STORE": {
            return initialState; 
          }
        default:
            return state;
    }
}
export default InvoiceReducer