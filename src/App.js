import React, { Component } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';

import Form from './components/Form/Form.jsx';
import Section from './components/Section/Section';
import Contacts from './components/Contacts/Contacts.jsx';
import Filter from './components/Contacts/Filter/Filter.jsx';

import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  nameContactId = nanoid();

  addContacts = data => {
    const { contacts } = this.state;

    const names = contacts.map(contact => contact.name);

    names.includes(data.name)
      ? Notify.info(`${data.name} is already in contact`)
      : this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }));
  };

  deleteContacts = contatcId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contatcId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilner = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilner)
    );
  };

  componentDidMount() {
    const parseContacts = JSON.parse(localStorage.getItem('contacts'));

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.addContacts} />
        </Section>

        <Section title="Contacts">
          <Filter filter={this.state.filter} changeFilter={this.changeFilter} />

          <Contacts
            contacts={visibleContacts}
            onDeleteContatc={this.deleteContacts}
          />
        </Section>
      </>
    );
  }
}

export default App;
