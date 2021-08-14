import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Home from "./Views/Home.js";
import Dashboard from  "./Views/Dashboard.js";

// import Test from "./Views/Test.js";
// import Index2 from "./Views/Index2.js";
import Loading from "./ReusableComponents/Loading"

// import About from "./Views/About.js";
// import Blog from "./Views/Blog.js";
// import Contact from "./Views/Contact.js";

import Error from "./Views/Error.js";

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      {/* <Route path="/register" exact component={Index2}/>
      <Route path="/forgot" exact component={Index2}/>
      
      <Route path="/test" exact component={Test}/>
      <Route path="/index2" exact component={Index2}/>
      <Route path="/loading" exact component={Loading}/>
      
      <Route path="/about" exact component={About}/>
      <Route path="/blog" exact component={Blog}/>
      <Route path="/contact" exact component={Contact}/>
      <Route path="/business" exact component={Dashboard}/>
      <Route path="/market" exact component={Dashboard}/>
      <Route path="/jobs" exact component={Dashboard}/>
      <Route path="/adopt" exact component={Dashboard}/>
      <Route path="/profile" exact component={Dashboard}/>
      
      <Route path="/u/:handle" exact component={Dashboard}/> */}
      <Route path="/dashboard" exact component={Dashboard}/>
      <Route path="/loading" component={Loading}/>
      <Route component={Error}/>
    </Switch>
  )
}

export default Router;