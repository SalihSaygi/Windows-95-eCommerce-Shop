import React from 'react';
import { Button, Tabs, Tab, Input } from '@react95/core';

const AuthPanel = () => {
  const error = 'error';

  return (
    <div className="center">
      <Tabs style={{ width: 350 }} defaultActiveTab="Sign In">
        <Tab title="Sign In">
          <div className="flex1">
            <p className="inputLabel">Email:</p>
            <Input style={{ marginBottom: 15 }} />
            <p className="inputLabel">Password:</p>
            <Input />
            <Button style={{ width: 85, alignSelf: 'center', marginTop: 15 }}>
              Sign In
            </Button>
          </div>
          <p className="error">Error: {error} </p>
        </Tab>
        <Tab title="Sign Up">
          <div className="flex1">
            <p className="inputLabel">Name:</p>
            <Input style={{ marginBottom: 15 }} />
            <p className="inputLabel">Email:</p>
            <Input style={{ marginBottom: 15 }} />
            <p className="inputLabel">Password:</p>
            <Input />
            <Button style={{ width: 85, alignSelf: 'center', marginTop: 15 }}>
              Sign Up
            </Button>
          </div>
          <p className="error">Error: {error} </p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AuthPanel;
