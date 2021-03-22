import { renderHook } from "@testing-library/react-hooks";
import { useCalculateTotal } from "./useCalculateTotal";

describe("<useCalculateTotals>", () => {
  test("should return the correct values for the initial basket", () => {
    const basket = [
      {
        id: 1,
        name: "Apple",
        quantity: 2,
        price: 0.52,
      },
      {
        id: 2,
        name: "Banana",
        quantity: 3,
        price: 0.67,
      },
    ];
    const { result } = renderHook(() => useCalculateTotal(basket));
    expect(result.current.subTotal).toBe(3.05);
    expect(result.current.vat).toBe(0.61);
    expect(result.current.total).toBe(3.66);
  });

  test("should return the correct data with different items quantity", () => {
    const basket = [
      {
        id: 1,
        name: "Apple",
        quantity: 5,
        price: 0.52,
      },
      {
        id: 2,
        name: "Banana",
        quantity: 7,
        price: 0.67,
      },
    ];

    const { result } = renderHook(() => useCalculateTotal(basket));
    expect(result.current.subTotal).toBe(7.29);
    expect(result.current.vat).toBe(1.46);
    expect(result.current.total).toBe(8.75);
  });

  test("should return the correct data when there are no items on the basket", () => {
    const basket = [
      {
        id: 1,
        name: "Apple",
        quantity: 0,
        price: 0.52,
      },
      {
        id: 2,
        name: "Banana",
        quantity: 0,
        price: 0.67,
      },
    ];

    const { result } = renderHook(() => useCalculateTotal(basket));
    expect(result.current.subTotal).toBe(0);
    expect(result.current.vat).toBe(0);
    expect(result.current.total).toBe(0);
  });
});
