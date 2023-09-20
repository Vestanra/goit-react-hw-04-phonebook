import { useState } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid';
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { GlobalStyle } from "./GlobalStyle";
import {Layout} from "./Layout.styled"
import { useEffect } from "react";

export const App = () => {
  const [filter, setFilter] = useState('')
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts !== null) {
      return (JSON.parse(contacts));
    }
    return [];
  })

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])
  

  const addContact = newContact => {
    const check = contacts.some(el => el.name === newContact.name);
    if (check) {
        return alert(`${newContact.name} is already in contacts.`);
      }
      return setContacts( prevState =>[...prevState, { ...newContact, id: nanoid() }])
  };

  const deleteContact = id =>setContacts(prevState => prevState.filter(el => el.id !== id));

  const changeFilter = name => setFilter(name);

  const filterContacts = () => contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));

  return (<Layout>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <Filter onChange = {changeFilter} />
      <h2>Contacts</h2>
      <ContactList list={filterContacts()} onDelete={deleteContact} />
      <GlobalStyle/>
    </Layout>)
};
