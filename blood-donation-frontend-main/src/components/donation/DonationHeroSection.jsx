import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const DonationHeroSection = ({showForm, setShowForm}) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Donate Blood, Save Lives</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Your donation can save up to three lives. Schedule an appointment today
        and be a hero to someone in need.
      </p>
      {!showForm && (
        <Button
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
          onClick={() => setShowForm(true)}
        >
          Schedule an Appointment <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default DonationHeroSection;
