import './status-message.scss';

export enum StatusMessageType {
  INFO = 'info',
  ERROR = 'error'
}

export interface StatusMessageProps {
  status: StatusMessageType;
  message: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status, message }) => {
  return (
    <div data-testid="status-message" className={`status-message ${status}`}>
      <p className="status-message__text">{message}</p>
    </div>
  );
};
