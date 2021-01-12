## @superset-ui/plugin-chart-keplergl

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-keplergl.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-keplergl)

This plugin provides Keplergl for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to
lookup this chart throughout the app.

```js
import KeplerglChartPlugin from '@superset-ui/plugin-chart-keplergl';

new KeplerglChartPlugin().configure({ key: 'keplergl' }).register();
```

Then use it via `SuperChart`. See
[storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-keplergl) for
more details.

```js
<SuperChart
  chartType="keplergl"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```

### File structure generated

```
├── package.json
├── README.md
├── tsconfig.json
├── src
│   ├── Keplergl.tsx
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
