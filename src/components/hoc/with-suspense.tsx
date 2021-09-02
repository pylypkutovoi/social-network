import React from 'react';
import Spinner from "../common/spinner/spinner";

export const withSuspense = (WrappedComponent: React.ComponentType) =>{
  const Component: React.FC = (props) => {
    return (
      <React.Suspense fallback={<Spinner/>}>
        <WrappedComponent {...props}/>
      </ React.Suspense>
    )
  }
  return Component;
}