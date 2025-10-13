import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import './css/UsuarioNovo.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";

const UsuarioNovo = () => {
    const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("");

    const navigate = useNavigate();

    /*const handleSubmit = async (e) => {
        e.preventDefault(); 
    */
        const [novoUsuario, setNovoUsuario] = useState({
            "nome": '',
            "matricula": '',
            "email": '',
            "senha": '',
            "nivelAcesso": ''
        });

        const handleEditUsuario = (event, nome) => {
            setNovoUsuario({
                ...novoUsuario,
                [nome]: event.target.value,
            });
        };

        const handleUsuario = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch('https://productclienthub-ld2x.onrender.com/api/Usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            });
            const json = await response.json();
            console.log(response.status);
            console.log(json);
            alert("Usuario cadastrado com sucesso!");
            navigate("/usuarioslista");
        } catch (error) {

        }
    };

    const handleLogout = () => {
  localStorage.removeItem("user"); // Remove apenas os dados do usuário
  navigate("/login");
};

    return (
        <div className="usuario-container">
            {/* Botão de sair no canto superior direito */}
            <div className="logout-top-right">
                <button onClick={handleLogout} className="logout-button-top">
                    <span className="logout-icon">🚪</span>
                    Sair
                </button>
            </div>

            {/* Seção de boas-vindas personalizada */}
            <div className="section-usuario">
                <h2>CADASTRO DE NOVO USUÁRIO</h2>
                <p className="user-role">
                    {isAluno() && "🎓 Aluno"}
                    {isProfessor() && "👨‍🏫 Professor"}
                    {isAdministrador() && "⚙️ Administrador"}
                </p>
            </div>

           {/* Cards de acesso rápido baseados no tipo de usuário */}
                   <div className="quick-access-wrapper">
                     <div className="quick-access">
                       <h3>Acesso Rápido</h3>
                       <div className="cards-container">
                         
                         {/* Cards para Alunos */}
                         {isAluno() && (
                           <>
                           <Link to="/home" className="access-card">
                               <div className="card-icon">🏠</div>
                               <h4>Dashboard</h4>
                               <p>Tela inicial com todas as navegações.</p>
                             </Link>
                             <Link to="/projetoslista" className="access-card">
                               <div className="card-icon">📋</div>
                               <h4>Meus Projetos</h4>
                               <p>Visualizar projetos que participo</p>
                             </Link>
                             
                             
                           </>
                         )}
           
                         {/* Cards para Professores */}
                         {isProfessor() && (
                           <>
                           <Link to="/home" className="access-card">
                               <div className="card-icon">🏠</div>
                               <h4>Dashboard</h4>
                               <p>Tela inicial com todas as navegações.</p>
                             </Link>
                             <Link to="/projetoslista" className="access-card">
                               <div className="card-icon">📋</div>
                               <h4>Meus Projetos</h4>
                               <p>Gerenciar projetos que administro</p>
                             </Link>
                             <Link to="/projetonovo" className="access-card">
                               <div className="card-icon">➕</div>
                               <h4>Novo Projeto</h4>
                               <p>Criar um novo projeto</p>
                             </Link>
                             
                           </>
                         )}
           
                         {/* Cards para Administradores */}
                         {isAdministrador() && (
                           <>
                           <Link to="/home" className="access-card">
                               <div className="card-icon">🏠</div>
                               <h4>Dashboard</h4>
                               <p>Tela inicial com todas as navegações.</p>
                             </Link>
                             <Link to="/usuarioslista" className="access-card">
                               <div className="card-icon">👥</div>
                               <h4>Usuários</h4>
                               <p>Gerenciar alunos, professores e administradores</p>
                             </Link>
                             <Link to="/alunoslista" className="access-card">
                               <div className="card-icon">📱</div>
                               <h4>Alunos</h4>
                               <p>Gerenciar lista de alunos</p>
                             </Link>
                             <Link to="/projetoslista" className="access-card">
                               <div className="card-icon">📊</div>
                               <h4>Projetos</h4>
                               <p>Visualizar e gerenciar todos os projetos</p>
                             </Link>
                             
                           </>
                         )}
                       </div>
                     </div>
                   </div>
                   
            {/* Formulário de cadastro */}
            <div className="usuario-content">

                <div className="breadcrumb-navigator-usuario-novo">
                    
                    <div className="breadcrumb-item-container">
                        <Link to="/usuarioslista" className="navegador-usuario-item">Lista Usuário</Link>
                    </div>
                    <div className="breadcrumb-separator-container">
                        <span className="navegador-usuario-separator">/</span>
                    </div>
                    <div className="breadcrumb-item-container">
                        <span className="navegador-usuario-item active">Novo Usuário</span>
                    </div>
                </div>

                <section className="usuario-section">
                    <form className="form-grid-novo" onSubmit={handleUsuario}>
                        <div className="form-group">
                            <label htmlFor="inputNome">Nome</label>
                            <input type="text" id="inputNome" value={novoUsuario.nome} onChange={(e) => {handleEditUsuario(e, 'nome')}} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMatricula">Matrícula</label>
                            <input type="text" id="inputMatricula" value={novoUsuario.matricula} onChange={(e) => {handleEditUsuario(e, 'matricula')}} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Email</label>  
                            <input type="email" id="inputEmail4" value={novoUsuario.email} onChange={(e) => {handleEditUsuario(e, 'email')}} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputSenha">Senha</label>
                            <input type="password" id="inputSenha" value={novoUsuario.senha} onChange={(e) => {handleEditUsuario(e, 'senha')}} required />
                        </div>  
                        <div className="form-group">
                            <label htmlFor="inputAcesso">Nível de Acesso</label>
                                <select id="inputAcesso" value={novoUsuario.nivelAcesso} onChange={(e) => {handleEditUsuario(e, 'nivelAcesso')}} required>
                                <option value="">Selecione o nível de acesso</option>
                                <option value="aluno">Aluno</option>
                                <option value="professor">Professor</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn primary">Cadastrar Usuário</button>
                            <Link to="/usuarioslista" className="btn secondary">Cancelar</Link>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UsuarioNovo;
