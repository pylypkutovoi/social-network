import React from 'react';
import Spinner from "../common/spinner/spinner";

export const withSuspense = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<Spinner/>}>
        <Component {...props}/>
      </ React.Suspense>
    )
  }
}