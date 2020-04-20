import Vue from "vue"
import faker from "vue-faker"

Vue.use(faker, {locale: "pt_BR"})
const fakerObj = Vue.faker()

class TestStatsModel {
  constructor() {
    this.faker = fakerObj
  }

  // Random select from list
  randomPick(list) {
    if (!(list instanceof Array)) return
    let idx = Math.floor(Math.random() * list.length)
    return list[idx]
  }
  percentage() {
    return Math.random()
  }
  zeroToTen() {
    return Math.floor(Math.random()*10)
  }

  // Faker
  financeAmount() {
    return parseFloat(this.faker.finance.amount())
  }
  currencyName() {
    return this.faker.finance.currencyName()
  }
  currencySymbol() {
    return this.faker.finance.currencySymbol()
  }
  domainName() {
    return this.faker.internet.domainName()
  }
  randomName() {
    return this.faker.random.word()
  }
  randomNames() {
    return this.faker.random.words()
  }
  randomNumber() {
    return this.faker.random.number()
  }
  randomFloat() {
    return this.faker.random.float()
  }
  randomBoolean() {
    return this.faker.random.boolean()
  }
  randomAlphaNumeric() {
    return this.faker.random.alphaNumeric()
  }
}

const testStats = new TestStatsModel()
export default testStats