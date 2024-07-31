/*!
 * This file includes some utilities derived from Tailwind CSS (https://tailwindcss.com) and for button utility, Shadcn UI (https://ui.shadcn.com/docs/components/button).
 */

const button = {
  // button related types and properties
  property: {
    "btn-text": "--btn-color",
    "btn-bg": "--btn-bg",
    "btn-border": "--btn-border",
    "btn-radius": "--btn-radius",
    "btn-padding": "--btn-padding",
    "btn-font-size": "--btn-font-size"
  },
  // creating utility classes
  classes: mergeObjects(
    // creating button colors utility
    { "--btn-bg": createColors(colors, "btn") },

    // with this function, you can drfine your styles almost like regular css
    transformClasses({
      btn: {
        color: "var(--btn-color, #fff)",
        backgroundColor: "var(--btn-bg, #007bff)",
        border: "var(--btn-border, 1px solid transparent)",
        borderRadius: "var(--btn-radius, 0.375rem)",
        height: "var(--btn-size-h, 2.25rem)",
        width: "var(--btn-size-w)",
        padding: "var(--btn-padding, 8px 1rem)",
        fontSize: "var(--btn-font-size, 1rem)",
        textAlign: "center",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transitionProperty: "background-color, color, border-color",
        transitionDuration: "0.15s",
        outline: "none"
      },
      "btn-sm": {
        "--btn-size-h": "2rem",
        "--btn-padding": "0 0.75rem",
        "--btn-font-size": "0.75rem"
      },
      "btn-lg": {
        "--btn-size-h": "2.5rem",
        "--btn-padding": "0 2rem"
      },
      "btn-icon": {
        "--btn-size-w": "2.25rem"
      }
    })
  )
};
