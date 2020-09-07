import React, { useState, useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const alert = useContext(AlertContext);
  const firebase = useContext(FirebaseContext);

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim()) {
      firebase
        .addNote(value.trim())
        .then(() => alert.show("The note was successfully created", "success"))
        .catch(() => alert.show("Something went wrong", "danger"));
      setValue("");
    } else {
      alert.show("Type in the text");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-input">
        <input
          className="form-control"
          type="text"
          placeholder="Enter a note title"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  );
};
