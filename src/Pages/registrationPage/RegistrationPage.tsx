import styles from './RegistrationPage.module.css';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';

export const RegistrationPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <RegistrationForm />
    </div>
  );
};
