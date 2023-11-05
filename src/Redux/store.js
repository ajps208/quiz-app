import {configureStore} from "@reduxjs/toolkit"
import pageSlice from "./pageSlice"
import scoreSlice from "./scoreSlice"
import categroySlice from "./categroySlice"
import darkmodeSlice from "./darkmodeSlice"

const store=configureStore({
    reducer:{
        pageSlice,
        scoreSlice,
        categroySlice,
        darkmodeSlice
    }
})
export default store