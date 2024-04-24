import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice'; // Забезпечуємо, що шлях до файлу правильний
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const filter = useSelector((state) => state.filters.name); // Отримуємо поточне значення фільтра з Redux state
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value)); // Відправляємо нове значення фільтра в Redux
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={styles.input}
        placeholder="Search contacts by name or number" // Оновлення плейсхолдера для відображення можливості пошуку
      />
    </div>
  );
};

export default SearchBox;
