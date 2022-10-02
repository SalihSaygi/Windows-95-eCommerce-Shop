import React from 'react';
import { Button, Frame } from '@react95/core';

const VerifyEmail = ({ email }) => {
  return (
    <div>
      <Frame p={3}>
        <p>Click the Verification Link Sent To Your Email</p>
        <p>{email}</p>
      </Frame>
    </div>
  );
};

export default VerifyEmail;
