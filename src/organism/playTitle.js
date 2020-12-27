import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function PlayTitle() {
  const playing = useSelector(state => state.playing);
  return (
    <Text>
      {playing ? '...' : 'Touch the vinyl to play'}
    </Text>
  )
}

const Text = styled.div`
  color: black;
  font-style: italic;
  font-weight: 300;
  animation: fadeIn 0.5s infinite;
  animation-direction: alternate;

  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
`;
