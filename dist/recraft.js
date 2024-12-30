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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = exports.RecraftGenerator = void 0;
var replicate_1 = require("replicate");
var dotenv_1 = require("dotenv");
var promises_1 = require("fs/promises");
var path_1 = require("path");
// Load environment variables
var result = dotenv_1.default.config();
if (result.error) {
    console.error('Error loading .env file:', result.error);
}
var RecraftGenerator = /** @class */ (function () {
    function RecraftGenerator() {
    }
    RecraftGenerator.generateImage = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var replicate, modelInput, output, err_1, response, buffer, _a, _b, err_2, error_1;
            var _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        console.log('Starting image generation with options:', {
                            prompt: options.prompt,
                            style: options.style,
                            width: options.width || RecraftGenerator.DEFAULT_OPTIONS.width,
                            height: options.height || RecraftGenerator.DEFAULT_OPTIONS.height,
                            num_outputs: options.num_outputs || RecraftGenerator.DEFAULT_OPTIONS.num_outputs,
                        });
                        if (!process.env.REPLICATE_API_TOKEN) {
                            throw new Error('REPLICATE_API_TOKEN is not set in environment variables');
                        }
                        console.log('Environment variables loaded, API token present');
                        try {
                            replicate = new replicate_1.default({
                                auth: process.env.REPLICATE_API_TOKEN,
                            });
                            console.log('Replicate client initialized successfully');
                        }
                        catch (error) {
                            console.error('Error initializing Replicate client:', error);
                            throw error;
                        }
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 12, , 13]);
                        console.log('Calling Recraft API with model: recraft-ai/recraft-v3');
                        modelInput = {
                            prompt: options.prompt,
                            style: options.style,
                            negative_prompt: options.negative_prompt,
                            width: options.width || RecraftGenerator.DEFAULT_OPTIONS.width,
                            height: options.height || RecraftGenerator.DEFAULT_OPTIONS.height,
                            num_outputs: options.num_outputs || RecraftGenerator.DEFAULT_OPTIONS.num_outputs,
                            scheduler: options.scheduler || RecraftGenerator.DEFAULT_OPTIONS.scheduler,
                            num_inference_steps: options.num_inference_steps || RecraftGenerator.DEFAULT_OPTIONS.num_inference_steps,
                            guidance_scale: options.guidance_scale || RecraftGenerator.DEFAULT_OPTIONS.guidance_scale,
                            seed: options.seed,
                        };
                        console.log('Model input:', modelInput);
                        return [4 /*yield*/, replicate.run("recraft-ai/recraft-v3", { input: modelInput })];
                    case 2:
                        output = _f.sent();
                        console.log('Received response from Recraft API:', output);
                        if (!output || !Array.isArray(output) || output.length === 0) {
                            throw new Error('No image URLs received from Recraft API');
                        }
                        if (!(options.folder && options.filename)) return [3 /*break*/, 11];
                        console.log("Saving image to ".concat(path_1.default.join(options.folder, options.filename), "..."));
                        _f.label = 3;
                    case 3:
                        _f.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, (0, promises_1.mkdir)(options.folder, { recursive: true })];
                    case 4:
                        _f.sent();
                        console.log('Created output directory:', options.folder);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _f.sent();
                        console.log('Directory already exists or error creating directory:', err_1.message);
                        return [3 /*break*/, 6];
                    case 6:
                        _f.trys.push([6, 10, , 11]);
                        console.log('Fetching image from URL:', output[0]);
                        return [4 /*yield*/, fetch(output[0])];
                    case 7:
                        response = _f.sent();
                        if (!response.ok) {
                            throw new Error("Failed to fetch image: ".concat(response.status, " ").concat(response.statusText));
                        }
                        _b = (_a = Buffer).from;
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 8:
                        buffer = _b.apply(_a, [_f.sent()]);
                        console.log('Image downloaded, size:', buffer.length, 'bytes');
                        return [4 /*yield*/, (0, promises_1.writeFile)(path_1.default.join(options.folder, options.filename), buffer)];
                    case 9:
                        _f.sent();
                        console.log('Image saved successfully');
                        return [3 /*break*/, 11];
                    case 10:
                        err_2 = _f.sent();
                        console.error('Error saving image:', err_2);
                        throw err_2;
                    case 11: return [2 /*return*/, output];
                    case 12:
                        error_1 = _f.sent();
                        console.error('Error in image generation process:', {
                            name: error_1.name,
                            message: error_1.message,
                            status: (_c = error_1.response) === null || _c === void 0 ? void 0 : _c.status,
                            statusText: (_d = error_1.response) === null || _d === void 0 ? void 0 : _d.statusText,
                            data: (_e = error_1.response) === null || _e === void 0 ? void 0 : _e.data,
                        });
                        // Log the full error object for debugging
                        console.error('Full error object:', JSON.stringify(error_1, null, 2));
                        throw error_1;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    RecraftGenerator.DEFAULT_OPTIONS = {
        width: 1024,
        height: 1024,
        num_outputs: 1,
        scheduler: "DPMSolverMultistep",
        num_inference_steps: 50,
        guidance_scale: 7.5,
    };
    return RecraftGenerator;
}());
exports.RecraftGenerator = RecraftGenerator;
exports.generateImage = RecraftGenerator.generateImage;
// CLI interface
if (process.argv[1] === import.meta.url) {
    var args = process.argv.slice(2);
    var options = {
        prompt: "",
    };
    console.log('Parsing command line arguments...');
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var nextArg = args[i + 1];
        switch (arg) {
            case '--prompt':
                options.prompt = nextArg;
                i++;
                break;
            case '--style':
                options.style = nextArg;
                i++;
                break;
            case '--negative-prompt':
                options.negative_prompt = nextArg;
                i++;
                break;
            case '--width':
                options.width = parseInt(nextArg);
                i++;
                break;
            case '--height':
                options.height = parseInt(nextArg);
                i++;
                break;
            case '--num-outputs':
                options.num_outputs = parseInt(nextArg);
                i++;
                break;
            case '--scheduler':
                options.scheduler = nextArg;
                i++;
                break;
            case '--num-inference-steps':
                options.num_inference_steps = parseInt(nextArg);
                i++;
                break;
            case '--guidance-scale':
                options.guidance_scale = parseFloat(nextArg);
                i++;
                break;
            case '--seed':
                options.seed = parseInt(nextArg);
                i++;
                break;
            case '--folder':
                options.folder = nextArg;
                i++;
                break;
            case '--filename':
                options.filename = nextArg;
                i++;
                break;
        }
    }
    console.log('Parsed options:', options);
    if (!options.prompt) {
        console.error('Error: --prompt is required');
        process.exit(1);
    }
    RecraftGenerator.generateImage(options)
        .then(function (urls) {
        console.log('Generated images:');
        urls.forEach(function (url) { return console.log(url); });
        console.log('Image generation completed successfully');
    })
        .catch(function (error) {
        console.error('Error in main process:', error.message);
        process.exit(1);
    });
}
