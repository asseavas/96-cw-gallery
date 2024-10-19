import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Photo from './models/Photo';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('photos');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [user, alice, admin] = await User.create(
    {
      username: 'user@gmail.local',
      password: '1nkn$jb',
      confirmPassword: '1nkn$jb',
      role: 'user',
      displayName: 'User',
      avatar: 'fixtures/user-avatar.jpeg',
      token: crypto.randomUUID(),
    },
    {
      username: 'cat@gmail.local',
      password: '443nLjb_0',
      confirmPassword: '443nLjb_0',
      role: 'user',
      displayName: 'Alice',
      avatar: null,
      token: crypto.randomUUID(),
    },
    {
      username: 'admin@gmail.local',
      password: 'ved67#slm',
      confirmPassword: 'ved67#slm',
      role: 'admin',
      displayName: 'Admin',
      avatar: 'fixtures/admin-avatar.jpeg',
      token: crypto.randomUUID(),
    },
  );

  await Photo.create(
    {
      user: user,
      title: 'Coraline',
      image: 'fixtures/coraline.jpg',
    },
    {
      user: user,
      title: 'Evening city lights',
      image: 'fixtures/city.jpg',
    },
    {
      user: user,
      title: 'Soon...',
      image: 'fixtures/winter.jpg',
    },
    {
      user: alice,
      title: 'Cozy autumn vibes',
      image: 'fixtures/autumn.jpg',
    },
    {
      user: admin,
      title: 'Death',
      image: 'fixtures/death.jpg',
    },
    {
      user: admin,
      title: 'Art',
      image: 'fixtures/art.jpg',
    },
    {
      user: admin,
      title: 'Are you afraid of spiders?',
      image: 'fixtures/spider.jpg',
    },
  );

  await db.close();
};

run().catch(console.error);
