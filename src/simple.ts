import Transition from "./models/transition";
import { simple as mock } from "./data/mockData";
import { processInputLine } from "./modules/process_input_line";
import { syncReadFile } from "./modules/read_file";
import { processOutputLine } from "./modules/process_output_line";
import { writeInputCode } from "./modules/write_code/write_input_code";
import { writeOutputCode } from "./modules/write_code/write_output_code";
import { writeGraphCode } from "./modules/write_code/write_graph_code";

const result: Array<string> = [];

let partitionNumber = 1;

const transitions: Transition[] = mock;

const firstState = transitions[0].initialState;

let file = syncReadFile("./code.txt").split("\n")

const processedLine = file.map((line)=> {
  processInputLine(line)
  processOutputLine(line)
  return { inputs:processInputLine(line), outputs:processOutputLine(line)}
}).filter(Boolean)

const items = processedLine
  .map((item) => {
    if (item.inputs) {
      return item
    }
    if (item.outputs) {
      return item
    }

    return null
  })
  .filter(Boolean)
  .reduce(
    (total:any, item:any) => {
      total = {
        inputs: [...total.inputs, item.inputs].filter(Boolean),
        outputs: [...total.outputs, item.outputs].filter(Boolean)
      }
      return total
    },
    { inputs: [], outputs: [] }
  )

  writeInputCode(items.inputs)
  writeOutputCode(items.outputs)
  writeGraphCode()

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
