import { ReactElement, useEffect, useState } from 'react'
import './App.css'

type Data = { message: string };

const App = ():ReactElement => {
  const [data, setData] = useState<Data | null>(null);
  const url = "http://localhost:3001";

  useEffect(() => {
    fetch(`${url}/api`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      }).catch(err => console.error(err));
  }, []);
  return (
    <>
      {
        data ? <h1>{data.message}</h1> : <h1>Loading...</h1>
      }
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
