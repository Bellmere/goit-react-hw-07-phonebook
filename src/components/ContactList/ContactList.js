import { delContact } from 'Redux/operations';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getContacts } from 'Redux/Selectors';
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

  const dispatch = useDispatch();
  const handleDelete = id => dispatch(delContact(id));

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
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};