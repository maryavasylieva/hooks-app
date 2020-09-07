// @ts-nocheck
import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTE } from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    loading: false
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const getNotes = async () => {
    showLoader();
    const result = await axios.get(`${url}/notes.json`);

    const payload = Object.keys(result.data).map(key => {
      return {
        ...result.data[key],
        id: key
      };
    });

    dispatch({
      type: FETCH_NOTE,
      payload: payload
    })

    console.log("getNotes:", result.data);
  };

  const addNote = async title => {
    const note = {
      title,
      date: new Date().toJSON()
    };

    try {
      const result = await axios.post(`${url}/notes.json`, note);
      console.log("addNote: ", result.data);

      const payload = {
        ...note,
        id: result.data.name
      };

      dispatch({
        type: ADD_NOTE,
        payload: payload
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeNote = async id => {
    const result = await axios.delete(`${url}/notes/${id}.json`);
    console.log("removeNote:", result);

    dispatch({ type: REMOVE_NOTE, payload: id });
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        removeNote,
        getNotes,
        loading: state.loading,
        notes: state.notes
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
