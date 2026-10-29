import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import Certificate from '../models/Certificate.js';

const router = Router();

// Demo endpoint: in a real LMS, completion must be verified server-side against lesson/quiz progress.
router.post('/', async (req, res) => {
  try {
    const studentName = String(req.body.studentName || '').trim();
    const courseTitle = String(req.body.courseTitle || '').trim();
    if (!studentName || !courseTitle) {
      return res.status(400).json({ message: 'Student name and course title are required.' });
    }
    const certificate = await Certificate.create({
      certificateId: `CM-${randomUUID().split('-')[0].toUpperCase()}-${Date.now().toString().slice(-6)}`,
      studentName,
      courseTitle,
      completionDate: new Date()
    });
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Could not create certificate.', detail: error.message });
  }
});

router.get('/verify/:certificateId', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.certificateId });
    if (!certificate) return res.status(404).json({ valid: false, message: 'Certificate not found.' });
    if (certificate.status !== 'valid') {
      return res.status(200).json({ valid: false, message: 'This certificate has been revoked.', certificate });
    }
    res.json({ valid: true, message: 'Certificate verified successfully.', certificate });
  } catch {
    res.status(500).json({ message: 'Verification failed.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 }).limit(100);
    res.json(certificates);
  } catch {
    res.status(500).json({ message: 'Could not load certificates.' });
  }
});

export default router;
