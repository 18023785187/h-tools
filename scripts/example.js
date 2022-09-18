const fs = require("fs")

const fromPaths = [
  './build/h.js',
  './build/font'
]
const toPath = './example'

const pathLength = fromPaths.length

for (let i = 0; i < pathLength; ++i) {
  cp(fromPaths[i], toPath)
}

function cp(fromPath, toPath) {
  handle(fromPath, toPath)

  function handle(fromPath, toPath) {
    fs.stat(fromPath, (err, data) => {
      throwErr(err)

      if (data.isFile()) {
        cpFile(fromPath, toPath)
      } else if (data.isDirectory()) {
        cpDir(fromPath, toPath)
      }
    })
  }

  function throwErr(err) {
    if (err) throw err
  }

  function cpFile(fromPath, toPath) {
    const dir = fromPath.split('/')
    fs.readFile(fromPath, 'utf-8', (err, data) => {
      throwErr(err)

      fs.writeFile(toPath + '/' + dir[dir.length - 1], data, function (err) {
        throwErr(err)
      })
    })
  }

  function cpDir(fromPath, toPath) {
    const dir = fromPath.split('/')
    toPath += '/' + dir[dir.length - 1]
    fs.access(toPath, (err) => {
      if (err) {
        fs.mkdir(toPath, 0777, (err, path) => {
          throwErr(err)

          fs.readdir(fromPath, (err, paths) => {
            throwErr(err)

            paths.forEach(path => handle(fromPath + '/' + path, toPath))
          })
        })
      } else {
        fs.readdir(fromPath, (err, paths) => {
          throwErr(err)

          paths.forEach(path => handle(fromPath + '/' + path, toPath))
        })
      }
    })
  }
}
