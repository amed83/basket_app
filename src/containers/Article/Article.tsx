import React, { FC, memo, useState, useEffect } from "react";
import { DataPayloadProps } from "../../containers/Basket/Basket";
import { createServer } from "miragejs";
import { inputValidations } from "../../utils/inputValidation";
import { ArticlePage } from "../../components/Article/ArticlePage";

export interface ArticleProps extends DataPayloadProps {
  updateItemQuantity: (id: number, quantity: number) => void;
  deleteArticle: (id: number) => void;
}

export const Article: FC<ArticleProps> = memo(
  ({ name, quantity, price, id, deleteArticle, updateItemQuantity }) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [articleQuantity, setArticleQuantity] = useState<number>(quantity);

    useEffect(() => {
      updateItemQuantity(articleQuantity, id);
    }, [articleQuantity]);

    const changeQuantity = (
      operation:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | string
    ) => {
      setHasError(false);
      if (typeof operation !== "string") {
        const inputAsNumber = Number(operation.target.value);
        if (Object.values(inputValidations(inputAsNumber)).includes(true)) {
          setHasError(true);
          return;
        }
        // on backspace show zero and error message, not sure it's the best Ui possible
        if (!operation.target.value) {
          setHasError(true);
        }
        setArticleQuantity(inputAsNumber);
      } else {
        if (
          (articleQuantity >= 10 && operation === "add") ||
          (articleQuantity <= 1 && operation === "remove")
        ) {
          setHasError(true);
          return;
        }

        setArticleQuantity(
          operation === "add" ? articleQuantity + 1 : articleQuantity - 1
        );
      }
    };

    return (
      <>
        <ArticlePage
          id={id}
          name={name}
          price={price}
          hasError={hasError}
          articleQuantity={articleQuantity}
          deleteArticle={deleteArticle}
          changeQuantity={changeQuantity}
        />
      </>
    );
  }
);
