import React, { useCallback, useState } from 'react';

import rough from 'roughjs/bin/rough';
import styled from 'styled-components';

import { Data, Definition, density_ } from './definition';

type Props = {
  definition: Definition;
}

const width = 800,
  height = 600,
  padding = 10,
  axisFontSize = 35,
  titleFontSize = 70,
  labelFontSize = 25,
  graphPadding = 50;

const startX = padding + axisFontSize + graphPadding,
  startY = height - padding - axisFontSize - graphPadding,
  endX = width - padding - graphPadding,
  endY = titleFontSize + graphPadding + padding;

type Points = [number, number][]

// from 0 to 1 both in x and y
function plot(f: (i: number) => number, steps = 10): Points {
  let points: Points = [];
  for (let x = 0; x < 1; x += 1 / steps) {
    points.push([x, f(x)]);
  }
  return points;
}

function flip(yes: boolean, og: Points): Points {
  if (yes)
    return og.map(([x, y]) => [x, 1 - y]);
  return og
}

// Transform 0-1 coordinates to canvas
function stretch(og: Points): Points {
  const xFactor = (endX - startX),
    yFactor = (endY - startY);

  return og.map(([x, y]) => [startX + xFactor * x, startY + yFactor * y]);
}

// Generated by https://www.random.org/sequences/?min=-10&max=10&col=2&format=html&rnd=new
const offsets = [
  [-7, 1],
  [0, 7],
  [9, 10],
  [-9, 5],
  [4, -3],
  [3, -8],
  [2, -4],
  [-2, -5],
  [6, 8],
  [-6, -1]
];

function offset(index: number, og: Points): Points {
  const [offX, offY] = offsets[index % offsets.length];
  return og.map(([x, y]) => [x + offX, y + offY]);
}

function pointsFrom(data: Data, index: number): [number, number][] {
  return offset(index, stretch(flip(data.direction === 'downward', plot(representation(data.form), density_(data.density)))));
}

// https://www.wolframalpha.com/input/?i=plot+1+%2F+%281%2B%285*%28x-1%2F2%29%29+**+2%29**%283%2F2%29%2C+x%3D0..1%2C+y%3D0..1
function representation(form: Data["form"]): (x: number) => number {
  switch (form) {
    case 'linear': return x => x;
    case 'bell': return x => 1 / (1 + (5 * (x - 1 / 2)) ** 2) ** (3 / 2);
    case 'exp': return x => x ** 5;
    case 'log': return x => x ** (1 / 5);
    case 'horizontal': return _ => 1;
    default: return () => 1;
  }
}


export default function Graph({ definition }: Props) {
  const [src, setSrc] = useState();

  const canvas = useCallback(node => {
    if (node !== null) {
      const ctx = node.getContext('2d');
      ctx.clearRect(0, 0, node.width, node.height);

      if (definition.title) {
        ctx.textAlign = "center";
        ctx.font = `${titleFontSize}px 'Indie Flower'`;
        ctx.fillText(definition.title, width / 2, titleFontSize);
      }

      if (definition.yAxis) {
        const x = padding;
        const y = height / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 2);

        ctx.textAlign = "center";
        ctx.font = `${axisFontSize}px 'Indie Flower'`;
        ctx.fillText(definition.yAxis, 0, axisFontSize / 2);

        ctx.restore();
      }

      if (definition.xAxis) {
        ctx.textAlign = "center";
        ctx.font = `${axisFontSize}px 'Indie Flower'`;
        ctx.fillText(definition.xAxis, width / 2, height - padding);
      }

      const rc = rough.canvas(node);
      // Vertical axis line
      rc.line(padding + axisFontSize, padding, padding + axisFontSize, height - padding);
      rc.line(padding + axisFontSize, padding + 10, padding + axisFontSize + 10, padding + 20);
      rc.line(padding + axisFontSize, padding + 10, padding + axisFontSize - 10, padding + 20);

      // Horizontal axis line
      rc.line(padding, height - (axisFontSize + padding), width - padding, height - (axisFontSize + padding));
      rc.line(width - padding - 10, height - (axisFontSize + padding), width - padding - 20, height - (axisFontSize + padding) + 10);
      rc.line(width - padding - 10, height - (axisFontSize + padding), width - padding - 20, height - (axisFontSize + padding) - 10);


      // Graph

      definition.data.forEach((data, index) => {
        const p = pointsFrom(data, index),
              d = data.density;
        if (d === 'infinite') {
          rc.curve(p, { stroke: data.color });
        } else {
          const width = (endX - startX) / d - padding,
          axisY = height - axisFontSize - padding;

          p.forEach(([x, y]) => {
            rc.rectangle(x, y, width, axisY - y, { fill: data.color });
          });
        }
      });

      definition.data
        .filter(data => Boolean(data.label))
        .forEach((data, index) => {
          const y = padding + titleFontSize + index * (labelFontSize + padding);
          rc.rectangle(padding + axisFontSize + 20, y, 10, 10, { fill: data.color, fillStyle: 'cross-hatch' });
          ctx.textAlign = "left";
          ctx.font = `${labelFontSize}px 'Indie Flower'`;
          ctx.fillText(data.label, padding + axisFontSize + padding + 20 + 10, y + labelFontSize / 2);
        })


      setSrc(node.toDataURL());
    }
  }, [definition]);
  return (
    <Center>
      <div style={{ fontFamily: 'Indie Flower' }}>&nbsp;</div> {/* Preload */}
      <canvas style={{ display: 'none' }} ref={canvas} width={width} height={height} />
      <img src={src} alt="Graphz!" width={width} height={height} />
    </Center>
  );
}

const Center = styled.div`
  text-align: center;
`;