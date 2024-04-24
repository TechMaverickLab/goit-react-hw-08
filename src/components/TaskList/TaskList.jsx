import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../../redux/contacts/selectors';
import { deleteContact } from '../../redux/contacts/operations';
import EditContactForm from '../TaskEditor/TaskEditor';
import styles from './TaskList.module.css';

const ContactList = () => {
  const [editingContactId, setEditingContactId] = useState(null);
  const contacts = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };
  
  const handleEdit = (id) => {
    setEditingContactId(id);
  };
  

  const handleCloseEditForm = () => {
    setEditingContactId(null);
  };

  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.item}>
          {editingContactId === id ? (
            <EditContactForm contact={{ id, name, number }} onClose={handleCloseEditForm} />
          ) : (
            <>
              <p>{name}: {number}</p>
              <button onClick={() => handleEdit(id)} className={styles.button}>Edit</button>
              <button onClick={() => handleDelete(id)} className={styles.button}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;