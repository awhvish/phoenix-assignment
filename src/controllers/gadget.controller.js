import db from '../lib/db.js';

export const getGadgetController = async (req, res) => {
  try {
    const gadgets = await db.gadget.findMany();
    res.status(200).json(gadgets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching gadgets', error: error });
  }
};

export const postGadgetController = async (req, res) => {
  const { name, status } = req.body;
  if (
    status != 'Available' &&
    status != 'Deployed' &&
    status != 'Destroyed' &&
    status != 'Decommissioned'
  ) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const success_probability = parseFloat((Math.random() * 100).toFixed(2));

  existingGadget = await db.gadget.findUnique({ where: { name } });

  if (existingGadget) {
    res.status(400).json({ message: 'Gadget with this name already exists' });
    return;
  }

  try {
    const newGadget = await db.gadget.create({
      data: {
        name,
        status,
        success_probability,
      },
    });

    res.status(201).json(newGadget);
  } catch (error) {
    res.status(400).json({ message: 'Error creating gadget', error: error });
  }
};

export const updateGadgetController = async (req, res) => {};

export const deleteGadgetController = async (req, res) => {};

export const destroyGadgetController = async (req, res) => {};
