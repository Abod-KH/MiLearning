/**
 * Additional Educational Video Data
 * 
 * This file contains the second set of educational videos for the MiLearning platform.
 * It includes videos with IDs 51-100 across various educational disciplines.
 */

import { Video } from '../types';

/**
 * Educational Videos Collection
 * 
 * A curated list of educational videos from various subjects
 * including math, language learning, science, and technology.
 */
export const educationVideos: Video[] = [
  {
    id: "51",
    title: "Machine Learning Fundamentals",
    description: "Understanding algorithms and neural networks 🤖",
    videoUrl: "https://www.youtube.com/embed/jGwO_UgTS7I",
    category: "Technology",
    user: {
      id: "51",
      username: "mlexpert",
      avatar: "https://i.pravatar.cc/150?img=51"
    },
    author: {
      id: "51",
      username: "mlexpert",
      name: "Daniel Bourke",
      avatar: "https://i.pravatar.cc/150?img=51"
    },
    likes: 36500,
    views: 121700,
    createdAt: new Date().toISOString()
  },
  {
    id: "52",
    title: "Introduction to Robotics",
    description: "Basic concepts and mechanics 🦾",
    videoUrl: "https://www.youtube.com/embed/7kvn3vcaE9Q",
    category: "Technology",
    user: {
      id: "52",
      username: "roboticsengineer",
      avatar: "https://i.pravatar.cc/150?img=52"
    },
    author: {
      id: "52",
      username: "roboticsengineer",
      name: "Tech with Tim",
      avatar: "https://i.pravatar.cc/150?img=52"
    },
    likes: 29700,
    views: 99000,
    createdAt: new Date().toISOString()
  },
  {
    id: "53",
    title: "Sign Language Basics",
    description: "Essential signs for beginners 👐",
    videoUrl: "https://www.youtube.com/embed/v1desDduz5M",
    category: "Language",
    user: {
      id: "53",
      username: "signlanguageteacher",
      avatar: "https://i.pravatar.cc/150?img=53"
    },
    author: {
      id: "53",
      username: "signlanguageteacher",
      name: "ASL Meredith",
      avatar: "https://i.pravatar.cc/150?img=53"
    },
    likes: 32300,
    views: 107700,
    createdAt: new Date().toISOString()
  },
  {
    id: "54",
    title: "Introduction to Architecture",
    description: "Understanding design principles 🏛️",
    videoUrl: "https://www.youtube.com/embed/oFrKBJ75PUw",
    category: "Arts",
    user: {
      id: "54",
      username: "architectpro",
      avatar: "https://i.pravatar.cc/150?img=54"
    },
    author: {
      id: "54",
      username: "architectpro",
      name: "30X40 Design Workshop",
      avatar: "https://i.pravatar.cc/150?img=54"
    },
    likes: 28400,
    views: 94700,
    createdAt: new Date().toISOString()
  },
  {
    id: "55",
    title: "Basic Nutrition Science",
    description: "Understanding macronutrients and diet 🥦",
    videoUrl: "https://www.youtube.com/embed/HQpV8p2wLxw",
    category: "Health",
    user: {
      id: "55",
      username: "nutritionstudent",
      avatar: "https://i.pravatar.cc/150?img=55"
    },
    author: {
      id: "55",
      username: "nutritionstudent",
      name: "Healthcare Triage",
      avatar: "https://i.pravatar.cc/150?img=55"
    },
    likes: 31900,
    views: 106300,
    createdAt: new Date().toISOString()
  },
  {
    id: "56",
    title: "Introduction to 3D Printing",
    description: "Getting started with 3D modeling and printing 🖨️",
    videoUrl: "https://www.youtube.com/embed/GJ98Lydc54k",
    category: "Technology",
    user: {
      id: "56",
      username: "makerspace",
      avatar: "https://i.pravatar.cc/150?img=56"
    },
    author: {
      id: "56",
      username: "makerspace",
      name: "Maker's Muse",
      avatar: "https://i.pravatar.cc/150?img=56"
    },
    likes: 33600,
    views: 112000,
    createdAt: new Date().toISOString()
  },
  {
    id: "57",
    title: "French Language Essentials",
    description: "Basic phrases every beginner should know 🇫🇷",
    videoUrl: "https://www.youtube.com/embed/H1D1HxRYkfA",
    category: "Language",
    user: {
      id: "57",
      username: "frenchteacher",
      avatar: "https://i.pravatar.cc/150?img=57"
    },
    author: {
      id: "57",
      username: "frenchteacher",
      name: "Learn French with Alexa",
      avatar: "https://i.pravatar.cc/150?img=57"
    },
    likes: 29200,
    views: 97300,
    createdAt: new Date().toISOString()
  },
  {
    id: "58",
    title: "Understanding Climate Change",
    description: "The science of global warming explained 🌡️",
    videoUrl: "https://www.youtube.com/embed/ifrHogDujXw",
    category: "Science",
    user: {
      id: "58",
      username: "climatescientist",
      avatar: "https://i.pravatar.cc/150?img=58"
    },
    author: {
      id: "58",
      username: "climatescientist",
      name: "NASA Climate Change",
      avatar: "https://i.pravatar.cc/150?img=58"
    },
    likes: 35800,
    views: 119300,
    createdAt: new Date().toISOString()
  },
  {
    id: "59",
    title: "Basics of Game Design",
    description: "Core principles for creating engaging games 🎮",
    videoUrl: "https://www.youtube.com/embed/PMXf0e8n2Oc",
    category: "Technology",
    user: {
      id: "59",
      username: "gamedesigner",
      avatar: "https://i.pravatar.cc/150?img=59"
    },
    author: {
      id: "59",
      username: "gamedesigner",
      name: "Extra Credits",
      avatar: "https://i.pravatar.cc/150?img=59"
    },
    likes: 34200,
    views: 114000,
    createdAt: new Date().toISOString()
  },
  {
    id: "60",
    title: "Introduction to Quantum Physics",
    description: "Simplified quantum concepts for beginners ⚛️",
    videoUrl: "https://www.youtube.com/embed/7kb1VT0J3DE",
    category: "Science",
    user: {
      id: "60",
      username: "quantumphysicist",
      avatar: "https://i.pravatar.cc/150?img=60"
    },
    author: {
      id: "60",
      username: "quantumphysicist",
      name: "Veritasium",
      avatar: "https://i.pravatar.cc/150?img=60"
    },
    likes: 39700,
    views: 132300,
    createdAt: new Date().toISOString()
  },
  {
    id: "61",
    title: "Basics of UX/UI Design",
    description: "Creating user-friendly digital experiences 🖥️",
    videoUrl: "https://www.youtube.com/embed/4Q29FHzZrEw",
    category: "Design",
    user: {
      id: "61",
      username: "uxdesigner",
      avatar: "https://i.pravatar.cc/150?img=61"
    },
    author: {
      id: "61",
      username: "uxdesigner",
      name: "Figma",
      avatar: "https://i.pravatar.cc/150?img=61"
    },
    likes: 32700,
    views: 109000,
    createdAt: new Date().toISOString()
  },
  {
    id: "62",
    title: "Introduction to Neuroscience",
    description: "Understanding the brain and nervous system 🧠",
    videoUrl: "https://www.youtube.com/embed/5yX-n57NRfc",
    category: "Science",
    user: {
      id: "62",
      username: "neuroscientist",
      avatar: "https://i.pravatar.cc/150?img=62"
    },
    author: {
      id: "62",
      username: "neuroscientist",
      name: "SciShow",
      avatar: "https://i.pravatar.cc/150?img=62"
    },
    likes: 36900,
    views: 123000,
    createdAt: new Date().toISOString()
  },
  {
    id: "63",
    title: "SQL Database Basics",
    description: "Learn to query and manage data 💾",
    videoUrl: "https://www.youtube.com/embed/7S_tz1z_5bA",
    category: "Technology",
    user: {
      id: "63",
      username: "databaseadmin",
      avatar: "https://i.pravatar.cc/150?img=63"
    },
    author: {
      id: "63",
      username: "databaseadmin",
      name: "Programming with Mosh",
      avatar: "https://i.pravatar.cc/150?img=63"
    },
    likes: 31300,
    views: 104300,
    createdAt: new Date().toISOString()
  },
  {
    id: "64",
    title: "Basics of Video Editing",
    description: "Essential techniques for beginners 🎬",
    videoUrl: "https://www.youtube.com/embed/O6ERELse_QY",
    category: "Arts",
    user: {
      id: "64",
      username: "videoeditor",
      avatar: "https://i.pravatar.cc/150?img=64"
    },
    author: {
      id: "64",
      username: "videoeditor",
      name: "Justin Odisho",
      avatar: "https://i.pravatar.cc/150?img=64"
    },
    likes: 33900,
    views: 113000,
    createdAt: new Date().toISOString()
  },
  {
    id: "65",
    title: "Introduction to Meteorology",
    description: "Understanding weather patterns and forecasting ☁️",
    videoUrl: "https://www.youtube.com/embed/huT5__BqY_U",
    category: "Science",
    user: {
      id: "65",
      username: "meteorologist",
      avatar: "https://i.pravatar.cc/150?img=65"
    },
    author: {
      id: "65",
      username: "meteorologist",
      name: "National Geographic",
      avatar: "https://i.pravatar.cc/150?img=65"
    },
    likes: 27800,
    views: 92700,
    createdAt: new Date().toISOString()
  },
  {
    id: "66",
    title: "Basic Graphic Design Principles",
    description: "Color theory and layout fundamentals 🎨",
    videoUrl: "https://www.youtube.com/embed/sByzHoiYFX0",
    category: "Design",
    user: {
      id: "66",
      username: "graphicdesigner",
      avatar: "https://i.pravatar.cc/150?img=66"
    },
    author: {
      id: "66",
      username: "graphicdesigner",
      name: "Gareth David",
      avatar: "https://i.pravatar.cc/150?img=66"
    },
    likes: 34600,
    views: 115300,
    createdAt: new Date().toISOString()
  },
  {
    id: "67",
    title: "Introduction to Linguistics",
    description: "Understanding language structure and evolution 🗣️",
    videoUrl: "https://www.youtube.com/embed/6hmLYBBvj_Q",
    category: "Language",
    user: {
      id: "67",
      username: "linguist",
      avatar: "https://i.pravatar.cc/150?img=67"
    },
    author: {
      id: "67",
      username: "linguist",
      name: "The Ling Space",
      avatar: "https://i.pravatar.cc/150?img=67"
    },
    likes: 29500,
    views: 98300,
    createdAt: new Date().toISOString()
  },
  {
    id: "68",
    title: "Basics of Digital Marketing",
    description: "SEO, SEM, and social media strategies 📱",
    videoUrl: "https://www.youtube.com/embed/jH6AIecRV60",
    category: "Marketing",
    user: {
      id: "68",
      username: "digitalmarketer",
      avatar: "https://i.pravatar.cc/150?img=68"
    },
    author: {
      id: "68",
      username: "digitalmarketer",
      name: "Neil Patel",
      avatar: "https://i.pravatar.cc/150?img=68"
    },
    likes: 35200,
    views: 117300,
    createdAt: new Date().toISOString()
  },
  {
    id: "69",
    title: "Introduction to Geology",
    description: "Understanding rocks, minerals, and Earth's structure 🪨",
    videoUrl: "https://www.youtube.com/embed/tCn2Wciv8-U",
    category: "Science",
    user: {
      id: "69",
      username: "geologist",
      avatar: "https://i.pravatar.cc/150?img=69"
    },
    author: {
      id: "69",
      username: "geologist",
      name: "Nick Zentner",
      avatar: "https://i.pravatar.cc/150?img=69"
    },
    likes: 28600,
    views: 95300,
    createdAt: new Date().toISOString()
  },
  {
    id: "70",
    title: "Basics of Animation",
    description: "Principles of movement and timing 🎭",
    videoUrl: "https://www.youtube.com/embed/uDqjIdI4bF4",
    category: "Arts",
    user: {
      id: "70",
      username: "animator",
      avatar: "https://i.pravatar.cc/150?img=70"
    },
    author: {
      id: "70",
      username: "animator",
      name: "Alan Becker",
      avatar: "https://i.pravatar.cc/150?img=70"
    },
    likes: 33500,
    views: 111700,
    createdAt: new Date().toISOString()
  },
  {
    id: "71",
    title: "Introduction to Cryptography",
    description: "Understanding encryption and information security 🔐",
    videoUrl: "https://www.youtube.com/embed/jhXCTbFnK8o",
    category: "Technology",
    user: {
      id: "71",
      username: "securityspecialist",
      avatar: "https://i.pravatar.cc/150?img=71"
    },
    author: {
      id: "71",
      username: "securityspecialist",
      name: "Computerphile",
      avatar: "https://i.pravatar.cc/150?img=71"
    },
    likes: 31100,
    views: 103700,
    createdAt: new Date().toISOString()
  },
  {
    id: "72",
    title: "Ancient History Overview",
    description: "From early civilizations to the Roman Empire 🏛️",
    videoUrl: "https://www.youtube.com/embed/BO-EEMKPeao",
    category: "History",
    user: {
      id: "72",
      username: "ancienthistorian",
      avatar: "https://i.pravatar.cc/150?img=72"
    },
    author: {
      id: "72",
      username: "ancienthistorian",
      name: "World History",
      avatar: "https://i.pravatar.cc/150?img=72"
    },
    likes: 29300,
    views: 97700,
    createdAt: new Date().toISOString()
  },
  {
    id: "73",
    title: "Introduction to Marine Biology",
    description: "Understanding ocean ecosystems 🐠",
    videoUrl: "https://www.youtube.com/embed/4eSjspwm854",
    category: "Biology",
    user: {
      id: "73",
      username: "marinebiologist",
      avatar: "https://i.pravatar.cc/150?img=73"
    },
    author: {
      id: "73",
      username: "marinebiologist",
      name: "PBS Eons",
      avatar: "https://i.pravatar.cc/150?img=73"
    },
    likes: 34800,
    views: 116000,
    createdAt: new Date().toISOString()
  },
  {
    id: "74",
    title: "Introduction to Logic",
    description: "Basic principles of reasoning and argument 🧩",
    videoUrl: "https://www.youtube.com/embed/oFlsJcfCVF8",
    category: "Philosophy",
    user: {
      id: "74",
      username: "logician",
      avatar: "https://i.pravatar.cc/150?img=74"
    },
    author: {
      id: "74",
      username: "logician",
      name: "CrashCourse",
      avatar: "https://i.pravatar.cc/150?img=74"
    },
    likes: 27500,
    views: 91700,
    createdAt: new Date().toISOString()
  },
  {
    id: "75",
    title: "Basics of Human Anatomy",
    description: "Understanding the structure of the human body 🦴",
    videoUrl: "https://www.youtube.com/embed/0IDgBlCHVsA",
    category: "Biology",
    user: {
      id: "75",
      username: "anatomist",
      avatar: "https://i.pravatar.cc/150?img=75"
    },
    author: {
      id: "75",
      username: "anatomist",
      name: "Armando Hasudungan",
      avatar: "https://i.pravatar.cc/150?img=75"
    },
    likes: 32900,
    views: 109700,
    createdAt: new Date().toISOString()
  },
  {
    id: "76",
    title: "Introduction to Ethical Hacking",
    description: "Cybersecurity fundamentals for white hat hackers 💻",
    videoUrl: "https://www.youtube.com/embed/eHLDZg6hLi0",
    category: "Technology",
    user: {
      id: "76",
      username: "ethicalhacker",
      avatar: "https://i.pravatar.cc/150?img=76"
    },
    author: {
      id: "76",
      username: "ethicalhacker",
      name: "David Bombal",
      avatar: "https://i.pravatar.cc/150?img=76"
    },
    likes: 36200,
    views: 120700,
    createdAt: new Date().toISOString()
  },
  {
    id: "77",
    title: "Italian Language Essentials",
    description: "Basic phrases for beginners 🇮🇹",
    videoUrl: "https://www.youtube.com/embed/3O-A_zeiF8U",
    category: "Language",
    user: {
      id: "77",
      username: "italianteacher",
      avatar: "https://i.pravatar.cc/150?img=77"
    },
    author: {
      id: "77",
      username: "italianteacher",
      name: "ItalianPod101",
      avatar: "https://i.pravatar.cc/150?img=77"
    },
    likes: 28900,
    views: 96300,
    createdAt: new Date().toISOString()
  },
  {
    id: "78",
    title: "Introduction to Virtual Reality",
    description: "Understanding VR technology and applications 🥽",
    videoUrl: "https://www.youtube.com/embed/_X0FZqz9-CU",
    category: "Technology",
    user: {
      id: "78",
      username: "vrexpert",
      avatar: "https://i.pravatar.cc/150?img=78"
    },
    author: {
      id: "78",
      username: "vrexpert",
      name: "Virtual Reality",
      avatar: "https://i.pravatar.cc/150?img=78"
    },
    likes: 35500,
    views: 118300,
    createdAt: new Date().toISOString()
  },
  {
    id: "79",
    title: "Basics of Child Psychology",
    description: "Understanding developmental stages 👶",
    videoUrl: "https://www.youtube.com/embed/beKAUfcQpJY",
    category: "Psychology",
    user: {
      id: "79",
      username: "childpsychologist",
      avatar: "https://i.pravatar.cc/150?img=79"
    },
    author: {
      id: "79",
      username: "childpsychologist",
      name: "Sprouts",
      avatar: "https://i.pravatar.cc/150?img=79"
    },
    likes: 31800,
    views: 106000,
    createdAt: new Date().toISOString()
  },
  {
    id: "80",
    title: "Introduction to Space Exploration",
    description: "Understanding missions and discoveries 🚀",
    videoUrl: "https://www.youtube.com/embed/BFwgpZc2qGQ",
    category: "Astronomy",
    user: {
      id: "80",
      username: "spacescientist",
      avatar: "https://i.pravatar.cc/150?img=80"
    },
    author: {
      id: "80",
      username: "spacescientist",
      name: "NASA",
      avatar: "https://i.pravatar.cc/150?img=80"
    },
    likes: 37900,
    views: 126300,
    createdAt: new Date().toISOString()
  },
  {
    id: "81",
    title: "Basics of Financial Planning",
    description: "Setting goals and building wealth 💰",
    videoUrl: "https://www.youtube.com/embed/OzZUA1Dj_lE",
    category: "Finance",
    user: {
      id: "81",
      username: "financialplanner",
      avatar: "https://i.pravatar.cc/150?img=81"
    },
    author: {
      id: "81",
      username: "financialplanner",
      name: "The Money Guy Show",
      avatar: "https://i.pravatar.cc/150?img=81"
    },
    likes: 33700,
    views: 112300,
    createdAt: new Date().toISOString()
  },
  {
    id: "82",
    title: "Introduction to Archaeology",
    description: "Discovering and interpreting the past 🏺",
    videoUrl: "https://www.youtube.com/embed/qMzpA5oCGNY",
    category: "History",
    user: {
      id: "82",
      username: "archaeologist",
      avatar: "https://i.pravatar.cc/150?img=82"
    },
    author: {
      id: "82",
      username: "archaeologist",
      name: "SciShow",
      avatar: "https://i.pravatar.cc/150?img=82"
    },
    likes: 29600,
    views: 98700,
    createdAt: new Date().toISOString()
  },
  {
    id: "83",
    title: "Basics of Photography Lighting",
    description: "Understanding natural and artificial light 💡",
    videoUrl: "https://www.youtube.com/embed/YEOLUQhVy_s",
    category: "Photography",
    user: {
      id: "83",
      username: "lightingexpert",
      avatar: "https://i.pravatar.cc/150?img=83"
    },
    author: {
      id: "83",
      username: "lightingexpert",
      name: "Peter McKinnon",
      avatar: "https://i.pravatar.cc/150?img=83"
    },
    likes: 32400,
    views: 108000,
    createdAt: new Date().toISOString()
  },
  {
    id: "84",
    title: "Introduction to Microbiology",
    description: "Understanding bacteria, viruses, and microorganisms 🦠",
    videoUrl: "https://www.youtube.com/embed/oS0mzXnG-VQ",
    category: "Biology",
    user: {
      id: "84",
      username: "microbiologist",
      avatar: "https://i.pravatar.cc/150?img=84"
    },
    author: {
      id: "84",
      username: "microbiologist",
      name: "Professor Dave Explains",
      avatar: "https://i.pravatar.cc/150?img=84"
    },
    likes: 30100,
    views: 100300,
    createdAt: new Date().toISOString()
  },
  {
    id: "85",
    title: "Basics of Interior Design",
    description: "Principles for creating beautiful spaces 🏠",
    videoUrl: "https://www.youtube.com/embed/KqpjIm-Q-fM",
    category: "Design",
    user: {
      id: "85",
      username: "interiordesigner",
      avatar: "https://i.pravatar.cc/150?img=85"
    },
    author: {
      id: "85",
      username: "interiordesigner",
      name: "Interior Design Institute",
      avatar: "https://i.pravatar.cc/150?img=85"
    },
    likes: 34300,
    views: 114300,
    createdAt: new Date().toISOString()
  },
  {
    id: "86",
    title: "Introduction to Botany",
    description: "Understanding plant life and structures 🌿",
    videoUrl: "https://www.youtube.com/embed/dDAGUGd_AEk",
    category: "Biology",
    user: {
      id: "86",
      username: "botanist",
      avatar: "https://i.pravatar.cc/150?img=86"
    },
    author: {
      id: "86",
      username: "botanist",
      name: "CrashCourse",
      avatar: "https://i.pravatar.cc/150?img=86"
    },
    likes: 27300,
    views: 91000,
    createdAt: new Date().toISOString()
  },
  {
    id: "87",
    title: "Basic Piano Lessons",
    description: "First steps in learning to play 🎹",
    videoUrl: "https://www.youtube.com/embed/4JDGUlKgDaM",
    category: "Music",
    user: {
      id: "87",
      username: "pianoteacher",
      avatar: "https://i.pravatar.cc/150?img=87"
    },
    author: {
      id: "87",
      username: "pianoteacher",
      name: "HDpiano",
      avatar: "https://i.pravatar.cc/150?img=87"
    },
    likes: 31600,
    views: 105300,
    createdAt: new Date().toISOString()
  },
  {
    id: "88",
    title: "Introduction to Sustainable Living",
    description: "Simple steps toward an eco-friendly lifestyle ♻️",
    videoUrl: "https://www.youtube.com/embed/FbAjxkGvDNs",
    category: "Lifestyle",
    user: {
      id: "88",
      username: "sustainabilityguru",
      avatar: "https://i.pravatar.cc/150?img=88"
    },
    author: {
      id: "88",
      username: "sustainabilityguru",
      name: "Sustainable Human",
      avatar: "https://i.pravatar.cc/150?img=88"
    },
    likes: 33900,
    views: 113000,
    createdAt: new Date().toISOString()
  },
  {
    id: "89",
    title: "Basics of Criminal Justice",
    description: "Understanding law enforcement and legal systems ⚖️",
    videoUrl: "https://www.youtube.com/embed/8MwBKT4K6ks",
    category: "Law",
    user: {
      id: "89",
      username: "criminaljusticepro",
      avatar: "https://i.pravatar.cc/150?img=89"
    },
    author: {
      id: "89",
      username: "criminaljusticepro",
      name: "CrashCourse",
      avatar: "https://i.pravatar.cc/150?img=89"
    },
    likes: 29800,
    views: 99300,
    createdAt: new Date().toISOString()
  },
  {
    id: "90",
    title: "Introduction to Creative Writing",
    description: "Finding your voice and style ✍️",
    videoUrl: "https://www.youtube.com/embed/R4SjCb_dLKE",
    category: "Writing",
    user: {
      id: "90",
      username: "creativewriter",
      avatar: "https://i.pravatar.cc/150?img=90"
    },
    author: {
      id: "90",
      username: "creativewriter",
      name: "Brandon Sanderson",
      avatar: "https://i.pravatar.cc/150?img=90"
    },
    likes: 32200,
    views: 107300,
    createdAt: new Date().toISOString()
  },
  {
    id: "91",
    title: "Understanding AI Ethics",
    description: "Moral implications of artificial intelligence 🤖",
    videoUrl: "https://www.youtube.com/embed/oNNH57-6riY",
    category: "Technology",
    user: {
      id: "91",
      username: "techethicist",
      avatar: "https://i.pravatar.cc/150?img=91"
    },
    author: {
      id: "91",
      username: "techethicist",
      name: "ColdFusion",
      avatar: "https://i.pravatar.cc/150?img=91"
    },
    likes: 36100,
    views: 120300,
    createdAt: new Date().toISOString()
  },
  {
    id: "92",
    title: "Introduction to Mindfulness",
    description: "Practices for present-moment awareness 🧘",
    videoUrl: "https://www.youtube.com/embed/w6T02g5hnT4",
    category: "Wellness",
    user: {
      id: "92",
      username: "mindfulnesspractitioner",
      avatar: "https://i.pravatar.cc/150?img=92"
    },
    author: {
      id: "92",
      username: "mindfulnesspractitioner",
      name: "Mindful Movement",
      avatar: "https://i.pravatar.cc/150?img=92"
    },
    likes: 34700,
    views: 115700,
    createdAt: new Date().toISOString()
  },
  {
    id: "93",
    title: "Basics of Cognitive Psychology",
    description: "Understanding perception, memory, and thought 🧠",
    videoUrl: "https://www.youtube.com/embed/R-sVnmmw6WY",
    category: "Psychology",
    user: {
      id: "93",
      username: "cognitivepsychologist",
      avatar: "https://i.pravatar.cc/150?img=93"
    },
    author: {
      id: "93",
      username: "cognitivepsychologist",
      name: "CrashCourse",
      avatar: "https://i.pravatar.cc/150?img=93"
    },
    likes: 30500,
    views: 101700,
    createdAt: new Date().toISOString()
  },
  {
    id: "94",
    title: "Introduction to Filmmaking",
    description: "Creating compelling visual stories 🎥",
    videoUrl: "https://www.youtube.com/embed/RgRU4UNXnkk",
    category: "Arts",
    user: {
      id: "94",
      username: "filmmaker",
      avatar: "https://i.pravatar.cc/150?img=94"
    },
    author: {
      id: "94",
      username: "filmmaker",
      name: "StudioBinder",
      avatar: "https://i.pravatar.cc/150?img=94"
    },
    likes: 35300,
    views: 117700,
    createdAt: new Date().toISOString()
  },
  {
    id: "95",
    title: "Basics of Human Resources",
    description: "Key principles of HR management 👥",
    videoUrl: "https://www.youtube.com/embed/lfHh1HYTky0",
    category: "Business",
    user: {
      id: "95",
      username: "hrspecialist",
      avatar: "https://i.pravatar.cc/150?img=95"
    },
    author: {
      id: "95",
      username: "hrspecialist",
      name: "HR Basics",
      avatar: "https://i.pravatar.cc/150?img=95"
    },
    likes: 28700,
    views: 95700,
    createdAt: new Date().toISOString()
  },
  {
    id: "96",
    title: "Introduction to Computer Networks",
    description: "Understanding internet infrastructure 🌐",
    videoUrl: "https://www.youtube.com/embed/3QhU9jd03a0",
    category: "Technology",
    user: {
      id: "96",
      username: "networkspecialist",
      avatar: "https://i.pravatar.cc/150?img=96"
    },
    author: {
      id: "96",
      username: "networkspecialist",
      name: "Network Direction",
      avatar: "https://i.pravatar.cc/150?img=96"
    },
    likes: 33100,
    views: 110300,
    createdAt: new Date().toISOString()
  },
  {
    id: "97",
    title: "Basics of Foreign Policy",
    description: "Understanding international relations 🌍",
    videoUrl: "https://www.youtube.com/embed/mULDiaZZH3A",
    category: "Politics",
    user: {
      id: "97",
      username: "foreignpolicyanalyst",
      avatar: "https://i.pravatar.cc/150?img=97"
    },
    author: {
      id: "97",
      username: "foreignpolicyanalyst",
      name: "Council on Foreign Relations",
      avatar: "https://i.pravatar.cc/150?img=97"
    },
    likes: 29400,
    views: 98000,
    createdAt: new Date().toISOString()
  },
  {
    id: "98",
    title: "Introduction to Biochemistry",
    description: "Understanding chemical processes in living organisms 🧪",
    videoUrl: "https://www.youtube.com/embed/YO244P1e9QM",
    category: "Science",
    user: {
      id: "98",
      username: "biochemist",
      avatar: "https://i.pravatar.cc/150?img=98"
    },
    author: {
      id: "98",
      username: "biochemist",
      name: "Professor Dave Explains",
      avatar: "https://i.pravatar.cc/150?img=98"
    },
    likes: 31900,
    views: 106300,
    createdAt: new Date().toISOString()
  },
  {
    id: "99",
    title: "Basics of Fashion Design",
    description: "Understanding textiles and garment construction 👗",
    videoUrl: "https://www.youtube.com/embed/s_q9shR1dkw",
    category: "Design",
    user: {
      id: "99",
      username: "fashiondesigner",
      avatar: "https://i.pravatar.cc/150?img=99"
    },
    author: {
      id: "99",
      username: "fashiondesigner",
      name: "Zoe Hong",
      avatar: "https://i.pravatar.cc/150?img=99"
    },
    likes: 35700,
    views: 119000,
    createdAt: new Date().toISOString()
  },
  {
    id: "100",
    title: "Introduction to Renewable Energy",
    description: "Understanding solar, wind, and hydroelectric power 🌞",
    videoUrl: "https://www.youtube.com/embed/1kUE0BZtTRc",
    category: "Science",
    user: {
      id: "100",
      username: "energyspecialist",
      avatar: "https://i.pravatar.cc/150?img=100"
    },
    author: {
      id: "100",
      username: "energyspecialist",
      name: "Real Engineering",
      avatar: "https://i.pravatar.cc/150?img=100"
    },
    likes: 38400,
    views: 128000,
    createdAt: new Date().toISOString()
  }
]; 