import fs from 'fs';
import t from 'tcomb';
import { toObject } from 'tcomb-doc';
import parseComments from 'get-comments';
import { parse as parseJSDocs } from 'doctrine';

// (path: t.String) => { description: t.String, tags: Array<Tag> }
function getComments(path) {
  const source = fs.readFileSync(path, 'utf8');
  const comments = parseComments(source, true);
  const values = comments.map((comment) => {
    return comment.value;
  });
  return parseJSDocs(values.join('\n'), { unwrap: true });
}

// (comments: t.Object) => { component, props: {} }
function getDescriptions(comments) {
  const ret = {
    component: comments.description || null,
    props: {
      className: 'additional `className` for wrapper element',
      id: 'custom `id` for wrapper element',
      style: 'inline-style overrides for wrapper element'
    }
  };
  comments.tags.forEach((tag) => {
    if (tag.name) {
      ret.props[tag.name] = tag.description || null;
    }
  });
  return ret;
}

// (exports: t.Object) => ReactComponent
function getComponent(defaultExport) {
  const def = defaultExport['default'] || defaultExport; // eslint-disable-line dot-notation
  return def.propTypes ? def : null;
}

// (component: ReactComponent) => t.String
function getComponentName(component) {
  return component.name;
}

// (component: ReactComponent) => TcombType
function getPropsType(component) {
  const propTypes = component.propTypes;
  const props = Object.keys(propTypes).reduce((acc, prop) => {
    if (prop !== '__strict__' && prop !== '__subtype__') {
      acc[prop] = propTypes[prop].tcomb;
    }
    return acc;
  }, {});
  if (propTypes.hasOwnProperty('__subtype__')) {
    return t.refinement(t.struct(props), propTypes.__subtype__.predicate);
  }
  return t.struct(props);
}

// (component: ReactComponent) => t.Object
function getDefaultProps(component) {
  return component.defaultProps || {};
}

// (path: t.String) => { name, description, props }
export default function parse(path) {
  if (t.Array.is(path)) {
    return path.map(parse).filter(Boolean);
  }

  const component = getComponent(require(path));
  if (component) {
    const comments = getComments(path);
    const descriptions = getDescriptions(comments);
    const type = toObject(getPropsType(component));
    const props = type.kind === 'refinement' ? type.type.props : type.props;
    const defaultProps = getDefaultProps(component);
    const name = getComponentName(component);
    const propsSchema = Object.keys(props).reduce((acc, prop) => {
      if (!descriptions.props.hasOwnProperty(prop)) {
        throw new Error(`Missing description for prop '${prop}' in '${name}'.`);
      }
      if (props.hasOwnProperty(prop)) {
        if (defaultProps.hasOwnProperty(prop)) {
          acc[prop].defaultValue = defaultProps[prop];
        }
        acc[prop].description = descriptions.props[prop];
      }
      return acc;
    }, props);

    return {
      name,
      description: descriptions.component,
      props: propsSchema
    };
  }
}
