export const site = {
  name: 'Asmit Vishwakarma',
  role: 'UI/UX Designer · Developer · 3D Artist',
  email: 'asmitbv@gmail.com',
  phone: '+91 8356057791',
  phoneHref: '+918356057791',
  location: 'Naigaon West, Mumbai, Maharashtra, India',
  resumeUrl:
    'https://drive.google.com/file/d/1IWvd51mjmcJmk07wssJ0h92zq18LiNz2/view?usp=sharing',
};

export const navLinks = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Work', href: '#projects', section: 'projects' },
];

export const dockLinks = [
  { href: '#home', section: 'home', icon: 'fa-house', label: 'Home' },
  { href: '#experience', section: 'experience', icon: 'fa-briefcase', label: 'Experience' },
  { href: '#about', section: 'about', icon: 'fa-user', label: 'About' },
  { href: '#projects', section: 'projects', icon: 'fa-layer-group', label: 'Work' },
];

export const roles = [
  {
    num: '01',
    name: 'UI/UX Designer',
    tags: 'Figma · Research · Prototyping',
    filter: 'ui-ux',
  },
  {
    num: '02',
    name: 'Graphic Designer',
    tags: 'Photoshop · Illustrator · Branding',
    filter: 'graphic',
  },
  {
    num: '03',
    name: 'Developer',
    tags: 'Web · Flutter · JavaScript',
    filter: 'developer',
  },
  {
    num: '04',
    name: '3D Artist',
    tags: 'Blender · Modeling · Rendering',
    filter: '3d',
  },
];

export const marqueeItems = [
  'UI/UX Design',
  'Graphic Design',
  'Web Development',
  '3D Artistry',
  'Prototyping',
  'Branding',
  'Visual Design',
  'Creative Code',
];

export const skills = [
  { name: 'Figma', icon: '/Media/figms.png' },
  { name: 'Photoshop', icon: '/Media/photoshop-40.svg' },
  { name: 'Illustrator', icon: '/Media/illustrator.svg' },
  { name: 'Canva', icon: '/Media/Canva.png' },
  { name: 'Blender', icon: '/Media/blender.png' },
];

export const socials = [
  { label: 'LinkedIn', icon: 'fa-linkedin-in', href: 'https://www.linkedin.com/in/asmit-vishwakarma-5b3629259/' },
  { label: 'GitHub', icon: 'fa-github', href: 'https://github.com/Asmitbv21' },
  { label: 'Dribbble', icon: 'fa-dribbble', href: 'https://dribbble.com/asmitbv' },
];

export const projectFilters = [
  { label: 'All Projects', value: 'all' },
  { label: 'UI/UX', value: 'ui-ux' },
  { label: 'Graphic Design', value: 'graphic' },
  { label: '3D Art', value: '3d' },
  { label: 'Development', value: 'developer' },
];

