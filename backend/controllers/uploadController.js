const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Helper function to extract text from files
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

// Extract skills from text using keyword matching
function extractSkillsFromText(text) {
  const skills = [];
  const lowerText = text.toLowerCase();
  
  const skillDatabase = {
    'python': { level: 'Intermediate', category: 'Technical' },
    'java': { level: 'Intermediate', category: 'Technical' },
    'javascript': { level: 'Intermediate', category: 'Technical' },
    'react': { level: 'Intermediate', category: 'Technical' },
    'node.js': { level: 'Intermediate', category: 'Technical' },
    'nodejs': { level: 'Intermediate', category: 'Technical' },
    'django': { level: 'Intermediate', category: 'Technical' },
    'spring': { level: 'Intermediate', category: 'Technical' },
    'spring boot': { level: 'Intermediate', category: 'Technical' },
    'aws': { level: 'Intermediate', category: 'Cloud' },
    'docker': { level: 'Intermediate', category: 'DevOps' },
    'kubernetes': { level: 'Intermediate', category: 'DevOps' },
    'mongodb': { level: 'Intermediate', category: 'Database' },
    'postgresql': { level: 'Intermediate', category: 'Database' },
    'typescript': { level: 'Intermediate', category: 'Technical' },
    'git': { level: 'Intermediate', category: 'Tools' },
    'communication': { level: 'Advanced', category: 'Soft' }
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
  
  // Add default if none found
  if (skills.length === 0) {
    skills.push(
      { name: 'JavaScript', level: 'Intermediate', category: 'Technical' },
      { name: 'Communication', level: 'Advanced', category: 'Soft' }
    );
  }
  
  return skills.slice(0, 10);
}

// Generate skill gaps
function identifyGaps(resumeSkills, jdText) {
  const gaps = [];
  const resumeSkillNames = resumeSkills.map(s => s.name.toLowerCase());
  const lowerJd = jdText.toLowerCase();
  
  const commonRequiredSkills = ['python', 'java', 'javascript', 'react', 'aws', 'docker', 'kubernetes', 'typescript', 'node.js'];
  
  commonRequiredSkills.forEach(skill => {
    if (lowerJd.includes(skill) && !resumeSkillNames.includes(skill)) {
      gaps.push({
        name: skill.charAt(0).toUpperCase() + skill.slice(1),
        currentLevel: 'none',
        requiredLevel: 'Intermediate',
        priority: 'High',
        reason: `${skill.charAt(0).toUpperCase() + skill.slice(1)} is required for this role`
      });
    }
  });
  
  return gaps.slice(0, 5);
}

// Generate roadmap
function generateRoadmap(gaps) {
  if (gaps.length === 0) {
    return [{
      title: 'Advanced Professional Development',
      description: 'Enhance your existing skills with advanced concepts and best practices',
      reasoning: 'You already have the required skills - focus on deepening expertise',
      duration: '4 weeks'
    }];
  }
  
  return gaps.map((gap, index) => ({
    title: `${gap.name} Mastery`,
    description: `Learn ${gap.name} from fundamentals to advanced concepts`,
    reasoning: gap.reason,
    duration: index === 0 ? '2 weeks' : index === 1 ? '3 weeks' : '4 weeks'
  }));
}

// Main upload handler
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

    // Extract text
    const resumeText = await extractTextFromFile(resumeFile);
    const jdText = await extractTextFromFile(jdFile);

    console.log('✅ Text extracted - Resume length:', resumeText.length, 'JD length:', jdText.length);

    // Extract skills
    const resumeSkills = extractSkillsFromText(resumeText);
    const skillGaps = identifyGaps(resumeSkills, jdText);
    const roadmap = generateRoadmap(skillGaps);

    const responseData = {
      resume: {
        skills: resumeSkills,
        fileName: resumeFile.originalname,
        summary: `Professional skilled in ${resumeSkills.map(s => s.name).join(', ')}`
      },
      pathway: {
        skillGaps: skillGaps,
        roadmap: roadmap
      }
    };

    console.log('✅ Sending response with', resumeSkills.length, 'skills,', skillGaps.length, 'gaps');
    
    res.status(200).json({
      success: true,
      message: 'Files processed successfully',
      data: responseData
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

module.exports = {
  uploadFiles
};
