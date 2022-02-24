import React from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody, Container, Paper, Typography } from '@material-ui/core';
import CoinInfo from './CoinInfo';




const Crypto = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    
    
    useEffect(() => {
     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      }).catch(error => console.log(error))
    }, []);

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };
  
      const useStyles = makeStyles(theme => {

        return {
          row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
          },
         
          searchField:{
              color:"white"
          }, 
          tableRowCell:{
              backgroundColor: "#43455c",
              color:"#3bba9c",
              fontWeight: "50",
              fontFamily: "Montserrat",
             
          },
          tableCell:{
              color:"white",
              fontWeight: "50",
              fontFamily: "Montserrat",
              fontSize: 20,
              [theme.breakpoints.down('md')]:{
                fontSize: 10
              },
              [theme.breakpoints.down('xs')]:{
                fontSize: 9
              }
              
          },
          img:{
            [theme.breakpoints.down('xs')]:{
              height:20
            }
          }
        }

        
       
      });
    
      const classes = useStyles();
      const history = useHistory();
      


     
  return (
  
  <div>
<Container style={{textAlign: "center"}

}>

<Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
          className={classes.tableCell}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>       
       
    
    <div className="coin-search">
        <h1 className="coin-text">Search a currrency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
          />
        </form>

      </div>
         
    <Paper  >
    <Table style={{display: 'table', tableLayout:'fixed'

}}>
    
    <TableHead
    >
    
      <TableRow>          
        <TableCell className={classes.tableRowCell}>Coin</TableCell>

        <TableCell align="right" className={classes.tableRowCell}>Price</TableCell>

        <TableCell align="right"  className={classes.tableRowCell}>24 Hour Change</TableCell>

        <TableCell align="right"  className={classes.tableRowCell}>Market Cap</TableCell>

      </TableRow>
    </TableHead>
    <TableBody>
    {handleSearch().map((coin) => (
        
        <TableRow
          onClick={() => history.push(`/coins/${coin.id}`)}
          key={coin.name}
          className={classes.row}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell 
          onClick={()=>{console.log("test")}}
          component="th"
          scope="row"
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <img
          className={classes.img}
            src={coin?.image}
            alt={coin.name}
            height="50"
            style={{ marginBottom: 10 }}
          />
          <div
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span
            className={classes.tableCell}
              style={{
                textTransform: "uppercase",
               
              }}
            >
              {coin.symbol}
            </span>
            <span 
            className={classes.tableCell}
            style={{ color: "#707793" ,
            
            }}>
              {coin.name}
            </span>
          </div>

          </TableCell>
          
          <TableCell align="right" className={classes.tableCell}>$,{coin.current_price}</TableCell>
          <TableCell align="right"
          
          className={classes.tableCell}
          
          >
              
              {coin.price_change_percentage_24h}%</TableCell>
          <TableCell align="right"
          className={classes.tableCell}
          >$,{coin.market_cap}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    
  </Table>



      </Paper>
    
    </Container>

    <CoinInfo coin={coins} />





  </div>
  )

};

export default Crypto;
