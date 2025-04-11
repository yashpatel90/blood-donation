import React from "react";
import { CardContent } from "../ui/card";
import { Building, MapPin, Users, Calendar, User2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { Link } from "react-router";
import { Button } from "../ui/button";

const UpcomingHost = ({ allHosts }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };
  return (
    <div className="p-4 md:p-6 rounded-xl bg-white border border-gray-50">
      <div>
        <h3 className="text-lg font-semibold">Blood Drives Notifications</h3>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          View upcoming hosted blood drives
        </p>
      </div>
      {allHosts?.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No approved blood drives</h3>
          <p className="text-gray-500 mb-6">
            You don't have any scheduled any blood drive at this time.
          </p>
          <Link to="/host-blood-drive">
            <Button className="bg-red-600 hover:bg-red-700">
              Schedule a blood drive
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {allHosts?.map((drive) => (
            <div key={drive._id} className="overflow-hidden bg-gray-50">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="mr-4 bg-gray-100 p-2 rounded-full">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {drive?.organization}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ID: {drive._id}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Ongoing
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-sm">
                        <User2 className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          Hosted by: {drive?.user?.firstName}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          Starting at: {formatDate(drive?.desiredDate)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700 truncate">
                          {drive?.address}, {drive?.city}, {drive?.state} - {drive?.zip}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          Expected: {drive?.expectedAttendees} attendees
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingHost;
