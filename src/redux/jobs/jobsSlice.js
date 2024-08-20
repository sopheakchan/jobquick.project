import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchGlobalSearch,
  getAllJobs,
  getJobById,
  getJobs,
  getJobsByCategory,
} from "../api/jobsApi";

// Utility function to extract error messages
const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message;
};

// Async thunks for fetching job data
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getJobById(id);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const { jobs, totalJobs } = await getJobs(page, pageSize);
      return { jobs, totalJobs };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const { jobs, totalJobs } = await getAllJobs();
      return { jobs, totalJobs };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const performGlobalSearch = createAsyncThunk(
  "search/performGlobalSearch",
  async (query, { rejectWithValue }) => {
    try {
      return await fetchGlobalSearch(query);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchJobsByCategory = createAsyncThunk(
  "jobs/fetchJobsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const data = await getJobsByCategory(category);
      console.log("category : ", category);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice definition
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobsByCategory: [], // Jobs by category
    totalJobs: 0, // Total number of jobs
    jobs: [],
    allJobs: [],
    job: null,
    status: "idle",
    searchQuery: "",
    data: null,
    error: null,
    totalJobs: 0,
    currentPage: 1,
    pageSize: 12,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSearchResults: (state) => {
      state.data = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearJobsByCategory(state) {
      state.jobsByCategory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload.jobs;
        state.totalJobs = action.payload.totalJobs;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.job = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allJobs = action.payload.jobs;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(performGlobalSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(performGlobalSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(performGlobalSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchJobsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state
      })
      .addCase(fetchJobsByCategory.fulfilled, (state, action) => {
        state.jobsByCategory = action.payload.jobs; // Store the jobs
        state.totalJobs = action.payload.totalJobs; // Store the total number of jobs
        state.loading = false; // Reset loading state
      })
      .addCase(fetchJobsByCategory.rejected, (state, action) => {
        state.loading = false; // Reset loading state
        state.error = action.payload; // Set the error message
      });
  },
});

// Export actions and reducer
export const {
  setPage,
  clearSearchResults,
  setSearchQuery,
  clearJobsByCategory,
} = jobsSlice.actions;
export default jobsSlice.reducer;

// Export selectors
export const selectJobById = (state) => state.jobs.job;
export const selectJobs = (state) => state.jobs.jobs;
export const selectAllJobs = (state) => state.jobs.allJobs;
export const selectTotalJobs = (state) => state.jobs.totalJobs;
export const selectCurrentPage = (state) => state.jobs.currentPage;
export const selectPageSize = (state) => state.jobs.pageSize;
export const selectStatus = (state) => state.jobs.status;
export const selectDataBySearch = (state) => state.jobs.data;
export const selectSearchQuery = (state) => state.jobs.searchQuery;
export const selectSearchError = (state) => state.jobs.error;
export const selectJobsByCategory = (state) => state.jobs.jobsByCategory;
export const selectJobsLoading = (state) => state.jobs.loading;
