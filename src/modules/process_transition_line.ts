export function processTransitionLine(line:string){
  let result = /[0-9] /.test(line)

  if (!result) {
    return null
  }

  let a = line.replace("[", "")
  let final_line = a.replace("]", "")

  const character = final_line.split(" ")
  let transition = {
    initialState: line[0],
    finalState: line[2],
    input: character[2],
    output: character[character.length-1],
  }

  return transition
}
