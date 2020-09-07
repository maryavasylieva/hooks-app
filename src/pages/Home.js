// @ts-nocheck
import React, { useContext, useEffect } from "react";
import { Form } from "../components/Form";
import { Notes } from "../components/Notes";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Loader } from "../components/Loader";

export const Home = () => {
  const { loading, notes, getNotes, removeNote } = useContext(FirebaseContext);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Form />
      <hr />

      {loading ? <Loader /> : <Notes notes={notes} onRemove={removeNote} />}
    </>
  );
};
