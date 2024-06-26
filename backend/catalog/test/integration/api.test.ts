import axios from "axios";

describe("api test", () => {
  it("Deve retornar a lista de produtos", async () => {
    const response = await axios.get("http://localhost:3002/products");
    const output = response.data;
    expect(output).toHaveLength(4);
  });

  it("Deve retornar um produto", async () => {
    const response = await axios.get("http://localhost:3002/products/1");
    const output = response.data;
    expect(output.idProduct).toBe(1);
    expect(output.description).toBe("A");
    expect(output.price).toBe(1000);
    expect(output.volume).toBe(0.03);
    expect(output.density).toBe(100);
  });
});
