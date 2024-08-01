function transformClasses(input) {
  const output = {};

  Object.keys(input).forEach(className => {
    Object.entries(input[className]).forEach(([property, value]) => {
      if (!output[property]) {
        output[property] = {};
      }
      output[property][className] = value;
    });
  });

  return output;
}
