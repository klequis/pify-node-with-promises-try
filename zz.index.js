readconst fs = require('fs')
const pify = require('pify')

const fsp = pify(fs)
const path = require('path')

// fsp.readFile('package.json', 'utf8').then(data => {
//   console.log(JSON.parse(data).name)
// })


const readJsonFile = async (fileName) => {
  try {
    const data = await fsp.readFile(fileName, 'utf8')
    const jsonData = JSON.parse(data)
    console.log(jsonData.name)
  }
  catch (e) {
    console.log('e', e)
  }
}

// readJsonFile('package.json')

const renameFile = async (oldName, newName) => {
  try {
    const data = await fsp.rename(oldName, newName)
    console.log('data', data)
  }
  catch (e) {
    console.log('e', e)
  }
}

// renameFile('fileToRename.txt', 'newFile.txt')

const getFileStats = async (fileName) => {
  // NOTE: fs.exists() is depricated and fs.stats() should be used
  // https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
  try {
    const data = await fsp.stat(fileName)
    console.log('getFileStats', data)
  }
  catch (e) {
    // console.log('getFileStats.ERROR', e);
    throw e
  }
}

getFileStats('packagex.json')

const makeDir = async (dirName) => {
  try {
    const data = await fsp.mkdir(dirName)
    console.log('makeDir', data)
  }
  catch (e) {
    console.log('makeDir.ERROR', e)

  }
}

// makeDir('new-dir')


const rename = async (oldName, newName) => {
  const d = await pify(fs.rename)(oldName, newName)
  console.log(d)

}

// rename('newFile.txt', 'newFile1.txt')

console.log(path.join(__dirname, 'test-folder'))

/*
take a fullFileName
get the fileName part
add the time stamp to fileName part
put it back together
rename the original file

/home/someDir/myFile.txt

{ path: 'home/someDir', name: 'myFile', extension: '.txt' }



*/



const getFileExtension = (fullName) => {
  const len = fullName.length
  const lastDot = fullName.lastIndexOf('.')
  const extension = fullName.slice(lastDot + 1, len)
  return extension
}

const getFilePath = (fullName) => {
  const lastSlash = fullName.lastIndexOf('/')
  if (lastSlash === -1) {
    return ''
  }

  const path = fullName.slice(0, lastSlash)
  return path
}

const getFileName = (fullName) => {
  const lastSlash = fullName.lastIndexOf('/')
  const lastDot = fullName.lastIndexOf('.')

  const name = fullName.slice(lastSlash + 1, lastDot)
  return name
}

const getFileParts = (fullName) => {

  return {
    path: getFilePath(fullName),
    name: getFileName(fullName),
    extension: getFileExtension(fullName)
  }
}

const f1 = '/home/some-dir/otherDir/meAndMyShadow.txt'
const f2 = 'meAndMyShadow.txt'

// console.log(getFileParts(f))

const addTimeStampToFileName = (fullName) => {
  const a = getFileParts(fullName)
  console.log('a.path:', a.path === '')

  if (a.path === '') {
    return `${a.name}-${Date.now()}.${a.extension}`
  } else {
    return `${a.path}/${a.name}-${Date.now()}.${a.extension}`
  }

}

// console.log('f1:', f1)
// console.log('f1 parts: ', addTimeStampToFileName(f1))
// console.log('f2:', f2)
// console.log('f2 parts:', addTimeStampToFileName(f2))


