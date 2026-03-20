const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Handle file upload
const uploadFiles = async (req, res) => {
  try {
    console.log('📁 Files received:', req.files);
    
    if (!req.files || !req.files.resume || !req.files.jd) {
      return res.status(400).json({
        success: false,
        message: 'Both resume and job description are required'
      });
    }

    const resumeFile = req.files.resume[0];
    const jdFile = req.files.jd[0];

    // Extract text from files
    const resumeText = await extractTextFromFile(resumeFile);
    const jdText = await extractTextFromFile(jdFile);

    console.log('📝 Resume content preview:', resumeText.substring(0, 200));
    console.log('📝 JD content preview:', jdText.substring(0, 200));

    // Extract skills from both files
    const resumeSkills = extractSkillsFromText(resumeText);
    const requiredSkills = extractSkillsFromText(jdText);

    // Identify skill gaps
    const skillGaps = [];
    const resumeSkillNames = resumeSkills.map(s => s.name.toLowerCase());
    
    requiredSkills.forEach(reqSkill => {
      const existingSkill = resumeSkills.find(s => s.name.toLowerCase() === reqSkill.name.toLowerCase());
      if (!existingSkill) {
        skillGaps.push({
          name: reqSkill.name,
          currentLevel: 'none',
          requiredLevel: reqSkill.level
        });
      } else if (existingSkill.level !== reqSkill.level) {
        skillGaps.push({
          name: reqSkill.name,
          currentLevel: existingSkill.level,
          requiredLevel: reqSkill.level
        });
      }
    });

    // Generate personalized roadmap based on gaps
    const roadmap = generateRoadmap(skillGaps, resumeSkills);

    const mockData = {
      resume: {
        skills: resumeSkills,
        fileName: resumeFile.originalname,
        fileSize: resumeFile.size
      },
      pathway: {
        skillGaps: skillGaps,
        roadmap: roadmap
      }
    };

    console.log('✅ Sending analyzed data to frontend');
    
    res.status(200).json({
      success: true,
      message: 'Files uploaded and analyzed successfully',
      data: mockData
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing files',
      error: error.message
    });
  }
};

// Extract text from files
async function extractTextFromFile(file) {
  const filePath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();
  
  try {
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      return fs.readFileSync(filePath, 'utf8');
    }
  } catch (error) {
    console.error(`Error extracting text:`, error);
    return fs.readFileSync(filePath, 'utf8');
  }
}

// Extract skills from text
function extractSkillsFromText(text) {
  const skills = [];
  const lowerText = text.toLowerCase();
  
  const skillDatabase = {
    'python': { level: 'advanced', category: 'Technical' },
    'java': { level: 'intermediate', category: 'Technical' },
    'javascript': { level: 'intermediate', category: 'Technical' },
    'react': { level: 'beginner', category: 'Technical' },
    'node.js': { level: 'intermediate', category: 'Technical' },
    'nodejs': { level: 'intermediate', category: 'Technical' },
    'django': { level: 'intermediate', category: 'Technical' },
    'spring': { level: 'intermediate', category: 'Technical' },
    'spring boot': { level: 'intermediate', category: 'Technical' },
    'aws': { level: 'beginner', category: 'Cloud' },
    'docker': { level: 'beginner', category: 'DevOps' },
    'kubernetes': { level: 'beginner', category: 'DevOps' },
    'mongodb': { level: 'intermediate', category: 'Database' },
    'postgresql': { level: 'intermediate', category: 'Database' },
    'typescript': { level: 'beginner', category: 'Technical' },
    'git': { level: 'intermediate', category: 'Tools' },
    'communication': { level: 'advanced', category: 'Soft' }
  };
  
  for (const [skill, info] of Object.entries(skillDatabase)) {
    if (lowerText.includes(skill)) {
      skills.push({
        name: skill.charAt(0).toUpperCase() + skill.slice(1),
        level: info.level,
        category: info.category
      });
    }
  }
  
  // Add default skills if none found
  if (skills.length === 0) {
    skills.push(
      { name: 'JavaScript', level: 'intermediate', category: 'Technical' },
      { name: 'Communication', level: 'advanced', category: 'Soft' }
    );
  }
  
  return skills;
}

// Generate roadmap based on skill gaps
function generateRoadmap(skillGaps, currentSkills) {
  const roadmap = [];
  
  // Priority: missing skills first
  const sortedGaps = [...skillGaps].sort((a, b) => {
    if (a.currentLevel === 'none') return -1;
    if (b.currentLevel === 'none') return 1;
    return 0;
  });
  
  sortedGaps.forEach((gap, index) => {
    const courseMap = {
      'TypeScript': {
        title: 'TypeScript Mastery',
        description: 'Learn TypeScript from basics to advanced patterns',
        reasoning: `Required for ${gap.requiredLevel} level proficiency`
      },
      'AWS': {
        title: 'AWS Cloud Practitioner',
        description: 'AWS fundamentals and cloud architecture',
        reasoning: `Essential for cloud deployment and scaling`
      },
      'Docker': {
        title: 'Docker Containerization',
        description: 'Container basics and orchestration',
        reasoning: `Critical for modern deployment workflows`
      },
      'Kubernetes': {
        title: 'Kubernetes Fundamentals',
        description: 'Container orchestration and cluster management',
        reasoning: `Required for scalable microservices`
      },
      'React': {
        title: 'Advanced React Development',
        description: 'React hooks, state management, and patterns',
        reasoning: `Build on your ${currentSkills.find(s => s.name === 'React')?.level || 'current'} React skills`
      }
    };
    
    const course = courseMap[gap.name] || {
      title: `${gap.name} Fundamentals`,
      description: `Comprehensive training in ${gap.name}`,
      reasoning: `Required to bridge the gap from ${gap.currentLevel} to ${gap.requiredLevel}`
    };
    
    roadmap.push({
      title: course.title,
      description: course.description,
      reasoning: course.reasoning,
      duration: `${3 + index * 2} weeks`
    });
  });
  
  // Add default roadmap if no gaps
  if (roadmap.length === 0) {
    roadmap.push({
      title: 'Advanced Technical Skills',
      description: 'Enhance your existing skills with advanced concepts',
      reasoning: 'Based on your current skill level',
      duration: '4 weeks'
    });
  }
  
  return roadmap;
}

module.exports = {
  uploadFiles
};
