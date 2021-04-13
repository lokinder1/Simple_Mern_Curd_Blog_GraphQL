import PersonalFooter from "@bit/lokinder1.footers.personal-footer";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import CreatePost from "./components/Post/Create";
import EditPost from "./components/Post/Edit";
import ListPosts from "./components/Post/List";
import ViewPost from "./components/Post/View";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "overflow-x": "hidden",
  },
  main: {
    minHeight: "calc(100vh - 120px)",
  },
  paper: {
    height: 140,
    width: 100,
  },
  createPost: {
    padding: " 50px !important",
  },

  listPosts: {
    padding: " 50px !important",
  },
  button: {
    margin: " 8px !important",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <div className={classes.main}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Link>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/edit">
              <EditPost />
            </Route>
            <Route path="/view">
              <ViewPost />
            </Route>
            <Route path="/">
              <Grid container spacing={2}>
                <Grid className={classes.createPost} item xs={12} sm={6}>
                  <CreatePost />
                </Grid>

                <Grid className={classes.listPosts} item xs={12} sm={6}>
                  <ListPosts />
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </div>
        <PersonalFooter />
      </div>
    </Router>
  );
}
