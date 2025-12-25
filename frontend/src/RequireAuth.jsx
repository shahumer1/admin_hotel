// import { Navigate, useLocation } from "react-router-dom";

// export default function RequireAuth({ children }) {
//   const isAuth = localStorage.getItem('isLoggedIn') === 'true';
//   const location = useLocation();

//   if (!isAuth) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// }
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const isAuth = localStorage.getItem('isLoggedIn') === 'true';

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // <- Outlet important for nested routes
}
  
