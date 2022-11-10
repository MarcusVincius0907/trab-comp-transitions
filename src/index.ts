import Transition from "./models/transition";
import { transitions as mock } from "./data/mockData";

const result: Array<string> = [];

let partitionNumber = 1;

const transitions: Transition[] = mock;

const firstState = transitions[0].initialState;

transitions.forEach((transition: Transition) => {
  result.push(`p${partitionNumber} ${transition.input}`);
  result.push(`${transition.input} p${partitionNumber + 1}`);
  result.push(`p${partitionNumber + 1} ${transition.output}`);

  if (transition.finalState === firstState)
    result.push(`${transition.output} p${1} `);
  else result.push(`${transition.output} p${partitionNumber + 2}`);

  partitionNumber += 2;
});

console.log(result);
