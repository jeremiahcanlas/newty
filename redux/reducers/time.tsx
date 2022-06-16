import { createSlice } from "@reduxjs/toolkit";

// let focusMins = 25;
// let restMins = 15;
// let seconds = 0;

const initialState: any = {
  minutes: 25,
  seconds: 0,
  active: false,
  counter: 1,
  stars: 0,
  paused: false,
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTime: (state, action) => {
      return {
        ...state,
        minutes: action.payload.minutes,
        seconds: action.payload.seconds,
        active: action.payload.active,
        paused: false,
      };
    },
    moreTime: (state) => {
      return { ...state, minutes: state.minutes + 5 };
    },
    lessTime: (state) => {
      return { ...state, minutes: state.minutes - 5 };
    },
    pauseTime: (state) => {
      return {
        ...state,
        minutes: state.minutes,
        seconds: state.seconds,
        paused: true,
        active: false,
      };
    },
    toggleStatus: (state) => {
      // toggles to rest after focus status vice versa
      //initial mode
      if (state.status === "rest") {
        return {
          ...state,
          minutes: 25,
          seconds: 0,
          status: "focus",
          active: false,
        };
      }

      //resets counter after 3 focus status giving the user a longer break, this could be customized
      //big rest
      if (state.status === "focus" && state.counter >= 3) {
        return {
          ...state,
          minutes: 15,
          seconds: 0,
          status: "rest",
          active: false,
          counter: 0,
        };
      }

      //small rest
      return {
        ...state,
        minutes: 5,
        seconds: 0,
        status: "rest",
        active: false,
        counter: state.counter + 1,
        stars: state.stars + 1,
      };
    },
    removeTime: () => {
      return initialState;
    },
    default: () => {
      return initialState;
    },
  },
});

export const {
  setTime,
  removeTime,
  moreTime,
  lessTime,
  pauseTime,
  toggleStatus,
} = timeSlice.actions;

export default timeSlice.reducer;
