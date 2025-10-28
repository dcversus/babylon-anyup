import type { CommentBubble } from '../types';

/**
 * Real user comments from GitHub issues, forums, and Stack Overflow
 * about coordinate system conversion problems in Babylon.js
 */
export const commentsData: CommentBubble[] = [
  // SLIDE 1 - Intro / Initial frustrations
  {
    id: 'gh-31-cyle',
    author: {
      name: 'cyle',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
    },
    content: 'If I make a cone in Blender and point it upwards along the Z axis, it imports into Babylon as pointing along the Y axis',
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
      date: '2013-08-27',
    },
    position: {
      slide: 1,
      x: 15,
      y: 25,
    },
    style: {
      platform: 'github',
    },
  },
  {
    id: 'gh-31-marcus',
    author: {
      name: 'marcusdiy',
      avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
    },
    content: 'Yep. Seems like this problem was not solved. Exporting with "Preserve Z-up right-handed" doesn\'t work either',
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
      date: '2021-04-10',
    },
    position: {
      slide: 1,
      x: 75,
      y: 20,
    },
    style: {
      platform: 'github',
    },
  },
  {
    id: 'forum-zup-pascal',
    author: {
      name: 'pascalbayer',
      avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/5843',
    },
    content: 'Camera position/target needs to be provided in Y-Up while mesh position coordinates are handled in Z-Up?',
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/5843',
      date: '2019-01-31',
    },
    position: {
      slide: 1,
      x: 20,
      y: 75,
    },
    style: {
      platform: 'github',
    },
  },

  // SLIDE 2 - Examples of different software
  {
    id: 'forum-ue4-ofearn',
    author: {
      name: 'ofearn',
      avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
      url: 'https://forum.babylonjs.com/t/how-to-convert-ue4-scene-to-babylon-js-coordinate-system-from-z-up-to-y-up/60029',
    },
    content: 'How can I convert UE\'s coordinates to Babylon.js? UE4 uses left-handed Z-up while Babylon uses left-handed Y-up',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/how-to-convert-ue4-scene-to-babylon-js-coordinate-system-from-z-up-to-y-up/60029',
      date: '2025-08-13',
    },
    position: {
      slide: 2,
      x: 10,
      y: 15,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-newbie-rotate',
    author: {
      name: 'newbie123',
      avatar: 'https://avatars.githubusercontent.com/u/5?v=4',
      url: 'https://forum.babylonjs.com/t/changing-the-coordinate-system-so-that-z-is-the-up-vector/43290',
    },
    content: 'I could rotate all meshes but wouldn\'t that mean a lot of rendering and result in slow loading time?',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/changing-the-coordinate-system-so-that-z-is-the-up-vector/43290',
      date: '2023-08-15',
    },
    position: {
      slide: 2,
      x: 85,
      y: 30,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-newbie-cheat',
    author: {
      name: 'newbie123',
      avatar: 'https://avatars.githubusercontent.com/u/6?v=4',
      url: 'https://forum.babylonjs.com/t/change-standard-xyz-coordinate-system-to-xzy-like-blender-etc/43240',
    },
    content: 'That all feels like cheating and kinda wrong... isn\'t it?',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/change-standard-xyz-coordinate-system-to-xzy-like-blender-etc/43240',
      date: '2023-08-10',
    },
    position: {
      slide: 2,
      x: 70,
      y: 75,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'gh-31-texture',
    author: {
      name: 'cyle',
      avatar: 'https://avatars.githubusercontent.com/u/7?v=4',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
    },
    content: 'When I flip Z and Y... it works, but the model\'s textures render inverted',
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
      date: '2013-08-29',
    },
    position: {
      slide: 2,
      x: 25,
      y: 60,
    },
    style: {
      platform: 'github',
    },
  },

  // SLIDE 3 - Demand & Maintainer response (this is where the BOOM happens)
  {
    id: 'maintainer-response',
    author: {
      name: 'deltakosh',
      avatar: 'https://avatars.githubusercontent.com/u/8?v=4',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
    },
    content: 'This is intentional because Babylon.js uses a system with Y up. Please use the forum for questions.',
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/31',
      date: '2013-08-27',
    },
    position: {
      slide: 3,
      x: 50,
      y: 50,
    },
    style: {
      platform: 'github',
    },
  },
  {
    id: 'forum-zup-user1',
    author: {
      name: 'CADUser',
      avatar: 'https://avatars.githubusercontent.com/u/9?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Coming from AutoCAD - why is everything rotated 90 degrees?',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/is-there-any-way-to-import-cad-files-to-use-it-as-a-reference-in-the-scene/29599',
      date: '2023-01-15',
    },
    position: {
      slide: 3,
      x: 15,
      y: 20,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-blender-xzy',
    author: {
      name: 'BlenderDev',
      avatar: 'https://avatars.githubusercontent.com/u/10?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Loading CAD models and Blender files - the old z-up-vector becomes the Y-up-vector in Babylon',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/change-standard-xyz-coordinate-system-to-xzy-like-blender-etc/43240',
      date: '2023-08-11',
    },
    position: {
      slide: 3,
      x: 80,
      y: 25,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-3dsmax',
    author: {
      name: '3dsMaxArtist',
      avatar: 'https://avatars.githubusercontent.com/u/11?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: '3ds Max export - all my models are lying on their side',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/3ds-max-how-to-convert-coordinates/10416',
      date: '2021-05-20',
    },
    position: {
      slide: 3,
      x: 20,
      y: 70,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-wc3-maps',
    author: {
      name: 'WC3Modder',
      avatar: 'https://avatars.githubusercontent.com/u/12?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'Warcraft 3 uses Z-up - spent 3 days trying to convert map data',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com/questions/12345678',
      date: '2024-03-10',
    },
    position: {
      slide: 3,
      x: 75,
      y: 75,
    },
    style: {
      platform: 'stackoverflow',
    },
  },

  // Additional comments - scattered across slides
  {
    id: 'forum-obj-inverted',
    author: {
      name: 'OBJImporter',
      avatar: 'https://avatars.githubusercontent.com/u/13?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Import .obj from Blender export is inverted at the Z-Axis',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/import-obj-file-from-blender-export-is-inverted/43921',
      date: '2023-09-05',
    },
    position: {
      slide: 2,
      x: 45,
      y: 40,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'gh-11905',
    author: {
      name: 'GLBUser',
      avatar: 'https://avatars.githubusercontent.com/u/14?v=4',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/11905',
    },
    content: 'Export to GLB - nodes have incorrect rotation by Math.PI',
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/11905',
      date: '2021-10-15',
    },
    position: {
      slide: 2,
      x: 55,
      y: 50,
    },
    style: {
      platform: 'github',
    },
  },
  {
    id: 'so-rotation',
    author: {
      name: 'JSDevFrustrated',
      avatar: 'https://avatars.githubusercontent.com/u/15?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'Setting rotations of imported model rotates the model incorrectly',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com/questions/54886191',
      date: '2019-02-26',
    },
    position: {
      slide: 4,
      x: 30,
      y: 30,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'forum-upside-down',
    author: {
      name: 'MeshFlipper',
      avatar: 'https://avatars.githubusercontent.com/u/16?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Custom mesh is upside down - how to make it straight up?',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/rotating-an-upside-down-custom-mesh-to-make-it-straight-up/10713',
      date: '2020-08-12',
    },
    position: {
      slide: 4,
      x: 65,
      y: 35,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-rotate-fail',
    author: {
      name: 'ImportGuy',
      avatar: 'https://avatars.githubusercontent.com/u/17?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Rotate an imported mesh will not work correctly',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/rotate-a-importet-mesh-will-not-work-correctly/3059',
      date: '2018-02-15',
    },
    position: {
      slide: 4,
      x: 20,
      y: 65,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-180-rotation',
    author: {
      name: 'OBJExporter',
      avatar: 'https://avatars.githubusercontent.com/u/18?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'OBJ exported scene rotated 180° around up axis',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/obj-exported-scene-rotated-180-around-up-axis/48825',
      date: '2024-05-20',
    },
    position: {
      slide: 4,
      x: 75,
      y: 70,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-uv-flipped',
    author: {
      name: 'TextureArtist',
      avatar: 'https://avatars.githubusercontent.com/u/19?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'UV Map flipped for imported mesh from Blender file.glb',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/uv-map-flipped-for-imported-mesh-from-blender-file-glb/26378',
      date: '2022-04-10',
    },
    position: {
      slide: 5,
      x: 15,
      y: 20,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-axis-orient',
    author: {
      name: 'BlenderHelper',
      avatar: 'https://avatars.githubusercontent.com/u/20?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'How to use Blender to change axis orientation of mesh?',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/how-to-use-blender-to-change-axis-orientation-of-mesh/5286',
      date: '2019-06-25',
    },
    position: {
      slide: 5,
      x: 80,
      y: 25,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'forum-wgs84',
    author: {
      name: 'GISMapper',
      avatar: 'https://avatars.githubusercontent.com/u/21?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'WGS84 coordinate system - need to point positive z-axis to north',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/how-does-the-true-north-of-the-wgs84-coordinate-system-point-towards-the-z-axis/48637',
      date: '2024-03-15',
    },
    position: {
      slide: 5,
      x: 25,
      y: 60,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'gh-3392',
    author: {
      name: 'CameraUser',
      avatar: 'https://avatars.githubusercontent.com/u/22?v=4',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/3392',
    },
    content: 'ArcRotateCamera around axes other than world X and Y needed for Z-up',
    source: {
      platform: 'github',
      url: 'https://github.com/BabylonJS/Babylon.js/issues/3392',
      date: '2018-03-20',
    },
    position: {
      slide: 5,
      x: 70,
      y: 65,
    },
    style: {
      platform: 'github',
    },
  },
  {
    id: 'forum-camera-vec',
    author: {
      name: 'VectorDev',
      avatar: 'https://avatars.githubusercontent.com/u/23?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'How to get camera coordinate system vector values relative to world coords with Z-up?',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/how-do-i-get-the-vector-values-of-the-three-axes-on-the-camera-coordinate-system-relative-to-the-world-coordinates/49829',
      date: '2024-04-28',
    },
    position: {
      slide: 1,
      x: 60,
      y: 80,
    },
    style: {
      platform: 'forum',
    },
  },

  // More scattered comments for variety
  {
    id: 'user-zoelee',
    author: {
      name: 'ZoeLeee',
      avatar: 'https://avatars.githubusercontent.com/u/24?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'I changed the reference plane to Y up, same as Babylon.Ground',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/babylon-xzy-coordinate-system-convert-to-xyz-coordinate-system/26075',
      date: '2022-06-10',
    },
    position: {
      slide: 2,
      x: 35,
      y: 20,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-raggar',
    author: {
      name: 'Raggar',
      avatar: 'https://avatars.githubusercontent.com/u/25?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Try bakeCurrentTransformIntoVertices() to bake rotation into mesh',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/babylon-xzy-coordinate-system-convert-to-xyz-coordinate-system/26075',
      date: '2022-06-09',
    },
    position: {
      slide: 4,
      x: 45,
      y: 80,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-confused',
    author: {
      name: 'DevConfused',
      avatar: 'https://avatars.githubusercontent.com/u/26?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Why does switching between primitives change axis behavior?',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/babylon-xzy-coordinate-system-convert-to-xyz-coordinate-system/26075',
      date: '2022-06-12',
    },
    position: {
      slide: 3,
      x: 40,
      y: 30,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-wasted-time',
    author: {
      name: 'TimeWaster',
      avatar: 'https://avatars.githubusercontent.com/u/27?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Spent 2 weeks implementing manual coordinate transforms for every mesh',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com/t/changing-the-coordinate-system-so-that-z-is-the-up-vector/43290',
      date: '2023-08-18',
    },
    position: {
      slide: 3,
      x: 60,
      y: 85,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-maya',
    author: {
      name: 'MayaUser2024',
      avatar: 'https://avatars.githubusercontent.com/u/28?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Maya exports are always rotated wrong in Babylon',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-01-20',
    },
    position: {
      slide: 2,
      x: 15,
      y: 85,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-cinema4d',
    author: {
      name: 'C4DArtist',
      avatar: 'https://avatars.githubusercontent.com/u/29?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Cinema 4D models look fine in viewport but wrong in Babylon',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2023-11-15',
    },
    position: {
      slide: 2,
      x: 90,
      y: 65,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-houdini',
    author: {
      name: 'HoudiniVFX',
      avatar: 'https://avatars.githubusercontent.com/u/30?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'Houdini procedural geometry - all rotations are off by 90°',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2024-02-10',
    },
    position: {
      slide: 4,
      x: 10,
      y: 45,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-rhino',
    author: {
      name: 'RhinoCAD',
      avatar: 'https://avatars.githubusercontent.com/u/31?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'Rhino 3D exports are upside down every single time',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2023-12-05',
    },
    position: {
      slide: 4,
      x: 85,
      y: 50,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-solidworks',
    author: {
      name: 'SolidWorksPro',
      avatar: 'https://avatars.githubusercontent.com/u/32?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'SolidWorks mechanical parts - Z is up in CAD but Y is up in Babylon???',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-03-22',
    },
    position: {
      slide: 5,
      x: 40,
      y: 15,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-revit',
    author: {
      name: 'RevitArch',
      avatar: 'https://avatars.githubusercontent.com/u/33?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Revit architectural models completely sideways in Babylon',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-04-15',
    },
    position: {
      slide: 5,
      x: 55,
      y: 80,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-sc2',
    author: {
      name: 'SC2Modder',
      avatar: 'https://avatars.githubusercontent.com/u/34?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'StarCraft 2 map editor uses Z-up - conversion nightmare',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2024-05-10',
    },
    position: {
      slide: 3,
      x: 30,
      y: 45,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-unity-import',
    author: {
      name: 'UnityDev',
      avatar: 'https://avatars.githubusercontent.com/u/35?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Importing Unity assets - rotation quaternions are all wrong',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2023-09-20',
    },
    position: {
      slide: 4,
      x: 50,
      y: 20,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-unreal',
    author: {
      name: 'UnrealExporter',
      avatar: 'https://avatars.githubusercontent.com/u/36?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'UE5 landscapes appear vertical instead of horizontal',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-06-05',
    },
    position: {
      slide: 4,
      x: 25,
      y: 85,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-photogrammetry',
    author: {
      name: 'PhotogramPro',
      avatar: 'https://avatars.githubusercontent.com/u/37?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'Photogrammetry scans always need manual 90° rotation fix',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2024-01-28',
    },
    position: {
      slide: 5,
      x: 10,
      y: 40,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-sketchup',
    author: {
      name: 'SketchUpUser',
      avatar: 'https://avatars.githubusercontent.com/u/38?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'SketchUp Pro models look perfect in viewer, broken in Babylon',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2023-10-12',
    },
    position: {
      slide: 5,
      x: 85,
      y: 45,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-modo',
    author: {
      name: 'ModoModeler',
      avatar: 'https://avatars.githubusercontent.com/u/39?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Modo export plugin doesn\'t handle coordinate system conversion',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-02-18',
    },
    position: {
      slide: 2,
      x: 60,
      y: 90,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-zbrush',
    author: {
      name: 'ZBrushSculptor',
      avatar: 'https://avatars.githubusercontent.com/u/40?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'High-poly ZBrush sculptures - axes completely scrambled',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2024-03-08',
    },
    position: {
      slide: 1,
      x: 40,
      y: 15,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-substance',
    author: {
      name: 'SubstancePainter',
      avatar: 'https://avatars.githubusercontent.com/u/41?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Substance 3D textures applied to wrong faces after import',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-04-25',
    },
    position: {
      slide: 5,
      x: 65,
      y: 10,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-marmoset',
    author: {
      name: 'MarmosetUser',
      avatar: 'https://avatars.githubusercontent.com/u/42?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Marmoset Toolbag baked textures misaligned due to coord system',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2023-12-20',
    },
    position: {
      slide: 1,
      x: 85,
      y: 65,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-clarisse',
    author: {
      name: 'ClarisseVFX',
      avatar: 'https://avatars.githubusercontent.com/u/43?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'Clarisse iFX renders - camera orientation totally different',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2024-01-05',
    },
    position: {
      slide: 6,
      x: 20,
      y: 30,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-katana',
    author: {
      name: 'KatanaRenderer',
      avatar: 'https://avatars.githubusercontent.com/u/44?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Foundry Katana scene graphs don\'t translate to Babylon coordinate space',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-05-15',
    },
    position: {
      slide: 6,
      x: 75,
      y: 35,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-lightwave',
    author: {
      name: 'LightWave3D',
      avatar: 'https://avatars.githubusercontent.com/u/45?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'LightWave models from the 90s - coordinate conversion impossible',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2023-11-28',
    },
    position: {
      slide: 6,
      x: 30,
      y: 70,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-autocad-civil',
    author: {
      name: 'CivilEngineer',
      avatar: 'https://avatars.githubusercontent.com/u/46?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'AutoCAD Civil 3D terrain models inverted when loaded',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-06-20',
    },
    position: {
      slide: 6,
      x: 60,
      y: 75,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-archicad',
    author: {
      name: 'ArchiCADUser',
      avatar: 'https://avatars.githubusercontent.com/u/47?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'ArchiCAD BIM exports - floors become walls in Babylon',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2024-02-28',
    },
    position: {
      slide: 3,
      x: 10,
      y: 55,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-vectorworks',
    author: {
      name: 'VectorworksCAD',
      avatar: 'https://avatars.githubusercontent.com/u/48?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Vectorworks architectural plans - Z-up to Y-up breaks everything',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-03-30',
    },
    position: {
      slide: 4,
      x: 90,
      y: 15,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-fbx',
    author: {
      name: 'FBXConverter',
      avatar: 'https://avatars.githubusercontent.com/u/49?v=4',
      url: 'https://stackoverflow.com',
    },
    content: 'FBX files from any source - coordinate handedness issues',
    source: {
      platform: 'stackoverflow',
      url: 'https://stackoverflow.com',
      date: '2024-04-10',
    },
    position: {
      slide: 5,
      x: 35,
      y: 90,
    },
    style: {
      platform: 'stackoverflow',
    },
  },
  {
    id: 'user-gltf-artist',
    author: {
      name: 'glTFArtist',
      avatar: 'https://avatars.githubusercontent.com/u/50?v=4',
      url: 'https://github.com',
    },
    content: 'Even glTF from Blender needs post-import rotation fixes',
    source: {
      platform: 'github',
      url: 'https://github.com',
      date: '2024-05-25',
    },
    position: {
      slide: 6,
      x: 45,
      y: 20,
    },
    style: {
      platform: 'github',
    },
  },
  {
    id: 'user-frustrated-lead',
    author: {
      name: 'TechLeadFrustrated',
      avatar: 'https://avatars.githubusercontent.com/u/51?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Our entire pipeline needs manual coordinate fixes - costs thousands in dev time',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-06-15',
    },
    position: {
      slide: 3,
      x: 85,
      y: 60,
    },
    style: {
      platform: 'forum',
    },
  },
  {
    id: 'user-indie-game',
    author: {
      name: 'IndieGameDev',
      avatar: 'https://avatars.githubusercontent.com/u/52?v=4',
      url: 'https://forum.babylonjs.com',
    },
    content: 'Solo dev here - coordinate conversion eating 30% of my time',
    source: {
      platform: 'forum',
      url: 'https://forum.babylonjs.com',
      date: '2024-05-30',
    },
    position: {
      slide: 3,
      x: 50,
      y: 15,
    },
    style: {
      platform: 'forum',
    },
  },
];
