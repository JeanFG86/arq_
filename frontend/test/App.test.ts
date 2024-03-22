import { mount } from "@vue/test-utils";
import AppVue from "../src/App.vue";

test("Deve ter um pedido vazio", async () => {
  const wrapper = mount(AppVue, {});

  expect(wrapper.get(".title").text()).toBe("Checkout");
  expect(wrapper.findAll(".product-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".product-price").at(0)?.text()).toBe("$1,000.00");
  expect(wrapper.findAll(".product-description").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".product-price").at(1)?.text()).toBe("$5,000.00");
  expect(wrapper.findAll(".product-description").at(2)?.text()).toBe("C");
  expect(wrapper.findAll(".product-price").at(2)?.text()).toBe("$30.00");
  expect(wrapper.get(".total").text()).toBe("$0.00");
});

test("Deve ter um pedido com 1 item", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$1,000.00");
  expect(wrapper.findAll(".item-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
});

test("Deve ter um pedido com vários itens e quantidade acima de 1", async () => {
  const wrapper = mount(AppVue, {});

  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(1)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$6,090.00");
  expect(wrapper.findAll(".item-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
  expect(wrapper.findAll(".item-description").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".item-quantity").at(1)?.text()).toBe("1");
  expect(wrapper.findAll(".item-description").at(2)?.text()).toBe("C");
  expect(wrapper.findAll(".item-quantity").at(2)?.text()).toBe("3");
});

test("Deve ter um pedido com vários itens e decrementar a quantidade do item do pedido", async () => {
  const wrapper = mount(AppVue, {});

  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(1)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(2)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(2)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$6,030.00");
  expect(wrapper.findAll(".item-quantity").at(2)?.text()).toBe("1");
});

test("Deve ter um pedido com vários itens e incrementar a quantidade do item do pedido", async () => {
  const wrapper = mount(AppVue, {});

  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$1,000.00");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
  await wrapper.findAll(".item-increase-button").at(0)?.trigger("click");
  await wrapper.findAll(".item-increase-button").at(0)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$3,000.00");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("3");
});

test("Deve ter um pedido com vários itens e decrementar a quantidade do item do pedido e nao permitir que a quantidade seja menor que zero", async () => {
  const wrapper = mount(AppVue, {});

  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(0)?.trigger("click");
  await wrapper.findAll(".item-decrease-button").at(0)?.trigger("click");
  expect(wrapper.get(".total").text()).toBe("$0.00");
  expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBeUndefined();
});

test("Deve confirmar um pedido com 1 item", async () => {
  const wrapper = mount(AppVue, {});
  await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
  await wrapper.get(".confirm").trigger("click");
  expect(wrapper.get(".message").text()).toBe("Success");
  expect(wrapper.get(".order-code").text()).toBe("202400000001");
});

test("Deve ter 4 produtos", async () => {
  const wrapper = mount(AppVue, {});

  expect(wrapper.get(".title").text()).toBe("Checkout");
  expect(wrapper.findAll(".product-description").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".product-price").at(0)?.text()).toBe("$1,000.00");
  expect(wrapper.findAll(".product-description").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".product-price").at(1)?.text()).toBe("$5,000.00");
  expect(wrapper.findAll(".product-description").at(2)?.text()).toBe("C");
  expect(wrapper.findAll(".product-price").at(2)?.text()).toBe("$30.00");
  expect(wrapper.findAll(".product-description").at(3)?.text()).toBe("D");
  expect(wrapper.findAll(".product-price").at(3)?.text()).toBe("$1,000.00");
});
