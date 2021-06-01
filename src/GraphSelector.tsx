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

              <input type="range" min="1" max={density_('infinite')} value={density_(value.density)} onChange={e => updateOne(e.target.value, newD => ({ ...value, density: _density(newD) }))} step="1" />

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

