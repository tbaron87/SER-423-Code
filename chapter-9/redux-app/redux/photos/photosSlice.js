import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Async thunks
export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
  const response = await fetch(`${API_URL}/photos?_page=1&_limit=10`);
  return response.json();
});

export const addPhoto = createAsyncThunk('photos/addPhoto', async (photo) => {
  const response = await fetch(`${API_URL}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo),
  });
  return response.json();
});

export const removePhoto = createAsyncThunk('photos/removePhoto', async (photoId) => {
  await fetch(`${API_URL}/photos/${photoId}`, { method: 'DELETE' });
  return photoId;
});

// Slice
const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    loadedPhotos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadedPhotos = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.loadedPhotos.unshift(action.payload);
      })
      .addCase(removePhoto.fulfilled, (state, action) => {
        state.loadedPhotos = state.loadedPhotos.filter(
          (photo) => photo.id !== action.payload
        );
      });
  },
});

export default photosSlice.reducer;
