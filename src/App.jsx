import { useState,useEffect} from 'react';
import { createClient } from 'urql'
import './App.css'

function App() {
  const [tokens,setTokens]=useState([]);
  const QueryURL="https://gateway.thegraph.com/api/244d0d6b9ec0156a41a50ebadb91917f/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7"
  const query=`{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }`

  const client=createClient({
    url:QueryURL
  })

  useEffect(()=>{
    const getTokens=async()=>{
      const {data}=await client.query(query).toPromise()
  setTokens(data.tokens)
    }
    getTokens()
  },[])
  return (
    <>
    <h1>Token Information </h1>
    {
      tokens!==null &&tokens.length>0 && tokens.map((token)=>{
        return(<div>
          <div className='data'><b>{token.name}</b> - {token.symbol}</div><br></br>
          <div>{token.id}</div> <br />
        </div>)
      })
    }
    </>
  )
}

export default App
