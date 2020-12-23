## @superset-ui/plugin-chart-traicon-map

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-traicon-map.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-traicon-map)

This plugin provides Traicon Map for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to
lookup this chart throughout the app.

```js
import TraiconMapChartPlugin from '@superset-ui/plugin-chart-traicon-map';

new TraiconMapChartPlugin().configure({ key: 'traicon-map' }).register();
```

Then use it via `SuperChart`. See
[storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-traicon-map)
for more details.

```js
<SuperChart
  chartType="traicon-map"
  width={600}
  height={600}
  formData={...}
  queryData={{
    data: {...},
  }}
/>
```

### File structure generated

```
├── package.json
├── README.md
├── tsconfig.json
├── src
│   ├── TraiconMap.tsx
│   ├── images
│   │   └── thumbnail.png
│   ├── index.ts
│   ├── plugin
│   │   ├── buildQuery.ts
│   │   ├── controlPanel.ts
│   │   ├── index.ts
│   │   └── transformProps.ts
│   └── types.ts
├── test
│   └── index.test.ts
└── types
    └── external.d.ts
```
