"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Loader2, School, PlusCircle } from "lucide-react";

export default function SchoolGrid() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch("/api/schools");
      const data = await response.json();

      if (data.success) {
        setSchools(data.schools);
      } else {
        setError("Failed to fetch schools");
      }
    } catch (error) {
      setError("Error loading schools");
      console.error("Error fetching schools:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amazing Schools
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our comprehensive directory of educational institutions.
            Find the perfect school that matches your needs and aspirations.
          </p>
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="text-lg px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0"
            >
              {schools.length} Schools in Our Directory
            </Badge>
          </div>
        </div>

        {schools.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-fit mb-8">
              <School className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Schools Found
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Be the first to add a school to our directory and help build our
              community!
            </p>
            <Link href="/addSchool">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                <PlusCircle className="h-5 w-5 mr-2" />
                Add First School
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {schools.map((school) => (
              <Card
                key={school.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {school.image ? (
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                      <div className="text-center">
                        <School className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <span className="text-2xl font-bold text-blue-600">
                          {school.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {school.name}
                    </h3>
                    <div className="flex items-center text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
                      <span className="text-sm font-medium">
                        {school.city}, {school.state}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start group/item hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0 text-green-500" />
                      <span className="line-clamp-2 text-gray-600 leading-relaxed">
                        {school.address}
                      </span>
                    </div>

                    <div className="flex items-center group/item hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-purple-500" />
                      <span className="font-medium text-gray-700">
                        {school.contact}
                      </span>
                    </div>

                    <div className="flex items-center group/item hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-orange-500" />
                      <span className="line-clamp-1 text-gray-600">
                        {school.email_id}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {schools.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">Add Your School Too!</h2>
              <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                Join our growing community of educational institutions and help
                students find their perfect learning environment.
              </p>
              <Link href="/addSchool">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200">
                  Add Your School
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
