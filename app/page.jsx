import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function LandingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16">
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 sm:px-8">
          
          {/* Left content */}
          <div className="text-center sm:text-left">
            <div className="mb-6">
              <span className="text-gray-500 font-light tracking-wide">
                spott<span className="text-purple-400">*</span>
              </span>
            </div>

            <h1 className="mb-6 text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              Discover &<br />
              create amazing<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                events.
              </span>
            </h1>

            <p className="mb-12 max-w-lg text-lg sm:text-xl text-gray-400 font-light">
              Whether you&apos;re hosting or attending, Spott makes every event
              memorable. Join our community today.
            </p>

            <Button size="xl" asChild>
              <Link href="/explore">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Right - 3D Phone Mockup */}
          <div className="relative block w-full max-w-lg mx-auto">
            <Image
              src="/hero.png"
              alt="Preview of the Spott app showcasing events"
              width={700}
              height={700}
              className="w-full h-auto"
              priority
            />

            {/* Optional Video Mockup */}
{/*             
            <video
              width="100%"
              height="100%"
              loop
              playsInline
              autoPlay
              muted
              className="w-full h-auto"
            >
              <source
                src="https://cdn.lu.ma/landing/phone-dark.mp4"
                type="video/mp4;codecs=hvc1"
              />
              <source
                src="https://cdn.lu.ma/landing/phone-dark.webm"
                type="video/webm"
              />
            </video> */}
           
          </div>
        </div>
      </section>
    </main>
  );
}
