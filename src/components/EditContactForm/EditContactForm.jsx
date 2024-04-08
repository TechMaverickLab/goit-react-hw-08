import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editContact } from '../../redux/contacts/operations';
import styles from './EditContactForm.module.css';
import PropTypes from 'prop-types'; 

const EditContactForm = ({ contact, onClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: contact.name,
      number: contact.number,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required')
        .min(3, 'Name must be at least 3 characters')
        .max(15, 'Name must be no longer than 15 characters'),
      number: Yup.string()
        .required('Required')
        .matches(/^\+?\d{10,15}$/, 'Invalid phone number'),
    }),
    onSubmit: (values) => {
      dispatch(editContact({ id: contact.id, data: values }));
      onClose();
    },
    
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.editContactForm}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          type="text"
          name="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>Save</button>
      <button type="button" onClick={onClose} className={styles.button}>Cancel</button>
    </form>
  );
};

EditContactForm.propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  
export default EditContactForm;
