import './css/Avaliacoes.css';

const Avaliacoes = () => {
  const { user, isAluno } = useAuth();
  const { projetos, getUsuarioById } = useData();

  if (!isAluno()) {
    return (
      <div className="avaliacoes-container">
        <NavBar />
        <div className="error-message">
          <h2>Acesso Negado</h2>
          <p>Apenas alunos podem acessar esta página.</p>
        </div>
      </div>
    );
  }

};