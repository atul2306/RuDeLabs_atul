import { configureStore } from "@reduxjs/toolkit"
import reducer from "./reducer/index"

const store = configureStore({reducer})
export default store