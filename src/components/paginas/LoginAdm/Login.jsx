import { Link } from "react-router-dom";
import './Login.css';

const Login = () => {

    return (
        <div className="fundo">
            <form action="">
                <Link to={"/"} className="btn btn-warning mx-2">Voltar</Link>
                <Link to={"/home"} className="btn btn-primary mx-2">Entrar</Link>
            </form>
        </div>
    )
}

export default Login;