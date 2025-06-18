import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
  const res = await axios.get('http://localhost:3000/recipes');
  return res.data;
});

const appSlice = createSlice({
  name: 'app',
  initialState: {
    recipes: [],
    currentStep: 0,
    transcript: '',
  },
  reducers: {
    setTranscript: (state, action) => {
      state.transcript = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.recipes[0]?.steps?.length - 1) {
        state.currentStep++;
      }
    },
    resetStep: (state) => {
      state.currentStep = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    });
  }
});

export const { setTranscript, nextStep, resetStep } = appSlice.actions;
export const store = configureStore({ reducer: appSlice.reducer });
