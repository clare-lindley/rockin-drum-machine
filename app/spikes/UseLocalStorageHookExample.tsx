import useLocalStorage from "../hooks/useLocalStorage";

export default function useLocalStorageHookExample(){
    const [count, setCount] = useLocalStorage('count', 0);

    const increment = () => {
      setCount(count + 1);
    };
  
    return (
      <div>
        <p>Count: {count}</p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={increment}>Increment</button>
      </div>
    );
}