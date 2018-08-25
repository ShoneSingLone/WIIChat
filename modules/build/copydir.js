let fs = require('fs-extra')

let path = require('path')

let from = path.join(__dirname, './../../dist/')
let to = path.join(__dirname, '../../../ShoneSingLone.github.io/brumaire')

// Sync:
if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
  console.log('__dirname:', __dirname, '\nfrom:', from, '\nto:', to)

  fs.remove(to)
    .then((re) => {
      console.log('removed!', re)
      return fs.copy(from, to)
    })
    .then(re => {
      console.log('copied!', re)
    })
    .catch(err => {
      console.error(err)
    })
}