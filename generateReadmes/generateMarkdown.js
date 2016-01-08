/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function stringOfLength(string, length) {
  var newString = '';
  for (var i = 0; i < length; i++) {
    newString += string;
  }
  return newString;
}

function generateTitle(name) {
  var title = '`' + name + '` (component)';
  return title + '\n' + stringOfLength('=', title.length) + '\n';
}

function generateDesciption(description) {
  return description + '\n';
}

function generatePropType(type) {
  var values;
  if (Array.isArray(type.value)) {
    values = '(' +
      type.value.map(function(typeValue) {
        return typeValue.name || typeValue.value;
      }).join('&#124;') +
      ')';
  } else {
    values = type.value;
  }

  return '<code>' + type.name + (values ? values: '') + '</code>';
}

function generatePropDefaultValue(value) {
  return value.value ? '`' + value.value + '`' : '';
}

function generatePropDescription(propName, prop) {
  var prefix = (prop.required ? '**required**' : '*optional*');
  var desc;
  switch (propName) {
    case 'className':
      desc = 'additional `className` for wrapper element'
      break;
    case 'id':
      desc = 'custom `id` for wrapper element'
      break;
    case 'style':
      desc = 'inline-style overrides for wrapper element'
      break;
    default:
      desc = prop.description || '';
  }
  return [prefix, capitalize(desc)].join('. ').replace(/DEPRECATED/g, '**DEPRECATED**');
}

function generateProp(propName, prop) {
  var fields = [
    ('**' + propName + '**'),
    (prop.type ? generatePropType(prop.type) : ''),
    (prop.defaultValue ? generatePropDefaultValue(prop.defaultValue) : ''),
    generatePropDescription(propName, prop)
  ];
  return '|' + fields.join('|');
}

function generateProps(props) {
  var title = 'Props';

  return (
    title + '\n' +
    stringOfLength('-', title.length) + '\n' +
    '\n' +
    '|Name|Type|Default|Description' + '\n' +
    '|----|----|-------|-----------' + '\n' +
    Object.keys(props).map(function(propName) {
      return generateProp(propName, props[propName]);
    }).join('\n')
  );
}

function generateMarkdown(name, reactAPI) {
  var markdownString =
    generateTitle(name) + '\n' +
    generateDesciption(reactAPI.description) + '\n' +
    generateProps(reactAPI.props);

  return markdownString;
}

module.exports = generateMarkdown;
