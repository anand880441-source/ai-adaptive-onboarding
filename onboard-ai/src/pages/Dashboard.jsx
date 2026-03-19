import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, BarChart3, AlertCircle, Map, CheckCircle2, PlayCircle, Lock, Layout, Terminal, Cloud, Database, FileCode, Search, Share2, Info, Layers, TrendingUp, Target, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
    hover: {
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="skill-dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="dash-header-v2">
        <motion.div variants={itemVariants}>
          <div className="dash-status-pill">
            <div className="pulse-dot"></div>
            SYNTHESIS ACTIVE
          </div>
          <h1 className="dash-title-v4">Hyper-Growth <span className="onboarding-gradient">Dashboard</span></h1>
          <p className="dash-subtitle-v4">AI-powered neural analysis of your technical trajectory</p>
        </motion.div>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 180 }}
          transition={{ rotate: { duration: 0.6 } }}
          className="btn-resync-v4"
        >
          <RefreshCw size={16} /> RE-SYNC NEURAL CORE
        </motion.button>
      </header>

      <div className="dash-grid-v4">
        {/* Extracted Skills Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="glass-card-v4"
        >
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 purple">
                <BarChart3 size={20} />
              </div>
              <h3>Extracted Intelligence</h3>
            </div>
            <span className="badge-v4-outline">12 TOTAL NODES</span>
          </div>

          <div className="skills-grid-v4">
            {[
              { name: 'React.js', level: 'EXPERT', icon: <Layout size={18} />, color: '#61dafb' },
              { name: 'Python', level: 'ADVANCED', icon: <Terminal size={18} />, color: '#3776ab' },
              { name: 'AWS', level: 'PRO', icon: <Cloud size={18} />, color: '#ff9900' },
              { name: 'PostgreSQL', level: 'MID', icon: <Database size={18} />, color: '#336791' },
              { name: 'TypeScript', level: 'EXPERT', icon: <FileCode size={18} />, color: '#3178c6' }
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="skill-chip-v2"
              >
                <div className="skill-icon-box" style={{ color: skill.color }}>{skill.icon}</div>
                <div className="skill-info-v2">
                  <span className="skill-name-v2">{skill.name}</span>
                  <span className="skill-level-v2">{skill.level}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="card-footer-v4">
            <Info size={14} />
            <span>Data synthesized from High-Order Neural Repositories</span>
          </div>
        </motion.div>

        {/* Skill Gap Analysis Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="glass-card-v4"
        >
          <div className="card-header-v4">
            <div className="header-left-v4">
              <div className="icon-box-v4 amber">
                <AlertCircle size={20} />
              </div>
              <h3>Synthesis Gaps</h3>
            </div>
            <span className="badge-v4-outline warning">3 CRITICAL</span>
          </div>

          <div className="gap-list-v4">
            {[
              { name: 'Kubernetes', role: 'DevOps Orchestration', match: '98% Gap', priority: 'CRITICAL', icon: <Layers size={18} /> },
              { name: 'TensorFlow', role: 'Neural Logic Engine', match: '85% Gap', priority: 'HIGH', icon: <Target size={18} /> },
              { name: 'GoLang', role: 'System Concurrency', match: '72% Gap', priority: 'MID', icon: <TrendingUp size={18} /> }
            ].map((gap, i) => (
              <motion.div
                key={gap.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="gap-item-v4"
              >
                <div className="gap-info-v4">
                  <div className="gap-icon-v4">{gap.icon}</div>
                  <div>
                    <h4>{gap.name}</h4>
                    <p>{gap.role}</p>
                  </div>
                </div>
                <div className="gap-metrics-v4">
                  <span className="gap-percent-v4">{gap.match}</span>
                  <span className={`gap-priority-v4 ${gap.priority.toLowerCase()}`}>{gap.priority}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Learning Path Section */}
      <motion.div
        variants={itemVariants}
        className="roadmap-container-v4"
      >
        <div className="roadmap-header-v4">
          <div className="header-left-v4">
            <div className="icon-box-v4 large">
              <Map size={24} />
            </div>
            <div>
              <h3>Learning Path: <span className="onboarding-gradient">Cloud Systems Architect</span></h3>
              <p>Personalized roadmap generated by Hyper-Logic Copilot</p>
            </div>
          </div>

          <div className="completion-stats-v4">
            <div className="stat-text-v4">
              <span className="label">PROGRESS</span>
              <span className="value">15%</span>
            </div>
            <div className="progress-track-v4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '15%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="progress-fill-v4"
              ></motion.div>
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="share-btn-v4">
              <Share2 size={16} />
            </motion.button>
          </div>
        </div>

        <div className="modern-timeline-v4">
          {[
            { id: '01', title: 'Foundational Core Concepts', time: '2h', status: 'COMPLETED', priority: 'HIGH', icon: <CheckCircle2 size={18} /> },
            { id: '02', title: 'Advanced Cloud Architectures', time: '4h 30m', status: 'IN PROGRESS', priority: 'CRITICAL', icon: <PlayCircle size={18} /> },
            { id: '03', title: 'Scalability & Optimization', time: '3h', status: 'LOCKED', priority: 'MEDIUM', icon: <Lock size={18} /> }
          ].map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`timeline-node-v4 ${node.status.toLowerCase().replace(' ', '-')}`}
            >
              <div className="node-marker-v4">
                <div className="marker-dot-v4">{node.status === 'COMPLETED' ? <CheckCircle2 size={14} /> : i + 1}</div>
                <div className="node-line-v4"></div>
              </div>

              <div className="node-card-v4 premium-glass">
                <div className="node-content-v4">
                  <div className="node-top-v4">
                    <span className="node-id-v4">MODULE {node.id}</span>
                    <span className={`status-pill-v4 ${node.status.toLowerCase().replace(' ', '-')}`}>
                      {node.status}
                    </span>
                  </div>
                  <h4>{node.title}</h4>
                  <div className="node-meta-v4">
                    <span><RefreshCw size={12} className="spin-slow" /> {node.time} remaining</span>
                    <span className={`priority-indicator-v4 ${node.priority.toLowerCase()}`}>
                      {node.priority} PRIORITY
                    </span>
                  </div>
                </div>

                {node.status === 'IN PROGRESS' ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-resume-v4"
                  >
                    RESUME MISSION <ArrowRight size={16} />
                  </motion.button>
                ) : node.status === 'COMPLETED' ? (
                  <button className="btn-secondary-v4">REVIEW PROTOCOL</button>
                ) : (
                  <div className="locked-msg-v4"><Lock size={14} /> COMPLETE PREVIOUS MISSION</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
