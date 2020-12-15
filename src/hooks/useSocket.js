import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = ( serverPath ) => {

  const socket = useMemo(() =>
    io.connect(serverPath,{
      //es necesario para indicarle al servidor que tipo de comunicacion es la que ocupamos contra nuestrto backend server
      transports: ['websocket']
    }), [serverPath]
    //-> esto se va a volver a ejecutar si el serverPath cambia
  )
  const [online, setOnline] = useState(false);

  useEffect(() => {
    // console.log( socket ); -> para ver todos los metodos que me traen los sockets
    setOnline( socket.connected );
  }, [socket])

  //manejando el status del servidor cuando estamos conectados
  useEffect(() => {
    socket.on('connect',() => {
      setOnline(true);
    })
  }, [socket])

  //manejando el status del servidor cuando estamos desconectados
  useEffect(() => {
    socket.on('disconnect',() => {
      setOnline(false);
    })
  }, [socket])

  return {
    socket,
    online
  }
}