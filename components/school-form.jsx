"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schoolSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Camera, School } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SchoolForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schoolSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("🎉 School added successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
            fontWeight: "500",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        });
        reset();
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        toast.error("Failed to add school. Please try again.", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <Toaster />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Add New School
          </h1>
          <p className="text-gray-600">Fill in the details below</p>
        </div>

        <Card className="shadow-sm border border-gray-200 rounded-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <School className="h-5 w-5 text-blue-600" />
              School Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    School Name *
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter school name"
                    className="h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="email_id"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email_id"
                    type="email"
                    {...register("email_id")}
                    placeholder="school@example.com"
                    className="h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                  />
                  {errors.email_id && (
                    <p className="text-xs text-red-600">
                      {errors.email_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address *
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Enter full address"
                  className="h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                />
                {errors.address && (
                  <p className="text-xs text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City *
                  </Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="Enter city"
                    className="h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="state"
                    className="text-sm font-medium text-gray-700"
                  >
                    State *
                  </Label>
                  <Input
                    id="state"
                    {...register("state")}
                    placeholder="Enter state"
                    className="h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                  />
                  {errors.state && (
                    <p className="text-xs text-red-600">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="contact"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Number *
                </Label>
                <Input
                  id="contact"
                  {...register("contact")}
                  placeholder="Enter contact number"
                  className="h-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all bg-white text-gray-900 placeholder-gray-500"
                />
                {errors.contact && (
                  <p className="text-xs text-red-600">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700"
                >
                  School Image (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-20 w-20 object-cover rounded-lg"
                        />
                        <p className="text-sm text-gray-600">Click to change</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="mx-auto h-6 w-6 text-gray-400" />
                        <p className="text-sm text-gray-600">Upload image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add School"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
