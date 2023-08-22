import { combineReducers} from "redux"
import InvoiceReducer from "./InvoiceReducer"
import TotalAmountReducer from "./TotalAmountReducer"
import ExpenseReducer from "./ExpenceReducer"
import TotalAmountReceivedReducer from "./TotalAmountReceivedReducer"

const reducer= combineReducers({
    allInvoice : InvoiceReducer,
    allAmount : TotalAmountReducer,
    allExpense : ExpenseReducer,
    allAmountReceived: TotalAmountReceivedReducer
})

export default reducer