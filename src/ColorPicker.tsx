import React, { ChangeEvent, useState } from 'react';
import { GithubPicker } from 'react-color';
import styled from 'styled-components';

const defaultColors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#000000', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#B7B7B7'];

type Props = {
  color: string;
  onChange: (newColor: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function fakeEvent(value: string): ChangeEvent<HTMLInputElement> {
  return {
    preventDefault: () => { },
    target: {
      value,
    }
  } as ChangeEvent<HTMLInputElement>
}

type Color = {
  hex: string;
}

export default function ColorPicker({ color, onChange }: Props) {
  const [showing, setShowing] = useState(false);
  return (
    <Wrapper>
      <button onClick={() => setShowing(!showing)} style={{ backgroundColor: color }}>🎨</button>
      {showing && <Popover>
        <GithubPicker
          color={color}
          onChangeComplete={({ hex }: Color) => { setShowing(false); onChange(fakeEvent(hex)) }}
          colors={defaultColors}
        />
      </Popover>}
    </Wrapper>
  );
}

const Wrapper = styled.span`
  position: relative;
`;

const Popover = styled.div`
  position: absolute;
  z - index: 2;
  top: 25px;
  left: 2px;
`;