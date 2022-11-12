import { processInputLine } from "./modules/process_input_line";
import { syncReadFile } from "./modules/read_file";
import { processOutputLine } from "./modules/process_output_line";
import { writeGraphCode, writeInputCode, writeOutputCode } from "./modules/write_code/write_code";
import { processTransitionLine } from "./modules/process_transition_line";

const result: Array<string> = [];

let partitionNumber = 1;

let file = syncReadFile("./code.txt").split("\n")

const processedLine = file.map((line)=> {

  return {
    inputs:processInputLine(line),
    outputs:processOutputLine(line),
    transitions:processTransitionLine(line)
  }
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

  const x = processedLine.map((process)=>{
    return process.transitions
  }).filter(Boolean)

x.forEach((transition) => {
  result.push(`p${partitionNumber} ${transition?.input}`);
  result.push(`${transition?.input} p${partitionNumber + 1}`);
  result.push(`p${partitionNumber + 1} ${transition?.output}`);

  if (transition?.finalState === transition?.initialState)
    result.push(`${transition?.output} p${1} `);
  else result.push(`${transition?.output} p${partitionNumber + 2}`);

  partitionNumber += 2;
});

console.log(result);
