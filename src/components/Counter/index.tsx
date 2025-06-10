import { useCounter } from './useCounter';

export const Counter = () => {
  const { counterNumber, handleButtonClick } = useCounter();
  return (
    <div>
      <button onClick={handleButtonClick}>Click</button>
      <p>The number of clicks: {counterNumber}</p>
    </div>
  );
};