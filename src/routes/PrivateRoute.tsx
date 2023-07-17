import { useAppSelector } from "../redux/hook";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/ui/loader";
import { IProps } from "../Interfaces/globalTypes";

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.users);

  const { pathname } = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
