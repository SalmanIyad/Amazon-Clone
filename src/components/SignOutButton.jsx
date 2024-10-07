import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { clearUser } from '../store/slices/userSlice';

export default function SignOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      Sign Out
    </Button>
  );
}