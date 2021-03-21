import { makeStyles } from "@material-ui/core";

export const useGridStyles = makeStyles({
  root: {
    padding: "10px",
    width: "80%",
  },
});

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
