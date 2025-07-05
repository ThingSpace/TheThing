"use client";
import { useEffect, useState } from "react";

const titleVariants = [
  "<3 we are with you",
  "<3 you are not alone",
  "<3 you are enough",
  "<3 just breathe",
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
