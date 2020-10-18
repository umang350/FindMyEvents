import React from 'react';
import { Route } from 'react-router-dom';

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <div>
    <Route
      {...rest}
      render={(props) => <Component {...props} /> }
    />
    </div>
  )
}

export default PublicRoute;