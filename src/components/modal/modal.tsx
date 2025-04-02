import './modal.scss';

interface ModalProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <>
      <div data-testid='modal' className='modal'>
        {children}
      </div>
      <div className='modal-backdrop'></div>
    </>
  );
};
