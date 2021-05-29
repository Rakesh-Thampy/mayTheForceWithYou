import React from 'react';
import './index.css';
import NotFoundImg from '../../images/404.png'
import { useHistory } from 'react-router';

function NotFound() {
  const history = useHistory()
  return (
    <div className="not-found" onClick = {()=>{history.push("/")}}>
    </div>
  );
}

export default NotFound;
