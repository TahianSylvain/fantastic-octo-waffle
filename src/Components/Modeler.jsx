import React, { useRef } from 'react';
// import { Modeler } from 'bpmn-js';

// import BpmnFlow from 'bpmn-flow';

// import BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
//import BpmnJSDev from 'bpmn-js/dist/bpmn-modeler.development.min.js';


// export const ModelerComponent = async () => {
//   // const flowRef = useRef(null) {/* <BpmnFlow ref={flowRef} />  */}

//   const modeler = new Modeler({ container: '#my-diagram-container' });
  
//   // attach it to some element
//   modeler.attachTo('#attach')

//   return <div id='chart-modeler'>
//     <div id="attach"></div>
//   </div>    
// }
   
{/* import BpmnModdle from 'bpmn-moddle';

const moddle = new BpmnModdle();

const xmlStr =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                     'id="empty-definitions" ' +
                     'targetNamespace="http://bpmn.io/schema/bpmn">' +
  '</bpmn2:definitions>';


const {
  rootElement: definitions
} = await moddle.fromXML(xmlStr);

// update id attribute
definitions.set('id', 'NEW ID');

// add a root element
const bpmnProcess = moddle.create('bpmn:Process', { id: 'MyProcess_1' });
definitions.get('rootElements').push(bpmnProcess);

// xmlStrUpdated contains new id and the added process
const {
  xml: xmlStrUpdated
} = await moddle.toXML(definitions);*/}