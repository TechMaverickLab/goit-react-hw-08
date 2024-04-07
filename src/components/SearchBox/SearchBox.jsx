import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectFilter } from '../../redux/filters/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={styles.input}
        placeholder="Search contacts by name"
      />
    </div>
  );
};

export default SearchBox;
