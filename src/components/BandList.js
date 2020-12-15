import React,{ useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  //cuando la data cambia, disparo el setbands estableciendo la data como actualizandola
  useEffect(() => {
      socket.on('current-bands',(bands) => {
        setBands(bands);
      })
      //para apagar el socket
      return () => socket.off('current-bands')
  }, [socket])

  const cambioNombre = (event, id) => {
    const nuevoNombre = event.target.value;

    setBands( bands => bands.map( band => {
      if(band.id === id){
        band.name= nuevoNombre;
      }
      return band;
    }))
  }

  const onPerdioFoco = (id, nombre) => {
    socket.emit('cambiar-nombre-band',{id,nombre});
  }

  const votar = ( id ) => {
    socket.emit('votar-band',id );
  }

  // borrarBanda
  const BorrarBand = (id) => {
    socket.emit('borrar-band',id );
  }

  const crearRows = () => {
    return(
      bands.map(band => (
        <tr key={band.id}>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => votar(band.id)}
            >
              +1
            </button>
          </td>
          <td>
            <input
              className="form-control"
              value={band.name}
              onChange={ (event) => cambioNombre(event, band.id) }
              //onBlur cuando pierde el foco
              onBlur={ () => onPerdioFoco(band.id,band.name)}
            />
          </td>
          <td>
            <h3>{ band.votes }</h3>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => BorrarBand(band.id)}
            >
              Borrar
            </button>
          </td>
        </tr>
      ))
    );
  }

  return(
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {crearRows()}
        </tbody>
      </table>
    </>
  )
}