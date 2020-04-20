
/**
 * Plan Model
 */
class Plan {

  constructor(options) {

    this.available_classes = [
      "",
      "card card-primary",
      "card card-white card-raised card-warning",
      "card card-white card-success",
      "card card-white card-info",
      "card card-primary",
      "card card-white card-raised card-warning",
      "card card-white card-success",
      "card card-white card-info",
    ]

    this.available_images = [
      "",
      "primary",
      "warning",
      "success",
      "info",
      "primary",
      "warning",
      "success",
      "info",
    ]

    this.custom_fields = {
      "tipo": "9d9d740413b42291707c740efc4616f871d241c2"
    }

    Object.assign(this, options)

    // Fields with workarounds
    this.setStaticAttributes()
    this.setClassAndImage()
    this.setPrice()
    this.setTitle()

  }

  /**
   * Defines class and image of the plan
   */
  setClassAndImage() {

    switch (this.getField("title")) {
    case "Expert Mensal":
    case "Expert Anual":
      this.image = this.available_images[1]
      this.class = this.available_classes[1]
      break

    case "Trial":
    case "Pro Mensal":
    case "Pro Anual":
      this.image = this.available_images[2]
      this.class =  this.available_classes[2]
      break

    case "Mid Mensal":
    case "Mid Anual":
      this.image = this.available_images[3]
      this.class =  this.available_classes[3]
      break

    case "Basic Mensal":
      this.image = this.available_images[4]
      this.class =  this.available_classes[4]
      break
    case "Basic Anual":
      this.image = this.available_images[4]
      this.class =  this.available_classes[4]
    }
  }

  setTitle() {

    var title_field, final_value

    title_field = this.title? this.title : this.name

    if (this.type() === "Mensal")
      final_value = title_field.replace("Mensal", "")
    else if (this.type() === "Anual")
      final_value = title_field.replace("Anual", "")

    this.title = final_value
  }

  getField(field, custom = false) {

    // Name can be Title if its a product
    if (field === "title") {
      var field_value = this[field]

      // Try name
      if (!field_value || typeof field_value !== "string")
        field_value = this.name
      return field_value
    }

    if (custom)
      field = this.custom_fields[field]

    return this[field]
  }

  getCustomField(field_name) {
    let field_identifier = this.custom_fields[field_name]

    return this[field_identifier]
  }

  type() {
    return this.getField("tipo", true) === "103"? "Mensal" : "Anual"
  }

  setStaticAttributes() {

    // Generic infos
    this.usersText = "usuários"
    this.panelsText = "painéis (dashboards)"
    this.accountsText = "contas de plataformas"
    this.management = "Gerenciamento de campanhas"

    //
    switch (this.getField("title")) {
    case "Expert Mensal":
    case "Expert Anual":
      this.image = this.available_images[1]
      this.class = this.available_classes[1]
      this.users = "20"
      this.panels = "30"
      this.accounts = "25"
      this.history = "Histórico ilimitado"
      this.realTime = "Tempo real"

      break

    case "Trial":
    case "Pro Mensal":
    case "Pro Anual":
      this.image = this.available_images[2]
      this.class = this.available_classes[2]
      this.users = "5"
      this.panels = "10"
      this.accounts = "10"
      this.history = "Histórico ilimitado"
      this.realTime = "Tempo real"

      break

    case "Mid Mensal":
    case "Mid Anual":
      this.image = this.available_images[3]
      this.class = this.available_classes[3]
      this.users = "2"
      this.panels = "5"
      this.accounts = "5"
      this.history = "Histórico 2 meses"
      this.realTime = "Tempo real"
      break

    case "Basic Mensal":
      this.image = this.available_images[4]
      this.class = this.available_classes[4]
      this.users = "1"
      this.panels = "1"
      this.accounts = "2"
      this.history = "Histórico 15 dias"
      this.realTime = "De hora em hora"
      break
    case "Basic Anual":
      this.image = this.available_images[4]
      this.class = this.available_classes[4]
      this.users = "1"
      this.panels = "1"
      this.accounts = "2"
      this.history = "Histórico 1 mês"
      this.realTime = "De hora em hora"
      break

    }
  }

  isTrial() {
    return this.getField("tipo", true) === "103"
  }

  setPrice() {
    const prices = this.prices

    if (!prices)
      return

    this.price = prices.map(function (obj, key) {

      if (obj.currency === "BRL")
        return prices[key].price
    })[0]

    return this.price
  }
}


module.exports = Plan
