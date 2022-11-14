
export default function writeData(inputs: string[], outputs: string[], transitions: string[]): string{

  let result = '';

  //write inputs
  result += '.inputs'
  inputs.forEach((input, index) => {
    if((index + 1) == inputs.length)
      result += ` ${input} \n`  
    else  
      result += ` ${input},`  
  })

  //write outputs
  result += '.outputs'
  outputs.forEach((output, index) => {
    if((index + 1) == outputs.length)
      result += ` ${output} \n`  
    else  
      result += ` ${output},`  
  })

  //write graph
  result += '.graph \n'

  //write transitions and marking
  transitions.forEach(transition => {
    result += `.${transition} \n` ;
  })

  //write end
  result += '.end'

  return result;

}