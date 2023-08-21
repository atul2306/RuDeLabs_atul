import { combineReducers} from "redux"
import InvoiceReducer from "./InvoiceReducer"
import TotalAmountReducer from "./TotalAmountReducer"

const reducer= combineReducers({
    allInvoice : InvoiceReducer,
    allAmount : TotalAmountReducer
})

export default reducer