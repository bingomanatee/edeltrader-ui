'use strict'

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const name = process.argv[2];

if (!name) {
  console.error('Please pass the name to this command');
  process.exit(1);
}

function ensureDir (filePath) {
  return new Promise((response, fail) => {
    const dirName = path.dirname(filePath);
    console.log(`checking directory ${dirName}`);
    fs.access(dirName, (err) => {
      if (err) {
        console.log(`making directory ${dirName}`);
        fs.mkdir(dirName, (err2) => {
          response();
        })
      } else {
        console.log(`already has a directory ${dirName}`)
        return response();
      }
    })
  })
}

const getTemplateFile = (name, type) => new Promise((resolve, fail) => {
  fs.readFile(`${__dirname}/_templates/${name}.template.${type}`, (err, content) => err ? fail(err) : resolve(content.toString()));
});

function makeView (vPath, err) {
  if (!err) {
    return console.error('Cannot make view ' + vPath + ': view file exists');
  }
  ensureDir(vPath)
    .then(() => getTemplateFile('view', 'js'))
    .then((content) => {
      fs.writeFile(vPath, content.replace(/ViewName/g, capName))
    })
}

function makeScss (sPath, err) {
  if (!err) {
    return console.error('Cannot make scss file ' + sPath + ': view file exists');
  }
  ensureDir(sPath)
    .then(() => getTemplateFile('scss', 'scss'))
    .then((content) => {
      fs.writeFile(sPath, content.replace(/ViewName/g, capName))
    })
}

console.log('name: ', name);

let capName = _.upperFirst(name);

let viewPath = `${__dirname}/src/views/${capName}/${capName}.view.jsx`;

fs.access(viewPath, (err) => makeView(viewPath, err));

let scssPath = `${__dirname}/src/views/${capName}/${capName}.module.scss`;

fs.access(scssPath, (err) => makeScss(scssPath, err));