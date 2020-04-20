const swal = jest.fn(() => Promise.resolve({
  data: {},
  value: "value"
}))
export default swal
