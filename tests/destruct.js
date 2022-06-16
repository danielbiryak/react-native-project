let text = 'One\r\ntwo\r\nthree four five six\r\nseven\neight\rnine\r\nten'

let res = text.split(/\\r|\\n|\s/).filter(value => value != '')

console.log(res)
