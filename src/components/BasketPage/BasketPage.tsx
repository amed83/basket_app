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
import { DataPayloadProps } from "../../containers/Basket/Basket";
import { Article } from "../../containers/Article/Article";
import { useBoxStyles, useDividerStyles, useGridStyles } from "./Style";

interface BasketPageProps {
  articles: DataPayloadProps[];
  deleteArticle: (id: number) => void;
  buyProducts: () => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  subTotal: number;
  vat: number;
  total: number;
}

export const BasketPage: FC<BasketPageProps> = ({
  articles,
  deleteArticle,
  buyProducts,
  updateItemQuantity,
  subTotal,
  vat,
  total,
}) => {
  const gridClasses = useGridStyles();
  const boxClasses = useBoxStyles();
  const dividerClasses = useDividerStyles();
  const tableContainerStyle = {
    border: "solid #D0D0D0 2px",
    borderRadius: "5px",
  };

  const titleStyle = {
    backgroundColor: "#D0D0D0",
    padding: "10px",
  };

  return (
    <Box className={boxClasses.root}>
      <Grid
        container
        alignItems="center"
        className={gridClasses.root}
        spacing={2}
      >
        <Grid item sm={12}>
          <Box textAlign="center">
            <h2>Review Your Order & Complete Checkout</h2>
          </Box>
        </Grid>
        <Grid item sm={12}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12}>
          <div style={tableContainerStyle}>
            <div style={titleStyle}>Review your Order</div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article.id}>
                      <Article
                        {...article}
                        deleteArticle={deleteArticle}
                        updateItemQuantity={updateItemQuantity}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        <Grid item sm={12}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12}>
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
        <Grid item sm={12}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12}>
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
        <Grid item sm={12}>
          <Divider variant="middle" className={dividerClasses.root} />
        </Grid>
        <Grid item sm={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              disabled={total === 0}
              onClick={() => buyProducts()}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
