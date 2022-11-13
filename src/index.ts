import Transition from "./models/transition";
import FlowType from "./models/flowType";
import { decision as mock } from "./data/mockData";

const result: Array<string> = [];

const transitions: Transition[] = mock;

const firstState = transitions[0].initialState;

let flowType = FlowType.SIMPLE;

const { branches, index } = searchForBranches(transitions);
const flow: Transition[] = transitions.slice(0, index);

if (branches.length > 1) {
  flowType = FlowType.DECISION;
}

let partitionNumber = 1;

if (flowType === FlowType.SIMPLE) {
  transitions.forEach((transition: Transition) => {
    result.push(`p${partitionNumber} ${transition.input}`);
    result.push(`${transition.input} p${partitionNumber + 1}`);
    result.push(`p${partitionNumber + 1} ${transition.output}`);

    if (transition.finalState === firstState)
      result.push(`${transition.output} p${1} `);
    else result.push(`${transition.output} p${partitionNumber + 2}`);

    partitionNumber += 2;
  });
} else if (flowType === FlowType.DECISION) {
  let flowCounter = 1;
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
        flowCounter++;
        current = next;
      }
    }
  });

  flow.map((transition, index) => (transition.flowPosition = index + 1));

  let positionOfDecision = index + 1;
  let endingPosition = flow.length;
  let lastPartitionNumber: number = 0;
  let secondDecision = false;

  flow.forEach((transition: Transition) => {
    if (transition.flowPosition) {
      if (transition.flowPosition === 1) {
        result.push(`${transition.input} p${partitionNumber}`);
        result.push(`p${partitionNumber} ${transition.output}`);
        result.push(`${transition.output} p${partitionNumber + 1}`);
        partitionNumber += 1;
      } else {
        if (secondDecision) {
          result.push(`p${partitionNumber} ${transition.input}`);
          partitionNumber = lastPartitionNumber;
          secondDecision = false;
        } else {
          result.push(`p${partitionNumber} ${transition.input}`);
        }
        result.push(`${transition.input} p${partitionNumber + 1}`);
        result.push(`p${partitionNumber + 1} ${transition.output}`);
        if (transition.flowPosition === endingPosition) {
          result.push(`${transition.output} p${lastPartitionNumber}`);
        } else result.push(`${transition.output} p${partitionNumber + 2}`);
        if (
          transition.finalState === firstState &&
          !(transition.flowPosition === endingPosition)
        ) {
          let firstInput = transitions[0].input;
          result.push(`p${partitionNumber + 2} ${firstInput}`);
          lastPartitionNumber = partitionNumber + 2;
          secondDecision = true;
          partitionNumber = positionOfDecision;
        } else partitionNumber += 2;
      }
    }
  });
}

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

console.log(result);
