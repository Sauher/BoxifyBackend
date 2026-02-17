const router = require("express").Router();
const {Box, operatorMap} = require("../models/index");
const {authenticate} = require("../middleware/auth_middleware");



router.get("/", async (req, res) => {
    Box.findAll()
        .then(Boxs => {
            res.json(Boxs);
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
    const Box = await Box.findByPk(id);
    if (Box) {
        res.json(Box);
    } else {
        res.status(404).json({ message: "Box not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        const Box = await Box.create(req.body);
        res.status(201).json(Box);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const Box = await Box.findByPk(id);
    if (!Box) {
        return res.status(404).json({ message: "Box not found" });
    }
    const updatedBox = await Box.update(req.body);
res.status(200).json(updatedBox);
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const Box = await Box.findByPk(id);
    if (!Box) {
        return res.status(404).json({ message: "Box not found" });
    }
    await Box.destroy();
    res.status(200).json({ message: "Box deleted successfully" });
});

module.exports = router;