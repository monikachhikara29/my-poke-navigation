import React from 'react';

const Route = ( { exact, path, component } ) => {
  let Component = component;
  let condition = exact ? fullMatch(path) : partialMatch(path);
  return condition ? <Component /> : null;
};

function fullMatch(path) {
  return window.location.pathname === path
}

function partialMatch(path) {
  return window.location.pathname.includes(path)
}

export default Route;