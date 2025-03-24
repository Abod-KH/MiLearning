/**
 * Educational Video Data
 * 
 * This file contains the primary educational video content for the MiLearning platform.
 * It includes 50 educational videos across various disciplines, a mock user for testing,
 * and educational content categories.
 */

import { Video, User, Badge } from '../types';

/**
 * Collection of educational videos from YouTube
 * Each video contains metadata including:
 * - Unique ID
 * - Title and description
 * - YouTube video URL
 * - Author/creator information
 * - Engagement metrics (likes, views)
 * - Creation timestamp
 */
export const videos: Video[] = [
  {
    id: "1",
    title: "Learn English in 30 Minutes - ALL the English Basics You Need",
    description: "Learn essential English basics for beginners 🇬🇧",
    videoUrl: "https://www.youtube.com/embed/juKd26qkNAw",
    category: "Language",
    author: {
      id: "1",
      username: "englishclass101",
      name: "EnglishClass101.com",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    likes: 45800,
    views: 152300,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Algebra Basics: What Is Algebra? - Math Antics",
    description: "Introduction to algebra concepts for beginners 📐",
    videoUrl: "https://www.youtube.com/embed/NybHckSEQBI",
    category: "Mathematics",
    author: {
      id: "2",
      username: "mathantics",
      name: "Math Antics",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    likes: 38700,
    views: 129000,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Basic Chemistry Concepts Part I",
    description: "Learn fundamental chemistry principles ⚗️",
    videoUrl: "https://www.youtube.com/embed/0PSyiRXIhyA",
    category: "Science",
    author: {
      id: "3",
      username: "chemistrylessons",
      name: "The Organic Chemistry Tutor",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    likes: 34200,
    views: 114000,
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Introduction to Cells: The Grand Cell Tour",
    description: "Discover the structure and function of cells 🔬",
    videoUrl: "https://www.youtube.com/embed/8IlzKri08kk",
    category: "Biology",
    author: {
      id: "4",
      username: "amoebasisters",
      name: "Amoeba Sisters",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    likes: 32600,
    views: 108700,
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Physics - Basic Introduction",
    description: "Understand the fundamentals of physics 🔭",
    videoUrl: "https://www.youtube.com/embed/b1t41Q3xRM8",
    category: "Science",
    author: {
      id: "5",
      username: "physicsteacher",
      name: "The Organic Chemistry Tutor",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    likes: 36900,
    views: 123000,
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "How to Learn Spanish Fast: Spanish 101",
    description: "Quick introduction to speaking Spanish 🇪🇸",
    videoUrl: "https://www.youtube.com/embed/cTJ71kldXyQ",
    category: "Language",
    author: {
      id: "6",
      username: "spanishpod101",
      name: "SpanishPod101.com",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    likes: 31400,
    views: 104700,
    createdAt: new Date().toISOString()
  },
  {
    id: "7",
    title: "Introduction to Programming and Computer Science",
    description: "First steps in coding and CS concepts 💻",
    videoUrl: "https://www.youtube.com/embed/zOjov-2OZ0E",
    category: "Technology",
    author: {
      id: "7",
      username: "csteacher",
      name: "Khan Academy Computing",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    likes: 39800,
    views: 132700,
    createdAt: new Date().toISOString()
  },
  {
    id: "8",
    title: "A Brief History of Quantum Mechanics",
    description: "The development of quantum theory over time ⚛️",
    videoUrl: "https://www.youtube.com/embed/5hVmeOCJjOU",
    category: "Science",
    author: {
      id: "8",
      username: "physicsgalaxy",
      name: "PBS Space Time",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    likes: 35700,
    views: 119000,
    createdAt: new Date().toISOString()
  },
  {
    id: "9",
    title: "Learn Japanese in 4 Hours - ALL the Japanese Basics You Need",
    description: "Comprehensive intro to Japanese language 🇯🇵",
    videoUrl: "https://www.youtube.com/embed/Kl52jT-_yCE",
    category: "Language",
    author: {
      id: "9",
      username: "japanesepod101",
      name: "JapanesePod101.com",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    likes: 32100,
    views: 107000,
    createdAt: new Date().toISOString()
  },
  {
    id: "10",
    title: "Web Development In 2023 - A Practical Guide",
    description: "Modern web technologies and frameworks 🌐",
    videoUrl: "https://www.youtube.com/embed/u72H_zZzkcw",
    category: "Technology",
    author: {
      id: "10",
      username: "webdevteacher",
      name: "Traversy Media",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    likes: 38300,
    views: 127700,
    createdAt: new Date().toISOString()
  },
  {
    id: "11",
    title: "How to Start Coding? Learn Programming for Beginners",
    description: "Perfect first steps for aspiring developers 👩‍💻",
    videoUrl: "https://www.youtube.com/embed/iILFBGm_I9M",
    category: "Technology",
    author: {
      id: "11",
      username: "programwithgio",
      name: "Program With Gio",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    likes: 36100,
    views: 120300,
    createdAt: new Date().toISOString()
  },
  {
    id: "12",
    title: "How To Learn ANY Language Quickly",
    description: "Efficient language learning techniques 🌍",
    videoUrl: "https://www.youtube.com/embed/Kl52jT-_yCE",
    category: "Language",
    author: {
      id: "12",
      username: "linguistantusiasm",
      name: "Ikenna",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    likes: 29800,
    views: 99300,
    createdAt: new Date().toISOString()
  },
  {
    id: "13",
    title: "Music Theory for Beginners",
    description: "Learn fundamentals of musical notation and harmony 🎵",
    videoUrl: "https://www.youtube.com/embed/rgaTLrZGlk0",
    category: "Arts",
    author: {
      id: "13",
      username: "musictheoryteacher",
      name: "Andrew Huang",
      avatar: "https://i.pravatar.cc/150?img=13"
    },
    likes: 34700,
    views: 115700,
    createdAt: new Date().toISOString()
  },
  {
    id: "14",
    title: "Drawing Basics: How to Draw a Simple Face",
    description: "Step-by-step guide to sketching faces 🎨",
    videoUrl: "https://www.youtube.com/embed/iMEBSQJYaAY",
    category: "Arts",
    author: {
      id: "14",
      username: "drawingcoach",
      name: "RapidFireArt",
      avatar: "https://i.pravatar.cc/150?img=14"
    },
    likes: 32800,
    views: 109300,
    createdAt: new Date().toISOString()
  },
  {
    id: "15",
    title: "Basic Yoga for Beginners - 20 Minute Home Yoga Workout",
    description: "Easy yoga routine for flexibility and strength 🧘‍♀️",
    videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE",
    category: "Health",
    author: {
      id: "15",
      username: "yogawithadriene",
      name: "Yoga With Adriene",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    likes: 38400,
    views: 128000,
    createdAt: new Date().toISOString()
  },
  {
    id: "16",
    title: "Learn the Periodic Table in 6 Minutes",
    description: "Quick memorization technique for chemistry ⚗️",
    videoUrl: "https://www.youtube.com/embed/rz4Dd1I_fX0",
    category: "Science",
    author: {
      id: "16",
      username: "scienceteacher",
      name: "AsapSCIENCE",
      avatar: "https://i.pravatar.cc/150?img=16"
    },
    likes: 31200,
    views: 104000,
    createdAt: new Date().toISOString()
  },
  {
    id: "17",
    title: "World War II: A History of WWII",
    description: "Overview of the global conflict 1939-1945 ⚔️",
    videoUrl: "https://www.youtube.com/embed/fo2Rb9h788s",
    category: "History",
    author: {
      id: "17",
      username: "historyteacher",
      name: "Crash Course",
      avatar: "https://i.pravatar.cc/150?img=17"
    },
    likes: 35600,
    views: 118700,
    createdAt: new Date().toISOString()
  },
  {
    id: "18",
    title: "Introduction to Psychology: How Your Mind Works",
    description: "Basic concepts of human psychology 🧠",
    videoUrl: "https://www.youtube.com/embed/vo4pMVb0R6M",
    category: "Psychology",
    author: {
      id: "18",
      username: "psychteacher",
      name: "Crash Course",
      avatar: "https://i.pravatar.cc/150?img=18"
    },
    likes: 33500,
    views: 111700,
    createdAt: new Date().toISOString()
  },
  {
    id: "19",
    title: "Learn Guitar in 21 Days: Day 1 (Your First Guitar Lesson)",
    description: "First steps to playing guitar for beginners 🎸",
    videoUrl: "https://www.youtube.com/embed/BBz-Jyr23M4",
    category: "Music",
    author: {
      id: "19",
      username: "guitarlessons",
      name: "Andy Guitar",
      avatar: "https://i.pravatar.cc/150?img=19"
    },
    likes: 30900,
    views: 103000,
    createdAt: new Date().toISOString()
  },
  {
    id: "20",
    title: "How to Make a Budget and Stick to It",
    description: "Personal finance management fundamentals 💰",
    videoUrl: "https://www.youtube.com/embed/E0SztpvTS-8",
    category: "Finance",
    author: {
      id: "20",
      username: "financeteacher",
      name: "Two Cents",
      avatar: "https://i.pravatar.cc/150?img=20"
    },
    likes: 34800,
    views: 116000,
    createdAt: new Date().toISOString()
  },
  {
    id: "21",
    title: "Learn Python - Full Course for Beginners",
    description: "Complete introduction to Python programming 🐍",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    category: "Technology",
    author: {
      id: "21",
      username: "pythonteacher",
      name: "freeCodeCamp.org",
      avatar: "https://i.pravatar.cc/150?img=21"
    },
    likes: 41200,
    views: 137300,
    createdAt: new Date().toISOString()
  },
  {
    id: "22",
    title: "Ancient Egypt: Crash Course World History",
    description: "Overview of Ancient Egyptian civilization 🏺",
    videoUrl: "https://www.youtube.com/embed/Z3Wvw6BivVI",
    category: "History",
    author: {
      id: "22",
      username: "worldhistoryteacher",
      name: "Crash Course",
      avatar: "https://i.pravatar.cc/150?img=22"
    },
    likes: 33000,
    views: 110000,
    createdAt: new Date().toISOString()
  },
  {
    id: "23",
    title: "How to Speak Korean: Essential Phrases for Beginners",
    description: "Learn basic conversational Korean 🇰🇷",
    videoUrl: "https://www.youtube.com/embed/0K8lUGWYMGw",
    category: "Language",
    author: {
      id: "23",
      username: "koreanteacher",
      name: "Korean Class 101",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    likes: 29400,
    views: 98000,
    createdAt: new Date().toISOString()
  },
  {
    id: "24",
    title: "Calculus 1 - Full College Course",
    description: "Comprehensive calculus from fundamentals to advanced topics 📊",
    videoUrl: "https://www.youtube.com/embed/HfACrKJ_Y2w",
    category: "Mathematics",
    author: {
      id: "24",
      username: "mathprofessor",
      name: "freeCodeCamp.org",
      avatar: "https://i.pravatar.cc/150?img=24"
    },
    likes: 37600,
    views: 125300,
    createdAt: new Date().toISOString()
  },
  {
    id: "25",
    title: "Portrait Photography: How to Take Professional Portraits",
    description: "Learn lighting and posing techniques for stunning portraits 📸",
    videoUrl: "https://www.youtube.com/embed/f5yvJCRpAKE",
    category: "Photography",
    author: {
      id: "25",
      username: "photographyinstructor",
      name: "Peter McKinnon",
      avatar: "https://i.pravatar.cc/150?img=25"
    },
    likes: 32300,
    views: 107700,
    createdAt: new Date().toISOString()
  },
  {
    id: "26",
    title: "How the Stock Market Works in 5 Minutes",
    description: "Simple explanation of investing basics 📈",
    videoUrl: "https://www.youtube.com/embed/F3QpgXBtDeo",
    category: "Finance",
    author: {
      id: "26",
      username: "investmentteacher",
      name: "One Minute Economics",
      avatar: "https://i.pravatar.cc/150?img=26"
    },
    likes: 35100,
    views: 117000,
    createdAt: new Date().toISOString()
  },
  {
    id: "27",
    title: "Introduction to Human Anatomy & Physiology",
    description: "Learn about the structure and function of the human body 🫀",
    videoUrl: "https://www.youtube.com/embed/xto8bZ4jwLw",
    category: "Biology",
    author: {
      id: "27",
      username: "anatomyteacher",
      name: "Nucleus Medical Media",
      avatar: "https://i.pravatar.cc/150?img=27"
    },
    likes: 30600,
    views: 102000,
    createdAt: new Date().toISOString()
  },
  {
    id: "28",
    title: "How to Cook Perfect Pasta - Beginner Cooking Tips",
    description: "Master the basics of cooking delicious pasta 🍝",
    videoUrl: "https://www.youtube.com/embed/7olykkcahvc",
    category: "Cooking",
    author: {
      id: "28",
      username: "chefteacher",
      name: "Food Wishes",
      avatar: "https://i.pravatar.cc/150?img=28"
    },
    likes: 29100,
    views: 97000,
    createdAt: new Date().toISOString()
  },
  {
    id: "29",
    title: "Understanding Machine Learning",
    description: "Introduction to AI and machine learning concepts 🤖",
    videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
    category: "Technology",
    author: {
      id: "29",
      username: "mlteacher",
      name: "3Blue1Brown",
      avatar: "https://i.pravatar.cc/150?img=29"
    },
    likes: 38900,
    views: 129700,
    createdAt: new Date().toISOString()
  },
  {
    id: "30",
    title: "How to Draw Realistic Eyes",
    description: "Step-by-step tutorial for drawing lifelike eyes 👁️",
    videoUrl: "https://www.youtube.com/embed/zqNZ9df0tho",
    category: "Arts",
    author: {
      id: "30",
      username: "artteacher",
      name: "Alphonso Dunn",
      avatar: "https://i.pravatar.cc/150?img=30"
    },
    likes: 31500,
    views: 105000,
    createdAt: new Date().toISOString()
  },
  {
    id: "31",
    title: "Learn French in 25 Minutes - ALL the Basics You Need",
    description: "Quick introduction to French language for beginners 🇫🇷",
    videoUrl: "https://www.youtube.com/embed/hd0_GZHHWeE",
    category: "Language",
    author: {
      id: "31",
      username: "frenchteacher",
      name: "FrenchPod101.com",
      avatar: "https://i.pravatar.cc/150?img=31"
    },
    likes: 30200,
    views: 100700,
    createdAt: new Date().toISOString()
  },
  {
    id: "32",
    title: "Introduction to the Solar System",
    description: "Tour of planets and celestial bodies in our solar system 🪐",
    videoUrl: "https://www.youtube.com/embed/libKVRa01L8",
    category: "Astronomy",
    author: {
      id: "32",
      username: "spaceteacher",
      name: "NASA",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    likes: 36700,
    views: 122300,
    createdAt: new Date().toISOString()
  },
  {
    id: "33",
    title: "Photosynthesis for Kids",
    description: "How plants make their own food explained simply 🌱",
    videoUrl: "https://www.youtube.com/embed/UPBMG5EYydo",
    category: "Biology",
    author: {
      id: "33",
      username: "scienceteacher",
      name: "Science For Kids",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    likes: 28800,
    views: 96000,
    createdAt: new Date().toISOString()
  },
  {
    id: "34",
    title: "Beginners Guide to Excel",
    description: "Learn the basics of spreadsheets and data analysis 📊",
    videoUrl: "https://www.youtube.com/embed/rwbho0CgEAE",
    category: "Technology",
    author: {
      id: "34",
      username: "excelteacher",
      name: "Kevin Stratvert",
      avatar: "https://i.pravatar.cc/150?img=34"
    },
    likes: 33800,
    views: 112700,
    createdAt: new Date().toISOString()
  },
  {
    id: "35",
    title: "How to Play Chess: Rules for Beginners",
    description: "Learn the basic rules and pieces in chess ♟️",
    videoUrl: "https://www.youtube.com/embed/OCSbzArwB10",
    category: "Games",
    author: {
      id: "35",
      username: "chessteacher",
      name: "Chess.com",
      avatar: "https://i.pravatar.cc/150?img=35"
    },
    likes: 31700,
    views: 105700,
    createdAt: new Date().toISOString()
  },
  {
    id: "36",
    title: "The American Revolution - Oversimplified",
    description: "Entertaining explanation of the revolutionary war 🇺🇸",
    videoUrl: "https://www.youtube.com/embed/gzALIXcY4pg",
    category: "History",
    author: {
      id: "36",
      username: "historyexplained",
      name: "OverSimplified",
      avatar: "https://i.pravatar.cc/150?img=36"
    },
    likes: 37100,
    views: 123700,
    createdAt: new Date().toISOString()
  },
  {
    id: "37",
    title: "Introduction to Artificial Intelligence",
    description: "Understanding AI concepts and applications 🧠",
    videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk",
    category: "Technology",
    author: {
      id: "37",
      username: "aiteacher",
      name: "Simplilearn",
      avatar: "https://i.pravatar.cc/150?img=37"
    },
    likes: 34900,
    views: 116300,
    createdAt: new Date().toISOString()
  },
  {
    id: "38",
    title: "Digital Marketing Course for Beginners",
    description: "Learn basics of SEO, social media, and content marketing 📱",
    videoUrl: "https://www.youtube.com/embed/nU-IIXBWlS4",
    category: "Marketing",
    author: {
      id: "38",
      username: "marketingpro",
      name: "HubSpot Academy",
      avatar: "https://i.pravatar.cc/150?img=38"
    },
    likes: 33200,
    views: 110700,
    createdAt: new Date().toISOString()
  },
  {
    id: "39",
    title: "How to Take Great Photos With Your Phone",
    description: "Smartphone photography tips and techniques 📱",
    videoUrl: "https://www.youtube.com/embed/AywkBTyk1xc",
    category: "Photography",
    author: {
      id: "39",
      username: "phonephotographer",
      name: "iPhone Photography School",
      avatar: "https://i.pravatar.cc/150?img=39"
    },
    likes: 29900,
    views: 99700,
    createdAt: new Date().toISOString()
  },
  {
    id: "40",
    title: "Learn HTML & CSS in 30 Minutes",
    description: "Quick introduction to web development fundamentals 💻",
    videoUrl: "https://www.youtube.com/embed/a_iQb1lnAEQ",
    category: "Technology",
    author: {
      id: "40",
      username: "webdevteacher",
      name: "Web Dev Simplified",
      avatar: "https://i.pravatar.cc/150?img=40"
    },
    likes: 35300,
    views: 117700,
    createdAt: new Date().toISOString()
  },
  {
    id: "41",
    title: "Introduction to Electricity: Basic Concepts",
    description: "Understanding voltage, current, and resistance ⚡",
    videoUrl: "https://www.youtube.com/embed/mc979OhitAg",
    category: "Science",
    author: {
      id: "41",
      username: "electricityteacher",
      name: "Learn Engineering",
      avatar: "https://i.pravatar.cc/150?img=41"
    },
    likes: 30500,
    views: 101700,
    createdAt: new Date().toISOString()
  },
  {
    id: "42",
    title: "Creative Writing: How to Write a Short Story",
    description: "Techniques for crafting compelling short fiction ✍️",
    videoUrl: "https://www.youtube.com/embed/vVX_SJ5I_nw",
    category: "Writing",
    author: {
      id: "42",
      username: "writingcoach",
      name: "Diane Callahan",
      avatar: "https://i.pravatar.cc/150?img=42"
    },
    likes: 27900,
    views: 93000,
    createdAt: new Date().toISOString()
  },
  {
    id: "43",
    title: "Introduction to 3D Modeling",
    description: "Getting started with 3D design software 🖥️",
    videoUrl: "https://www.youtube.com/embed/1qstdW89X_o",
    category: "Design",
    author: {
      id: "43",
      username: "3dartist",
      name: "Blender Guru",
      avatar: "https://i.pravatar.cc/150?img=43"
    },
    likes: 34400,
    views: 114700,
    createdAt: new Date().toISOString()
  },
  {
    id: "44",
    title: "Public Speaking: Overcome Your Fear",
    description: "Tips for confident presentations and speeches 🎤",
    videoUrl: "https://www.youtube.com/embed/HAnw168huqA",
    category: "Communication",
    author: {
      id: "44",
      username: "speakingcoach",
      name: "TED-Ed",
      avatar: "https://i.pravatar.cc/150?img=44"
    },
    likes: 31000,
    views: 103300,
    createdAt: new Date().toISOString()
  },
  {
    id: "45",
    title: "How to Meditate for Beginners",
    description: "Simple meditation techniques for stress relief 🧘",
    videoUrl: "https://www.youtube.com/embed/o-kMJBWk9E0",
    category: "Wellness",
    author: {
      id: "45",
      username: "meditationteacher",
      name: "Headspace",
      avatar: "https://i.pravatar.cc/150?img=45"
    },
    likes: 29300,
    views: 97700,
    createdAt: new Date().toISOString()
  },
  {
    id: "46",
    title: "Introduction to Blockchain Technology",
    description: "Understanding crypto and blockchain basics 🔗",
    videoUrl: "https://www.youtube.com/embed/SSo_EIwHSd4",
    category: "Technology",
    author: {
      id: "46",
      username: "blockchaineducator",
      name: "Simplilearn",
      avatar: "https://i.pravatar.cc/150?img=46"
    },
    likes: 32900,
    views: 109700,
    createdAt: new Date().toISOString()
  },
  {
    id: "47",
    title: "Learn Arabic - 600 Most Important Words and Phrases",
    description: "Essential vocabulary for Arabic beginners 🇦🇪",
    videoUrl: "https://www.youtube.com/embed/HcQ-My9VqM4",
    category: "Language",
    author: {
      id: "47",
      username: "arabicteacher",
      name: "Arabic Pod 101",
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    likes: 28500,
    views: 95000,
    createdAt: new Date().toISOString()
  },
  {
    id: "48",
    title: "How To Start a Podcast in 2023",
    description: "Equipment, software, and distribution guide 🎙️",
    videoUrl: "https://www.youtube.com/embed/vHZSEgNCb0Y",
    category: "Media",
    author: {
      id: "48",
      username: "podcastcoach",
      name: "Think Media",
      avatar: "https://i.pravatar.cc/150?img=48"
    },
    likes: 31800,
    views: 106000,
    createdAt: new Date().toISOString()
  },
  {
    id: "49",
    title: "Baking Basics: Perfect Chocolate Chip Cookies",
    description: "Easy recipe and techniques for delicious cookies 🍪",
    videoUrl: "https://www.youtube.com/embed/wyuec0PPz68",
    category: "Cooking",
    author: {
      id: "49",
      username: "bakingteacher",
      name: "Joshua Weissman",
      avatar: "https://i.pravatar.cc/150?img=49"
    },
    likes: 30400,
    views: 101300,
    createdAt: new Date().toISOString()
  },
  {
    id: "50",
    title: "Introduction to Cybersecurity",
    description: "Basic concepts to protect your digital life 🔒",
    videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA",
    category: "Technology",
    author: {
      id: "50",
      username: "securityexpert",
      name: "Traverse Media",
      avatar: "https://i.pravatar.cc/150?img=50"
    },
    likes: 34000,
    views: 113300,
    createdAt: new Date().toISOString()
  }
];

/**
 * Mock user data for testing user-related functionality
 * Includes profile information, learning history, earned badges, and saved videos
 */
export const mockUser: User = {
  id: "user1",
  name: "Test User",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  videosWatched: 42,
  badges: [
    {
      id: "badge1",
      name: "Quick Starter",
      description: "Watched 10+ videos",
      iconUrl: "/icons/badge-starter.svg"
    },
    {
      id: "badge2",
      name: "Science Explorer",
      description: "Watched 5+ science videos",
      iconUrl: "/icons/badge-science.svg"
    }
  ],
  savedVideos: ["3", "15", "27"]
};

/**
 * Educational content categories
 * Used for filtering and organizing educational videos
 */
export const categories = [
  "Mathematics",
  "Science",
  "Technology",
  "Language",
  "Arts",
  "History",
  "Health",
  "Finance",
  "Music",
  "Cooking",
  "Psychology",
  "Photography",
  "Writing",
  "Games",
  "Marketing",
  "Communication",
  "Design",
  "Biology",
  "Astronomy",
  "Wellness"
]; 