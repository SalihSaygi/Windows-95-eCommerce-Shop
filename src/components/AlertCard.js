import React from 'react';
import { Button, Alert } from '@react95/core';

const AlertCard = ({ type, title, content, toggleShowAlert, showAlert }) => {
  const handleOpenAlert = () => toggleShowAlert(true);
  const handleCloseAlert = () => toggleShowAlert(false);

  return (
    <div>
      <Button onClick={handleOpenAlert}>Trigger Alert</Button>
      {showAlert && (
        <Alert
          title={title ? title : type.toUpperCase()}
          type={type ? type : 'error'}
          message={content}
          closeAlert={handleCloseAlert}
          hasSound={true}
          buttons={[{ value: 'OK', onClick: handleCloseAlert }]}
        />
      )}
    </div>
  );
};

export default AlertCard;
