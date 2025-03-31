import React from 'react';
import './status-message.scss';

export enum StatusMessageType {
  INFO = 'info',
  ERROR = 'error'
}

interface StatusMessageProps {
  status: StatusMessageType;
  message: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status, message }) => {
  return (
    <div className={`status-message ${status}`}>
      <p className="status-message__text">{message}</p>
    </div>
  );
};
