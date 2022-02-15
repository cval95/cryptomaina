import {useEffect, useState} from 'react';
import axios from 'axios';
import { Grid, Container, Card, Typography, Link, CardMedia, CardContent, CardActions, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({

  btn:{
    color: "#3bba9c"
},

desc:{
  color: "#707793"
}



})

export const News = () => {
  const [articles, setArticles] = useState([])
  const classes = useStyles()




  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://crypto-news14.p.rapidapi.com/news/cointelegraph',
      headers: {
        'x-rapidapi-host': 'crypto-news14.p.rapidapi.com',
        'x-rapidapi-key': 'e84cf7bef2mshc4d23c70be6a28dp1c1332jsn04aa51ba01c6'
      }
    };


    axios.request(options).then((response) => {
      console.log(response.data)
      setArticles(response.data)

  }).catch((error) => {
      console.error(error)
  })
}, [])

    

    return (
    <>
      <h2 className="header-feed">News Feed</h2>


<div>

<Grid
      container
      rowSpacing={1} 
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      justify="center"
      spacing ={2}
      marginLeft={10}
      marginRight={10}
      
    >
  {articles.map(article => (
    <Grid 
    item  md={4}
   
    
    >
     <Card >
      <CardMedia
        component="img"
        alt="news img"
        height="350"
        width="250"
        paddingLeft="5"
        image={article.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography className={classes.desc} variant="body2" color="text.secondary">
         {article.desc}
        </Typography>
      </CardContent>
      <CardActions 
      color="secondary"
      
      >
        <Link className={classes.btn}  href={article.url} underline="hover">See More</Link>
      </CardActions>
      </Card>
    </Grid>
      ))}
  </Grid>
 
</div>




</>
  

 
              
   
    )
}
