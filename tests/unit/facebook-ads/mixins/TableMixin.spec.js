import {
  shallowMount
} from "@vue/test-utils"
import TableMixin from "@/components/shared/mixins/TableMixin"

const wrapper = shallowMount(TableMixin, {
  render: function (createElement) {
    return createElement(
      "div"
    )
  },
})

describe("TableMixin", () => {
  let accounts = [{
    account_id: "1",
    id: 1,
    name: "account"
  }]

  wrapper.setData({
    tableData: accounts
  })
  it("computedTableData", () => {
    expect(wrapper.vm.computedTableData).toEqual(accounts)
  })
  it("queriedData", () => {
    expect(wrapper.vm.queriedData).toEqual(accounts)
  })
  it("total", () => {
    expect(wrapper.vm.total).toEqual(accounts.length)
  })
  it("to", () => {
    expect(wrapper.vm.to).toEqual(1)
  })
  it("from", () => {
    expect(wrapper.vm.from).toEqual(0)
  })
  it("ready", () => {
    expect(wrapper.vm.ready).toBe(true)
  })

  it("searchQuery", () => {
    wrapper.setData({
      searchQuery: "query"
    })
    expect(wrapper.vm.searchedData).toEqual([])
  })
})
