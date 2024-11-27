import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotifyCtrl } from 'controller/getNotifyCtrl';
export const fetchgNotify = createAsyncThunk("getNotifyCtrl", async (Data) => {
  const response = await getNotifyCtrl(Data);
  return response;
});
export const notifySlice = createSlice({
  name: 'Notify',
  initialState: {
    notify: [],
    isError: true
  },
  reducers: {
    setNotify: (state, action) => {
      state.notify = { data: action.payload, isLoading: false };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchgNotify.pending, (state, action) => {
        // Add user to the state array
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchgNotify.fulfilled, (state, action) => {
        if (action.payload && action.payload.EC === 0) {

          state.notify = { data: action.payload.DT, isLoading: false };
        } else {
          state.notify = { ...state.notify, isLoading: false };
        }
      })
      .addCase(fetchgNotify.rejected, (state, action) => {
        state.notify = { ...state.notify, isLoading: false };
        state.isError = true;
      });
  },
});

export const { setNotify } = notifySlice.actions;

export default notifySlice.reducer;
