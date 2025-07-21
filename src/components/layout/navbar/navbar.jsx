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
                  <Link to="/mensagem" className="access-card">
                    <div className="card-icon">💬</div>
                    <h4>Mensagens</h4>
                    <p>Ver mensagens e comunicações</p>
                  </Link>
                </>
              )}
            </div>
          </div>