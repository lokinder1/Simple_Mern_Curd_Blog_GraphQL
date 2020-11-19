import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $post: PostInput!) {
    updatePost(_id: $id, input: $post) {
      id
      title
      content
    }
  }
`;

const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(_id: $id) {
      id
      title
      content
    }
  }
`;

export default function EditPost() {
  const classes = useStyles();

  // Declare a new state variable, which we'll call "count"
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const [updatePosts] = useMutation(UPDATE_POST, {
    onCompleted(data) {
        enqueueSnackbar("Post Updated Successfully", { variant: "success" });
    },
    onError(err){
        enqueueSnackbar("Post Deletion Failed", { variant: "error" });
    }
  });

  const [getPost, { loading, data }] = useLazyQuery(GET_POST);


  async function loadPost() {

    var urlParams = new URLSearchParams(window.location.search);

    if (loading) return "Loading...";

    var id = urlParams.get("post");

    getPost({ variables: { id } });

    if (data) {
      setTitle(data.getPost.title);
      setContent(data.getPost.content);
    }

  }

  useEffect(() => {
    loadPost();
  }, [data]);

  function onSubmit(e) {
    e.preventDefault();
    var urlParams = new URLSearchParams(window.location.search);

    var id = urlParams.get("post");
    const post = {
      title: title,
      content: content,
    };

    updatePosts({ variables: { id, post } });
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Post
        </Typography>
        <form className={classes.form} noValidate>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                value={title || ""}
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows="20"
                id="content"
                label="Content Name"
                name="content"
                value={content || ""}
                autoComplete="lname"
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
