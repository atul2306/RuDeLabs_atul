

const initialState= {
    expenses:[]
}
    
    
 

 const ExpenseReducer = (state= initialState,{type,payload}) =>{
    switch (type) {
        case "ADD_EXPENSE":{
            return {
                ...state,
                expenses: [...state.expenses, payload]
            };
        }
        case "RESET_STORE": {
            return initialState; 
        }
        default:
            return state;
    }
}
export default ExpenseReducer