import express from 'express';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import Photo from '../models/Photo';
import permit from '../middleware/permit';

const photosRouter = express.Router();

photosRouter.get('/', async (req, res, next) => {
  try {
    const photos = await Photo.find();
    return res.send(photos);
  } catch (error) {
    return next(error);
  }
});

photosRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const photo = await Photo.create({
      user: req.user?._id,
      title: req.body.title,
      image: req.file?.filename,
    });

    return res.send(photo);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

photosRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid photo ID' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).send({ error: 'Photo not found' });
    }

    if (req.user.role !== 'admin' && !photo.user.equals(req.user._id)) {
      return res.status(403).send({ error: "You don't have permission to delete this photo!" });
    }

    await Photo.findByIdAndDelete(id);

    return res.send({ message: 'Photo deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default photosRouter;
