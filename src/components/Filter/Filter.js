import css from '../Filter/Filter.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { change } from 'Redux/filterSlice';

const filterInputId = nanoid();

export const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const changeFilter = e => dispatch(change(e.target.value));

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
            onChange={changeFilter}
            />
        </div>
    );
}