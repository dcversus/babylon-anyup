import type { CommentBubble } from '../types';

export const commentsData: CommentBubble[] = [
  {
    id: 'comment-1',
    author: {
      name: 'GameDev123',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      url: 'https://github.com/gamedev123',
    },
    content: 'Is there any way to use Z-up coordinates with Babylon.js? Coming from Blender and everything is sideways...',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-01-15',
    },
    position: {
      slide: 1,
      x: 75,
      y: 20,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'comment-2',
    author: {
      name: '3DArtist',
      avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
      url: 'https://github.com/3dartist',
    },
    content: "Why doesn't Babylon.js support Z-up like Blender and most 3D software?",
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues',
      date: '2024-02-20',
    },
    position: {
      slide: 2,
      x: 80,
      y: 15,
    },
    style: {
      platform: 'github',
    },
  },
  {
    id: 'comment-3',
    author: {
      name: 'MapMaker',
      avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
      url: 'https://stackoverflow.com/users/123456',
    },
    content: 'Need to convert Warcraft 3 maps to Babylon.js but coordinate system is completely different',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com/questions/12345678',
      date: '2024-03-10',
    },
    position: {
      slide: 2,
      x: 70,
      y: 70,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'comment-4',
    author: {
      name: 'BabylonMaintainer',
      avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
      url: 'https://github.com/babylonmaintainer',
    },
    content: "We have no plans to support Z-up coordinate systems natively. You'll need to transform your assets manually.",
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues',
      date: '2024-03-15',
    },
    position: {
      slide: 3,
      x: 50,
      y: 60,
    },
    style: {
      platform: 'github',
    },
  },
];
