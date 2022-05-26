import { configureStore } from "@reduxjs/toolkit";

import timeReducer from "./reducers/time";

export default configureStore({
  reducer: {
    timeReducer,
  },
});
