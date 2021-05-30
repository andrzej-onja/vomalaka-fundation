import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { sendQuery, getBooksQuery } from "../../graphqlHelper";
import { RootState } from "../store";

type FetchTodosError = {
  message: string;
};

// possible errors.
export const fetchBooks = createAsyncThunk<
  any[],
  number,
  { rejectValue: FetchTodosError }
>(
  "todos/fetch",
  // The second argument, `thunkApi`, is an object
  // that contains all those fields
  // and the `rejectWithValue` function:
  async (limit: number, thunkApi) => {
    console.log(limit, limit);
    const response = await sendQuery(getBooksQuery());

    const books = response?.data?.data?.books;
    // const data: any[] = await response.json();
    console.log(books, "books");

    // Check if status is not okay:
    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: "Failed to fetch todos.",
      });
    }

    return books;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    books: [] as any[],
    status: "",
    error: null as FetchTodosError | null,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      console.log(state.value, "dec");
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log(action, "incbyamAC");
      console.log(state, "increment");
      state.value += action.payload;
    },
    // queryBooks: (state) => {
    //   return (dispatch) => {};
    // },
  },
  extraReducers: (builder) => {
    // When we send a request,
    // `fetchTodos.pending` is being fired:
    builder.addCase(fetchBooks.pending, (state) => {
      // At that moment,
      // we change status to `loading`
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });

    // When a server responses with the data,
    // `fetchTodos.fulfilled` is fired:
    builder.addCase(fetchBooks.fulfilled, (state, { payload }) => {
      // We add all the new todos into the state
      console.log("full", payload);

      // and change `status` back to `idle`:
      state.books = payload;
      state.status = "idle";
    });

    // When a server responses with an error:
    builder.addCase(fetchBooks.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      console.log(payload, "REjected error");
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;

export const selectBooks = (state: RootState) => state.counter.books;
export const booksSelector = createSelector<RootState, any[], any[]>(
  selectBooks,
  (books) => books
);

export default counterSlice.reducer;
