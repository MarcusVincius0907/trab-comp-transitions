import processData from './modules/processData'
import { syncReadFile } from './modules/readFile'
import writeData from './modules/writeData'

async function main(){

  const dataFromFile = await syncReadFile()
  const data = processData(dataFromFile.transitions)
  const outputCode = writeData(dataFromFile.inputs, dataFromFile.outputs, data )
  console.log(outputCode)

}


main()
