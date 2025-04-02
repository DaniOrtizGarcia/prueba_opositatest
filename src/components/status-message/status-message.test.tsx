import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusMessage, StatusMessageProps, StatusMessageType } from './status-message';

const getStatusMessageElement = () => screen.getByTestId('status-message');
const renderStatusMessage = (props: StatusMessageProps) => render(<StatusMessage {...props} />);

describe('StatusMessage Component', () => {
  it('should render the status message with correct text', () => {
    renderStatusMessage({status: StatusMessageType.INFO, message: 'Informational message'});
    const statusElement = getStatusMessageElement();
    
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('Informational message');
  });

  it('should have the correct class based on status type', () => {
    renderStatusMessage({status: StatusMessageType.ERROR, message: 'Informational message'});
    const statusElement = getStatusMessageElement();
    
    expect(statusElement).toHaveClass('error');
  });
});
