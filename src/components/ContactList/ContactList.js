import css from '../ContactList/ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from 'Redux/contactsSlice';

export const ContactList = () => {
    const contacts = useSelector(state => state.contacts.items);
    const filter = useSelector(state => state.filter);

    const normalizedData = filter.toLowerCase();
    const normalizedContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedData)
  );

    const dispatch = useDispatch();
    return (
        <ul className={css.contact__list}>
            {normalizedContacts.map((contact, id) => (
                <li key={id} className={css.contact__list__item}>
                    <span>{contact.name} :</span>
                    <span>{contact.number}</span>
                    <button
                    className={css.contact__list__btn} 
                    type='button'
                    onClick={() => dispatch(remove(contact.id))}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};