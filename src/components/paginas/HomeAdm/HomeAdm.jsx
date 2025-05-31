import { Link } from "react-router-dom"
import Header from "../../layout/Header/Header"
import Sidebar from '../../layout/Menu/Sidebar'
import logo from '../../img/logo.png'
import usuario from '../../img/usuario.png'
import projeto from '../../img/projeto.png'
import relatorio from '../../img/relatorio.png'
import './style.css'

const HomeAdm = () => {

    return (
        <div className="hadm">
           <Sidebar />
           <div className="">
                
                 <section className="section">
                    <h2>Bem-vindo ao Painel do Administrador</h2>
                    <p>Use o menu lateral para navegar pelas diferentes seções do sistema.</p>

                    <div className="card-group">
                        <div className="card">
                            <Link to="/usuario" className="btn btn-primary">
                            <div className="card-body">
                                <h5 className="card-title">Gerenciar Usuários</h5>
                                <img src={usuario} alt=""className="img" />
                                <p className="card-text">Adicionar, editar ou remover usuários do sistema.</p>
                                Ir para Usuários
                            </div>
                            </Link>
                        </div>
                        <div className="card">
                             <Link to="/mensagem" className="btn btn-primary">
                            <div className="card-body">
                                <h5 className="card-title">Gerenciar Projetos</h5>
                                <img src={projeto} alt=""className="img" />
                                <p className="card-text">Visualizar, editar ou excluir projetos cadastrados.</p>
                               Ir para Projetos
                            </div>
                            </Link>
                        </div>
                        <div className="card">
                            <Link to="/relatorios" className="btn btn-primary">
                            <div className="card-body">
                                <h5 className="card-title">Relatórios</h5>
                                <img src={relatorio} alt=""className="img" />
                                <p className="card-text">Visualizar relatórios de atividade do sistema.</p>
                                Ver Relatórios
                            </div>
                            </Link>
                        </div>
                    </div>
                </section>
           </div>
        </div>
    )
}

export default HomeAdm