export const projects = [
  {
    id: 'ui-redesign',
    category: 'ui-ux',
    title: 'UI Redesign of Applications',
    modalTitle: 'UI Redesign of Applications',
    summary: 'Redesigning applications as per trending styles',
    description: 'Redesigning applications as per trending styles',
    image: '/Media/Final_2-web.jpg',
    alt: 'UI Redesign of applications',
    tags: ['#figma', '#app', '#ui/ux'],
  },
  {
    id: 'neumorphic',
    category: 'ui-ux',
    title: 'Neumorphic Style Design',
    modalTitle: 'Neumorphic Style Design',
    summary: 'Style to show shadow and light glow effect',
    description:
      'Use of the Neumorphic Style Design for visualizing light and shadow to create a 3D looking design',
    image: '/Media/Frame 13-web.jpg',
    alt: 'Neumorphic style design',
    tags: ['#figma', '#illustrator', '#design'],
  },
  {
    id: 'attendance-app',
    category: 'ui-ux',
    title: 'Redesign Of Attendance App',
    modalTitle: 'Redesign Of Attendance App',
    summary: 'Redesigning the attendance app using Figma',
    description:
      'The project is about redesigning an attendance app using Figma with modern UI principles',
    image: '/Media/Project-web.jpg',
    alt: 'Attendance app redesign',
    tags: ['#figma', '#ui/ux', '#trending'],
  },
  {
    id: 'mumbai-train',
    category: '3d',
    title: '3D Modeling , Mumbai Local Train',
    modalTitle: '3D Modeling - Mumbai Local Train',
    summary: 'Using Blender I created a 3D model of the Mumbai Local Train',
    description:
      'By observing the structure and clicking many photos for reference, this 3D model of train was made using Blender',
    image: '/Media/Train 4-web.jpg',
    alt: '3D model of Mumbai local train',
    tags: ['#blender', '#render', '#3dmodel'],
  },
  {
    id: 'miniature-house',
    category: '3d',
    title: '3D Modeling , Miniature House',
    modalTitle: '3D Modeling - Miniature House',
    summary: 'A miniature model of a simple house in Blender 3D',
    description:
      'Using Blender 3D I created a miniature model of a simple house to show minimalist design principles',
    image: '/Media/Mini Home-web.png',
    alt: '3D miniature house model',
    tags: ['#blender', '#3dmodel', '#render'],
  },
  {
    id: 'bharat-socials-logo',
    category: 'graphic',
    title: 'Logo Design , Bharat Socials',
    modalTitle: 'Logo Design - Bharat Socials',
    summary: 'Logo design for an application',
    description:
      'Logo design for an application named Bharat Socials using Adobe Illustrator and Photoshop',
    image: '/Media/logoAi-web.png',
    alt: 'Bharat Socials logo design',
    tags: ['#illustrator', '#logodesign', '#application'],
  },
  {
    id: 'vector-portrait',
    category: 'graphic',
    title: 'Vector Portrait Illustration',
    modalTitle: 'Vector Portrait Illustration',
    summary: 'Minimalistic vector portrait',
    description:
      'Minimalistic vector portrait created using Adobe Illustrator, featuring bold line art and a vibrant yellow abstract background',
    image: '/Media/ASM-web.png',
    alt: 'Vector portrait illustration',
    tags: ['#illustrator', '#vectorart', '#graphicdesign'],
  },
  {
    id: 'sunset-pier',
    category: 'graphic',
    title: 'Sunset Pier Illustration',
    modalTitle: 'Sunset Pier Illustration',
    summary: 'Vector artwork of a serene sunset landscape',
    description:
      'A vector-based sunset landscape illustration created using Adobe Illustrator, featuring silhouettes, reflections, and a warm gradient sky.',
    image: '/Media/Love-web.png',
    alt: 'Sunset pier illustration',
    tags: ['#illustration', '#vectorart', '#adobeillustrator'],
  },
  {
    id: 'bharat-socials-app',
    category: 'developer',
    title: 'Bharat Socials , App Design & Development',
    modalTitle: 'Bharat Socials – App Design & Development',
    summary: 'Complete UI/UX design and development of a volunteer management app',
    description:
      'A fully designed and developed mobile application for managing NSS, NGOs, and University events with volunteer tracking, event registration, and attendance monitoring.',
    image: '/Media/BHTSOC-web.jpeg',
    alt: 'Bharat Socials app design and development',
    tags: ['#flutter', '#uiux', '#appdevelopment'],
  },
];

export const wftProjects = [
  {
    id: 'wft-storefront',
    index: '01',
    title: 'E-commerce Storefront',
    modalTitle: 'E-commerce Storefront',
    kind: 'Website Design · 2026',
    image: '/Media/wft-01.svg',
    alt: 'Placeholder preview of a client web platform',
    description:
      'A client e-commerce storefront designed at WeFrameTech. Covered by an NDA, so the preview is a placeholder — the full case study is available on request.',
  },
  {
    id: 'wft-mobile-app',
    index: '02',
    title: 'Mobile App Redesign',
    modalTitle: 'Mobile App Redesign',
    kind: 'Mobile App · 2026',
    image: '/Media/wft-02.svg',
    alt: 'Placeholder preview of a client mobile app',
    description:
      'A client mobile application designed at WeFrameTech. Covered by an NDA, so the preview is a placeholder — the full case study is available on request.',
  },
  {
    id: 'wft-dashboard',
    index: '03',
    title: 'Admin Dashboard',
    modalTitle: 'Admin Dashboard',
    kind: 'Web App · 2026',
    image: '/Media/wft-03.svg',
    alt: 'Placeholder preview of a client admin dashboard',
    description:
      'A client admin dashboard designed at WeFrameTech. Covered by an NDA, so the preview is a placeholder — the full case study is available on request.',
  },
  {
    id: 'wft-landing-page',
    index: '04',
    title: 'Brand Landing Page',
    modalTitle: 'Brand Landing Page',
    kind: 'Landing Page · 2026',
    image: '/Media/wft-04.svg',
    alt: 'Placeholder preview of a client landing page',
    description:
      'A client brand landing page designed at WeFrameTech. Covered by an NDA, so the preview is a placeholder — the full case study is available on request.',
  },
];
