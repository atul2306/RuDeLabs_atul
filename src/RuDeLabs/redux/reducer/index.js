import { combineReducers} from "redux"
import InvoiceReducer from "./InvoiceReducer"
import TotalAmountReducer from "./TotalAmountReducer"
import ExpenseReducer from "./ExpenceReducer"

const reducer= combineReducers({
    allInvoice : InvoiceReducer,
    allAmount : TotalAmountReducer,
    allExpense : ExpenseReducer,
})

export default reducer