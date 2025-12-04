import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 py-8 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      <p className="text-sm text-gray-400">
        Made with ❤️ by <span className="font-semibold">Husnain Ali</span>
      </p>

      <div className="flex gap-4 items-center text-gray-400">
        
        <a
          href="https://github.com/TestGithubByHusnain"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <Github className="w-5 h-5 hover:text-white transition" />
        </a>

        <a
          href="https://www.linkedin.com/in/husnain-ali-a11813282"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-5 h-5 hover:text-white transition" />
        </a>

        <a
          href="mailto:husnainali41940@gmail.com"
          aria-label="Send Email"
        >
          <Mail className="w-5 h-5 hover:text-white transition" />
        </a>

      </div>
    </footer>
  );
};

export default Footer;
