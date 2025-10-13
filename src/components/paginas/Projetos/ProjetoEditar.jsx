import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import ProjetoService from "../../services/ProjetoService";
import './css/ProjetoEditar.css';


const ProjetoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAluno, isProfessor, isAdministrador, logout } = useAuth();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [projeto, setProjeto] = useState({
    nome: "",
    descricao: "",
    tema: "",
    alunos: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://productclienthub-ld2x.onrender.com/api/Projeto/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProjeto({
            nome: data.nome,
            descricao: data.descricao,
            tema: data.tema,
            alunos: data.aluno // assumindo que o backend envia string
          });
        } else {
          setError("Projeto não encontrado");
        }
      } catch (err) {
        console.error("Erro ao buscar projeto:", err);
        setError("Erro ao carregar dados do projeto");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProjeto();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjeto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projeto.nome || !projeto.descricao || !projeto.tema || !projeto.alunos) {
      alert("Preencha todos os campos.");
      return;
    }

    const dadosParaEnviar = {
      nome: projeto.nome,
      descricao: projeto.descricao,
      tema: projeto.tema,
      aluno: projeto.alunos // enviar como string para o backend
    };

    try {
      await ProjetoService.updateProjeto(id, dadosParaEnviar);
      alert("Projeto atualizado com sucesso!");
      navigate("/projetoslista");
    } catch (err) {
      console.error("Erro ao atualizar projeto:", err);
      alert("Erro ao atualizar projeto.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };


  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;


  return (
    <div className="projeto-editar-container">
      <div className="logout-top-right">
        <button onClick={handleLogout} className="btn danger">🚪 Sair</button>
      </div>

      <div className="projeto-editar-content layout-flex">
        {/* Cards no canto esquerdo */}
        <div className="cards-sidebar">
          <div className="welcome-section-projeto-editar">
            <h2>EDITAR PROJETO</h2>
            <p className="user-role">
              {isAluno() && "🎓 Aluno"}
              {isProfessor() && "👨‍🏫 Professor"}
              {isAdministrador() && "⚙️ Administrador"}
            </p>
          </div>
          <div className="quick-access">
            <h3>Acesso Rápido</h3>
            <div className="cards-container">
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
        {/* Formulário ocupa o restante, abaixo do WelcomeSection */}
        <div className="form-main-area">
          <div className="projeto-editar-section" >
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ID</label>
                <input type="text" value={id} readOnly disabled />
              </div>
              <div className="form-group">
                <label>Nome</label>
                <input type="text" name="nome" value={projeto.nome} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea name="descricao"  value={projeto.descricao} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Tema</label>
                <select name="tema" value={projeto.tema} onChange={handleInputChange}>
                  <option value="">Selecione</option>
                  <option value="Racismo">Racismo</option>
                  <option value="Homofobia">Homofobia</option>
                  <option value="Neurodivergente">Neurodivergente</option>
                  <option value="Feminicidio">Feminicidio</option>
                </select>
              </div>
              <div className="form-group">
                <label>Alunos (separados por vírgula)</label>
                <input type="text" name="alunos" value={projeto.alunos} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Responsável</label>
                <input type="text" value={usuario.nome} readOnly disabled />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn primary">Gravar Alterações</button>
                <Link to="/projetoslista" className="btn secondary">Cancelar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjetoEditar;
