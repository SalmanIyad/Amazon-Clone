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
    <Button variant="outline-light" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}