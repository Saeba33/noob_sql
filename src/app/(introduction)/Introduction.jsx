"use client";

import HomeNavigation from "@/components/navigation/HomeNavigation";

export default function IntroductionPage() {
  return (
    <div className="min-h-screen">
      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            SQL SQL SQL
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Blabla
          </p>
        </div>
      </div>

      {/* Navigation Cards */}
      <HomeNavigation />
    </div>
  );
}
