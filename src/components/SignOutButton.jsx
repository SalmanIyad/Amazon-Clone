import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { clearUser } from '../store/slices/userSlice';
import { useTranslation } from "react-i18next";

export default function SignOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();

  const handleSignOut = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <Button variant="dark" onClick={handleSignOut} style={{
      backgroundColor: "#ffb514",
      borderColor: "#ffb514",
      color: "black",
      borderRadius: "3rem"
    }}>
      {t('user.Sign Out')}
    </Button>
  );
}