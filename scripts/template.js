import t from 'tcomb';
const buildPropsTableRows = (props) =>
  Object.keys(props).map((key) => {
    const prop = props[key];
    return `| ${key} | ${prop.name} | ${t.stringify(prop.defaultValue || '')} | ${prop.description} |`;
  }).join('\n');


export default function template(data) {
  return (`
# ${data.name}

## ${data.description}

|Name|Type|Default|Description|
|----|----|-------|-----------|
${buildPropsTableRows(data.props)}

`);
}
