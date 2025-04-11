import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Building,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import { Loading } from "@/components/shared/Loading";

const BloodDrives = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hostDrives, setHostDrives] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${import.meta.env.VITE_API_URL}/host/`);
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      setHostDrives(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // Filter drives based on search query and type filter
  const filteredDrives = hostDrives?.filter((drive) => {
    const matchesSearch =
      drive.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.firstName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          All Blood Drives
        </h2>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-blue-600 bg-blue-50 border-blue-200"
          >
            {hostDrives?.length} blood drives
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by organization, ID, or contact..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Drives List */}
      <div className="grid gap-4">
        {loading && <Loading />}
        {!loading && filteredDrives.length === 0 ? (
          <div className="bg-white rounded-xl">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Calendar className="h-10 w-10 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900">
                No blood drives found
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "All blood drives have been processed"}
              </p>
            </CardContent>
          </div>
        ) : (
          filteredDrives.map((drive) => (
            <div key={drive.id} className="overflow-hidden bg-white rounded-xl">
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
                        className={`${drive?.isVerified ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}
                      >
                        {drive?.isVerified ? "Approved" : "Pending"}
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          Desired Date: {formatDate(drive?.desiredDate)}
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
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          Submitted: {formatDate(drive?.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BloodDrives;
