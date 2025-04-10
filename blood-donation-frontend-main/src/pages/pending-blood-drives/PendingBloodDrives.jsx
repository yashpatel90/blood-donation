import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  ChevronDown,
  Search,
  Filter,
  Building,
  School,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import { Loading } from "@/components/shared/Loading";

const PendingBloodDrives = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [hostDrives, setHostDrives] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${import.meta.env.VITE_API_URL}/host/pending`);
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
  }, [refetch]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // Handle view drive details
  const handleViewDrive = (drive) => {
    setSelectedDrive(drive);
    setIsViewDialogOpen(true);
  };

  // Handle approve drive
  const handleApproveDrive = (drive) => {
    setSelectedDrive(drive);
    setIsApproveDialogOpen(true);
  };

  // Handle reject drive
  const handleRejectDrive = (drive) => {
    setSelectedDrive(drive);
    setIsRejectDialogOpen(true);
  };

  // Confirm approval
  const confirmApproval = async () => {
    try {
      const res = await api.put(
        `${import.meta.env.VITE_API_URL}/host/approve/${selectedDrive?._id}`
      );
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success(res?.data?.message);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsApproveDialogOpen(false);
    }
  };

  // Confirm rejection
  const confirmRejection = async () => {
    try {
      const res = await api.delete(
        `${import.meta.env.VITE_API_URL}/host/delete/${selectedDrive?._id}`
      );
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success(res?.data?.message);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsRejectDialogOpen(false);
      setRejectionReason("");
    }
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
          Pending Blood Drives
        </h2>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-yellow-600 bg-yellow-50 border-yellow-200"
          >
            {hostDrives?.length} Pending Approval
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

      {/* Pending Drives List */}
      <div className="grid gap-4">
        {loading && <Loading />}
        {!loading && filteredDrives.length === 0 ? (
          <div className="bg-white rounded-xl">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Calendar className="h-10 w-10 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900">
                No pending blood drives found
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
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        Pending
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
                          {drive?.address}
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

                  <div className="flex flex-row md:flex-col justify-between border-t md:border-t-0 md:border-l p-4 bg-gray-50">
                    <Button
                      variant="outline"
                      className="flex-1 md:w-full"
                      onClick={() => handleViewDrive(drive)}
                    >
                      View Details
                    </Button>
                    <div className="flex flex-col gap-2 mt-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleApproveDrive(drive)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleRejectDrive(drive)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          ))
        )}
      </div>

      {/* View Details Dialog */}
      {selectedDrive && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="!max-w-4xl">
            <DialogHeader>
              <DialogTitle>Blood Drive Details</DialogTitle>
              <DialogDescription>
                Review the details of this blood drive request
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Organization
                  </h3>
                  <p className="mt-1 text-base">{selectedDrive.organization}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ID</h3>
                  <p className="mt-1 text-base">{selectedDrive._id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Contact Person
                  </h3>
                  <p className="mt-1 text-base">{selectedDrive?.firstName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Contact Email
                  </h3>
                  <p className="mt-1 text-base">{selectedDrive?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Contact Phone
                  </h3>
                  <p className="mt-1 text-base">{selectedDrive?.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Expected Attendees
                  </h3>
                  <p className="mt-1 text-base">
                    {selectedDrive.expectedAttendees}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">address</h3>
                  <p className="mt-1 text-base">{selectedDrive.address}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Reason for Hosting
                  </h3>
                  <p className="mt-1 text-base">{selectedDrive.reason}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Schedule
                </h3>
                <div className="space-y-4">
                  {selectedDrive.schedules.map((schedule, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">
                        Day {index + 1}: {formatDate(schedule.date)}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {schedule.slots.map((slot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className="bg-gray-50 p-3 rounded border"
                          >
                            <p className="text-sm font-medium">{slot.time}</p>
                            <Badge className="mt-1 mb-1">
                              {slot.donationType}
                            </Badge>
                            <p className="text-xs text-gray-500">
                              {slot.capacity} available seats
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
                className="sm:order-1"
              >
                Close
              </Button>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleApproveDrive(selectedDrive);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleRejectDrive(selectedDrive);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approve Dialog */}
      {selectedDrive && (
        <Dialog
          open={isApproveDialogOpen}
          onOpenChange={setIsApproveDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Blood Drive</DialogTitle>
              <DialogDescription>
                Are you sure you want to approve this blood drive request?
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-md">
                <div className="mr-4 bg-white p-2 rounded-full">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedDrive.organization}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(selectedDrive.desiredDate)} •{" "}
                    {selectedDrive.expectedAttendees} expected attendees
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsApproveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={confirmApproval}
              >
                Confirm Approval
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Dialog */}
      {selectedDrive && (
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Blood Drive</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this blood drive request.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-md mb-4">
                <div className="mr-4 bg-white p-2 rounded-full">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedDrive.organization}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(selectedDrive.desiredDate)} •{" "}
                    {selectedDrive.expectedAttendees} expected attendees
                  </p>
                </div>
              </div>

              <Select
                value={rejectionReason}
                onValueChange={setRejectionReason}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason for rejection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="address_unavailable">
                    address is unavailable
                  </SelectItem>
                  <SelectItem value="date_unavailable">
                    Date is unavailable
                  </SelectItem>
                  <SelectItem value="insufficient_information">
                    Insufficient information provided
                  </SelectItem>
                  <SelectItem value="capacity_issues">
                    Capacity issues
                  </SelectItem>
                  <SelectItem value="staffing_issues">
                    Staffing issues
                  </SelectItem>
                  <SelectItem value="other">Other (please specify)</SelectItem>
                </SelectContent>
              </Select>

              {rejectionReason === "other" && (
                <Input
                  className="mt-4"
                  placeholder="Please specify the reason"
                />
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRejectDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmRejection}
                disabled={!rejectionReason}
              >
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PendingBloodDrives;
