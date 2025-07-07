"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  Package,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = {
    id: "686b3b2a009e895f4537cc91",
    name: "siyam",
    email: "ssiyham564@gmail.com",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40",
    isVerified: false,
    createdAt: "2025-07-07T03:12:42.165Z",
  };

  const logout = () =>{

  }

  const cartItemsCount = 5;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/categories", label: "Categories" },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full glass-effect professional-shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Package className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="text-sm font-medium hover:bg-accent/80 transition-all duration-200 rounded-lg"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-full hover:bg-accent/80 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full hover:bg-accent/80 transition-all duration-200"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium shadow-lg"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover:bg-accent/80 transition-all duration-200"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-border/50">
                      <AvatarImage
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-medium">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 glass-effect professional-shadow border-border/50"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-3 p-3">
                    <Avatar className="h-10 w-10 ring-2 ring-border/50">
                      <AvatarImage
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {user.email}
                      </p>
                      <Badge
                        variant="secondary"
                        className="w-fit text-xs mt-1 bg-primary/10 text-primary border-primary/20"
                      >
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer hover:bg-accent/80 transition-colors"
                  >
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-3 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer hover:bg-accent/80 transition-colors"
                  >
                    <Link href="/orders" className="flex items-center">
                      <Package className="mr-3 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer hover:bg-accent/80 transition-colors"
                  >
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="hover:bg-accent/80 transition-all duration-200 rounded-lg"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-primary/25 transition-all duration-200 rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 rounded-full hover:bg-accent/80 transition-all duration-200"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] glass-effect border-border/50"
              >
                <div className="flex flex-col space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-10 bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
