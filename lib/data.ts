import finalImg from "@/public/images/final.webp";
import itransl8Img from "@/public/images/itransl8.png";
import nextArbImg from "@/public/images/nexarb.png";
import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export const links = [
	{
		name: "Home",
		hash: "#home",
	},
	{
		name: "Projects",
		hash: "#projects",
	},
	{
		name: "Skills",
		hash: "#skills",
	},
	{
		name: "Blog",
		hash: "#blog",
	},
	{
		name: "Contact",
		hash: "#contact",
	},
] as const;

export const experiencesData = [
	{
		title: "Front-end Developer",
		location: "Ankara, TR",
		description:
			"I graduated after 6 months of studying, HTML, CSS and JS. I immediately found a job as a front-end developer.",
		icon: React.createElement(LuGraduationCap),
		date: "2020",
	},
	{
		title: "Front-End Developer",
		location: "Ankara, TR & Denver, USA",
		description:
			"I worked as a front-end developer for 6-9 months in 3 jobs and 1 year in another job. I also upskilled to the full stack.",
		icon: React.createElement(CgWorkAlt),
		date: "2021 - 2023",
	},
	{
		title: "Freelance",
		location: "",
		description:
			"I'm now a frontend and mobile developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
		icon: React.createElement(FaReact),
		date: "2023 - present",
	},
] as const;

export const projectsData = [
	{
		title: "NexArb",
		description:
			"I am working as a frontend developer on this open source project for about 6 months and ongoing. Objective of the project is for users to be able to do transactions on solana using their wallet with ease.",
		tags: ["React", "Next.js", "MongoDB", "Tailwind", "Web 3", "Zustand"],
		imageUrl: nextArbImg,
		link: "https://github.com/NexArb/WebApp",
	},
	{
		title: "ITRANSL8",
		description:
			"AI translation and dubbing tool. I have been working on frontend development for about a two months now. Finish MVP of dashboard and landing page with authentication using authjs.",
		tags: ["Prisma", "TypeScript", "Next.js", "Tailwind", "Shadcn"],
		imageUrl: itransl8Img,
		link: "https://itransl8.com",
	},
	{
		title: "Final App",
		description:
			"A cross platform mobile application for high school students to just video, from variety of topics.",
		tags: ["React Native", "Expo", "Context API", "Styled Components"],
		imageUrl: finalImg,
		link: "https://play.google.com/store/apps/details?id=com.finalokullari.finalvideo&pli=1",
	},
] as const;

export const skillsData = [
	"HTML",
	"CSS",
	"JavaScript",
	"TypeScript",
	"React",
	"Next.js",
	"Git",
	"Tailwind",
	"Prisma",
	"MongoDB",
	"Redux",
	"Zustand",
	"GraphQL",
	"Express",
	"PostgreSQL",
	"Python",
	"Framer Motion",
	"Web3",
] as const;
