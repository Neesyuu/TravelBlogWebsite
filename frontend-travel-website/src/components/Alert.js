import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './css/Alert.css'
import { placeMessage, placeMessageType } from '../store/slices/alertSlice';

function Alert() {
    const dispatch = useDispatch();
    const { message , type } = useSelector(state=> state.alertMessage);

    setTimeout(()=>{
        dispatch(placeMessage(null));
        dispatch(placeMessageType('noAlert'));
    }, 1500)

  return (
    <div className={`alert_message ${type}`}>
        <h1>{ message }</h1>
    </div>
  )
}

export default Alert