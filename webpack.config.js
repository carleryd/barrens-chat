module.exports = {
  entry: __dirname + "/index.js",
  output: {
    path: __dirname + "/public/bin",
    publicPath: "/public/bin/",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            "es2015",
            "react",
            "stage-2"
          ]
        }
      }
    ]
  }
};
