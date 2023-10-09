"use client";
import axiosInstance from "@/api";
// import { toast } from "react-toast";
// import axiosInstance from "../../../service/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toast";
import { deleteCookie, setCookie } from "cookies-next";
type InitState = {
  loading: boolean;
  posts: Post[];
  token: string;
  isLogin: boolean;
  userData: {
    userId: string;
    username: string;
  };
};
const initialState: InitState = {
  loading: false,
  token: "",
  posts: [],
  userData: {
    userId: "",
    username: "",
  },
  isLogin: false,
};

export const getPosts = createAsyncThunk(
  "post/add",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/myposts/all");
      return res.data.data;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const registration = createAsyncThunk(
  "create/user",
  async (payload: RegisterPayload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", payload);
      setCookie("secret", res.data.data.token);
      payload?.redirect();
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  "login/user",
  async (payload: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", payload);
      setCookie("secret", res.data.data.token);
      payload?.redirect();
      return res.data.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const createPosts = createAsyncThunk(
  "post/create",
  async (payload: CreatePayload, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post("/myposts", payload);
      toast.success("Post created successfully");
      payload.redirect();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const editPosts = createAsyncThunk(
  "post/edit",
  async (payload: EditPayload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/myposts/edit/${payload.postId}`,
        payload
      );
      payload.redirect();
      toast.success("Post edited successfully");
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const deletePosts = createAsyncThunk(
  "post/delete",
  async (
    payload: {
      postId: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.delete(
        `/myposts/delete/${payload.postId}`
      );
      toast.success("Post deleted successfully");
      dispatch(getPosts());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    logUser: (state) => {
      state.isLogin = !state.isLogin;
    },
    logout: (state) => {
      deleteCookie("secret");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(registration.pending, (state) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;

        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPosts.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { logUser, logout } = postSlice.actions;

export default postSlice.reducer;
