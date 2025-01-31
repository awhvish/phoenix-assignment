import db from '../lib/db.js';

const gadgetNames = [
  'The Kraken',
  'Nightangle',
  'Phantom Viper',
  'Ironclad Titan',
  'Echo Pulse',
  'Stealth Hawk',
  'Nebula Rider',
  'Vortex Spear',
  'Quantum Fury',
  'Rogue Shadow',
  'Stellar Blaze',
  'Thunderstrike X',
  'Shadow Serpent',
  'Nova Striker',
  'Tempest Fury',
  'Viperfang',
  'Solar Flare',
  'Dark Horizon',
  'Spectral Phantom',
  'Iron Vortex',
  'Echo Reaper',
  'Celestial Wrath',
  'Radiant Storm',
  'Nebula Ghost',
  'Blackout Enigma',
  'Titan Reborn',
  'Cosmic Titan',
  'Stealth Seraph',
  'Inferno Burst',
  'Chaos Striker',
];

export const getGadgetController = async (req, res) => {
  const { status } = req.query;

  if (status && !['Available', 'Deployed', 'Destroyed', 'Decommissioned'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const filter = status ? { status } : {};

  try {
    const gadgets = await db.gadget.findMany({ where: filter });
    res.status(200).json(gadgets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching gadgets', error: error });
  }
};

export const postGadgetController = async (req, res) => {
  let { name, status } = req.body;

  if (status && !['Available', 'Deployed', 'Destroyed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  if (!name) {
    name = gadgetNames[Math.floor(Math.random() * gadgetNames.length)];
  }

  const success_probability = parseFloat((Math.random() * 100).toFixed(2));

  const existingGadget = await db.gadget.findUnique({ where: { name } });

  if (existingGadget) {
    return res.status(400).json({ message: 'You already have a gadget with this name' });
  }

  const newGadget = await db.gadget.create({
    data: {
      name,
      status: status || 'Available',
      success_probability,
    },
  });

  return res.status(201).json({ message: 'Gadget created successfully!', gadget: newGadget });
};

export const updateGadgetController = async (req, res) => {
  const { id, name, status } = req.body;
  try {
    const gadget = await db.gadget.findUnique({ where: { id } });
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }
    const updatedGadget = await db.gadget.update({
      where: { id },
      data: {
        name: name || gadget.name,
        status: status || gadget.status,
      },
    });
    return res.status(200).json({ message: 'Gadget updated successfully', gadget: updatedGadget });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating gadget', error: error.message });
  }
};

export const deleteGadgetController = async (req, res) => {
  const { id } = req.params;

  try {
    const gadget = await db.gadget.findUnique({ where: { id } });

    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }

    if (gadget.status === 'Decommissioned') {
      return res.status(400).json({ message: 'Gadget already decommissioned' });
    }

    const updatedGadget = await db.gadget.update({
      where: { id },
      data: {
        status: 'Decommissioned',
        decommissionedAt: new Date(),
      },
    });

    return res.status(200).json({
      message: 'Gadget decommissioned successfully',
      gadget: updatedGadget,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error decommissioning gadget', error: error.message });
  }
};

export const destroyGadgetController = async (req, res) => {
  const { id } = req.params;
  try {
    const gadget = await db.gadget.findUnique({ where: { id } });
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }

    if (gadget.status === 'Destroyed') {
      return res.status(400).json({ message: 'Gadget already destroyed' });
    }

    const destroyedGadget = await db.gadget.update({
      where: { id },
      data: {
        status: 'Destroyed',
        destroyedAt: new Date(),
      },
    });
    return res.status(200).json({ message: 'Gadget destroyed successfully', destroyedGadget });
  } catch (error) {
    return res.status(500).json({ message: 'Error destroying gadget', error: error.message });
  }
};
