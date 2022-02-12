import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { nanoid } from 'nanoid';

import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
      id: nanoid(),
    });
  };

  render() {
    const { name, number } = this.state;
    const { handleSubmit, handleInputChange } = this;

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label className={s.formLabel}>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>

          <label className={s.formLabel}>
            Number
            <input
              type="tel"
              name="number"
              value={number}
              onChange={handleInputChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>

          <button className={s.btmAdd} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  number: PropTypes.number,
  name: PropTypes.string,
};

export default Form;
