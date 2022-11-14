export function writeGraphCode() {
  console.log(". graph")
}

export function writeInputCode(inputs:any) {
  const final_inputs = inputs.join(',')
  console.log(".inputs ",final_inputs)
}

export function writeOutputCode(outputs:any) {
  const final_outputs = outputs.join(',')
  console.log(".outputs ",final_outputs)
}
