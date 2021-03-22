import {
  Divider,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { FC } from "react";

import { Article } from "../../containers/Article/Article";
import { DataPayloadProps } from "../../data/data";
import {
  useBoxStyles,
  useDividerStyles,
  useGridStyles,
  useOrderContainerStyles,
  useReviewOrderStyles,
  useTableRowStyles,
  useTableContainerStyles,
  useTableHeadStyles,
  useTableHeadCellsStyles,
  useBuyButtonStyles,
} from "./Style";

interface BasketPageProps {
  articles: DataPayloadProps[];
  buyProducts: () => void;
  updateBasket: (id: number, quantity: number) => void;
  subTotal: number;
  vat: number;
  total: number;
  purchaseMessage: string;
}

export const BasketPage: FC<BasketPageProps> = ({
  articles,
  buyProducts,
  updateBasket,
  subTotal,
  vat,
  total,
  purchaseMessage,
}) => {
  const gridClasses = useGridStyles();
  const boxClasses = useBoxStyles();
  const dividerClasses = useDividerStyles();
  const reviewOrderClasses = useReviewOrderStyles();
  const orderContainerClasses = useOrderContainerStyles();
  const tableRowClasses = useTableRowStyles();
  const tableContainerClasses = useTableContainerStyles();
  const tableHeadClasses = useTableHeadStyles();
  const tableHeadCellsClasses = useTableHeadCellsStyles();
  const buyButtonClasses = useBuyButtonStyles();

  return (
    <Box className={boxClasses.root}>
      <Grid
        container
        alignItems="center"
        className={gridClasses.root}
        spacing={2}
      >
        <Grid item sm={12} xs={10}>
          <Box textAlign="center">
            <Typography variant="h4" color="textPrimary">
              Review Your Order & Complete Checkout
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} xs={10}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12} xs={10}>
          <Box className={orderContainerClasses.root}>
            <Box className={reviewOrderClasses.root}>
              <Typography variant="h6"> Review your Order </Typography>
            </Box>
            <TableContainer
              component={Paper}
              className={tableContainerClasses.root}
            >
              <Table>
                <TableHead className={tableHeadClasses.root}>
                  <TableRow>
                    <TableCell className={tableHeadCellsClasses.root}>
                      Product
                    </TableCell>
                    <TableCell className={tableHeadCellsClasses.root}>
                      Price
                    </TableCell>
                    <TableCell
                      align="left"
                      className={tableHeadCellsClasses.root}
                    >
                      Quantity
                    </TableCell>
                    <TableCell className={tableHeadCellsClasses.root}>
                      Cost
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id} className={tableRowClasses.root}>
                      <Article {...article} updateBasket={updateBasket} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item sm={12} xs={10}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12} xs={10}>
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="10px"
          >
            <Typography variant="h6" color="textSecondary">
              Subtotal
            </Typography>
            <Typography variant="h6" color="textSecondary">
              £{subTotal}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="textSecondary">
              VAT @ 20%
            </Typography>
            <Typography variant="h6" color="textSecondary">
              £{vat}
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} xs={10}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12} xs={10}>
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="10px"
          >
            <Typography variant="h6" color="textPrimary">
              Total
            </Typography>
            <Typography variant="h6" color="textPrimary">
              £{total}
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={12} xs={10}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              className={buyButtonClasses.root}
              variant="contained"
              disabled={total === 0 || purchaseMessage === "success"}
              onClick={() => buyProducts()}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
        <Grid item sm={12}>
          {purchaseMessage &&
            (purchaseMessage === "success" ? (
              <Typography variant="h6">
                Your Order was successfully processed!
              </Typography>
            ) : (
              <Typography color="error" variant="h6">
                Sorry, there was an error processing your order, please try
                again.
              </Typography>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};
