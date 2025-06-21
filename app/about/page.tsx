'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, Code, Database, GitMerge, Server, Wind } from 'lucide-react'

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'Innovatech Solutions',
    period: '2021 - Present',
    description:
      'Led development of a high-traffic e-commerce platform. Mentored junior developers and improved code quality by 30% through TDD.',
  },
  {
    role: 'Frontend Developer',
    company: 'Digital Creations Agency',
    period: '2019 - 2021',
    description:
      'Developed responsive websites using React and Redux, collaborating with UI/UX designers to create pixel-perfect interfaces.',
  },
  {
    role: 'Junior Web Developer',
    company: 'Web Wizards Co.',
    period: '2017 - 2019',
    description:
      'Assisted in building websites with HTML, CSS, and JavaScript, gaining experience in Git and agile methodologies.',
  },
]

const skills = [
  {
    name: 'React & Next.js',
    icon: <Code className="h-8 w-8 text-zinc-500" />,
    description:
      'Crafting dynamic, server-rendered, and static web applications.',
  },
  {
    name: 'Node.js & Express',
    icon: <Server className="h-8 w-8 text-zinc-500" />,
    description:
      'Building scalable and efficient server-side applications and APIs.',
  },
  {
    name: 'Databases',
    icon: <Database className="h-8 w-8 text-zinc-500" />,
    description:
      'Proficient with both SQL (PostgreSQL) and NoSQL (MongoDB) databases.',
  },
  {
    name: 'TypeScript',
    icon: <Code className="h-8 w-8 text-zinc-500" />,
    description:
      'Enhancing code quality and maintainability with static typing.',
  },
  {
    name: 'Git & CI/CD',
    icon: <GitMerge className="h-8 w-8 text-zinc-500" />,
    description:
      'Implementing version control and automated deployment pipelines.',
  },
  {
    name: 'Tailwind CSS',
    icon: <Wind className="h-8 w-8 text-zinc-500" />,
    description:
      'Rapidly building modern, responsive designs with a utility-first approach.',
  },
]

const AboutPage = () => {
  return (
    <div className="bg-zinc-50 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/avatar.png"
            alt="Sushil Subedi"
            width={160}
            height={160}
            className="mx-auto rounded-full shadow-2xl"
          />
          <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl">
            Sushil Subedi
          </h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
            A Software Engineer Crafting Digital Experiences
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            My journey in software development is a story of passion for
            problem-solving and a commitment to creating software that is not
            only functional but also a joy to use.
          </p>
        </motion.section>

        {/* Journey Timeline Section */}
        <section className="relative mt-24">
          <h2 className="mb-16 text-center text-4xl font-bold">My Journey</h2>
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-700" />
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-5/12">
                  <div
                    className={`rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-800 ${
                      index % 2 === 0 ? 'text-left' : 'text-right'
                    }`}
                  >
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {exp.period}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{exp.role}</h3>
                    <p className="text-md mt-1 font-medium text-zinc-700 dark:text-zinc-300">
                      {exp.company}
                    </p>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                      {exp.description}
                    </p>
                  </div>
                </div>
                <div className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-white ring-8 ring-zinc-50 dark:bg-white dark:text-zinc-800 dark:ring-zinc-900">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="w-5/12" />
              </div>
            </motion.div>
          ))}
        </section>

        {/* My Toolkit Section */}
        <section className="mt-24">
          <h2 className="mb-16 text-center text-4xl font-bold">My Toolkit</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1 dark:border-zinc-700 dark:bg-zinc-800"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                  {skill.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{skill.name}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <motion.section
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold">Guiding Philosophy</h2>
          <blockquote className="mx-auto mt-6 max-w-2xl text-xl text-zinc-600 italic dark:text-zinc-400">
            "Simplicity is the ultimate sophistication. I strive to write clean,
            elegant code that solves complex problems in the most
            straightforward way."
          </blockquote>
        </motion.section>
      </div>
    </div>
  )
}

export default AboutPage
