import t from 'tcomb';
import upperFirst from 'lodash/upperFirst';

const formatType = prop => {
  switch (prop.kind) {
    case 'enums':
      return `enum(${Object.keys(prop.map).map(key => `"${key}"`).join(' | ')})`;

    case 'union':
      return `union(${prop.types.map(formatType).join(' | ')})`;

    default:
      return prop.name;
  }
};

const cleanInvalidCharacters = string => {
  return string.replace(/\|/g, '&#124;');
};

const buildPropsTableRows = (props) => (
  Object.keys(props).map((key) => {
    const prop = props[key];

    const name = `**${key}**`;
    const type = `<code>${cleanInvalidCharacters(formatType(prop))}</code>`;
    const defaultValue = typeof prop.defaultValue !== 'undefined' ?
      `<code>${cleanInvalidCharacters(t.stringify(prop.defaultValue))}</code>` :
      '';
    const description = cleanInvalidCharacters(
      `${prop.required ? '**required**' : '*optional*'}. ${upperFirst(prop.description)}`
    );

    return `| ${name} | ${type} | ${defaultValue} | ${description} |`;
  }).join('\n')
);


export default function template(data) {
  return (
`# ${data.name}

${data.description}

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
${buildPropsTableRows(data.props)}`
);
}
