'use client';

import React, {useEffect, useState} from 'react';
import {Award, BookOpen, GitBranch, Mail, Linkedin} from 'lucide-react';
import {AnimatePresence, motion, useScroll, useSpring} from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 15,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const TypewriterEffect = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 8);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayText}</span>;
};

const smoothScroll = (targetY: number, duration = 1000) => {
  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  const animation = (currentTime: number) => {
    const runtime = currentTime - startTime;
    const progress = Math.min(runtime / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + (difference * ease));

    if (runtime < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [showDetails, setShowDetails] = useState(false);
  const commandText = `> project.info("${project.name}");\n> project.getDetails();`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-gray-900 rounded-lg w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gray-800 p-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"/>
            <div className="w-3 h-3 rounded-full bg-yellow-500"/>
            <div className="w-3 h-3 rounded-full bg-green-500"/>
          </div>
          <div className="flex-1 text-center text-sm text-gray-400">project-details — -zsh</div>
        </div>

        <div className="p-4 md:p-6 font-mono text-sm">
          <TypewriterEffect
            text={commandText}
            onComplete={() => setShowDetails(true)}
          />

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-4 text-gray-300"
              >
                <div className="bg-gray-800 p-4 rounded">
                  <div className="text-blue-400">Project: {project.name}</div>
                  <div className="text-gray-400">Period: {project.period}</div>
                  <div className="text-gray-400">Role: {project.role}</div>
                </div>

                <div className="bg-gray-800 p-4 rounded">
                  <div className="text-green-400">Description:</div>
                  <div className="text-gray-400">{project.description}</div>
                </div>

                <div className="bg-gray-800 p-4 rounded">
                  <div className="text-yellow-400">Tech Stack:</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech_stack.split(', ').map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 rounded text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.features && (
                  <div className="bg-gray-800 p-4 rounded">
                    <div className="text-purple-400">Features:</div>
                    <ul className="list-disc list-inside mt-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="text-gray-400">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const scrollToContent = () => {
  const contentElement = document.querySelector('.min-h-screen.bg-black.p-8');
  if (contentElement) {
    const rect = contentElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop;
    smoothScroll(targetY, 1500);
  }
};

const TerminalBanner = () => {
  const [typedText, setTypedText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const text = `    mysql> SELECT name, role, experience FROM users WHERE name = '이규빈';
   +--------+-------------------+------------+
   | name   | role              | experience |
   +--------+-------------------+------------+
   | 이규빈   | Backend Developer | 1 year     |
   +--------+-------------------+------------+
   1 row in set (0.00 sec)
   
   mysql> SELECT url FROM links;
   +-----------------------------------------------+----------+
   | url                                           | platform |
   +-----------------------------------------------+----------+
   | https://github.com/qbinee                     | github   |
   | https://sdhg12.tistory.com                    | tistory  |
   | https://kr.linkedin.com/in/규빈-이-97137a232    | linkedin |
   +-----------------------------------------------+----------+
   2 rows in set (0.00 sec)`;

    let index = 0;
    const typing = setInterval(() => {
      if (index < text.length-1) {
        setTypedText(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(typing);
        setShowResult(true);
      }
    }, 5);

    return () => clearInterval(typing);
  }, []);

  return (
    <motion.div
      onClick={scrollToContent}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.6}}
      className="min-h-screen flex items-center justify-center bg-black p-4 md:p-6"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="fixed top-0 left-0 right-0 bg-[#2D2D2D] px-2 py-1 z-50">
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-4 flex-1">
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-gray-300 text-xs font-medium space-x-6">
              <span>Finder</span>
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Go</span>
              <span>Window</span>
              <span>Help</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-300 text-xs ml-auto">
            <span>99%</span>
            <span>{time.toLocaleDateString('ko-KR', {
              month: 'numeric',
              day: 'numeric',
              weekday: 'short'
            })} {time.toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl">
        <div className="bg-gray-800 rounded-t-lg flex items-center p-3 gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"/>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"/>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer"/>
          </div>
          <div className="flex-1 text-center text-sm text-gray-400">portfolio — -zsh — 80×24</div>
        </div>

        <div className="bg-gray-900 p-6 md:p-12 space-y-8 rounded-b-lg border border-gray-700 shadow-2xl font-mono min-h-[600px] w-full">
          <div className="text-yellow-500 text-base md:text-lg">Welcome to 이규빈 Portfolio v1.0.0</div>
          <div className="whitespace-pre-wrap text-green-400 text-sm md:text-base mb-8">{typedText}</div>

          <AnimatePresence>
            {showResult && (
                <motion.div
                    initial={{opacity: 0, y: 5}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                    className="bg-gray-800 p-4 md:p-6 rounded-lg border border-gray-700 mt-12"
                >
                  <div className="space-y-2">
                    <a
                        href="https://github.com/qbinee"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-blue-400 hover:text-blue-300 hover:underline text-base"
                    >
                      <GitBranch size={20}/>
                      github
                    </a>
                    <a
                        href="https://sdhg12.tistory.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-blue-400 hover:text-blue-300 hover:underline text-base"
                    >
                      <BookOpen size={20}/>
                      tistory
                    </a>

                    <a
                        href="https://kr.linkedin.com/in/%EA%B7%9C%EB%B9%88-%EC%9D%B4-97137a232"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-blue-400 hover:text-blue-300 hover:underline text-base"
                    >
                      <Linkedin size={20}/>
                      linkedin
                    </a>
                  </div>

                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

interface Project {
  id: string;
  type: string;
  name: string;
  period: string;
  description: string;
  features: string[];
  tech_stack: string;
  thumbnail: string;
  role: string;
}

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      type: 'company',
      name: 'Benton ERP',
      period: '2023.01 - 2023.06',
      description: '대규모 재고관리 서비스',
      features: ['대규모 데이터베이스 마이그레이션', '재고 관리 API 개발', '배치 프로세스 개발'],
      tech_stack: 'Spring Boot, JPA, MySQL, Redis',
      thumbnail: "/file.svg",
      role: 'Backend Developer'
    },
    {
      id: '2',
      type: 'company',
      name: '체형측정 수강권 시스템 Backend',
      period: '2023.06 - 2023.08',
      description: '체형측정 수강권 시스템 서비스 백엔드 개발',
      tech_stack: 'Spring Boot, MongoDB, AWS',
      thumbnail: "/file.svg",
      role: 'Backend Developer',
      features: ['REST API 설계 및 구현', 'AWS 인프라 구축']
    },
    {
      id: '3',
      type: 'company',
     name: '힘난다버거 서비스',
     period: '2023.08 - 2023.10',
     description: '햄버거 주문 서비스',
     tech_stack: 'Spring Boot, MySQL, Redis',
     thumbnail: "/file.svg",
     role: 'Backend Developer',
     features: ['주문 처리 시스템 구현', '실시간 재고 관리']
   },
   {
     id: '4',
     type: 'company',
     name: '힘난다버거 KDS',
     period: '2023.10 - 2023.12',
     description: '주방 디스플레이 시스템',
     tech_stack: 'Spring Boot, WebSocket, MySQL',
     thumbnail: "/file.svg",
     role: 'Backend Developer',
     features: ['실시간 주문 현황 관리', 'WebSocket을 통한 실시간 통신']
   },
   {
     id: '5',
     type: 'company',
     name: 'PG 결제 서비스',
     period: '2023.12 - 2024.02',
     description: '결제 시스템 개발',
     tech_stack: 'Spring Boot, MySQL, Redis, Kafka',
     thumbnail: "/file.svg",
     role: 'Backend Developer',
     features: ['결제 프로세스 구현', '결제 데이터 동기화']
   },
   {
     id: '6',
     type: 'school',
     name: 'STTOCK',
     period: '2023.03 - 2023.06',
     description: '재고관리 시스템',
     tech_stack: 'Spring Boot, JPA, MySQL',
     thumbnail: "/file.svg",
     role: 'Backend Developer',
     features: ['재고 관리 API 개발', '데이터베이스 설계']
   },
   {
     id: '7',
     type: 'school',
     name: 'Recummery',
     period: '2024.01 - 2024.05',
     description: '이력서 추천 서비스',
     thumbnail: "/file.svg",
     tech_stack: 'Spring Boot, JPA, PostgreSQL, Redis',
     role: 'Backend Lead',
     features: ['이력서 분석 알고리즘 구현', '추천 시스템 개발']
   }
 ];

 const awards = [
   {
     title: "최우수상",
     organization: "소프트웨어학과 졸업 프로젝트 경진대회",
     date: "2024.02"
   },
   {
     title: "대상",
     organization: "아주대학교 캡스톤 디자인 경진대회",
     date: "2023.12"
   },
   {
     title: "우수상",
     organization: "소프트웨어학과 학술제",
     date: "2023.06"
   }
 ];

 return (
   <div className="bg-black">
     <ScrollProgress />
     <TerminalBanner />

     <div className="min-h-screen bg-black p-4 md:p-8">
       <div className="max-w-6xl mx-auto">
         <div className="bg-black rounded-3xl shadow-xl overflow-hidden p-4 md:p-8 border border-gray-800">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
             {/* Left Column */}
             <div className={`${isMobile ? 'order-1' : ''} md:col-span-4 space-y-6`}>
               <div className="bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-800">
                 <div className="flex flex-col items-center">
                   <div className="w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden mb-4">
                     <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover"/>
                   </div>
                   <h1 className="text-xl font-bold text-white">이규빈</h1>
                   <p className="text-gray-400 text-sm">Backend Developer</p>
                   <div className="mt-4 space-y-2 w-full">
                     <p className="text-sm text-gray-400 flex items-center gap-2">
                       <Mail size={14}/> sdhg12@gmail.com
                     </p>
                     <p className="text-sm text-gray-400 flex items-center gap-2">
                       <GitBranch size={14}/> github.com/qbinee
                     </p>
                   </div>
                 </div>
               </div>

               <div className="bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-800">
                 <h2 className="text-lg font-semibold mb-4 text-white">Skills</h2>
                 <div className="flex flex-wrap gap-2">
                   {["Spring Boot", "JPA", "MySQL", "Redis", "AWS"].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>

               <div className="bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-800">
                 <h2 className="text-lg font-semibold mb-4 text-white">Identity</h2>
                 <div className="flex flex-wrap gap-2">
                   {["Fast Learner", "Problem Solver", "Team Player"].map(trait => (
                     <span key={trait} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                       {trait}
                     </span>
                   ))}
                 </div>
               </div>

               <h2 className="text-xl font-bold text-white">Awards</h2>

               {awards.map((award, index) => (
                 <div className="bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-800" key={index}>
                   <div className="flex items-center gap-2 mb-4">
                     <Award size={18} className="text-yellow-500" />
                     <h2 className="text-lg font-semibold text-white">{award.title}</h2>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {[award.organization, award.date].map(trait => (
                       <span key={trait} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                         {trait}
                       </span>
                     ))}
                   </div>
                 </div>
               ))}
             </div>

             {/* Right Column */}
             <div className={`${isMobile ? 'order-2' : ''} md:col-span-8 space-y-6 md:space-y-8`}>
               <div>
                 <div className="flex mb-4 md:mb-6">
                   <h1 className="text-2xl md:text-3xl font-bold text-white">Backend Developer</h1>
                 </div>

                 <div className="prose max-w-none">
                   <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                     Spring Boot를 주력으로 사용하는 백엔드 개발자입니다. 클린 코드와 테스트 코드 작성에 관심이 많으며,
                     현재는 프로젝트와 인턴십을 통해 실무 경험을 쌓고 있습니다.
                   </p>
                 </div>
               </div>

               <div className="space-y-4 md:space-y-6">
                 <h2 className="text-xl font-bold text-white">Timeline</h2>
                 <div className="relative">
                   <div className="absolute h-full w-0.5 bg-gray-800 left-8 md:left-16 top-0"/>

                   {/* 2024 Projects */}
                   <div className="mb-8">
                     <div className="flex items-center mb-4">
                       <span className="text-lg font-bold text-white w-16">2024</span>
                       <div className="h-4 w-4 rounded-full bg-blue-500 ml-4 z-10"/>
                     </div>
                     <div className="ml-16 md:ml-24 space-y-4">
                       {projects
                         .filter(project => project.period.includes('2024'))
                         .map(project => (
                           <TimelineItem
                             key={project.id}
                             project={project}
                             onClick={() => setSelectedProject(project)}
                           />
                         ))}
                     </div>
                   </div>

                   {/* 2023 Projects */}
                   <div className="mb-8">
                     <div className="flex items-center mb-4">
                       <span className="text-lg font-bold text-white w-16">2023</span>
                       <div className="h-4 w-4 rounded-full bg-blue-500 ml-4 z-10"/>
                     </div>
                     <div className="ml-16 md:ml-24 space-y-4">
                       {projects
                         .filter(project => project.period.includes('2023'))
                         .map(project => (
                           <TimelineItem
                             key={project.id}
                             project={project}
                             onClick={() => setSelectedProject(project)}
                           />
                         ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>

     <AnimatePresence>
       {selectedProject && (
         <ProjectModal
           project={selectedProject}
           onClose={() => setSelectedProject(null)}
         />
       )}
     </AnimatePresence>
   </div>
 );
};

interface TimelineItemProps {
 project: Project;
 onClick: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ project, onClick }) => {
 return (
   <motion.div
     whileHover={{x: 10, backgroundColor: 'rgba(59, 130, 246, 0.05)'}}
     className={`border-l-2 ${project.type === 'school' ? 'border-green-500' : 'border-blue-500'} 
       pl-4 cursor-pointer p-4 rounded-lg bg-gray-900 grid grid-cols-12 gap-4`}
     onClick={onClick}
   >
     <div className="col-span-1">
       <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
         <img
           src={project.thumbnail}
           alt={project.name}
           className="w-5 h-5 object-contain"
         />
       </div>
     </div>

     <div className="col-span-11">
       <div className="flex justify-between items-start mb-2">
         <h3 className="font-semibold text-white">{project.name}</h3>
         <span className={`text-xs px-2 py-1 rounded-full ${
           project.type === 'school'
             ? 'bg-green-900 text-green-300'
             : 'bg-blue-900 text-blue-300'
         }`}>
           {project.type === 'school' ? 'School' : 'Company'}
         </span>
       </div>
       <p className="text-sm text-gray-400">{project.period}</p>
       <p className={`text-sm ${project.type === 'school' ? 'text-green-400' : 'text-blue-400'} mt-1`}>
         {project.role}
       </p>
       <div className="mt-2 flex flex-wrap gap-2">
         {project.tech_stack.split(', ').map((tech, index) => (
           <span key={index} className={`text-xs px-2 py-1 ${
             project.type === 'school'
               ? 'bg-green-900 text-green-300'
               : 'bg-blue-900 text-blue-300'
           } rounded-full`}>
             {tech}
           </span>
         ))}
       </div>
     </div>
   </motion.div>
 );
};

export default Portfolio;