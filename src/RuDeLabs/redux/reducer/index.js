import { combineReducers} from "redux"
import InvoiceReducer from "./InvoiceReducer"
import TotalAmountReducer from "./TotalAmountReducer"
import ExpenseReducer from "./ExpenceReducer"
import TotalAmountReceivedReducer from "./TotalAmountReceivedReducer"
import TotalAmountLeftReducer from "./TotalAmountLeftReducer"

const reducer= combineReducers({
    allInvoice : InvoiceReducer,
    allAmount : TotalAmountReducer,
    allExpense : ExpenseReducer,
    allAmountReceived: TotalAmountReceivedReducer,
    allAmountLeft: TotalAmountLeftReducer
})

export default reducer