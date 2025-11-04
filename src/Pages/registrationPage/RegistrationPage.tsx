import styles from './RegistrationPage.module.css';
import { LoginForm } from '../../components/Formik/Formik';

export const RegistrationPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <LoginForm></LoginForm>
    </div>
  );
};
