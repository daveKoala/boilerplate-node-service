"use strict";

module.exports = {
  diff: true,
  extension: ["js, ts"],
  package: "./package.json",
  reporter: "spec",
  require: "ts-node/register",
  slow: 75,
  timeout: 2000,
  ui: "bdd",
};
