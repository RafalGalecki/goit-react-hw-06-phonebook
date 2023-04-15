import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    event.currentTarget.name === 'name'
      ? setName(event.currentTarget.value)
      : setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      name,
      number,
      id: nanoid(),
    };

    let isContact;
    contacts.forEach(person => {
      if (contact.name.toLowerCase() === person.name.toLowerCase()) {
        isContact = true;
      }
    });
    isContact
      ? Notify.warning(`${contact.name} is already in your Contacts.`, {
          timeout: 3000,
          position: 'left-top',
          closeButton: true,
        })
      : addContact(contact);

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <form className={css.formBox} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        id={nameInputId}
        type="text"
        name="name"
        value={name}
        className={css.inputName}
        placeholder="Enter contact's name"
        pattern="^[a-zA-Zа-яА-Я\u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00D3\u00F3\u015A\u015B\u0179\u017A\u017B\u017C]+(([' -][a-zA-Zа-яА-Я \u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00D3\u00F3\u015A\u015B\u0179\u017A\u017B\u017C])?[a-zA-Zа-яА-Я \u0104\u0105\u0106\u0107\u0118\u0119\u0141\u0142\u0143\u0144\u00D3\u00F3\u015A\u015B\u0179\u017A\u017B\u017C]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
      <label htmlFor={numberInputId}>Number</label>
      <input
        id={numberInputId}
        type="tel"
        name="number"
        value={number}
        className={css.inputName}
        placeholder="Enter contact's number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />
      <button type="submit" className={css.btn} name="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  addContact: PropTypes.func,
  contacts: PropTypes.array,
};

export default ContactForm;
