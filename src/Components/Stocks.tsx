import { useEffect, useState } from "react"
import axios from "axios"


type topgainers = [
    
        {
            "ticker": string,
            "price": string,
            "change_amount": string,
            "change_percentage": string,
            "volume": string
        }
    
    ]
const Stocks = () => {
    const [topgainers,setTopgainers] = useState<topgainers>();
    const [toplosers,setToplosers] = useState<topgainers>();
    const fetchStocks = async ()=>{
        try{
            const response = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=UL248DBH9TVZ9DDQ`);
            setTopgainers(response.data.top_gainers);
            setToplosers(response.data.top_losers);
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchStocks();
    },[]);
  return (
    <div>
        <div>
    <h1>Top gainers</h1>
    {topgainers?.map((top: any, index: number) => (
              <div key={index}>
                <p>{top.ticker}</p>
                <p>{top.price}</p>
                <p>{top.change_amount}</p>
                <p>{top.change_percentage}</p>
                </div>
              ))}
        </div>
        <div>
<h1>Top losers</h1>
<div>
    <h1>Top losers</h1>
    {toplosers?.map((top: any, index: number) => (
              <div key={index}>
                <p>{top.ticker}</p>
                <p>{top.price}</p>
                <p>{top.change_amount}</p>
                <p>{top.change_percentage}</p>
                </div>
              ))}
        </div>
        </div>
    </div>
  )
}

export default Stocks