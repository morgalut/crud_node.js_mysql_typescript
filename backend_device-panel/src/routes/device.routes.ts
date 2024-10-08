// src/routes/device.routes.ts
import express from 'express';
import Device from '../models/device.model';

const router = express.Router();

// Get all devices
router.get('/devices', async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});

// Add a new device
router.post('/devices', async (req, res) => {
  const { deviceName, serialNumber } = req.body;

  try {
    const newDevice = await Device.create({ deviceName, serialNumber });
    res.status(201).json(newDevice);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(400).json({ message: errorMessage });
  }
});

// Edit a device
router.put('/devices/:id', async (req, res) => {
  const { id } = req.params;
  const { deviceName, serialNumber } = req.body;

  try {
    const [updatedRows] = await Device.update(
      { deviceName, serialNumber },
      { where: { id } }
    );
    if (updatedRows === 0) {
      res.status(404).json({ message: 'Device not found' });
    } else {
      const updatedDevice = await Device.findByPk(id);
      res.json(updatedDevice);
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(400).json({ message: errorMessage });
  }
});

// Delete a device
router.delete('/devices/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Device.destroy({ where: { id } });
    if (deletedRows === 0) {
      res.status(404).json({ message: 'Device not found' });
    } else {
      res.json({ message: 'Device deleted' });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
});

export default router;
