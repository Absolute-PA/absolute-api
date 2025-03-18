"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRootPath = exports.mainRootPath = void 0;
const path = require("path");
exports.mainRootPath = path.dirname(require.main.filename);
exports.processRootPath = process.cwd();
//# sourceMappingURL=index.js.map