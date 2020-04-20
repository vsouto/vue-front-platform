let obj = {
  field: [{
    item: "one"
  }]
}
// console.log(obj)
let sec = { ...obj }

// console.log(sec)
sec.field.length // 1
sec.field.push({ o: "o" })
sec.field.length // 2
// console.log(obj.field.length)