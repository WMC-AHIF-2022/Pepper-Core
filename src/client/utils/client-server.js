"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRestEndpoint = void 0;
function fetchRestEndpoint(route, httpMethod, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let options = { method: httpMethod };
        if (data) {
            options.headers = { "Content-Type": "application/json" };
            options.body = JSON.stringify(data);
        }
        const response = yield fetch(route, options);
        if (response.ok) {
            return response;
        }
        else {
            const errorMessage = yield response.text();
            throw new Error(errorMessage);
        }
    });
}
exports.fetchRestEndpoint = fetchRestEndpoint;
