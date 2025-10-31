import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk(
  "product/fetchProducts",
  async (args, { rejectWithValue }) => {
    try {
      const reponseAPI = await axios.get("https://dummyjson.com/products");

      if (reponseAPI.status != 200) {
        throw new Error("Api did not fetched");
      }

      console.log(reponseAPI,"reponseAPI");
      console.log(reponseAPI.data,"reponseAPI.data");

      return reponseAPI.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productApi = createSlice({
  name: "product",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      (state.isLoading = false), (state.data = action.payload);
    });
    builder.addCase(getData.rejected, (state) => {
      (state.isLoading = false), (state.isError = true);
    });
  },
});

export default productApi.reducer;