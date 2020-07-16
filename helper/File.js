import fs from 'fs'

export const readJson = url => {
  let data = fs.readFileSync(url)
  return JSON.parse(data)
}