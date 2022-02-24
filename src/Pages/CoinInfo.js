import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { makeStyles, Typography } from "@material-ui/core";
import DOMPurify from 'dompurify'

import './Info.css'



const CoinInfo = () => {
    

    const { id } = useParams();
    const [coin, setCoin] = useState({})

    const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;


    useEffect(() => {
        axios.get(SingleCoin(id)).then((res) => {
            setCoin(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    
    const useStyles = makeStyles((theme) => ({
        container: {
          display: "flex",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        },
        sidebar: {
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 25,
          borderRight: "2px solid grey",
        },
        heading: {
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: "Montserrat",
        },
        description: {
          width: "100%",
          fontFamily: "Montserrat",
          padding: 25,
          paddingBottom: 15,
          paddingTop: 0,
          textAlign: "justify",
        },
        marketData: {
          alignSelf: "start",
          padding: 25,
          paddingTop: 10,
          width: "100%",
          [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
          },
          [theme.breakpoints.down("xs")]: {
            alignItems: "start",
          },
        },
      }));
    
      const classes = useStyles();
  

    return (
        <div>
        <div className={classes.container}>
            <div className='content'>
                <h1>{coin.name}</h1>
            </div>
            <div className='content'>
                <div className='rank'>
                    <span className='rank-btn'>Rank # {coin.market_cap_rank}</span>
                </div>
                <div className='info'>
                    <div className='coin-heading'>
                        {coin.image ? <img src={coin.image.small} alt='' /> : null}
                        <p>{coin.name}</p>
                        {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
                        
                    </div>
                    <div className='coin-price'>
                        {coin.market_data?.current_price ? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
                    </div>
                </div>
            </div>

            <div className='content'>
                <table>
                    <thead>
                        <tr>
                            <th>1h</th>
                            <th>24h</th>
                            <th>7d</th>
                            <th>14d</th>
                            <th>30d</th>
                            <th>1yr</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                            <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                            <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                            <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                            <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                            <td>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='content'>
                <div className='stats'>
                    <div className='left'>
                        <div className='row'>
                            <h4>24 Hour Low</h4>
                            {coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                        </div>
                        <div className='row'>
                            <h4>24 Hour High</h4>
                            {coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}                            </div>

                    </div>
                    <div className='right'>
                        <div className='row'>
                            <h4>Market Cap</h4>
                            {coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                        </div>
                        <div className='row'>
                            <h4>Circulating Supply</h4>
                            {coin.market_data ? <p>{coin.market_data.circulating_supply}</p> : null}
                        </div>

                    </div>
                </div>
            </div>

            <div className='content'>
                <div className='about'>
                    <h3>About</h3>
                    <p dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
                    }}>
                    
                    </p>

                </div>
            </div>

        </div>
    </div>
     
         
    
    )
}

export default CoinInfo
