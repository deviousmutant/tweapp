import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line

import Landing from "pages/Landing"
import Edition from "pages/Edition"
import ArticleView from "pages/article-view"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  // return <AnimationRevealPage disabled></AnimationRevealPage>;
  return (
    <Router basename="/tweapp/">
      <Switch>
        <Route path={"/edition/:number/:id"}>
          <ArticleView />
        </Route>
        <Route path={"/edition/:number"}>
          <Edition />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}