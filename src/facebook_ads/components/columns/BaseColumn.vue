<script>
import BaseColumn from "@/components/tables/BaseColumn"

export default {
  extends: BaseColumn,
  methods: {
    getActionValue(row, action_type, prop=null) {
      if (!prop)
        prop = this.prop
      let list = row[action_type] || []
      let value = 0
      if (!list.length) return
      let action = list.find(a => a.action_type == prop)
      if (action !== undefined)
        value = action.value
      return value
    }
  }
}
</script>