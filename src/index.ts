import Transition from "./models/transition";
import { decision as mock } from "./data/mockData";

const result: Array<string> = [];

let partitionNumber = 1;

const transitions: Transition[] = mock;

const firstState = transitions[0].initialState;

const {branches, index} = searchForBranches(transitions);
const flow: Transition[] = transitions.slice(0, index);

branches.forEach(transition => {
  let finish = false;
  let current = transition;
  while(!finish){
    let next = transitions.find(el => current.finalState === el.initialState);
    if(!next){
      finish = true
    }else if(next && current.initialState == 0){
      finish = true;
    }
    else{
      flow.push(current);
      current = next;
    }
   
    
  }
})


flow.forEach((transition: Transition) => {
  result.push(`p${partitionNumber} ${transition.input}`);
  result.push(`${transition.input} p${partitionNumber + 1}`);
  result.push(`p${partitionNumber + 1} ${transition.output}`);

  if (transition.finalState === firstState)
    result.push(`${transition.output} p${1} `);
  else result.push(`${transition.output} p${partitionNumber + 2}`);

  partitionNumber += 2;
});

function searchForBranches(transitions: Transition[]){

  const branches: Transition[] = []
  let index = transitions.length;

  for(let i = 0; i < transitions.length; i++){
    for(let j = i + 1; j < transitions.length - i; j++){
      if(transitions[i].initialState === transitions[j].initialState){
        branches.push(transitions[j], transitions[i])
        index = i
      }
    }
  }

  return {branches, index};
}

console.log(result);
