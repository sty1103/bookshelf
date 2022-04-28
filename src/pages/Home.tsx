import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { Navigate } from 'react-router-dom';
import { logout } from '../redux/modules/auth';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector<RootState, string|null>((state) => state.auth.token);

  if ( token === null ) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <div>
        home
        <button onClick={click}>logout</button>
      </div>
    );
  }

  function click() {
    dispatch(logout());
  }
}