"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle, School } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-50 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <School className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SchoolHub
                </span>
                <div className="text-xs text-gray-500 font-medium">
                  Educational Directory
                </div>
              </div>
            </div>
          </Link>

          <div className="flex space-x-2">
            <Link href="/showSchools">
              <Button
                variant={pathname === "/showSchools" ? "default" : "ghost"}
                className={`${
                  pathname === "/showSchools"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-blue-50 text-gray-700"
                } transition-all duration-200 px-6 py-2 rounded-xl font-medium`}
              >
                Browse Schools
              </Button>
            </Link>
            <Link href="/addSchool">
              <Button
                variant={pathname === "/addSchool" ? "default" : "ghost"}
                className={`${
                  pathname === "/addSchool"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                    : "hover:bg-green-50 text-gray-700"
                } transition-all duration-200 px-6 py-2 rounded-xl font-medium`}
              >
                Add School
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
