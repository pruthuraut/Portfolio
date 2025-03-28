"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Terminal,
  Shield,
  Code,
  Award,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Globe,
  Phone,
  ChevronDown,
  User,
  FileText,
  Bug,
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [typedText, setTypedText] = useState("")
  const [showPrompt, setShowPrompt] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [activeSection, setActiveSection] = useState("home")
  const [binaryBackground, setBinaryBackground] = useState<string[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Generate binary background
  useEffect(() => {
    const generateBinary = () => {
      const binaryRows = []
      const rowCount = 50

      for (let i = 0; i < rowCount; i++) {
        let row = ""
        const length = Math.floor(Math.random() * 20) + 10

        for (let j = 0; j < length; j++) {
          row += Math.floor(Math.random() * 2)
        }

        binaryRows.push(row)
      }

      setBinaryBackground(binaryRows)
    }

    generateBinary()
    const interval = setInterval(generateBinary, 5000)

    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const text = "Initializing security protocols..."
    let index = 0

    const typeWriter = () => {
      if (index < text.length) {
        setTypedText(text.substring(0, index + 1))
        index++
        setTimeout(typeWriter, 50)
      } else {
        setTimeout(() => {
          setShowPrompt(true)
          executeCommand("./welcome.sh")
        }, 500)
      }
    }

    typeWriter()

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveSection(id)

            if (id !== "home" && currentCommand !== `./${id}.sh`) {
              setCurrentCommand(`./${id}.sh`)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    if (homeRef.current) observer.observe(homeRef.current)
    if (aboutRef.current) observer.observe(aboutRef.current)
    if (experienceRef.current) observer.observe(experienceRef.current)
    if (projectsRef.current) observer.observe(projectsRef.current)
    if (achievementsRef.current) observer.observe(achievementsRef.current)
    if (contactRef.current) observer.observe(contactRef.current)

    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current)
      if (aboutRef.current) observer.unobserve(aboutRef.current)
      if (experienceRef.current) observer.unobserve(experienceRef.current)
      if (projectsRef.current) observer.unobserve(projectsRef.current)
      if (achievementsRef.current) observer.unobserve(achievementsRef.current)
      if (contactRef.current) observer.unobserve(contactRef.current)
    }
  }, [currentCommand])

  const executeCommand = (command: string) => {
    setCurrentCommand(command)

    // Scroll to the corresponding section
    const sectionId = command.replace("./", "").replace(".sh", "")
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-black text-green-500 min-h-screen font-mono relative overflow-hidden">
      {/* Binary background animation */}
      <div className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden">
        {binaryBackground.map((row, index) => (
          <div
            key={index}
            className="absolute text-green-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.5 + 0.5,
              fontSize: `${Math.random() * 10 + 8}px`,
            }}
          >
            {row}
          </div>
        ))}
      </div>

      {/* Terminal header */}
      <header className="fixed top-0 left-0 right-0 bg-black border-b border-green-500/30 z-50 backdrop-blur-sm bg-black/80">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              <span className="font-bold">pruthu@security:~$</span>
            </div>

            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => executeCommand("./welcome.sh")}
                className={`hover:text-white transition-colors ${activeSection === "home" ? "text-white" : ""}`}
              >
                home
              </button>
              <button
                onClick={() => executeCommand("./about.sh")}
                className={`hover:text-white transition-colors ${activeSection === "about" ? "text-white" : ""}`}
              >
                about
              </button>
              <button
                onClick={() => executeCommand("./experience.sh")}
                className={`hover:text-white transition-colors ${activeSection === "experience" ? "text-white" : ""}`}
              >
                experience
              </button>
              <button
                onClick={() => executeCommand("./projects.sh")}
                className={`hover:text-white transition-colors ${activeSection === "projects" ? "text-white" : ""}`}
              >
                projects
              </button>
              <button
                onClick={() => executeCommand("./achievements.sh")}
                className={`hover:text-white transition-colors ${activeSection === "achievements" ? "text-white" : ""}`}
              >
                achievements
              </button>
              <button
                onClick={() => executeCommand("./contact.sh")}
                className={`hover:text-white transition-colors ${activeSection === "contact" ? "text-white" : ""}`}
              >
                contact
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="https://github.com/pruthuraut" target="_blank" className="hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/pruthu-raut"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:rautpruthu@gmail.com" className="hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 pb-20" ref={containerRef}>
        {/* Home section */}
        <section id="home" ref={homeRef} className="min-h-screen flex flex-col justify-center relative">
          <motion.div
            className="container mx-auto px-4 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="terminal-window border border-green-500/50 rounded-md bg-black/80 backdrop-blur-sm shadow-lg shadow-green-500/10">
                <div className="terminal-header border-b border-green-500/30 p-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-300 ml-2">pruthu@security:~</span>
                </div>
                <div className="terminal-body p-4 font-mono text-sm md:text-base">
                  <div className="mb-4">
                    <span className="text-green-300">pruthu@security:~$</span> {typedText}
                    {!showPrompt && <span className={`ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"}`}>▋</span>}
                  </div>

                  {showPrompt && (
                    <>
                      <div className="mb-4">
                        <span className="text-green-300">pruthu@security:~$</span> ./welcome.sh
                      </div>

                      <motion.div
                        className="mb-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      >
                        <pre className="text-xs sm:text-sm md:text-base lg:text-lg text-green-400 font-bold mb-4">
                          {`
 _____  _____  _    _  _____  _    _  _    _ 
|  __ \\|  __ \\| |  | ||_   _|| |  | || |  | |
| |__) | |__) | |  | |  | |  | |__| || |  | |
|  ___/|  _  /| |  | |  | |  |  __  || |  | |
| |    | | \\ \\| |__| | _| |_ | |  | || |__| |
|_|    |_|  \\_\\\\____/ |_____||_|  |_| \\____/ 
                                             
 _____              _    _  _____            
|  __ \\     /\\     | |  | ||_   _|           
| |__) |   /  \\    | |  | |  | |             
|  _  /   / /\\ \\   | |  | |  | |             
| | \\ \\  / ____ \\  | |__| | _| |_            
|_|  \\_\\/_/    \\_\\ \\____/ |_____|           
`}
                        </pre>
                        <motion.h1
                          className="text-2xl md:text-4xl font-bold mb-4 text-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1, duration: 1 }}
                        >
                          Security Researcher & Ethical Hacker
                        </motion.h1>
                        <motion.p
                          className="text-green-300 mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5, duration: 1 }}
                        >
                          Discovering vulnerabilities. Securing the digital world.
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2, duration: 0.5 }}
                          className="flex justify-center"
                        >
                          <button
                            onClick={() => executeCommand("./about.sh")}
                            className="animate-pulse flex items-center text-green-300 hover:text-white"
                          >
                            <span>Scroll to continue</span>
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </button>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute bottom-10 left-0 right-0 text-center" style={{ opacity }}>
            <ChevronDown className="h-6 w-6 mx-auto animate-bounce" />
          </motion.div>
        </section>

        {/* About section */}
        <section id="about" ref={aboutRef} className="min-h-screen py-16 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="terminal-window border border-green-500/50 rounded-md bg-black/80 backdrop-blur-sm shadow-lg shadow-green-500/10">
                <div className="terminal-header border-b border-green-500/30 p-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-300 ml-2">pruthu@security:~/about</span>
                </div>
                <div className="terminal-body p-4 font-mono text-sm md:text-base">
                  <div className="mb-4">
                    <span className="text-green-300">pruthu@security:~$</span> ./about.sh
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-6">
                      <User className="h-6 w-6 mr-3 text-green-400" />
                      <h2 className="text-2xl font-bold text-white">whoami</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4">
                        <p className="text-green-300">
                          I'm <span className="text-white font-bold">Pruthu Raut</span>, a dedicated Security Researcher
                          and Ethical Hacker with a passion for discovering vulnerabilities and strengthening digital
                          defenses.
                        </p>
                        <p className="text-green-300">
                          My expertise spans web application security, network penetration testing, and vulnerability
                          assessment. I've successfully identified critical vulnerabilities in major organizations
                          including NASA, BBC News, and Flipkart.
                        </p>
                      </div>

                      <div>
                        <div className="mb-6">
                          <h3 className="text-white font-bold mb-3 flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-green-400" />
                            Education
                          </h3>
                          <ul className="space-y-3 text-green-300">
                            <li>
                              <div className="font-bold">Mumbai University</div>
                              <div>B.E. in Computer Engineering</div>
                              <div className="text-sm text-green-400/70">Aug 2022 - May 2025</div>
                            </li>
                            <li>
                              <div className="font-bold">K.J. Somaiya Polytechnic</div>
                              <div>Diploma in Computer Engineering</div>
                              <div className="text-sm text-green-400/70">Aug 2019 - Jun 2022</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-white font-bold mb-4 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-green-400" />
                        Technical Skills
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="border border-green-500/30 rounded-md p-3 bg-black/50">
                          <h4 className="font-bold text-white mb-2">Programming</h4>
                          <ul className="text-green-300 space-y-1">
                            <li>Python</li>
                            <li>Bash</li>
                          </ul>
                        </div>

                        <div className="border border-green-500/30 rounded-md p-3 bg-black/50">
                          <h4 className="font-bold text-white mb-2">Cybersecurity</h4>
                          <ul className="text-green-300 space-y-1">
                            <li>Web Application Security</li>
                            <li>Network Penetration Testing</li>
                            <li>Vulnerability Assessment</li>
                            <li>Exploit Development</li>
                            <li>Bug Bounty Hunting</li>
                          </ul>
                        </div>

                        <div className="border border-green-500/30 rounded-md p-3 bg-black/50">
                          <h4 className="font-bold text-white mb-2">Tools & Technologies</h4>
                          <ul className="text-green-300 space-y-1">
                            <li>Git, GitHub</li>
                            <li>Docker</li>
                            <li>Linux</li>
                            <li>AWS</li>
                            <li>Frida, SAST, DAST</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-8">
                      <button
                        onClick={() => executeCommand("./experience.sh")}
                        className="border border-green-500 rounded-md px-4 py-2 text-green-400 hover:bg-green-500/10 transition-colors"
                      >
                        cd ~/experience
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section id="experience" ref={experienceRef} className="min-h-screen py-16 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="terminal-window border border-green-500/50 rounded-md bg-black/80 backdrop-blur-sm shadow-lg shadow-green-500/10">
                <div className="terminal-header border-b border-green-500/30 p-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-300 ml-2">pruthu@security:~/experience</span>
                </div>
                <div className="terminal-body p-4 font-mono text-sm md:text-base">
                  <div className="mb-4">
                    <span className="text-green-300">pruthu@security:~$</span> ./experience.sh
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-6">
                      <Briefcase className="h-6 w-6 mr-3 text-green-400" />
                      <h2 className="text-2xl font-bold text-white">Work Experience</h2>
                    </div>

                    <div className="space-y-8">
                      {/* Experience 1 */}
                      <motion.div
                        className="border-l-2 border-green-500 pl-4 py-1"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">Security Researcher</h3>
                          <span className="text-green-400 text-sm">Jan 2024 – Present</span>
                        </div>
                        <ul className="list-disc list-inside text-green-300 space-y-2">
                          <li>
                            Discovered and responsibly disclosed critical vulnerabilities in 30+ companies, including
                            NASA, BBC News, and Flipkart
                          </li>
                          <li>
                            Achieved Hall of Fame recognition from NASA for identifying a severe code injection
                            vulnerability
                          </li>
                          <li>
                            Uncovered and reported high-impact flaws such as Remote Code Execution (RCE), SQL Injection
                            (SQLi), and Blind Server-Side Request Forgery (SSRF) in multiple private programs
                          </li>
                        </ul>
                      </motion.div>

                      {/* Experience 2 */}
                      <motion.div
                        className="border-l-2 border-green-500 pl-4 py-1"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">Windows Internals Security Researcher Intern</h3>
                          <span className="text-green-400 text-sm">Jun 2024 - Aug 2024 (2 months)</span>
                        </div>
                        <div className="text-green-400 mb-2">CoE-CNDS Labs</div>
                        <ul className="list-disc list-inside text-green-300 space-y-2">
                          <li>
                            Recreated proof-of-concept (POC) exploits for 5 critical CVEs, including CVE-2023-21768,
                            CVE-2020-1472 and CVE-2024-30042
                          </li>
                          <li>
                            Specialized in Local Privilege Escalation (LPE) and Remote Code Execution (RCE)
                            vulnerabilities, with emphasis on Windows driver exploits
                          </li>
                          <li>
                            Developed and analyzed exploits for high-impact vulnerabilities, including Excel-based RCE
                            and the notorious Zerologon (CVE-2020-1472) flaw
                          </li>
                        </ul>
                      </motion.div>

                      {/* Experience 3 */}
                      <motion.div
                        className="border-l-2 border-green-500 pl-4 py-1"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white">
                            Vulnerability Assessment Penetration Testing Intern
                          </h3>
                          <span className="text-green-400 text-sm">Jan 2021 - Apr 2022 (4 months)</span>
                        </div>
                        <div className="text-green-400 mb-2">GreenCurve Securities</div>
                        <ul className="list-disc list-inside text-green-300 space-y-2">
                          <li>
                            Conducted security testing on the web application using OWASP Top 10 methodology,
                            identifying and reporting 20+ vulnerabilities
                          </li>
                          <li>
                            Implemented secure coding practices across the project, reducing potential entry points for
                            attacks by 30%
                          </li>
                          <li>
                            Utilized Nessus, BurpSuite, and Nmap to perform over 50 vulnerability scans, improving
                            overall security posture by 40%
                          </li>
                        </ul>
                      </motion.div>
                    </div>

                    <div className="text-center mt-8">
                      <button
                        onClick={() => executeCommand("./projects.sh")}
                        className="border border-green-500 rounded-md px-4 py-2 text-green-400 hover:bg-green-500/10 transition-colors"
                      >
                        cd ~/projects
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section id="projects" ref={projectsRef} className="min-h-screen py-16 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="terminal-window border border-green-500/50 rounded-md bg-black/80 backdrop-blur-sm shadow-lg shadow-green-500/10">
                <div className="terminal-header border-b border-green-500/30 p-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-300 ml-2">pruthu@security:~/projects</span>
                </div>
                <div className="terminal-body p-4 font-mono text-sm md:text-base">
                  <div className="mb-4">
                    <span className="text-green-300">pruthu@security:~$</span> ./projects.sh
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-6">
                      <FileText className="h-6 w-6 mr-3 text-green-400" />
                      <h2 className="text-2xl font-bold text-white">Projects</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Project 1 */}
                      <motion.div
                        className="border border-green-500/30 rounded-md p-4 bg-black/50 hover:bg-green-900/10 transition-colors"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-white">Obsedian Guard</h3>
                          <Link
                            href="https://github.com/pruthuraut"
                            target="_blank"
                            className="text-green-400 hover:text-white"
                          >
                            <Github className="h-5 w-5" />
                          </Link>
                        </div>
                        <div className="text-green-300 text-sm mb-4">
                          A three-tier security framework for LLMs, utilizing white-box and black-box testing to
                          identify vulnerabilities, particularly focusing on OWASP's Top 10 for LLMs. Its
                          prompt-monitoring firewall actively detects and blocks prompt injection attempts, ensuring
                          secure interactions with the model.
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">LLM Security</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">OWASP</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">Python</span>
                        </div>
                      </motion.div>

                      {/* Project 2 */}
                      <motion.div
                        className="border border-green-500/30 rounded-md p-4 bg-black/50 hover:bg-green-900/10 transition-colors"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-white">HoneyTrap</h3>
                          <Link
                            href="https://github.com/pruthuraut"
                            target="_blank"
                            className="text-green-400 hover:text-white"
                          >
                            <Github className="h-5 w-5" />
                          </Link>
                        </div>
                        <div className="text-green-300 text-sm mb-4">
                          Deployed Azure Sentinel SIEM to monitor Honeypot Server lure. AI-Driven Analytics dissect
                          attacker tactics, gathering Threat Intelligence. SOAR automation fortifies defenses, executing
                          Incident Response protocols.
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">SIEM</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">Azure</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">Honeypot</span>
                        </div>
                      </motion.div>

                      {/* Project 3 */}
                      <motion.div
                        className="border border-green-500/30 rounded-md p-4 bg-black/50 hover:bg-green-900/10 transition-colors"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-white">MindCare</h3>
                          <Link
                            href="https://github.com/pruthuraut"
                            target="_blank"
                            className="text-green-400 hover:text-white"
                          >
                            <Github className="h-5 w-5" />
                          </Link>
                        </div>
                        <div className="text-green-300 text-sm mb-4">
                          Engineered machine learning models for heart rate analysis using proximity sensor data,
                          enhancing physiological stress detection accuracy by 25%. Implemented real-time mood
                          assessment and tracking. Developed an LLM-powered chatbot for personalized mental health
                          support.
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">ML</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">LLM</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">Health</span>
                        </div>
                      </motion.div>

                      {/* Project 4 */}
                      <motion.div
                        className="border border-green-500/30 rounded-md p-4 bg-black/50 hover:bg-green-900/10 transition-colors"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold text-white">Rakshak</h3>
                          <Link
                            href="https://github.com/pruthuraut"
                            target="_blank"
                            className="text-green-400 hover:text-white"
                          >
                            <Github className="h-5 w-5" />
                          </Link>
                        </div>
                        <div className="text-green-300 text-sm mb-4">
                          Engineered and implemented a high-accuracy weapon detection model capable of identifying
                          knives, scissors, and sharp objects in real-time video streams. Integrated a GenAI-powered
                          chatbot for automated system control, enabling voice and text command execution.
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">
                            Computer Vision
                          </span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">AI</span>
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">Security</span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="text-center mt-8">
                      <button
                        onClick={() => executeCommand("./achievements.sh")}
                        className="border border-green-500 rounded-md px-4 py-2 text-green-400 hover:bg-green-500/10 transition-colors"
                      >
                        cd ~/achievements
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements section */}
        <section id="achievements" ref={achievementsRef} className="min-h-screen py-16 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="terminal-window border border-green-500/50 rounded-md bg-black/80 backdrop-blur-sm shadow-lg shadow-green-500/10">
                <div className="terminal-header border-b border-green-500/30 p-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-300 ml-2">pruthu@security:~/achievements</span>
                </div>
                <div className="terminal-body p-4 font-mono text-sm md:text-base">
                  <div className="mb-4">
                    <span className="text-green-300">pruthu@security:~$</span> ./achievements.sh
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-6">
                      <Award className="h-6 w-6 mr-3 text-green-400" />
                      <h2 className="text-2xl font-bold text-white">Achievements & Certifications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4">Certifications</h3>
                        <ul className="space-y-4">
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Shield className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div>
                              <div className="text-white font-bold">Certified Ethical Hacker (CEH)</div>
                              <div className="text-green-300 text-sm">EC-Council</div>
                            </div>
                          </motion.li>
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            viewport={{ once: true }}
                          >
                            <Shield className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div>
                              <div className="text-white font-bold">Certified in Cybersecurity (CC)</div>
                              <div className="text-green-300 text-sm">ISC2</div>
                            </div>
                          </motion.li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-4">Hall of Fame</h3>
                        <ul className="space-y-4">
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <Bug className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div className="text-white">NASA</div>
                          </motion.li>
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <Bug className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div className="text-white">BBC News</div>
                          </motion.li>
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <Bug className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div className="text-white">Flipkart</div>
                          </motion.li>
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <Bug className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div className="text-white">Government of India</div>
                          </motion.li>
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            viewport={{ once: true }}
                          >
                            <Bug className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div className="text-white">Apple</div>
                          </motion.li>
                          <motion.li
                            className="flex items-start gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                            viewport={{ once: true }}
                          >
                            <Bug className="h-5 w-5 text-green-400 mt-1 shrink-0" />
                            <div className="text-white">WHO</div>
                          </motion.li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-white mb-4">Other Achievements</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.li
                          className="flex items-center gap-3 border border-green-500/30 rounded-md p-3 bg-black/50"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Award className="h-5 w-5 text-green-400 shrink-0" />
                          <div className="text-white">3 X CTF Winner</div>
                        </motion.li>
                        <motion.li
                          className="flex items-center gap-3 border border-green-500/30 rounded-md p-3 bg-black/50"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          <Award className="h-5 w-5 text-green-400 shrink-0" />
                          <div className="text-white">3 X Hackathon Winner</div>
                        </motion.li>
                        <motion.li
                          className="flex items-center gap-3 border border-green-500/30 rounded-md p-3 bg-black/50"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <Award className="h-5 w-5 text-green-400 shrink-0" />
                          <div className="text-white">TryHackMe Top 2%</div>
                        </motion.li>
                      </ul>
                    </div>

                    <div className="text-center mt-8">
                      <button
                        onClick={() => executeCommand("./contact.sh")}
                        className="border border-green-500 rounded-md px-4 py-2 text-green-400 hover:bg-green-500/10 transition-colors"
                      >
                        cd ~/contact
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" ref={contactRef} className="min-h-screen py-16 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="terminal-window border border-green-500/50 rounded-md bg-black/80 backdrop-blur-sm shadow-lg shadow-green-500/10">
                <div className="terminal-header border-b border-green-500/30 p-2 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-green-300 ml-2">pruthu@security:~/contact</span>
                </div>
                <div className="terminal-body p-4 font-mono text-sm md:text-base">
                  <div className="mb-4">
                    <span className="text-green-300">pruthu@security:~$</span> ./contact.sh
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-6">
                      <Mail className="h-6 w-6 mr-3 text-green-400" />
                      <h2 className="text-2xl font-bold text-white">Contact Me</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-green-300 mb-6">
                          Interested in working together or have a security concern? Feel free to reach out through any
                          of the channels below.
                        </p>

                        <ul className="space-y-4">
                          <motion.li
                            className="flex items-center gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Mail className="h-5 w-5 text-green-400" />
                            <Link href="mailto:rautpruthu@gmail.com" className="text-white hover:text-green-300">
                              rautpruthu@gmail.com
                            </Link>
                          </motion.li>
                          <motion.li
                            className="flex items-center gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            viewport={{ once: true }}
                          >
                            <Phone className="h-5 w-5 text-green-400" />
                            <Link href="tel:+919623893210" className="text-white hover:text-green-300">
                              (+91) 9623893210
                            </Link>
                          </motion.li>
                          <motion.li
                            className="flex items-center gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <Linkedin className="h-5 w-5 text-green-400" />
                            <Link
                              href="https://linkedin.com/in/pruthu-raut"
                              target="_blank"
                              className="text-white hover:text-green-300"
                            >
                              linkedin.com/in/pruthu-raut
                            </Link>
                          </motion.li>
                          <motion.li
                            className="flex items-center gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <Github className="h-5 w-5 text-green-400" />
                            <Link
                              href="https://github.com/pruthuraut"
                              target="_blank"
                              className="text-white hover:text-green-300"
                            >
                              github.com/pruthuraut
                            </Link>
                          </motion.li>
                          <motion.li
                            className="flex items-center gap-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <Globe className="h-5 w-5 text-green-400" />
                            <Link
                              href="https://pruthu.vercel.app"
                              target="_blank"
                              className="text-white hover:text-green-300"
                            >
                              pruthu.vercel.app
                            </Link>
                          </motion.li>
                        </ul>
                      </div>

                      <div>
                        <form className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-green-300 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="w-full bg-black border border-green-500/50 rounded-md p-2 text-white focus:outline-none focus:border-green-400"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-green-300 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="w-full bg-black border border-green-500/50 rounded-md p-2 text-white focus:outline-none focus:border-green-400"
                              placeholder="your.email@example.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="message" className="block text-green-300 mb-1">
                              Message
                            </label>
                            <textarea
                              id="message"
                              rows={4}
                              className="w-full bg-black border border-green-500/50 rounded-md p-2 text-white focus:outline-none focus:border-green-400"
                              placeholder="Your message here..."
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-md transition-colors"
                          >
                            Send Message
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="text-center mt-8">
                      <button
                        onClick={() => executeCommand("./welcome.sh")}
                        className="border border-green-500 rounded-md px-4 py-2 text-green-400 hover:bg-green-500/10 transition-colors"
                      >
                        cd ~
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-green-900/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="h-5 w-5" />
            <span className="font-bold">pruthu@security:~$</span>
          </div>
          <p className="text-green-400 text-sm">© {new Date().getFullYear()} Pruthu Raut. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

