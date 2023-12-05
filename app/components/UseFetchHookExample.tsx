import useFetch from "../hooks/useFetch";

export default function UseFetchHookExample(){
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>    
    <h1>HERE BE DATA!</h1>
    <ul>
        {data.slice(0, 5).map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      </>

  );
}