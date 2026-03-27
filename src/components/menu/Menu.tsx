
"use client"

import { useRef } from "react"

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Lab", href: "/lab" },
]

function Menu() {
  const container = useRef<HTMLDivElement>(null);
  return (
    <div ref={container}>Menu</div>
  )
}

export default Menu