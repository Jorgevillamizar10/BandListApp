import React,{ useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

  const [valor, setValor] = useState('');
  const { socket } = useContext(SocketContext);

  const onSubmit = (ev) => {
    ev.preventDefault(); //-> para evitar la propagacion del formulario que es el comportamiento por defecto, que refresque el navgador etc
    
    if(valor.trim().length > 0){
      socket.emit('add-band',{ name: valor});
      setValor('');
    }
  }

  return(
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={ valor }
          onChange={(ev) => setValor(ev.target.value)}
        />
      </form>
    </>
  )
}