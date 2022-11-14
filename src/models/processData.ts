import Transition from "./transition";

export default interface ProcessData {
  transitions: Transition[],
  inputs: string[],
  outputs: string[]
}