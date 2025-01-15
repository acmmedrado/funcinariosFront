import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


// O import do React serve para suprir qualquer tag como < />
// Ja o reactDOM é ultilizado em ReactDOM.render que coloca a pagina App.js, que esta dentro da tag
// do react dentro do html na div com nome root
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
 