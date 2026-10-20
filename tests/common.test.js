const test = require("node:test");
const assert = require("node:assert/strict");

const getModelScale = require("../export/common/check-model-scale").default;
const getFilenameFromPath = require("../export/common/get-file-name").default;
const getDirectoryFromPath =
  require("../export/common/get-directory-from-path").default;

test("getModelScale reads 2x, 3x, and 4x model names", () => {
  assert.equal(getModelScale("upscayl-standard-4x"), "4");
  assert.equal(getModelScale("realesr-animevideov3-x2"), "2");
  assert.equal(getModelScale("realesr-animevideov3-2x"), "2");
  assert.equal(getModelScale("realesr-animevideov3-x3"), "3");
  assert.equal(getModelScale("realesr-animevideov3-3x"), "3");
  assert.equal(getModelScale("REMACRI-X2"), "2");
});

test("getFilenameFromPath handles POSIX and Windows paths", () => {
  assert.equal(getFilenameFromPath("/home/user/image.png"), "image.png");
  assert.equal(getFilenameFromPath("C:\\models\\image.png"), "image.png");
  assert.equal(getFilenameFromPath("image.png"), "image.png");
  assert.equal(getFilenameFromPath(""), "");
});

test("getDirectoryFromPath keeps or drops the filename", () => {
  assert.equal(getDirectoryFromPath("/home/user/image.png"), "/home/user");
  assert.equal(
    getDirectoryFromPath("/home/user/image.png", false),
    "/home/user/image.png",
  );
  assert.equal(getDirectoryFromPath("C:\\models\\image.png"), "C:\\models");
  assert.equal(getDirectoryFromPath("image.png"), "");
});
