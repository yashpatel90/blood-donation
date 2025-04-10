import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Search, Droplet, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  // const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  // const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  // const [rejectionReason, setRejectionReason] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [notes, setNotes] = useState("");
  const [refetch, setRefetch] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const fetchData = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_API_URL}/donation/all`);
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      setDonations(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  // Handle view donation details
  // const handleViewDonation = (donation) => {
  //   setSelectedDonation(donation);
  //   setIsViewDialogOpen(true);
  // };

  // Handle approve donation
  const handleApproveDonation = (donation) => {
    setSelectedDonation(donation);
    setNotes("");
    setIsApproveDialogOpen(true);
  };

  // Handle reject donation
  // const handleRejectDonation = (donation) => {
  //   setSelectedDonation(donation);
  //   setRejectionReason("");
  //   setIsRejectDialogOpen(true);
  // };

  // Confirm approval
  const confirmApproval = async () => {
    try {
      const res = await api.put(
        `${import.meta.env.VITE_API_URL}/donation/approve/${
          selectedDonation?._id
        }`
      );
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success(res?.data?.message);
      setIsApproveDialogOpen(false);
      setRefetch(!refetch);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }

    // setDonations(
    //   donations.map((donation) =>
    //     donation?.id === selectedDonation?.id
    //       ? {
    //           ...donation,
    //           status: "approved",
    //           notes: notes ? `${donation?.notes} ${notes}` : donation?.notes,
    //         }
    //       : donation
    //   )
    // );
  };

  // Confirm rejection
  // const confirmRejection = () => {
  //   setDonations(
  //     donations.map((donation) =>
  //       donation?.id === selectedDonation?.id
  //         ? { ...donation, status: "rejected" }
  //         : donation
  //     )
  //   );
  //   setIsRejectDialogOpen(false);
  // };

  // Filter donations based on search query and filters
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation?.user?.firstName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || donation?.isApproved === filterStatus;
    const matchesType =
      filterType === "all" || donation?.donationType === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case true:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved
          </Badge>
        );
      case false:
        return (
          <Badge className="bg-red-100 text-yellow-800 hover:bg-yellow-200">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get donation type badge
  const getDonationTypeBadge = (type) => {
    switch (type) {
      case "Whole Blood":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            {type}
          </Badge>
        );
      case "Plasma":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            {type}
          </Badge>
        );
      case "Platelets":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {type}
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-[100vw]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Donation History</h2>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by donor name, ID, or donation ID..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value={false}>Pending</SelectItem>
            <SelectItem value={true}>Approved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Whole Blood">Whole Blood</SelectItem>
            <SelectItem value="Plasma">Plasma</SelectItem>
            <SelectItem value="Platelets">Platelets</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl border-gray-50 border p-4 md:p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Donations</h3>
        <div>
          {filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Droplet className="h-10 w-10 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900">
                No donations found
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery || filterStatus !== "all" || filterType !== "all"
                  ? "Try adjusting your search or filters"
                  : "No donation records available"}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Donation ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation?.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <User2 className="bg-gray-50 border border-gray-200 rounded-full" />
                          <div>
                            <p className="font-medium">
                              {donation?.user?.firstName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Blood Group: {donation?.user?.bloodType}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{donation?._id.slice(0, 10)}</TableCell>
                      <TableCell>
                        {getDonationTypeBadge(donation?.donationType)}
                      </TableCell>
                      <TableCell>
                        {formatDate(donation?.donationDate)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(donation?.isApproved)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDonation(donation)}
                          >
                            View
                          </Button> */}
                          {!donation?.isApproved ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleApproveDonation(donation)}
                              >
                                Approve
                              </Button>
                              {/* <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleRejectDonation(donation)}
                              >
                                Reject
                              </Button> */}
                            </>
                          ) : (
                            "Completed"
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Approve Dialog */}
      {selectedDonation && (
        <Dialog
          open={isApproveDialogOpen}
          onOpenChange={setIsApproveDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Donation</DialogTitle>
              <DialogDescription>
                Confirm that this donation meets all requirements and can be
                processed.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-md mb-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={selectedDonation?.firstName}
                  />
                  <AvatarFallback>
                    {selectedDonation?.user?.firstName.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {selectedDonation?.user?.firstName}{" "}
                    {selectedDonation?.user?.lastName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-500">
                      blood type: {selectedDonation?.donationType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="approval-notes">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="approval-notes"
                    placeholder="Add any additional notes about this donation?..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                  />
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
      {/* {selectedDonation && (
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Donation</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this donation?.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-md mb-4">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={selectedDonation?.firstName}
                  />
                  <AvatarFallback>
                    {selectedDonation?.user?.firstName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedDonation?.firstName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-500">
                      {selectedDonation?.donorBloodType} •{" "}
                      {selectedDonation?.donationType}
                    </p>
                  </div>
                </div>
              </div>

              <Select
                value={rejectionReason}
                onValueChange={setRejectionReason}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason for rejection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low_hemoglobin">
                    Low hemoglobin levels
                  </SelectItem>
                  <SelectItem value="medical_history">
                    Medical history concerns
                  </SelectItem>
                  <SelectItem value="recent_illness">Recent illness</SelectItem>
                  <SelectItem value="travel_history">
                    Travel history concerns
                  </SelectItem>
                  <SelectItem value="medication_conflict">
                    Medication conflicts
                  </SelectItem>
                  <SelectItem value="other">Other (please specify)</SelectItem>
                </SelectContent>
              </Select>

              {rejectionReason === "other" && (
                <Textarea
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
      )} */}
    </div>
  );
};

export default DonationHistory;
