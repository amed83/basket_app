import { FC, useState, useEffect, useCallback } from "react";
import { useCalculations } from "../customHooks/useCalculations";
import { BasketPage } from "../../components/BasketPage/BasketPage";

import { createServer } from "miragejs";
export interface DataPayloadProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const data: DataPayloadProps[] = [
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

export interface ArticlesProps extends DataPayloadProps {
  error: boolean;
}

export const Basket: FC<{}> = () => {
  const [articles, setArticles] = useState<DataPayloadProps[]>([]);
  useEffect(() => {
    setArticles(data.map((el) => ({ ...el })));
  }, []);

  const { total, vat, subTotal } = useCalculations(articles);

  createServer({
    routes() {
      this.post("/api/checkout", () => {
        return { success: true };
      });
    },
  });

  const buyProducts = () => {
    fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articles, total, vat, subTotal }),
    })
      .then((res) => res.json())
      .then((response) => console.log(" response ", response));
  };

  const updateItemQuantity = useCallback(
    (newQuantity: number, id: number) => {
      if (articles.length) {
        setArticles(
          articles.map((el) => {
            if (el.id === id) {
              return {
                ...el,
                quantity: newQuantity,
              };
            }
            return el;
          })
        );
      }
    },
    [articles]
  );
  console.log(" RENDER PARENT ");
  const deleteArticle = useCallback(
    (id) => {
      setArticles(articles.filter((article) => article.id !== id));
    },
    [articles]
  );

  return (
    <>
      <BasketPage
        articles={articles}
        updateItemQuantity={updateItemQuantity}
        deleteArticle={deleteArticle}
        buyProducts={buyProducts}
        total={total}
        vat={vat}
        subTotal={subTotal}
      />
    </>
  );
};
