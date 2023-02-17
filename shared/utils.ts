const splitInlineLabel = (label) => {
    const dynamicStringStarts = label.indexOf('{');
    const dynamicStringEnds = label.indexOf('}');
    return {
      firstPartOfLabel: label.slice(0, dynamicStringStarts),
      secondPartOfLabel: label.slice(dynamicStringEnds + 1),
    };
  };

export default splitInlineLabel