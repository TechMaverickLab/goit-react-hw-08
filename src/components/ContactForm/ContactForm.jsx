import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsOperations';
import styles from './ContactForm.module.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .min(3, 'Name must be at least 3 characters')
    .max(15, 'Name must be no longer than 15 characters'),
  number: Yup.string()
    .required('Required')
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addContact(values));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.contactForm}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className={styles.input}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </label>
      <label className={styles.label}>
        Number
        <PhoneInput
          international
          defaultCountry="US"
          value={formik.values.number}
          onChange={(value) => formik.setFieldValue('number', value)}
          className={styles.input}
        />
        {formik.touched.number && formik.errors.number ? (
          <div>{formik.errors.number}</div>
        ) : null}
      </label>
      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
