import Transition from "../models/transition";
import FlowType from "../models/flowType";

export default function processData(fileData: Transition[]){

  let result: Array<string> = [];
  const transitions: Transition[] = fileData;
  let flowType = FlowType.SIMPLE;
  const { branches, index } = searchForBranches(transitions);
  const flow: Transition[] = transitions.slice(0, index);

  if (branches.length > 1) {
    flowType = FlowType.DECISION;
  }

  if (isConcurrenceLine(transitions)) {
    flowType = FlowType.CONCURRENCE
  }

  if (flowType === FlowType.SIMPLE) {
    result = simpleFlow(transitions);
  } else if (flowType === FlowType.DECISION) {
    result = decisionFlow(transitions, branches, index, flow);
  } else if (flowType === FlowType.CONCURRENCE) {
    result = concurrenceFlow(transitions)
  }

  return result;

}


/**
 * It will look for branches in order to check if it is decision type
 *
 * @param transitions - transitions from file
 *
 * @returns an array of string for output
 *
**/
function searchForBranches(transitions: Transition[]) {
  const branches: Transition[] = [];
  let index = transitions.length;

  for (let i = 0; i < transitions.length; i++) {
    for (let j = i + 1; j < transitions.length - i; j++) {
      if (transitions[i].initialState === transitions[j].initialState) {
        branches.push(transitions[j], transitions[i]);
        index = i;
      }
    }
  }

  return { branches, index };
}
/**
 * This is for the simple example
 *
 * @param transitions - transitions from file
 *
 * @returns an array of string for output
 *
**/
function simpleFlow(transitions: Transition[]): Array<string>{

  let partitionNumber = 1;
  const result: Array<string> = [];
  const firstState = transitions[0].initialState;

  transitions.forEach((transition: Transition) => {
    result.push(`p${partitionNumber} ${transition.inputs[0]}`);
    result.push(`${transition.inputs[0]} p${partitionNumber + 1}`);
    result.push(`p${partitionNumber + 1} ${transition.outputs[0]}`);

    if (transition.finalState === firstState){
      result.push(`${transition.outputs[0]} p${1} `);
      result.push(`marking{p${1}}`);
    }
    else result.push(`${transition.outputs[0]} p${partitionNumber + 2}`);

    partitionNumber += 2;
  });

  return result;
}

/**
 * This is for the decision example
 *
 * @param transitions - transitions from file
 * @param branches - from searchForBranches
 * @param branchIndex - from searchForBranches
 * @param flow - used to create a logic flow from transitions
 *
 * @returns an array of string for output
 *
**/
function decisionFlow(transitions: Transition[], branches: Transition[], branchIndex: number , flow: Transition[]): Array<string>{
  const result: Array<string> = [];
  let partitionNumber = 1;
  const firstState = transitions[0].initialState;

  branches.forEach((transition) => {
    let finish = false;
    let current = transition;
    while (!finish) {
      let next = transitions.find(
        (el) => current.finalState === el.initialState
      );
      if (!next) {
        finish = true;
      } else if (next && current.initialState == 0) {
        finish = true;
      } else {
        flow.push(current);
        current = next;
      }
    }
  });

  flow.map((transition, index) => (transition.flowPosition = index + 1));

  let positionOfDecision = branchIndex + 1;
  let endingPosition = flow.length;
  let lastPartitionNumber: number = 0;
  let secondDecision = false;

  flow.forEach((transition: Transition) => {
    if (transition.flowPosition) {
      if (transition.flowPosition === 1) {
        result.push(`${transition.inputs[0]} p${partitionNumber}`);
        result.push(`p${partitionNumber} ${transition.outputs[0]}`);
        result.push(`${transition.outputs[0]} p${partitionNumber + 1}`);
        partitionNumber += 1;
      } else {
        if (secondDecision) {
          result.push(`p${partitionNumber} ${transition.inputs[0]}`);
          partitionNumber = lastPartitionNumber;
          secondDecision = false;
        } else {
          result.push(`p${partitionNumber} ${transition.inputs[0]}`);
        }
        result.push(`${transition.inputs[0]} p${partitionNumber + 1}`);
        result.push(`p${partitionNumber + 1} ${transition.outputs[0]}`);
        if (transition.flowPosition === endingPosition) {
          result.push(`${transition.outputs[0]} p${lastPartitionNumber}`);
        } else result.push(`${transition.outputs[0]} p${partitionNumber + 2}`);
        if (
          transition.finalState === firstState &&
          !(transition.flowPosition === endingPosition)
        ) {
          let firstInput = transitions[0].inputs[0];
          result.push(`p${partitionNumber + 2} ${firstInput}`);

          lastPartitionNumber = partitionNumber + 2;
          secondDecision = true;
          partitionNumber = positionOfDecision;
        } else partitionNumber += 2;
      }
    }
  });

  result.push(`marking{p${endingPosition + 1}}`);

  return result;
}

function concurrenceFlow(transitions: Transition[]): Array<string>{
  const result: Array<string> = [];
  let partitionNumber = 1
  let lastPosition = 0

  transitions?.forEach((transition, index, array) => {
    if (transition.outputs.length > 1) {
      result.push(`${transition.inputs[0]} p${partitionNumber}`)
      result.push(`${transition.inputs[0]} p${partitionNumber + 1}`)
      result.push(`p${partitionNumber} ${transition.outputs[0]}`)
      result.push(`p${partitionNumber + 1} ${transition.outputs[1]}`)
      result.push(`${transition.outputs[0]} p${partitionNumber + 2}`)
      result.push(`${transition.outputs[1]} p${partitionNumber + 3}`)
      result.push(`p${partitionNumber + 2} ${array[index+1].inputs[0]}`)
      partitionNumber += 3
    } else if (transition.inputs.length > 1){
      result.push(`p${partitionNumber} ${transition.inputs[0]}`)
      result.push(`p${partitionNumber + 1} ${transition.inputs[1]}`)
      result.push(`${transition.inputs[0]} p${partitionNumber  + 2}`)
      result.push(`${transition.inputs[1]} p${partitionNumber + 3}`)
      result.push(`p${partitionNumber + 2} ${transition.outputs[0]}`)
      result.push(`p${partitionNumber + 3} ${transition.outputs[0]}`)
      result.push(`${transition.outputs[0]} p${partitionNumber + 4}`)
      lastPosition = partitionNumber + 4
      partitionNumber += 3
    } else {
      result.push(`p${partitionNumber} ${transition.inputs[0]}`)
      result.push(`${transition.inputs[0]} p${partitionNumber + 1}`)
      result.push(`p${partitionNumber + 1} ${transition.outputs[0]}`)
      result.push(`${transition.outputs[0]} p${partitionNumber + 2}`)
      result.push(`${transition.outputs[0]} p${partitionNumber + 3}`)
      partitionNumber += 2
    }
  })

  result.unshift(`p${lastPosition} ${transitions[0].inputs[0]}`)
  result.push(`marking{${lastPosition}}`)

  return result
}

function isConcurrenceLine(transitions:Transition[]) {
  let isConcurrence = false
  transitions.forEach((transition) => {
    if (transition.inputs.length > 1 || transition.outputs.length > 1) {
      isConcurrence = true
    }
  })
  return isConcurrence
}
