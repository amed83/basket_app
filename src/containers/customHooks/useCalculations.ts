import { useState, useEffect } from "react";
import { DataPayloadProps } from "../Basket/Basket";

export const useCalculations = (articles: DataPayloadProps[]) => {
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const subtotal = Number(
      articles
        .reduce((curr, next) => curr + next.quantity * next.price, 0)
        .toFixed(2)
    );
    const vat = Number(((subtotal * 20) / 100).toFixed(2));
    setVat(vat);
    setSubTotal(subtotal);
    setTotal(Number((subtotal + vat).toFixed(2)));
  }, [articles]);
  return { total, subTotal, vat };
};
