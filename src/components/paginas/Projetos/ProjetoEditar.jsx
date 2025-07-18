import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import ProjetoService from "../../services/ProjetoService";

const ProjetoEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, canEditProject, isAdministrador, isProfessor, logout } = useAuth();
    const [projeto, setProjeto] = useState(null);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [alunos, setAlunos] = useState("");

    useEffect(() => {
        ProjetoService.getById(id).then((response) => {
            setProjeto(response.data);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
            setAlunos(response.data.alunos?.join(', ') || "");
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    if (!projeto) {
        return <div>Carregando...</div>;
    }

    // Só permite acesso para quem pode editar
    if (!canEditProject(projeto.id)) {
        return (
            <div className="usuario-editar-container">
                <h2>Acesso negado</h2>
                <p>Você não tem permissão para editar este projeto.</p>
                <Link to="/projetoslista">Voltar</Link>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dadosAtualizados = {
            nome,
            descricao,
            alunos: alunos.split(',').map(a => a.trim()).filter(Boolean),
        };
        try {
            await ProjetoService.updateProjeto(projeto.id, dadosAtualizados);
            alert("Projeto atualizado com sucesso!");
            navigate("/projetoslista");
        } catch (error) {
            console.error("Erro ao atualizar projeto:", error);
            alert("Erro ao atualizar projeto!");
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="usuario-editar-container">
            <div className="logout-top-right">
                <button onClick={handleLogout} className="logout-button-top">
                    <span className="logout-icon">🔚</span>
                    Sair
                </button>
            </div>
            <div className="usuario-editar-content">
                <section className="usuario-editar-section">
                    <form className="form-grid" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputID">ID</label>
                            <input type="text" id="inputID" value={projeto.id} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputNome">Nome do Projeto</label>
                            <input type="text" id="inputNome" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDescricao">Descrição</label>
                            <textarea id="inputDescricao" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAlunos">Alunos (separados por vírgula)</label>
                            <input type="text" id="inputAlunos" value={alunos} onChange={e => setAlunos(e.target.value)} />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn primary">Gravar Alterações</button>
                            <Link to="/projetoslista" className="btn secondary">Cancelar</Link>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ProjetoEditar;
