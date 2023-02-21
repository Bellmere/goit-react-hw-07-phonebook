import { delContact } from 'Redux/operations';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getContacts } from 'Redux/Selectors';
import { Loader } from 'components/Loader/Loader';
import { useState } from 'react';
import css from '../ContactList/ContactList.module.css';

const getNormalizedContacts = (contacts, filter) => {
  if (!filter) {
    return contacts;
  } else {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
};


export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const normalizedContacts = getNormalizedContacts(contacts, filter);
  const [loading, setLoading] = useState('');

  const dispatch = useDispatch();
  const handleDelete = async id => {
    setLoading(id);
    try {
      await dispatch(delContact(id));
      setLoading('');
    } catch (error) {
      console.log(error);
    }
  } 


    return (
        <div>
            <ul className={css.contact__list}>
                {normalizedContacts.map((contact, id) => (
                    <li key={id} className={css.contact__list__item}>
                        <span>{contact.name} :</span>
                        <span>{contact.phone}</span>
                        <button
                        className={css.contact__list__btn} 
                        onClick={() => handleDelete(contact.id)}
                        >
                          {
                            loading === contact.id ? (<Loader />) : (<span>Delete</span>)
                          }
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};