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
import { KeplerglProps, KeplerglStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

// For Kepler.gl Reducer settings
import keplerGlReducer, { uiStateUpdaters } from 'kepler.gl/reducers';
import { addDataToMap } from 'kepler.gl/actions';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { taskMiddleware } from 'react-palm/tasks';
import KeplerGl from 'kepler.gl';

const reducers = combineReducers({
  keplerGl: keplerGlReducer.initialState({
    uiState: { readOnly: true },
  }),
  // app: appReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

const Styles = styled.div<KeplerglStylesProps>`
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

export default function Keplergl(props: KeplerglProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);

    store.dispatch(
      addDataToMap({
        // datasets
        datasets: {
          info: {
            label: 'Sample Taxi Trips in New York City',
            id: 'test_trip_data',
          },
          data: data,
        },
        // option
        option: {
          centerMap: true,
          readOnly: false,
        },
        // config
        config: {
          mapStyle: { styleType: 'light' },
        },
      }),
    );
  });

  console.log('Plugin props', props);

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <Provider store={store}>
        <KeplerGl
          id="foo"
          mapboxApiAccessToken="pk.eyJ1IjoibXRqIiwiYSI6ImNranJmZHV4dTF2NjYyenFwOXI2Y29xNjQifQ.KVCNJYBjjtEXMWJO81QzHQ"
          width={width}
          height={height}
        />
      </Provider>

      <h3>{props.headerText}</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    </Styles>
  );
}
