'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  BookOpen,
  Briefcase,
  Code,
  Coffee,
  Database,
  GitMerge,
  Heart,
  Mountain,
  Server,
  Sparkles,
  Wind,
} from 'lucide-react'

import { corePrinciples, experiences, toolkit } from '@/data/about'
import myImage from '@/public/icons/sushil.jpg'

const iconMap = {
  Sparkles: <Sparkles className="h-8 w-8 text-zinc-500" />,
  Heart: <Heart className="h-8 w-8 text-zinc-500" />,
  BookOpen: <BookOpen className="h-8 w-8 text-zinc-500" />,
  Code: <Code className="h-8 w-8 text-zinc-500" />,
  Server: <Server className="h-8 w-8 text-zinc-500" />,
  Database: <Database className="h-8 w-8 text-zinc-500" />,
  GitMerge: <GitMerge className="h-8 w-8 text-zinc-500" />,
  Wind: <Wind className="h-8 w-8 text-zinc-500" />,
}

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || null
}

const AboutPage = () => {
  return (
    <div className="text-zinc-800 dark:text-zinc-200">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mx-auto h-40 w-40 rounded-full bg-zinc-200 shadow-2xl dark:bg-zinc-700">
            <Image
              src={myImage}
              alt="Sushil Subedi"
              width={160}
              height={160}
              className="rounded-full"
            />
          </div>
          <h1 className="mt-8 bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl dark:from-zinc-200 dark:to-zinc-400">
            I Build Things for the Web.
          </h1>
          <p className="mt-4 text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
            A Story of Code, Curiosity, and Chiya.
          </p>
        </motion.section>

        {/* The Story Section */}
        <section className="mt-24 text-center">
          <h2 className="mb-8 bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl dark:from-zinc-200 dark:to-zinc-400">
            The Origin Story
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
            My journey into the world of technology wasn&apos;t a straight
            line—it was a winding path fueled by a deep-seated curiosity for how
            things work. From tinkering with my first computer to writing my
            first &quot;Hello, World!&quot;, I was hooked. I discovered a
            passion for turning abstract ideas into tangible, digital
            experiences that could solve real-world problems. This passion is
            what drives me every day to learn, to build, and to innovate.
          </p>
        </section>

        {/* Journey Timeline Section */}
        <section className="relative mt-24">
          <h2 className="mb-16 bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl dark:from-zinc-200 dark:to-zinc-400">
            My Professional Journey
          </h2>
          <div className="absolute top-20 left-5 h-[90%] w-0.5 bg-zinc-200 md:left-1/2 md:-translate-x-1/2 dark:bg-zinc-700" />
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
                className={`flex items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                <div className="w-full pl-12 md:w-5/12 md:pl-0">
                  <div
                    className={`rounded-lg border border-zinc-200 bg-white/30 p-6 text-left shadow-lg backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/30 ${
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right'
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
                <div className="absolute left-0 z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-white ring-8 ring-zinc-50 md:relative dark:bg-white dark:text-zinc-800 dark:ring-zinc-900">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="hidden w-5/12 md:block" />
              </div>
            </motion.div>
          ))}
        </section>

        {/* Core Principles Section */}
        <section className="mt-24">
          <h2 className="mb-16 bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl dark:from-zinc-200 dark:to-zinc-400">
            My Core Principles
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {corePrinciples.map((principle, index) => (
              <motion.div
                key={index}
                className="rounded-lg border border-zinc-200 bg-white/30 p-8 text-center shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-2 dark:border-zinc-700 dark:bg-zinc-800/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                  {getIcon(principle.icon)}
                </div>
                <h3 className="mt-6 text-2xl font-semibold">
                  {principle.title}
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* My Toolkit Section */}
        <section className="mt-24">
          <h2 className="mb-16 bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl dark:from-zinc-200 dark:to-zinc-400">
            My Digital Toolkit
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {toolkit.map((skill, index) => (
              <motion.div
                key={index}
                className="rounded-lg border border-zinc-200 bg-white/30 p-6 text-center shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-1 dark:border-zinc-700 dark:bg-zinc-800/30"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
                  {getIcon(skill.icon)}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{skill.name}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Beyond the Code Section */}
        <motion.section
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2 className="bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl dark:from-zinc-200 dark:to-zinc-400">
            Beyond the Code
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
            When I&apos;m not at my keyboard, I believe in living a balanced
            life. You can find me exploring the mountains, cheering for my
            favorite football team, or simply enjoying a quiet moment with a
            good cup of coffee and my dog, Kookie.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex cursor-pointer items-center space-x-2 rounded-full bg-zinc-100 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <Mountain className="h-5 w-5" />
              <span>Travel & Hiking</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex cursor-pointer items-center space-x-2 rounded-full bg-zinc-100 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <Heart className="h-5 w-5" />
              <span>Fitness & Sports</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex cursor-pointer items-center space-x-2 rounded-full bg-zinc-100 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <Coffee className="h-5 w-5" />
              <span>Chiya Enthusiast</span>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default AboutPage
