import React from "react";
import PropTypes from "prop-types";

import s from "./Filter.module.css";

function Filter({ filter, changeFilter }) {
  return (
    <label className={s.filter}>
      Find contacts by name
      <input type="text" value={filter} onChange={changeFilter} />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default Filter;
