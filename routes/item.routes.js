const router = require("express").Router();
const {Item, operatorMap} = require("../models/index");
const {authenticate} = require("../middleware/auth_middleware");


router.get("/", async (req, res) => {
    Item.findAll()
        .then(Items => {
            res.json(Items);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Get Items by field
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
        const Items = await Item.findAll({ where });
        res.status(200).json(Items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const Item = await Item.findByPk(id);
    if (Item) {
        res.json(Item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        const Item = await Item.create(req.body);
        res.status(201).json(Item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const Item = await Item.findByPk(id);
    if (!Item) {
        return res.status(404).json({ message: "Item not found" });
    }
    const updatedItem = await Item.update(req.body);
res.status(200).json(updatedItem);
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const Item = await Item.findByPk(id);
    if (!Item) {
        return res.status(404).json({ message: "Item not found" });
    }
    await Item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
});

module.exports = router;