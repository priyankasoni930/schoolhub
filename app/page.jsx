"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  School,
  PlusCircle,
  Eye,
  GraduationCap,
  BookOpen,
  Users,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-30"></div>
                <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              SchoolHub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover and manage educational institutions.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-800">
                  Educational Excellence
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">
                  Community Driven
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What would you like to do today?
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our powerful features to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Add Schools Card */}
          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-500/5"></div>
            <CardHeader className="relative text-center pb-6 pt-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                Add New Schools
              </CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Register educational institutions with comprehensive details,
                images, and location information to build our school directory.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative px-8 pb-8">
              <Link href="/addSchool" className="block">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-base flex items-center justify-center min-h-[3rem] whitespace-nowrap">
                  <PlusCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Start Adding Schools</span>
                </Button>
              </Link>
              <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>Complete school profiles</span>
              </div>
            </CardContent>
          </Card>

          {/* View Schools Card */}
          <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-500/5"></div>
            <CardHeader className="relative text-center pb-6 pt-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                Explore Schools
              </CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                Browse through our extensive collection of schools with detailed
                information, photos, and interactive features.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative px-8 pb-8">
              <Link href="/showSchools" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-base flex items-center justify-center min-h-[3rem] whitespace-nowrap">
                  <Eye className="mr-2 h-5 w-5 flex-shrink-0" />
                  <span>Browse All Schools</span>
                </Button>
              </Link>
              <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
                <School className="h-4 w-4" />
                <span>Comprehensive directory</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
