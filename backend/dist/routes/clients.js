"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientController_1 = require("../controllers/clientController");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// @route   GET /api/clients
// @desc    Get all clients
// @access  Public
router.get('/', clientController_1.getClients);
// @route   POST /api/clients
// @desc    Create new client
// @access  Admin (for now, public for demo)
router.post('/', upload_1.upload.single('image'), upload_1.processImage, clientController_1.createClient);
// @route   GET /api/clients/:id
// @desc    Get single client
// @access  Public
router.get('/:id', clientController_1.getClient);
// @route   PUT /api/clients/:id
// @desc    Update client
// @access  Admin (for now, public for demo)
router.put('/:id', upload_1.upload.single('image'), upload_1.processImage, clientController_1.updateClient);
// @route   DELETE /api/clients/:id
// @desc    Delete client
// @access  Admin (for now, public for demo)
router.delete('/:id', clientController_1.deleteClient);
exports.default = router;
