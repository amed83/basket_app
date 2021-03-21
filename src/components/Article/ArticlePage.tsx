import React, { FC } from "react";
import { TextField, TableCell, Box, Button } from "@material-ui/core";

import { useBtnStyle, useTextFieldStyle } from "./styles";

interface ArticlePageProps {
  name: string;
  price: number;
  hasError: boolean;
  articleQuantity: number;
  deleteArticle: (id: number) => void;
  id: number;
  changeQuantity: (
    arg: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => void;
}

export const ArticlePage: FC<ArticlePageProps> = ({
  articleQuantity,
  name,
  price,
  id,
  deleteArticle,
  changeQuantity,
  hasError,
}) => {
  const btnClasses = useBtnStyle();
  const inputClasses = useTextFieldStyle();
  return (
    <>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell component="th" scope="row">
        {price}
      </TableCell>
      <TableCell component="th" scope="row">
        <Box display="flex" flexDirection="column">
          <div>
            <TextField
              variant="outlined"
              error={hasError}
              size="small"
              className={inputClasses.root}
              value={articleQuantity}
              onChange={(ev) => changeQuantity(ev)}
            />
            <Button
              color="primary"
              className={btnClasses.root}
              style={{ backgroundColor: "#00cc99" }}
              variant="contained"
              onClick={() => changeQuantity("add")}
            >
              +
            </Button>
            <Button
              color="primary"
              className={btnClasses.root}
              style={{ backgroundColor: "orange" }}
              variant="contained"
              onClick={() => changeQuantity("remove")}
            >
              -
            </Button>
          </div>
          <Box width="260px" maxWidth="260px" maxHeight="10px" height="10px">
            {hasError ? "Please enter a number between 1 and 10" : ""}
          </Box>
        </Box>
      </TableCell>

      <TableCell component="th" scope="row">
        {(price * articleQuantity).toFixed(2)}
      </TableCell>
      <TableCell component="th" scope="row">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => deleteArticle(id)}
        >
          Delete{" "}
        </Button>
      </TableCell>
    </>
  );
};
