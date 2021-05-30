import styled from 'styled-components';
import ColorPicker from './ColorPicker';

import { Data, Definition, newData, toDirection, toForm } from './definition';
import { color } from './GlobalStyle';

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
      <ul>
        <Input label="Title" value={definition.title} onChange={(e) => update({ ...definition, title: e.target.value })} />
        <br />

        <label>
          Horizontal axis:
          <input value={definition.xAxis} onChange={(e) => update({ ...definition, xAxis: e.target.value })} />
        </label>
        <br />

        <label>
          Vertical axis:
          <input value={definition.yAxis} onChange={(e) => update({ ...definition, yAxis: e.target.value })} />
        </label>
        <br />

        {definition.data.map((value, key) => {
          function updateOne<T>(target: T, f: (newVal: T, og: Data) => (Data | null)): void {
            update({
              ...definition,
              data: definition.data.map((val, index) => index === key ? f(target, val) : val).filter(notEmpty)
            });
          }

          return (
            <li key={`label-${key}`}>
              <input value={value.label} placeholder="Label" onChange={e => updateOne(e.target.value, label => ({ ...value, label }))} />

              <select value={value.direction} onChange={e => updateOne(e.target.value, direction => ({ ...value, direction: toDirection(direction) }))}>
                <option value="upward">Up ➚</option>
                <option value="downward">Down ➘</option>
              </select>

              <select value={value.form} onChange={e => updateOne(e.target.value, form => ({ ...value, form: toForm(form) }))}>
                <option value="linear">Linear</option>
                <option value="bell">Bell</option>
                <option value="exp">Exponential</option>
                <option value="log">Logarithmic</option>
              </select>

              <ColorPicker color={value.color} onChange={e => updateOne(e.target.value, color => ({ ...value, color }))} />

              <button onClick={e => updateOne(e, _ => null)}>🗑️</button>
            </li>);
        })}
      </ul>
      <button onClick={() => update(newData(definition))}>Add label</button>
    </>
  );
}

function Input(props) {
  const { label, ...rest } = props;
  return (
    <Wrapper>
      <InputField {...rest} placeholder={label} name="name" id='name' />
      <Label htmlFor='name'>{label}</Label>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: ${color};
`;

const InputField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid ${color};
  outline: 0;
  font-size: 1.3rem;
  color: ${color};
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  &:required,&:invalid { box-shadow:none; }

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ ${Label} {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    ~ ${Label} {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #db7093;
      font-weight:700;    
    }
    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #db7093, #fd1bf9);
    border-image-slice: 1;
  }
`;
