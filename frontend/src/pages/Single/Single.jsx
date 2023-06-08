import { useContext } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import UserContext from "../../context/createcontext";
import Login from "../login/Login"
export default function Single() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  return (
    <div className="single">
      {user===null?<Login />:
      <SinglePost />
    }
      <div></div>
    </div>
  );
}
