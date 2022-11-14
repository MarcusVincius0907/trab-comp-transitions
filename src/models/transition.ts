export default interface Transition {
  initialState: number;
  finalState: number;
  inputs: Array<string>;
  outputs: Array<string>;
  flowPosition?: number;
}


