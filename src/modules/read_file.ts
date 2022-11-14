import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function syncReadFile(filename: string) {
  const result = readFileSync(join(process.cwd(), filename), 'utf-8');

  let a = result.replace("[", "")
  let final_line = a.replace("]", "")

  const character = final_line.split(" ")

  let transition = {
    initialState: Number(result[0]),
    finalState: Number(result[2]),
    input: character[2],
    output: character[character.length-1],
  }
  return transition;
}
