import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
  filters: {
    name: "",
  },
};
const handlePending = (state) => {
  state.contacts.loading = true;
};

const handleRejected = (state, action) => {
  state.contacts.loading = false;
  state.contacts.error = action.payload;
};

const slice = createSlice({
  name: "contacts",
  initialState: initialState,
  // reducers: {
  //   // addContact: (state, action) => {
  //   //   state.contacts.items.push(action.payload);
  //   // },
  //   // deleteContact: (state, action) => {
  //   //   state.contacts.items = state.contacts.items.filter(
  //   //     (item) => item.id !== action.payload
  //   //   );
  //   // },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = null;
        let index = state.contacts.items.findIndex(
          (contact) => contact.id === action.payload
        );
        state.contacts.items.splice(index, 1);
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.rejected, handleRejected);
  },
});

// export const { addContact, deleteContact } = slice.actions;
export const contactsReducer = slice.reducer;
