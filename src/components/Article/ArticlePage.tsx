import React, { FC } from "react";
import {
  TextField,
  TableCell,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { BasketContext } from "../../containers/Basket/Basket";
import {
  useBtnStyles,
  useTableCellStyles,
  useTextFieldStyles,
  useValidationStyles,
} from "./Styles";

interface ArticlePageProps {
  name: string;
  price: number;
  hasError: boolean;
  articleQuantity: number;
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
  changeQuantity,
  hasError,
}) => {
  const btnClasses = useBtnStyles();
  const inputClasses = useTextFieldStyles();
  const validationTypography = useValidationStyles();
  const tableCellClasses = useTableCellStyles();
  return (
    <>
      <TableCell component="th" scope="row" className={tableCellClasses.root}>
        {name}
      </TableCell>
      <TableCell component="th" scope="row" className={tableCellClasses.root}>
        £{price}
      </TableCell>
      <TableCell component="th" scope="row">
        <Box display="flex" flexDirection="column" position="relative">
          <Box display="flex">
            <TextField
              variant="outlined"
              error={hasError}
              size="small"
              className={inputClasses.root}
              value={articleQuantity}
              onChange={(ev) => changeQuantity(ev)}
            />
            <Button
              startIcon={
                <AddIcon style={{ marginLeft: "10px", marginRight: 0 }} />
              }
              color="primary"
              className={btnClasses.root}
              style={{ backgroundColor: "#00cc99" }}
              variant="contained"
              onClick={() => changeQuantity("add")}
            />
            <Button
              startIcon={
                <RemoveIcon style={{ marginLeft: "10px", marginRight: 0 }} />
              }
              color="primary"
              className={btnClasses.root}
              style={{ backgroundColor: "orange" }}
              variant="contained"
              onClick={() => changeQuantity("remove")}
            />
          </Box>
          <Box position="absolute" top="97%" width="250px" maxWidth="300px">
            {hasError ? (
              <Typography color="error" className={validationTypography.root}>
                Please enter a number between 1 and 10
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </TableCell>

      <TableCell component="th" scope="row" className={tableCellClasses.root}>
        £{(price * articleQuantity).toFixed(2)}
      </TableCell>
      <TableCell component="th" scope="row">
        <BasketContext.Consumer>
          {({ deleteArticle }) => (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => deleteArticle(id)}
            >
              Delete{" "}
            </Button>
          )}
        </BasketContext.Consumer>
      </TableCell>
    </>
  );
};
