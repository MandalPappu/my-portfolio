import React from "react";
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";
import { FiTwitter } from "react-icons/fi";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { VscGithubInverted } from "react-icons/vsc";

const Footer = () => {
  return (
    <div className="py-6 mt-8">
      <div className="flex justify-center items-center gap-6 text-center">
        <Link href="mandalpappu512000@gmail.com" target="_blank">
          <MdOutlineMail size={40} />
        </Link>
        <Link href="https://x.com/PappuKumar85209" target="_blank">
          <FiTwitter size={40} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/pappu-kumar-mandal-6667ba204/"
          target="_blank"
        >
          <PiLinkedinLogoBold size={40} />
        </Link>
        <Link href="https://github.com/mandalpappu" target="_blank">
          <VscGithubInverted size={40} />
        </Link>
      </div>
      <h1 className="text-center mt-4">
        © 2024 Pappu Mandal. All rights reserved.
      </h1>
    </div>
  );
};

export default Footer;
