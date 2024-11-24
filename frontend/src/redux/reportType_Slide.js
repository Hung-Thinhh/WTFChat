import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReportType} from 'controller/report';
export const fetchReportType = createAsyncThunk(
    "getReportType",
    async () => {
      const response = await getReportType();
      return response;
    }
  );
export const sidebarSlice = createSlice({
    name: 'typeReport',
    initialState: {
        reportType: {
            data: [],
            isLoading: true,
        },
        isError: true
    },
    reducers: {
      setReportType: (state, action) => {
        console.log(action.payload);
        
            state.reportType = { data:action.payload, isLoading: false };
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
          .addCase(fetchReportType.pending, (state, action) => {
            // Add user to the state array
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(fetchReportType.fulfilled, (state, action) => {
            if (action.payload && action.payload.EC === 0) {
              
              state.reportType = { data:action.payload.DT, isLoading: false };
            } else {
                state.reportType = { ...state.reportType, isLoading: false };
            }
          })
          .addCase(fetchReportType.rejected, (state, action) => {
            state.reportType = { ...state.reportType, isLoading: false };
            state.isError = true;
          });
      },
});

export const {setReportType} = sidebarSlice.actions;

export default sidebarSlice.reducer;
