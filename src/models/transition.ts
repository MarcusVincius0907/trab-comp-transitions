export default interface Transition {
  initialState: number;
  finalState: number;
  input: string;
  output: string;
  flowPosition?: number;
}
