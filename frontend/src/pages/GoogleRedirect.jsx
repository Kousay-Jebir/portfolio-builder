import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return; // prevent running multiple times

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    console.log('Token:', token);

    if (token) {
      Cookies.set('auth-token', token, { expires: 1, path: '/' });

      // Remove token from URL without reloading
      params.delete('token');
      const newSearch = params.toString();
      const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '');
      window.history.replaceState({}, '', newUrl);

      setProcessed(true);
      navigate('/builder', { replace: true });
    } else {
      setProcessed(true);
      navigate('/login?error=missing_token', { replace: true });
    }
  }, [navigate, processed]);

  return <p>Logging you in...</p>;
};

export default GoogleRedirect;
