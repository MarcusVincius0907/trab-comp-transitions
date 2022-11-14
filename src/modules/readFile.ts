import fs from "fs/promises";
import ProcessData from "../models/processData";
import Transition from "../models/transition";

export async function syncReadFile(): Promise<ProcessData> {
  const data = await fs.readFile("./code.txt", { encoding: "utf8" });

  const inputs: Array<string> = [];
  const outputs: Array<string> = [];
  const allTransitions: Array<Transition> = [];

  const lines = data.split(/\r?\n/);
  lines.forEach(function (line: string) {
    const transition = processLine(line, inputs, outputs);

    if (transition == null) {
      return;
    }

    allTransitions.push(transition);
  });

  return { transitions: allTransitions, inputs, outputs}

}

function processLine(line: string, inputs: Array<string>, outputs: Array<string>): Transition | null {
  let processed;

  processed = processInputLine(line, inputs);

  if (processed) {
    return null;
  }

  processed = processOutputLine(line, outputs);

  if (processed) {
    return null;
  }

  return processTransitionLine(line);
}

function processInputLine(line: string, inputs: Array<string>): boolean {
  const result = line.match(/^input/i);

  if (result == null) {
    return false;
  }

  const regexResult = line.match(/ [a-z]* ?/i);

  if (regexResult == null) {
    throw new Error("processOutputLine regexResult null");
  }

  const input = regexResult[0].replace(/ /g, "");

  inputs.push(input);

  return true;
}

function processOutputLine(line: string, outputs: Array<string>): boolean {
  const result = line.match(/^output/i);

  if (result == null) {
    return false;
  }

  const regexResult = line.match(/ [a-z]* ?/i);

  if (regexResult == null) {
    throw new Error("processOutputLine regexResult null");
  }

  const output = regexResult[0].replace(/ /g, "");

  outputs.push(output);

  return true;
}

function processTransitionLine(line: string): Transition | null {
  const result = line.match(/^[0-9]* [0-9]*/);

  if (result == null) {
    return null;
  }

  const steps = result[0].split(" ");

  const initialState = Number(steps[0]);
  const finalState = Number(steps[1]);

  const [inputsStr, outputsStr] = line
    .replace(/[\d[\]]/gi, "")
    .split("|")
    .map(str => str.trim());

  const inputs = inputsStr.split(" ");
  const outputs = outputsStr.split(" ");

  return {
    initialState,
    finalState,
    inputs,
    outputs,
  };
}