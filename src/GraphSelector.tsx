import React from 'react';

import { Data, Definition, density_, newData, toDirection, toForm, _density } from './definition';

import ColorPicker from './ColorPicker';
import BigInput from './BigInput';
import styled from 'styled-components';
import BigButton from './BigButton';

type Props = {
  definition: Definition;
  update: (defs: Definition) => void;
}

function notEmpty<T>(value: T | null): value is T {
  return value !== null;
}

export default function GraphSelector({ definition, update }: Props) {
  return (
    <>
      <BigInput label="Title" value={definition.title} onChange={(e) => update({ ...definition, title: e.target.value })} />
      <BigInput label="Horizontal axis" value={definition.xAxis} onChange={(e) => update({ ...definition, xAxis: e.target.value })} />
      <BigInput label="Vertical axis" value={definition.yAxis} onChange={(e) => update({ ...definition, yAxis: e.target.value })} />

      <h3>Lines</h3>
      <ul>
        {definition.data.map((value, key) => {
          function updateOne<T>(target: T, f: (newVal: T, og: Data) => (Data | null)): void {
            update({
              ...definition,
              data: definition.data.map((val, index) => index === key ? f(target, val) : val).filter(notEmpty)
            });
          }

          return (
            <li key={`label-${key}`}>
              <Select value={value.form} onChange={e => updateOne(e.target.value, form => ({ ...value, form: toForm(form) }))}>
                <option value="linear">Linear</option>
                <option value="horizontal">Horizontal</option>
                <option value="bell">Bell</option>
                <option value="exp">Exponential</option>
                <option value="log">Logarithmic</option>
              </Select>

              <Select value={value.direction} onChange={e => updateOne(e.target.value, direction => ({ ...value, direction: toDirection(direction) }))}>
                <option value="upward">Up ➚</option>
                <option value="downward">Down ➘</option>
              </Select>

              <Range min="1" max={density_('infinite')} step="1" value={density_(value.density)} onChange={e => updateOne(e.target.value, newD => ({ ...value, density: _density(newD) }))} />

              <Input value={value.label} placeholder="Label" onChange={e => updateOne(e.target.value, label => ({ ...value, label }))} />

              <ColorPicker color={value.color} onChange={e => updateOne(e.target.value, color => ({ ...value, color }))} />

              <BigButton onClick={e => updateOne(e, _ => null)}>🗑️</BigButton>
            </li>);
        })}
      </ul>
      <BigButton onClick={() => update(newData(definition))}>Add label</BigButton>
    </>
  );
}

function Range(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <RangeInput {...props} type="range"  />;
}

const RangeInput = styled.input`
  width: 10em;
  margin: -3.1px 0;
  background-color: transparent;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    background: rgba(72, 77, 77, 0.2);
    border: 0;
    width: 100%;
    height: 24.2px;
    cursor: pointer;
  }
  &::-webkit-slider-thumb {
    margin-top: 3.1px;
    width: 50px;
    height: 18px;
    background: rgba(255, 67, 95, 0.93);
    border: 0;
    border-radius: 1px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #545a5a;
  }
  &::-moz-range-track {
    background: rgba(72, 77, 77, 0.2);
    border: 0;
    width: 100%;
    height: 24.2px;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 50px;
    height: 18px;
    background: rgba(255, 67, 95, 0.93);
    border: 0;
    border-radius: 1px;
    cursor: pointer;
  }
  &::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 0 0;
    color: transparent;
    width: 100%;
    height: 24.2px;
    cursor: pointer;
  }
  &::-ms-fill-lower {
    background: #3c4040;
    border: 0;
  }
  &::-ms-fill-upper {
    background: rgba(72, 77, 77, 0.2);
    border: 0;
  }
  &::-ms-thumb {
    width: 50px;
    height: 18px;
    background: rgba(255, 67, 95, 0.93);
    border: 0;
    border-radius: 1px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
  }
  &:focus::-ms-fill-lower {
    background: rgba(72, 77, 77, 0.2);
  }
  &:focus::-ms-fill-upper {
    background: #545a5a;
  }
`;

const Input = styled.input`
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  width: 10em;
  border: none;
  border-radius: 0.4rem;
  outline: none;
`;

const Select = styled.select`
padding: 0.7em 1.4em;
margin: 0 0.3em 0.3em 0;
  width: 10em;
  border: none;
  border-radius: 0.4rem;
  outline: none;
`;

