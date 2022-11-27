import 'bootstrap/dist/css/bootstrap.css';
import Formulario from './components/Formulario';
import ListData from './components/ListData';
import DataContextProvider from './context/DataContext';

function App() {
  return (
    <DataContextProvider>
      <div className='d-flex justify-content-center'>
        <div className='ms-3'>
          <div style={{width: "80%"}}>
            <Formulario />
          </div>
          <ListData />
        </div>
      </div>
    </DataContextProvider>
  );
}

export default App;
