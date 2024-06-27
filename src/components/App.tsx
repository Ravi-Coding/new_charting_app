import React from 'react';
import Chart from './Chart';
import '../App.css';

const App: React.FC = () => {  // typescript safety , Rect.FunctionComponent as alias React.FC
  return (
    <div className="App">
      <header className="App-header">
        <h1>Charting Library in React</h1>
      </header>
      
      <main>  
        <Chart />
      </main>
    </div>
  );
};

export default App;
