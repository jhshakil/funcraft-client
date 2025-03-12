"use client";

import type React from "react";

import Link from "next/link";
import Logo from "./Logo";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-secondary-foreground/80">
              Funcraft is your one-stop multivendor platform for premium
              furniture. Explore diverse styles from trusted sellers to elevate
              your home or office.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/best-selling"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Best Selling Products
                </Link>
              </li>
              <li>
                <Link
                  href="/recent-products"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Recent Products
                </Link>
              </li>
              <li>
                <Link
                  href="/top-rated"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Top Rated Products
                </Link>
              </li>
              <li>
                <Link
                  href="/flash-sale"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Flash Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 mt-1 text-primary" size={18} />
                <span className="text-secondary-foreground/80">
                  Mirpur-1, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="shrink-0 mt-1 text-primary" size={18} />
                <span className="text-secondary-foreground/80">
                  info.jhshakil@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="shrink-0 mt-1 text-primary" size={18} />
                <span className="text-secondary-foreground/80">
                  +8801851891846
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/70">
              © 2024 <span className="text-primary font-medium">funcraft</span>.
              All rights reserved
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
