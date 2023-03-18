import React, { useEffect, useState } from 'react';
import InfoActor from './InfoActor';
import { HomePage } from './HomePage';

export const ModuloReparto = (props) => {


  if (props.tipo === 0) {     
    return <InfoActor actor={props.actor} />;
  }  else return <>else</>;

}