import { FC, useState, useEffect, useCallback, createContext } from "react";
import { BasketPage } from "../../components/BasketPage/BasketPage";
import { data, DataPayloadProps } from "../../data/data";
import { useCalculateTotal } from "../customHooks/useCalculateTotal";
import { fakeServer } from "../../fakeServer/fakeServer";

interface ContextProps {
  deleteArticle: (id: number) => void;
}

export const BasketContext = createContext<ContextProps>({
  deleteArticle: () => {},
});

export const Basket: FC<{}> = () => {
  const [articles, setArticles] = useState<DataPayloadProps[]>([]);
  const [purchaseMessage, setPurchaseMessage] = useState<
    "success" | "error" | ""
  >("");

  useEffect(() => {
    setArticles(data);
  }, []);

  const { total, vat, subTotal } = useCalculateTotal(articles);

  const buyProducts = async () => {
    fakeServer();
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articles, total, vat, subTotal }),
    });

    response
      .json()
      .then((data) => {
        if (data.success) {
          return setPurchaseMessage("success");
        }
        return setPurchaseMessage("error");
      })
      .catch(() => {
        return setPurchaseMessage("error");
      });
  };

  const updateBasket = useCallback(
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
  const deleteArticle = useCallback(
    (id) => {
      setArticles(articles.filter((article) => article.id !== id));
    },
    [articles]
  );

  return (
    <BasketContext.Provider value={{ deleteArticle: deleteArticle }}>
      <BasketPage
        articles={articles}
        updateBasket={updateBasket}
        buyProducts={buyProducts}
        total={total}
        vat={vat}
        subTotal={subTotal}
        purchaseMessage={purchaseMessage}
      />
    </BasketContext.Provider>
  );
};
