const grid = {
  property: {
    grid: "display",
    "grid-cols": {
      property: "gridTemplateColumns",
      value: "repeat({value}, minmax(0, 1fr))"
    },
    "grid-rows": {
      property: "gridTemplateRows",
      value: "repeat({value}, minmax(0, 1fr))"
    },
    "grid-flow": "gridAutoFlow",
    "col-span": {
      property: "gridColumn",
      value: "span {value} / span {value}"
    },
    "row-span": {
      property: "gridRow",
      value: "span {value} / span {value}"
    },
    "col-start": "gridColumnStart",
    "col-end": "gridColumnEnd",
    "row-start": "gridRowStart",
    "row-end": "gridRowEnd",
    gap: "gap",
    "gap-x": "columnGap",
    "gap-y": "rowGap",
    "justify-items": "justifyItems",
    "align-items": "alignItems",
    "justify-content": "justifyContent",
    "align-content": "alignContent",
    "justify-self": "justifySelf",
    "align-self": "alignSelf"
  },
  
  classes: {
    display: {
      grid: "grid",
      "inline-grid": "inline-grid"
    },
    gridAutoFlow: {
      "grid-flow-row": "row",
      "grid-flow-col": "column",
      "grid-flow-dense": "dense",
      "grid-flow-row-dense": "row dense",
      "grid-flow-col-dense": "column dense"
    },
    gridColumn: {
      "col-auto": "auto",
      "col-span-full": "1 / -1"
    },
    gridRow: {
      "row-auto": "auto",
      "row-span-full": "1 / -1"
    },
    gap: {
      "gap-0": "0px",
      "gap-1": "0.25rem",
      "gap-2": "0.5rem",
      "gap-4": "1rem",
      "gap-8": "2rem"
    },
  }
};
