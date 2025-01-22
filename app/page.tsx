'use client';

import React, {useState} from 'react';
import {Award, GitBranch, Mail} from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  period: string;
  description: string;
  tech_stack: string;
  role: string;
  full_description: string;
  features: string[];
}

const ProjectModal = ({project, onClose}: { project: Project; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
          className="bg-gray-800/90 backdrop-blur rounded-xl shadow-2xl w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
              {project.name}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">PERIOD</h3>
              <p className="text-gray-300">{project.period}</p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.split(', ').map((tech, index) => (
                    <span key={index}
                          className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400
                               rounded-full text-sm hover:bg-blue-500/20 transition-all">
                  {tech}
                </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">KEY FEATURES</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const aboutMe = {
    name: "Backend Developer",
    introduction: `백엔드 개발자를 꿈꾸는 학생입니다. 
    Spring Boot를 주력으로 사용하며, 클린 코드와 테스트 코드 작성에 관심이 많습니다.
    현재는 학교 프로젝트와 회사 인턴십을 통해 실무 경험을 쌓고 있습니다.`,
    skills: ["Java", "Spring Boot", "JPA", "MySQL", "AWS", "Git"],
    education: "아주대학교 소프트웨어학과"
  };

  const renderAboutSection = () => (
      <div className="container mx-auto p-4">
        <div className="glass-card p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="col-span-1">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-blue-500/20">
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={192}  // w-48 = 12rem = 192px
                    height={192} // h-48 = 12rem = 192px
                    className="object-cover"
                    priority
                  />
                </div>
                <h1 className="text-2xl font-bold mb-2">Backend Developer</h1>
                <p className="text-gray-400">아주대학교 소프트웨어학과</p>
              </div>
            </div>

            {/* Info Section */}
            <div className="col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About Me</h2>
                  <p className="text-gray-300 leading-relaxed">
                    백엔드 개발자를 꿈꾸는 학생입니다. Spring Boot를 주력으로 사용하며,
                    클린 코드와 테스트 코드 작성에 관심이 많습니다. 현재는 학교 프로젝트와
                    회사 인턴십을 통해 실무 경험을 쌓고 있습니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Spring Boot", "JPA", "MySQL", "AWS", "Git"].map((skill) => (
                        <span key={skill} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400
                                             rounded-lg hover:bg-blue-500/20 transition-colors">
                      {skill}
                    </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  const renderProjectCard = (project: Project) => (
      <div
          key={project.id}
          onClick={() => setSelectedProject(project)}
          className="glass-card p-6 hover:border-blue-500/50 transition-all cursor-pointer group"
      >
        <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm my-2">{project.period}</p>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.split(', ').slice(0, 3).map((tech, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
            {tech}
          </span>
          ))}
        </div>
      </div>
  );

  const projectCategories = {
    company: {
      headers: ['id', 'name', 'period', 'description', 'tech_stack', 'role'],
      rows: [
        {
          id: '1',
          name: 'Benton ERP',
          period: '2023.01 - 2023.06',
          description: '대규모 재고관리 서비스',
          tech_stack: 'Spring Boot, JPA, MySQL, Redis',
          role: 'Backend Developer',
          full_description: '대규모 데이터베이스 마이그레이션 및 재고관리 시스템 개발',
          features: [
            '대규모 데이터베이스 마이그레이션 수행',
            '재고 관리 API 개발',
            '성능 최적화 및 캐싱 구현',
            '배치 프로세스 개발'
          ]
        },
        {
          id: '2',
          name: 'SNPE Backend',
          period: '2023.06 - 2023.08',
          description: 'SNPE 서비스 백엔드 개발',
          tech_stack: 'Spring Boot, MongoDB, AWS',
          role: 'Backend Developer',
          full_description: 'SNPE 서비스의 백엔드 시스템 개발',
          features: [
            'RESTful API 설계 및 구현',
            '데이터베이스 설계',
            'AWS 인프라 구축',
            '시스템 모니터링 구축'
          ]
        },
        {
          id: '3',
          name: '힘난다버거 서비스',
          period: '2023.08 - 2023.10',
          description: '햄버거 주문 서비스',
          tech_stack: 'Spring Boot, MySQL, Redis',
          role: 'Backend Developer',
          full_description: '햄버거 주문 시스템 개발',
          features: [
            '주문 처리 시스템 구현',
            '실시간 재고 관리',
            '결제 시스템 연동',
            '성능 최적화'
          ]
        },
        {
          id: '4',
          name: '힘난다버거 KDS',
          period: '2023.10 - 2023.12',
          description: '주방 디스플레이 시스템',
          tech_stack: 'Spring Boot, WebSocket, MySQL',
          role: 'Backend Developer',
          full_description: '주방 디스플레이 시스템 백엔드 개발',
          features: [
            '실시간 주문 현황 관리',
            'WebSocket을 통한 실시간 통신',
            '주문 상태 관리 시스템',
            '모니터링 시스템 구축'
          ]
        },
        {
          id: '5',
          name: 'PG 결제 서비스',
          period: '2023.12 - 2024.02',
          description: '결제 시스템 개발',
          tech_stack: 'Spring Boot, MySQL, Redis, Kafka',
          role: 'Backend Developer',
          full_description: 'PG사 결제 시스템 개발 및 연동',
          features: [
            '결제 프로세스 구현',
            '결제 데이터 동기화',
            '장애 복구 시스템 구현',
            '트랜잭션 관리'
          ]
        }
      ]
    },
    school: {
      headers: ['id', 'name', 'period', 'description', 'tech_stack', 'role'],
      rows: [
        {
          id: '1',
          name: 'STTOCK',
          period: '2023.03 - 2023.06',
          description: '재고관리 시스템',
          tech_stack: 'Spring Boot, JPA, MySQL',
          role: 'Backend Developer',
          full_description: '개인 생활용품 재고관리 시스템 개발',
          features: [
            'REST API 개발',
            '데이터베이스 설계',
            '재고 관리 로직 구현',
            '테스트 코드 작성'
          ]
        },
        {
          id: '2',
          name: 'Recummery',
          period: '2024.01 - 2024.05',
          description: '이력서 추천 서비스',
          tech_stack: 'Spring Boot, JPA, PostgreSQL, Redis',
          role: 'Backend Lead',
          full_description: '이력서 추천 및 분석 서비스 개발',
          features: [
            '이력서 분석 알고리즘 구현',
            '추천 시스템 개발',
            '사용자 데이터 관리',
            '성능 최적화'
          ]
        }
      ]
    }
  };

  const renderProjectSection = (projects: any, title: string) => (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.rows.map((project: Project) => (
              <div key={project.id}
                   onClick={() => setSelectedProject(project)}
                   className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden
                          hover:border-blue-500/50 transition-all cursor-pointer group">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.period}</p>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.split(', ').slice(0, 3).map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                    {tech}
                  </span>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );

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

  const renderAwardsSection = () => (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Awards
        </span>
        </h2>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 space-y-4">
            {awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                      <Award className="text-blue-400 shrink-0"/>
                      <div>
                        <h3 className="text-lg font-medium text-white">{award.title}</h3>
                        <p className="text-gray-400">{award.organization}</p>
                        <p className="text-sm text-gray-500">{award.date}</p>
                      </div>
                    </div>
                )
            )}
          </div>
        </div>
      </div>
  );

  return (
      <div
          className="min-h-screen bg-gray-900 text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {renderAboutSection()}
          {renderProjectSection(projectCategories.company, "Company Projects")}
          {renderProjectSection(projectCategories.school, "School Projects")}
          {renderAwardsSection()}
        </div>

        {selectedProject && (
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        )}

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <div className="flex gap-6">
                <a href="mailto:sdhg12@gmail.com"
                   className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Mail size={18}/>
                  <span>sdhg12@gmail.com</span>
                </a>
                <a href="https://github.com/yourusername"
                   className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <GitBranch size={18}/>
                  <span>GitHub</span>
                </a>
              </div>
              <p className="text-gray-500 text-sm">© 2024 Portfolio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}