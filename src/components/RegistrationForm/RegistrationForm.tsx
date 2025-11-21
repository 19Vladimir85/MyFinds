import styles from './RegistrationForm.module.css';
import { Form, Formik, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

interface IRegForm {
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export const RegistrationForm: React.FC = () => {
  const initialValues: IRegForm = {
    login: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const { t } = useTranslation();

  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  let userSchema = object({
    name: string().required(),
    age: number().required().positive().integer(),
    email: string().email(),
    website: string().url().nullable(),
    createdOn: date().default(() => new Date()),
  });

  return (
    <div className={styles.form}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            type="email"
            name="email"
            placeholder={t('regForm.email')}
          ></Field>
          <Field
            type="text"
            name="login"
            placeholder={t('regForm.login')}
          ></Field>
          <Field
            type="password"
            name="password"
            placeholder={t('regForm.password')}
          ></Field>
          <Field
            type="password"
            name="confirmPassword"
            placeholder={t('regForm.confirmPassword')}
          ></Field>
          <button type="submit">{t('regForm.submit')}</button>
        </Form>
      </Formik>
    </div>
  );
};
