import React from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus } from "lucide-react";
import { Link } from "react-router";

const Appointment = ({ appointments }) => {
  return (
    <div className="p-4 md:p-6 rounded-xl bg-white border border-gray-50">
      <div>
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          View and manage your scheduled blood donations
        </p>
      </div>
      <div>
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              No Upcoming Appointments
            </h3>
            <p className="text-gray-500 mb-6">
              You don't have any scheduled blood donations at this time.
            </p>
            <Link to="/donate-blood">
              <Button className="bg-red-600 hover:bg-red-700">
                Schedule a Donation
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {appointment?.donationType} Donation
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.donationDate).toLocaleDateString()}{" "}
                      at {appointment?.schedule.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment?.address || "No address provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    {appointment?.isApproved ? "Approved" : "Booked"}
                  </Badge>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      toast.error("Confirmed appointment cannot be canceled.");
                    }}
                  >
                    Cancel
                  </Button> */}
                </div>
              </div>
            ))}

            <Link to="/donate-blood" className="pt-4">
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" /> Schedule New Donation
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
