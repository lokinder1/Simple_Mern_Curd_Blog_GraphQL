import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
// import PostCurdService from "../../../utils/PostCurdService";
import { Paper } from "@material-ui/core";
import { gql, useLazyQuery } from '@apollo/client';



// const PostCurd = new PostCurdService();

const useStyles = makeStyles((theme) => ({
  title: {
    background: theme.palette.primary.light,
    border: 0,
    borderRadius: 3,
    color: theme.palette.black,
    padding: theme.spacing(2),
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },

  content: {
    background: theme.palette.primary.contrastText,
    border: 0,
    borderRadius: 3,
    color: theme.palette.black,
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
}));


const GET_POST = gql`
query getPost($id: ID!){  
  getPost(_id: $id){
    id,
    title,
    content
  }
}
`;

export default function ViewPost() {
  const classes = useStyles();
  const [post, setPost] = useState([]);

  const [ getPost, { loading, data } ] = useLazyQuery(GET_POST);

  
  async function loadPost() {
    
    var urlParams = new URLSearchParams(window.location.search);
    // const result = await PostCurd.readById(urlParams.get("post"));

    if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;

    // getPost({variables: urlParams.get("post")});

    var id = urlParams.get("post");

    console.log(id);
 

    getPost({variables: {id}});

    console.log(data);
    if(data){
      setPost(data.getPost);
    }

  }

  useEffect(() => {
    loadPost();
  }, [data]);

  return (
    <Container maxWidth="xl">
      <Paper className={classes.title}>
        <Typography variant="h5" >
          {post.title}
        </Typography>
      </Paper>
      <Paper className={classes.content}>
        <Typography variant="content1"  >{post.content}</Typography>
      </Paper>
    </Container>
  );
}
