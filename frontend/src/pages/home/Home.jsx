import { Link } from "react-router-dom";
function Home() {
    return (
        <>
            <div>This is home page</div>
            <button><Link to="/signup">
            Signup
          </Link></button>
            <button>
                <Link to="/login">
                    Login
                </Link>
            </button>
        </>
    );
}
export default Home;