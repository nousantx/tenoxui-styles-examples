# Creating `colors` & `themes`

## About

Best way to creating a colors for your design system with tenoxui. In this repository, you can learn how to create a simple color generation for your utilities that needs color to work with. (like `color`, `background-color`, `border-color`, and so on)

## Spoiler

From the file `themes.js`, you may note a function named `createColors`. This is a utility to convert all of your defined colors into `RGB` format. Why? Because it easier to manipulate the opacity if needed later. Here's the example of the code :

```javascript
const theme = {
  // ...
  classes: {
    color: createColors(colors, "text"),
    backgroundColor: createColors(colors, "bg")
  }
};
```

Let's breakdown the code. First, we define it inside `classes` property, it will passed for `tenoxui` configuration later. As you may notice, `classes` will have `css property` or `css variable` as the key's name, which inside of it will be generated the classNames and its value.

Then, what is `createColors`? The code is looks like this :

```javascript
function createColors(colors, prefix) {
  // ...
  colorsToProcess.forEach(color => {
    // ...
    const hex = colors[color][index];
    const rgb = hexToRgb(hex);
    colorObject[`${prefix}-${color}-${shade}`] = `rgb(${rgb} / var(--${prefix}-opa, 1))`;
  });
  return colorObject;
}
```

The main parameter is `colors` and `prefix`. Colors is bunch of defined `hex` colors ([Here's the example](../../src/lib/color.js)) that you may need. And second parameter is `prefix`, this is what prefixes that will trigger the color to be applied.

Okay, now, let's go back to where we define our `classes`. As you may notice, we define `color` css property, and then we use the colors that we already define, and also the `prefix`. All of that will have the same thing like this :

```javascript
const theme = {
  classes: {
    color: {
      "text-red-100": "rgb(. . . / var(--text-opa))",
      "text-red-200": "rgb(. . . / var(--text-opa))",
      "text-red-300": "rgb(. . . / var(--text-opa))"
      // and more...
    },
    // same goes for backgroundColor
    color: {
      "bg-red-100": "rgb(. . . / var(--bg-opa))",
      "bg-red-200": "rgb(. . . / var(--bg-opa))",
      "bg-red-300": "rgb(. . . / var(--bg-opa))"
      // and more...
    }
  }
};
```

## Usage

Here's usage example :

### Adding Background

```html
<div class="bg-blue-400 hover:bg-red-400"></div>
```
