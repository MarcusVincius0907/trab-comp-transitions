export function processOutputLine(line:string) {
  let result = /^output/.test(line)

  if (!result) {
    return null
  }

  const value = line.replace(/^output\s(\D{1})\s\w+$/, "$1")

  return value
}
