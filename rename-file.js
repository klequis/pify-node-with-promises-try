const fs = require('fs')
const pify = require('pify')

const fsp = pify(fs)
const path = require('path')

/*
- originalFullFileName
- newFullFileName
- fileExists(originalFullFileName)
  * if false ?


*/


console.log('hi from rename-file.js')

const fileExists = async (fullFileName) => {
  try {
    await fsp.stat(fullFileName)
    return true
  }
  catch (e) {
    return false
  }
}



const renameFile = async (oldName, newName) => {
  try {
    const d = await fsp.rename(oldName, newName)
    // console.log('data', d)
    return true
  }
  catch (e) {
    throw e
  }
}

const main = async () => {
  const oldName = '/home/klequis/dev/wk/pify-node-with-promises/upload_b064135e143da6a7a37d0983db7a844c'
  const newName = '/home/klequis/dev/wk/pify-node-with-promises/horse.jpg'
  // const renamedFile = await renameFile(oldName, newName)
  // console.log('re', renamedFile)

  const a = await fileExists('/home/klequis/dev/wk/pify-node-with-promises/newFile1.txt')
  console.log('a', a)
}

// main()

const dirExists = async (dirPath) => {
  try {
    await pify(fs.stat)(dirPath)
    return true
  }
  catch {
    return false
  }

}

const makeDir = async (dirName) => {
  try {
    const data = await fsp.mkdir(dirName)
    console.log('makeDir', data)
  }
  catch (e) {
    console.log('makeDir.ERROR', e)

  }
}

const readFile = async (fullFileName) => {
  return await fsp.readFile(fullFileName)
}

const test = async () => {
  const x = await readFile('horse.jpg')
  console.log(x)
}

test()



