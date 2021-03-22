import { makeStyles } from "@material-ui/core";

export const useGridStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "98%",
    },
  },
}));

export const useBoxStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    flexGrow: 1,
  },
});

export const useDividerStyles = makeStyles({
  root: {
    margin: 0,
  },
});

export const useReviewOrderStyles = makeStyles({
  root: {
    backgroundColor: "#D0D0D0",
    padding: "10px",
  },
});

export const useOrderContainerStyles = makeStyles({
  root: {
    border: "solid #D0D0D0 2px",
    borderRadius: "5px",
  },
});

export const useTableRowStyles = makeStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export const useTableHeadStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const useTableContainerStyles = makeStyles({
  root: {
    padding: "5px",
    width: "auto",
  },
});

export const useTableHeadCellsStyles = makeStyles({
  root: {
    fontSize: 16,
  },
});

export const useBuyButtonStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "2rem",
    padding: "0.5rem 0.9rem",
    background: theme.palette.info.main,
    color: "white",
    width: "8rem",
    textTransform: "none",
    fontSize: "18px",
  },
}));
