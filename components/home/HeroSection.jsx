"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Shield } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Summer Sale - Up to 70% Off",
    subtitle: "Discover amazing deals on your favorite products",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Shop Now",
    href: "/shop",
  },
  {
    id: 2,
    title: "New Electronics Collection",
    subtitle: "Latest gadgets and tech accessories",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Explore",
    href: "/categories/electronics",
  },
  {
    id: 3,
    title: "Fashion Forward",
    subtitle: "Trending styles for every season",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "Browse Fashion",
    href: "/categories/fashion",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "translate-x-0 opacity-100"
              : index < currentSlide
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
          }`}
        >
          <div className="relative h-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-6 max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-in slide-in-from-bottom-4 duration-700">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl opacity-90 animate-in slide-in-from-bottom-4 duration-700 delay-200">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 duration-700 delay-400">
                  <Link href={slide.href}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      {slide.cta}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide ? "bg-white w-8 h-3" : "bg-white/50 hover:bg-white/70 w-3 h-3"
            }`}
          />
        ))}
      </div>

      {/* Feature Pills */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex space-x-6">
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
          <Zap className="h-4 w-4" />
          <span>Fast Delivery</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
          <Shield className="h-4 w-4" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
          <ShoppingBag className="h-4 w-4" />
          <span>Easy Returns</span>
        </div>
      </div>
    </section>
  )
}
