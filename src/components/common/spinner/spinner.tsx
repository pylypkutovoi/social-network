import React from 'react';
import spinner from '../../../assets/images/Spinner.svg';

const Spinner: React.FC = () => {
  return (
    <div>
      <img src={spinner} alt='spinner'/>
    </div>
  );
}

export default Spinner;