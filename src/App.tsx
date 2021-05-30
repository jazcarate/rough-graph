import React, { useState } from 'react';
import styled from 'styled-components';

import { Definition, empty } from './definition';
import Footer from './Footer';
import Graph from './Graph';
import GraphSelector from './GraphSelector';

function App() {
  const [definition, setDefinition] = useState<Definition>(empty());

  return (
    <div>
      <header>
        <Title>Rough Graph</Title>
        <p>
          For when you need to show a graph, but the values don't really matter.<br />
          Only the general behavior.
        </p>
      </header>

      <h2>Definition</h2>
      <GraphSelector definition={definition} update={newDefs => setDefinition(newDefs)} />


      <h2>Graph</h2>
      <Graph definition={definition} />

      <Footer />
    </div>
  );
}

export default App;

const Title = styled.h1`
  line-height: 1.2
`;