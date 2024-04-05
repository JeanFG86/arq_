import axios from "axios";

describe("api test", () => {
  it("Deve retornar a lista de produtos", async () => {
    const response = await axios.get("http://localhost:3002/products");
    const output = response.data;
    expect(output).toHaveLength(4);
  });
});
