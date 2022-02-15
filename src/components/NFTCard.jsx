import {useEffect, useState} from 'react'
import axios from 'axios'
import { Grid, Card, CardContent, Typography, Link, Box, Item } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({


    root: {
      minWidth: 345,
      paddingTop: 2,
      padding: 2,
    },
   
    name: {
      color:"orange"
    },

    

    btn:{
        color: "yellow"
    },

    price:{
        color: "lightgreen"
    }
    
  });

export default function NFTCard  ()  {
  const [nfts, setNfts] = useState([])
  const classes = useStyles()

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://top-nft-sales.p.rapidapi.com/sales/30d',
      headers: {
        'x-rapidapi-host': 'top-nft-sales.p.rapidapi.com',
        'x-rapidapi-key': 'e84cf7bef2mshc4d23c70be6a28dp1c1332jsn04aa51ba01c6'
      }
    };
    
    

      axios.request(options).then((response) => {
          console.log(response.data)
          setNfts(response.data)

      }).catch((error) => {
          console.error(error)
      })
  }, [])

  console.log(nfts)


  return (
<>
    
    <h2 className="header-feed">NFT Feed</h2>
    

<div className ="nft-news">
    <Box>
<Grid
      container
      rowSpacing={1} 
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      justify="center"
      spacing ={2}
      
    >
        
{nfts.map(nft => (
    
<Grid item  md={4}>
<Card className={classes.root} varient="outlined" >

    <CardContent>
      <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {nft.collection}
      </Typography>
      <Typography className={classes.name} variant="h5" component="div" >
        {nft.nft_name}
      </Typography>
      <Typography className={classes.price} sx={{ mb: 1.5 }} color="text.secondary">
        {nft.price}
      </Typography>
      <Typography variant="body2">
        {nft.date}
        <br />
      </Typography>
      <Link className={classes.btn} href={nft.nft_url} underline="hover">See More</Link>
      </CardContent>
      
</Card>

</Grid>
))}

</Grid>
</Box>
</div>

</>

  )
};
