const router = require("express").Router();
const {Boxitem, operatorMap} = require("../models/index");
const {authenticate} = require("../middleware/auth_middleware");



router.get("/", async (req, res) => {
    Boxitem.findAll()
        .then(boxitems => {
            res.json(boxitems);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Get Boxitems by field
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
        const Boxitems = await Boxitem.findAll({ where });
        res.status(200).json(Boxitems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const boxitem = await Boxitem.findByPk(id);
    if (boxitem) {
        res.json(boxitem);
    } else {
        res.status(404).json({ message: "Boxitem not found" });
    }
});

router.post("/",authenticate, async (req, res) => {
    try {
        const boxitem = await Boxitem.create(req.body);
        res.status(201).json(boxitem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const boxitem = await Boxitem.findByPk(id);
    if (!boxitem) {
        return res.status(404).json({ message: "Boxitem not found" });
    }
    const updatedBoxitem = await boxitem.update(req.body);
    res.status(200).json(updatedBoxitem);
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const boxitem = await Boxitem.findByPk(id);
    if (!boxitem) {
        return res.status(404).json({ message: "Boxitem not found" });
    }
    await boxitem.destroy();
    res.status(200).json({ message: "Boxitem deleted successfully" });
});

module.exports = router;