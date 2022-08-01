import React from 'react';
import styled from 'styled-components';
import { FaBeer } from 'react-icons/fa';

const TestWrapper = styled.div`
  font-size: 2rem;
`;

function App() {
  return (
    <TestWrapper>
      Hello world <FaBeer />
    </TestWrapper>
  );
}

export default App;
