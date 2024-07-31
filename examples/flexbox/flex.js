const flex = {
  property: {
    d: "display",
    items: "alignItems",
    justify: "justifyContent",
    wrapper: ["alignItems", "justifyContent"] // usage: `wrapper-center`
  },
  values: {
    start: "flex-start",
    end: "flex-end",
    justify: {
      between: "space-between",
      evenly: "space-evenly",
      around: "space-around"
    }
  },
  classes: {
    display: {
      flex: "flex",
      "inline-flex": "inline-flex"
    },
    alignItems: {
      "items-center": "center"
    },
    justifyContent: {
      "content-center": "center"
    },
    flexWrap:{
     "flex-wrap":"wrap"
    }
  }
};
