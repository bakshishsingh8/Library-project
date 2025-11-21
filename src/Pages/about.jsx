import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Code, Sparkles } from "lucide-react";
import Header from "../Layout/header"; // optional – if you have a header
// import Footer from "../Layout/footer"; // optional – if you have a footer

const About = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 via-orange-100 to-amber-200 min-h-screen flex flex-col pb-20 md:pb-0">
      {/* Optional Header */}
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-12 md:py-20 px-4 md:px-6 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* UPDATED: Responsive font sizes */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-amber-700 drop-shadow-lg">
            Welcome to <br className="md:hidden" />
            <span className="text-amber-600">BookHaven Library</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-amber-800 max-w-2xl mx-auto leading-relaxed">
            Where stories meet innovation — discover, read, and manage your books
            with elegance and simplicity.
          </p>
        </motion.div>

        {/* Floating Animation Icons */}
        {/* UPDATED: Adjusted positioning for mobile to prevent overlap with text */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-5 md:top-32 md:right-16 opacity-30 md:opacity-40"
        >
          <BookOpen className="w-12 h-12 md:w-20 md:h-20 text-amber-400" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 left-5 md:bottom-32 md:left-16 opacity-30 md:opacity-40"
        >
          <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-orange-300" />
        </motion.div>
      </section>

      {/* About Info Section */}
      {/* UPDATED: Reduced vertical padding, single column on mobile */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-4 md:px-6 py-10 md:py-16 items-center">
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/10065/10065361.png"
          alt="Library Illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          // UPDATED: Smaller image on mobile
          className="w-48 sm:w-64 md:w-96 mx-auto drop-shadow-xl order-first"
        />

        <motion.div
          initial={{ opacity: 0, x: 0, y: 30 }} // UPDATED: Animate from bottom on mobile
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-amber-700 mb-4">
            Our Vision & Purpose
          </h2>
          <p className="text-base md:text-lg text-amber-800 leading-relaxed">
            <span className="font-semibold text-amber-600">My Library</span> is
            designed to make learning and exploration effortless. Whether you’re
            a student, researcher, or book lover, our platform brings all your
            reading needs under one intuitive interface — built with passion and
            modern web technology.
          </p>
          <p className="mt-4 text-base md:text-lg text-amber-800 leading-relaxed">
            Built using <span className="font-semibold">React</span>,{" "}
            <span className="font-semibold">Redux</span>, and{" "}
            <span className="font-semibold">Tailwind CSS</span>, it’s not just a
            library — it’s your personalized reading space.
          </p>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-white/70 py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center text-amber-700 mb-8 md:mb-12 animate-bounce-gentle px-4"
        >
          ✨ What Makes Us Special
        </motion.h2>

        {/* UPDATED: Stacked grid on mobile (grid-cols-1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-6">
          {[
            {
              icon: <BookOpen className="w-10 h-10 text-amber-600 animate-bounce-gentle" />,
              title: "Explore Thousands of Books",
              text: "Browse through categories, authors, and genres — all at your fingertips.",
            },
            {
              icon: <Users className="w-10 h-10 text-amber-600 animate-bounce-gentle" />,
              title: "Seamless User Experience",
              text: "Issue, return, and manage your books with a modern and elegant interface.",
            },
            {
              icon: <Code className="w-10 h-10 text-amber-600 animate-bounce-gentle" />,
              title: "Modern Tech Stack",
              text: "Powered by React, Redux, and Tailwind CSS — fast, responsive, and future-ready.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 shadow-lg rounded-2xl p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border border-amber-100/50"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-amber-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-amber-800">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-12 md:py-20 text-center px-4 md:px-6 bg-gradient-to-r from-amber-100 via-orange-200 to-amber-100"
      >
        <p className="text-xl md:text-2xl italic text-amber-800 max-w-3xl mx-auto leading-relaxed">
          “A library is not just a building full of books — it’s a universe of
          imagination, learning, and endless possibilities.”
        </p>
        <p className="mt-4 font-semibold text-amber-600 text-base md:text-lg">
          — Team My Library
        </p>
      </motion.section>

      {/* Optional Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default About;

