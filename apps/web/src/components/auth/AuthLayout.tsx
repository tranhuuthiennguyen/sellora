import { Link } from "@tanstack/react-router";
import React from "react";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-tuatara text-white">
      {/* Left side — Form Panel */}
      <div className="w-full md:w-1/2 md:p-8 border-r border-neutral-800">
        <Link to="/" className="text-4xl font-bold tracking-wide">
          SELLORA
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-6">{title}</h1>
          <div className="text-gray-300 underline">
            {title === "Log in" ? (
              <Link to="/signup">Sign up</Link>
            ) : (
              <Link to="/login">Log in</Link>
            )}
          </div>
        </div>
        <div className="h-px flex-1 bg-neutral-700" />
        <div className="m-5">{children}</div>
      </div>

      {/* Right side — Artwork */}
      <div className="hidden md:block w-1/2">
        <img
          src="..\public\buhFlipExplode-3x.gif" // Replace with your artwork image
          alt="Artwork"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
