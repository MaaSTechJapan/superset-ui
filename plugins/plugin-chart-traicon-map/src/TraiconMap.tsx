/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { TraiconMapProps, TraiconMapStylesProps } from './types';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { H3HexagonLayer } from '@deck.gl/geo-layers';

const h3index_sample = [
  {
    hexagon_id: '8a2f5aade427fff',
    value: 70,
    timestamp: 1602534533,
  },
  {
    hexagon_id: '8a2f5aade407fff',
    value: 40,
    timestamp: 1602534533,
  },
  {
    hexagon_id: '8a2f5aade40ffff',
    value: 30,
    timestamp: 1602534533,
  },
  {
    hexagon_id: '8a2f5aade477fff',
    value: 65,
    timestamp: 1602534533,
  },
  {
    hexagon_id: '8a2f5aade55ffff',
    value: 23,
    timestamp: 1602534533,
  },
];
// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibXRqIiwiYSI6ImNrZ3FnaDI1YjFtdWwzOXJ4bDNuZmg4bHIifQ.tJsDnE41qhuG7--2OO8Zxg';

const Styles = styled.div<TraiconMapStylesProps>`
  background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow-y: scroll;

  h3 {
    /* You can use your props to control CSS! */
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]};
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 139.76252,
  latitude: 35.675372,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

export default function TraiconMap(props: TraiconMapProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();

  const hexLayer = new H3HexagonLayer({
    data: h3index_sample,
    id: 'h3-hexagon-layer',
    // data: layer_data[i].url,
    pickable: true,
    wireframe: false,
    filled: true,
    extruded: false,
    stroked: true,
    lineWidthScale: 0.1,
    coverage: 0.97,
    getLineColor: d => {
      return [0, 0, 0, 50];
    },
    lineWidthMinPixels: 1,
    opacity: 0.7,
    elevationScale: 0,
    getLineWidth: 10,
    getHexagon: d => {
      return d.hexagon_id;
    },
    getFillColor: d => {
      return [228, 0, 79];
    },
    getElevation: d => d.value,
  });

  // Data to be used by the LineLayer

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  const layers = [hexLayer];

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
        <StaticMap
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mtj/ckgrbj17102x119ob0l92j77t"
          attributionControl={false}
        />
      </DeckGL>
      <h3>{props.headerText}</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    </Styles>
  );
}
