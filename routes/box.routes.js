const router = require("express").Router();
const {Box, operatorMap} = require("../models/index");
const {authenticate} = require("../middleware/auth_middleware");



router.get("/", async (req, res) => {
    Box.findAll()
        .then(Boxes => {
            res.json(Boxes);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Get Boxs by field
router.get("/:field/:op/:value", async (req, res) => {
    try{
        const { field, op, value } = req.params;
        
        if (!operatorMap[op]) {
            return res.status(400).json({ error: "Invalid operator" });
        }
        const where = {
            [field]: {
                [operatorMap[op]]: op === 'lk' ? `%${value}%` : value
            }
        }
        const Boxes = await Box.findAll({ where });
        res.status(200).json(Boxes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const box = await Box.findByPk(id);
    if (box) {
        res.json(box);
    } else {
        res.status(404).json({ message: "Box not found" });
    }
});

router.post("/",authenticate, async (req, res) => {
    try {
    const box = await Box.create(req.body);
    res.status(201).json(box);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const box = await Box.findByPk(id);
    if (!box) {
        return res.status(404).json({ message: "Box not found" });
    }
    const updatedBox = await box.update(req.body);
    res.status(200).json(updatedBox);
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const box = await Box.findByPk(id);
    if (!box) {
        return res.status(404).json({ message: "Box not found" });
    }
    await box.destroy();
    res.status(200).json({ message: "Box deleted successfully" });
});

module.exports = router;