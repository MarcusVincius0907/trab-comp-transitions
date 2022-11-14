export function processInputLine(line:string) {
  let result = /^input/.test(line)

  if (!result) {
    return null
  }

  const value = line.replace(/^input\s(\D{1})\s\w+$/, "$1")

  return value
}
