"use client";
import { useEffect, useState } from "react";

const titleVariants = [
  "we are with you",
  "you are not alone",
  "you got this",
  "you are enough",
  "just breathe",
  "<3 You got this"
];

function getRandomTitle() {
  return titleVariants[Math.floor(Math.random() * titleVariants.length)] ?? "A Thing";
}

export default function RandomTitle() {
  const [title, setTitle] = useState(getRandomTitle());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTitle = getRandomTitle();
      setTitle(newTitle);
      document.title = `${newTitle}`;
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  return null;
}
