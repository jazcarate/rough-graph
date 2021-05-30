import React, { useState } from 'react';

import './App.css';

import chartXkcd from 'chart.xkcd';
import { Line, Bar, Pie, XY } from "chart.xkcd-react";

import Definition from './Definition';

function App() {
  const [definition, setDefinition] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Rough Graph</h1>
        <p>
          For when you need to show a graph, but the values don't really matter.<br />
          Only the general behavior.
        </p>
      </header>

      <h2>Definition</h2>
      <Definition definition={definition} onUpdate={setDefinition} />

      <h2>Graph</h2>
      <div>
        <div>
          <Line
            config={{
              title: 'Monthly income of an indie developer', // optional
              xLabel: 'Month', // optional
              yLabel: '$ Dollors', // optional
              data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                datasets: [{
                  label: 'Plan',
                  data: [30, 70, 200, 300, 500, 800, 1500, 2900, 5000, 8000],
                }, {
                  label: 'Reality',
                  data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150],
                }],
              },
              options: { // optional
                yTickCount: 3,
                legendPosition: chartXkcd.config.positionType.upLeft
              }
            }} />

          <Bar
            config={{
              title: 'github stars VS patron number', // optional
              // xLabel: '', // optional
              // yLabel: '', // optional
              data: {
                labels: ['github stars', 'patrons'],
                datasets: [{
                  data: [100, 2],
                }],
              },
              options: { // optional
                yTickCount: 2,
              },
            }}
          />

          <Pie
            config={{
              title: 'What Tim made of', // optional
              data: {
                labels: ['a', 'b', 'e', 'f', 'g'],
                datasets: [{
                  data: [500, 200, 80, 90, 100],
                }],
              },
              options: { // optional
                innerRadius: 0.5,
                legendPosition: chartXkcd.config.positionType.upRight,
              },
            }}
          />

          <XY
            config={{
              title: 'Pokemon farms', //optional
              xLabel: 'Coodinate', //optional
              yLabel: 'Count', //optional
              data: {
                datasets: [{
                  label: 'Pikachu',
                  data: [{ x: 3, y: 10 }, { x: 4, y: 122 }, { x: 10, y: 100 }, { x: 1, y: 2 }, { x: 2, y: 4 }],
                }, {
                  label: 'Squirtle',
                  data: [{ x: 3, y: 122 }, { x: 4, y: 212 }, { x: -3, y: 100 }, { x: 1, y: 1 }, { x: 1.5, y: 12 }],
                }],
              },
              options: { //optional
                xTickCount: 5,
                yTickCount: 5,
                legendPosition: chartXkcd.config.positionType.upRight,
                showLine: false,
                timeFormat: undefined,
                dotSize: 1,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
