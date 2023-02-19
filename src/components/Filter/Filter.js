import css from '../Filter/Filter.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { change } from 'Redux/filterSlice';
import { getFilter } from 'Redux/Selectors';

const filterInputId = nanoid();

export const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    const handleChange = e => {
        dispatch(change(e.target.value));
      };

    return (
        <div className={css.filter__wrapper}>
            <label
            className={css.filter__label}
            htmlFor={filterInputId}
            >
                Find contacts by name
            </label>
            <input
            className={css.filter__input}
            id={filterInputId}
            type="text"
            name="filter"
            value={filter}
            onChange={handleChange}
            />
        </div>
    );
}