import './loader.scss';

export const Loader = () => {
  return (
    <div data-testid='loader' className='loader'>
      <div className='loader__spinner'></div>
    </div>
  );
};
