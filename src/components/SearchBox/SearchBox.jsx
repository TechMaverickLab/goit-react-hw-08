import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice'; 
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name); 
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
        placeholder="Search contacts by name or number" 
      />
    </div>
  );
};

export default SearchBox;
