import React,{ useState,useEffect } from 'react';

const Route = ( { exact, path, component } ) => {

  const [ currentPath, setCurrentPath ] = useState(window.location.pathname)

  const onLocationChange = () => {
    setCurrentPath(window.location.pathname)
  }

  useEffect(() => {
    window.addEventListener('popstate', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  let Component = component;
  let condition = exact ? fullMatch(path) : partialMatch(path);
  return condition ? <Component /> : null;


function fullMatch(path) {
  return currentPath === path
}

function partialMatch(path) {
  return currentPath.includes(path)
}
};


export default Route;