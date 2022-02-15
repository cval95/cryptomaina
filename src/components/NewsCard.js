import React from 'react';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export const NewsCard = ({article}) => {
  return(
  
  
  <Card>
      <CardHeader>
             {article.title}

          </CardHeader>

          <CardMedia
        component="img"
        height="194"
        image={article.image}
        
      />

    
            <CardContent>
                    <Typography>
                                {article.desc}
                    </Typography>


            </CardContent>
   
  

  </Card>


  )
};
