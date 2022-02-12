import React from "react";
import PropTypes from "prop-types";
import s from "./Contacts.module.css";

function Contacts({ contacts, onDeleteContatc }) {
  return (
    <ul className={s.contactLict}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={s.contactLictItem}>
          {name}
          <span>{number}</span>
          <button
            type="button"
            className={s.btnDel}
            onClick={() => onDeleteContatc(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default Contacts;
