import t from 'tcomb';
const buildPropsTableRows = (props) => (
  Object.keys(props).map((key) => {
    const prop = props[key];

    const name = key;
    const type = prop.kind === 'enums' ?
      JSON.stringify(Object.keys(prop.map)) :
      prop.name;
    const defaultValue = typeof prop.defaultValue !== 'undefined' ? prop.defaultValue : '';
    const description = prop.description;

    return `| ${name} | ${type} | ${t.stringify(defaultValue)} | ${description} |`;
  }).join('\n')
);


export default function template(data) {
  return (
`# ${data.name}

## ${data.description}

|Name|Type|Default|Description|
|----|----|-------|-----------|
${buildPropsTableRows(data.props)}`
);
}
