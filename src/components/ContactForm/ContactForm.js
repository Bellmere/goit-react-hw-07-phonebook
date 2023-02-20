import React from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from 'Redux/operations';
import { getIsLoading, getContacts } from 'Redux/Selectors';
import css from '../ContactForm/ContactForm.module.css';
import { Loader } from 'components/Loader/Loader';

  const nameInputId = nanoid();
  const numberInputId = nanoid();

export const ContactForm = () => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const items = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const flag = useRef(false);

  console.log(items);

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
        case 'name':
            setName(value)
            break;
        case 'number':
            setNumber(value);
            break;
    
        default:
            break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    flag.current = true;
    console.log(flag.current);
      const contactsList = [...items];
    if (contactsList.findIndex(contact => name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()) !== -1) {
      alert(`${name} is already in contacts.`);
      flag.current = false;
      return;
    }
    try {
      dispatch(addContact({ name: name, phone: number }));
      reset();
    } catch (error) {
      console.log(error);
    }
    console.log(flag.current);
  };

  const reset = () => {
    setName('');
    setNumber('');
}

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <label htmlFor={nameInputId} className={css.form__label}>Name</label>
            <input
            className={css.form__inputName}
            id={nameInputId}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            />
            <label htmlFor={numberInputId} className={css.form__label}>Number</label>
            <input
            className={css.form__inputName}
            id={numberInputId}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            />
            <button 
            type='submit'
            className={css.form__submitBtn}
            >
                {flag.current === true? (<Loader/>) : (<span>Add Contact</span>)}
            </button>
        </form>
    );
};