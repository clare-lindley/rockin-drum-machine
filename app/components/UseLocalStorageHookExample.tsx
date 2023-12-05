import useLocalStorage from "../hooks/useLocalStorage";

export default function useLocalStorageHookExample(){
    const [count, setCount] = useLocalStorage('count', 0);

    const increment = () => {
      setCount(count + 1);
    };
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
}