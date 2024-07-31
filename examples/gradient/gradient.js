const gradient = {
  property: {
    gradient: {
      property: "backgroundImage",
      value:
        "linear-gradient(var(--gradient-direction, to bottom), var(--gradient-color1, #0000) var(--gradient-stop1, 0%), var(--gradient-color2, #0000) var(--gradient-stop2, 100%))"
    },
    "gradient-direction": "--gradient-direction",
    "gradient-from": "--gradient-color1",
    "gradient-to": "--gradient-color2",
    "gradient-from-stop": "--gradient-stop1",
    "gradient-to-stop": "--gradient-stop2"
  },
  classes: {
    "--gradient-color1": createColors(colors, "gradient-from"),
    "--gradient-color2": createColors(colors, "gradient-to"),
    "--gradient-direction": {
      "gradient-to-l": "to left"
    }
  }
};
