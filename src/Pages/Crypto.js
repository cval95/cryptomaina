import React from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme,TableContainer, TableHead, TableRow, Table, TableCell,ThemeProvider, TableBody, Container, LinearProgress, Typography } from '@material-ui/core';
import Loading from '../components/Loading';
import Pagination from "@material-ui/lab/Pagination";
import Backdrop from '@material-ui/core/Backdrop';


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinList = () =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

const Crypto = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error))
    }, []);

   

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

      useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      })
    
    

     
  
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
              [theme.breakpoints.down('xs')]:{
                fontSize: ".6rem"
              }
              
          },
          pagination: {
             
              color: "white",
            
          },
          img:{
            [theme.breakpoints.down('xs')]:{
              height:20
            },
            
          }
        }

        
       
      });
    
      const classes = useStyles();
      const history = useHistory();
      
      const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });

     
  return (
   
  <div>
       

<Container style={{
  textAlign: "center", 
  
  }
}
>

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
      {isLoading==true?
        <Loading/>:
      
    <TableContainer style={{display: 'table', tableLayout:'fixed'

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
   
    {handleSearch()
    .slice((page - 1) * 10, (page - 1) * 10 + 10)
    .map((coin) => (
      
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
          
          <TableCell align="right" className={classes.tableCell}>{"$"}{numberWithCommas(coin.current_price.toFixed(2))}</TableCell>
          <TableCell align="right"
          
          className={classes.tableCell}
          
          
          >
          
            {coin.price_change_percentage_24h.toFixed(2)}%
          </TableCell>
              
          <TableCell align="right"
          className={classes.tableCell}
          
          >{"$"}
           {numberWithCommas(
                            coin.market_cap.toString().slice(0, -6)
                          )}</TableCell>
        </TableRow>
  ))}
  
    </TableBody>
    
         
  </TableContainer>

}   


  <ThemeProvider theme={darkTheme}>
  <Pagination
  className={ classes.pagination}
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 50,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />

</ThemeProvider>
  
    
    </Container>

  

   


  </div>
  )

};

export default Crypto;
