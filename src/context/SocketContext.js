import React,{ createContext } from 'react';
import { useSocket } from "../hooks/useSocket";

//creando el contexto
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

  const { socket, online} = useSocket('http://localhost:8080');

  return(
    //EL PROVIDER ME VA A AYUDAR A COLOCAR INFORMACION A LO LARGO DE TODA LA APP
    //a traves de la propiedad value que recibe un objeto
    <SocketContext.Provider value={{socket, online}}>
      { children }
    </SocketContext.Provider>
  )
}