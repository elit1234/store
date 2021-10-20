import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {},
  reducers: {
    setItems(state, action) {
      (state.featuredItems = action.payload.featuredItems
        ? action.payload.featuredItems
        : null),
        (state.notFeatured = action.payload.notFeatured
          ? action.payload.notFeatured
          : null),
        (state.lastUpdated = action.payload.lastUpdated
          ? action.payload.lastUpdated
          : null);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.items,
    }),
  },
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    language: "EN",
    currency: "NZD",
  },
  reducers: {
    setUser(state, action) {
      (state.username = action.payload.username
        ? action.payload.username
        : null),
        (state.token = action.payload.token ? action.payload.token : null),
        (state.admin = action.payload.admin ? action.payload.admin : null),
        (state.roles = action.payload.roles ? action.payload.roles : null),
        (state.uid = action.payload.uid ? action.payload.uid : null);
    },
    setLanguage(state, action) {
      state.language = action.payload.language
        ? action.payload.language
        : state.language;
    },
    setCurrency(state, action) {
      state.currency = action.payload.currency
        ? action.payload.currency
        : state.currency;
    },
    logoutUser(state, action) {
      return {};
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.user,
    }),
  },
});

export const { setUser, logoutUser, setLanguage, setCurrency } =
  userSlice.actions;

export const { setItems } = itemsSlice.actions;

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [itemsSlice.name]: itemsSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ["items", "user"],
        })
      ),
  })
);

export const useAppDispatch = () => useDispatch();

export const wrapper = createWrapper(makeStore);
