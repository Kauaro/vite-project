import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import './css/UsuarioEditar.css';

const UsuarioEditar = () => {
    const { id } = useParams();
    const _dbRecords = useRef(true);
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        // Simulação de requisição
        UsuarioService.getById(id).then((response) => {
            setUsuario(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    return (
        <div className="usuario-editar-container">
            {/* Botão de sair no canto superior direito */}
            <div className="logout-top-right">
                <button onClick={handleLogout} className="logout-button-top">
                    <span className="logout-icon">🚪</span>
                    Sair
                </button>
            </div>

            {/* Seção de boas-vindas personalizada */}

        <div className="section-usuario">
          <h2>PAGINA DE USUARIO</h2>
          <p className="user-role">
            {isAluno() && "🎓 Aluno"}
            {isProfessor() && "👨‍🏫 Professor"}
            {isAdministrador() && "⚙️ Administrador"}
          </p>
        </div>


        {/* Cards de acesso rápido baseados no tipo de usuário */}
        <div className="card-acesso-usuario">
          <div className="quick-access">
            <h3>Acesso Rápido</h3>
            <div className="cards-container">
              
              {/* Cards para Alunos */}
              {isAluno() && (
                <>
                  <Link to="/projetoslista" className="access-card">
                    <div className="card-icon">📋</div>
                    <h4>Meus Projetos</h4>
                    <p>Visualizar projetos que participo</p>
                  </Link>
                  <Link to="/avaliacoes" className="access-card">
                    <div className="card-icon">📊</div>
                    <h4>Minhas Avaliações</h4>
                    <p>Ver notas e comentários dos projetos</p>
                  </Link>
                  <Link to="/mensagem" className="access-card">
                    <div className="card-icon">💬</div>
                    <h4>Mensagens</h4>
                    <p>Ver mensagens e comunicações</p>
                  </Link>
                </>
              )}

              {/* Cards para Professores */}
              {isProfessor() && (
                <>
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
                  <Link to="/mensagem" className="access-card">
                    <div className="card-icon">💬</div>
                    <h4>Mensagens</h4>
                    <p>Ver mensagens e comunicações</p>
                  </Link>
                </>
              )}

              {/* Cards para Administradores */}
              {isAdministrador() && (
                <>
                  <Link to="/usuarioslista" className="access-card">
                    <div className="card-icon">👥</div>
                    <h4>Usuários</h4>
                    <p>Gerenciar alunos, professores e administradores</p>
                  </Link>
                  <Link to="/usuarionovo" className="access-card">
                    <div className="card-icon">➕</div>
                    <h4>Novo Usuário</h4>
                    <p>Cadastrar novo usuário</p>
                  </Link>
                  <Link to="/projetoslista" className="access-card">
                    <div className="card-icon">📋</div>
                    <h4>Todos os Projetos</h4>
                    <p>Visualizar e gerenciar todos os projetos</p>
                  </Link>
                  <Link to="/projetonovo" className="access-card">
                    <div className="card-icon">➕</div>
                    <h4>Novo Projeto</h4>
                    <p>Criar um novo projeto</p>
                  </Link>
                  
                </>
              )}
            </div>
          </div>
        </div>
            <div className="usuario-editar-content">
                
                <section className="usuario-editar-section">
                    <form className="form-grid">
                        <div className="form-group">
                            <label htmlFor="inputID">ID</label>
                            <input type="text" id="inputID" value={usuario.id || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNome">Nome</label>
                            <input type="text" id="inputNome" value={usuario.nome || ''} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" id="inputEmail4" value={usuario.email || ''} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputData">Data de Cadastro</label>
                            <input type="text" id="inputData" value={usuario.dataCadastro || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputStatus">Status</label>
                            <input type="text" id="inputStatus" value={usuario.statusUsuario || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAcesso">Acesso</label>
                            <select id="inputAcesso">
                                <option defaultValue>Nível de Acesso</option>
                                <option>...</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn primary">Gravar Alterações</button>
                            <button type="button" className="btn warning">Reativar / Resetar a Senha</button>
                            <button type="button" className="btn danger">Inativar Conta</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UsuarioEditar;
