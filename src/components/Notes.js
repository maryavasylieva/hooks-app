// @ts-nocheck
import React from "react";
import  {TransitionGroup, CSSTransition} from 'react-transition-group';


export const Notes = ({ notes, onRemove }) => {
  return (
    <ul className="list-group">
      {notes.map(note => (
        <li className="list-group-item note" key={note.id} id={note.id}>
          <div>
            <strong className="note-title">{note.title}</strong>
            <small>{note.date}</small>
          </div>

          <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=> onRemove(note.id)}>
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
};
