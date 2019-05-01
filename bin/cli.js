#!/usr/bin/env node
const path = require('path');
const fileSystem = require('file-system');
const fs = require('fs');
const currentPath = path.resolve('.');


function getOperationId(){
  const exampleJson = require(`${currentPath}\/example.json`);
  return exampleJson.map((e)=>e.operationId);
}

function updateControllersExport(operationIds){
  const controllerPath = `${currentPath}\/controllers`;

  operationIds.forEach((e, i) => {
    fileSystem.recurse(controllerPath, ['*.js'], (filepath, reference, filename)=>{
      fs.readFile(`${controllerPath}\/${filename}`, 'utf-8', (err, data)=>{
        console.log(e);
        const regex = new RegExp(`(${e})`, 'i');
        const match = regex.exec(data);
        
        if(match){
          const newData = data.replace(regex, e);
          console.log(newData, i);
          // fs.writeFile(`${controllerPath}\/newFile.js`, newData, (err)=>{
          //   if (err) throw err;
          // })
        }else{
          return;
        }
      });
    });    
  });
}


function init(){
  const data = getOperationId();
  updateControllersExport(data); 
}

init();
