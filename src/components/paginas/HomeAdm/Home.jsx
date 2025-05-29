import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/logo.jfif';
import imgProfile from '../../assets/images/logo.jfif';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {

    return (
        <div className='d-flex'>
            <Sidebar
                imgProfile={imgProfile}
                username={'Ordnael Zurc'}
            />
            <div className='p-3 w-100'>
                <Header
                    goTo={'/login'}
                    title={'Home'}
                    logo={logo}
                />
                <div>
                    <h1>Conteúdo do Home</h1>
                </div>
            </div>
        </div>
    )
}
export default Home;