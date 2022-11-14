import type { Transition } from "#/models/transition"

export function processTransitionLine(line:string): Transition | null {
  let result = /[0-9] /.test(line)

  if (!result) {
    return null
  }

  let a = line.replace("[", "")
  let final_line = a.replace("]", "")

  const character = final_line.split(" ")
  let transition = {
    initialState: Number(line[0]),
    finalState: Number(line[2]),
    input: character[2],
    output: character[character.length-1],
  }

  return transition
}
