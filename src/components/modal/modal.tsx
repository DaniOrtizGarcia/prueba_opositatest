import './modal.scss';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <>
      <div className="modal">
        {children}
      </div>
      <div className="modal-backdrop"></div>
    </>
  );
};

export default Modal;
