export const ajvFilePlugin = (ajv, options = {}) => {
  return ajv.addKeyword({
    keyword: "isFile",
    compile: (_schema, parent, _it) => {
      parent.type = "file";
      delete parent.isFile;
      return () => true;
    },
  });
};
