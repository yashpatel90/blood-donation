import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Droplet,
  Search,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const DonationHistory = ({ donations, user }) => {
  const [filterType, setFilterType] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const [previewCertificate, setPreviewCertificate] = useState(null);

  // download certificate
  const handleDownloadCertificate = async () => {
    const certificateElement = document.getElementById("certificate-preview");

    if (!certificateElement) {
      console.error("Certificate element not found.");
      return;
    }

    try {
      const canvas = await html2canvas(certificateElement, {
        backgroundColor: "#ffffff", // Ensure white background
        scale: 2,
        useCORS: true, // Ensures external images load properly
        ignoreElements: (el) => el.classList.contains("exclude-from-pdf"), // Ignore unwanted elements
      });

      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("certificate.pdf");

      console.log("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handlePreviewCertificate = (donation) => {
    setPreviewCertificate(donation);
  };

  const getDonationTypeBadgeColor = (type) => {
    if(!type) return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    switch (type.toLowerCase()) {
      case "whole blood":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "plasma":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "platelets":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const filteredAndSortedDonations = () => {
    let filtered = [...donations];

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(
        (donation) => donation?.donationType?.toLowerCase() === filterType.toLowerCase()
      );
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation?.donationType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === "date") {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortField === "type") {
        comparison = a.type.localeCompare(b.type);
      } else if (sortField === "location") {
        comparison = a.location.localeCompare(b.location);
      }

      return sortDirection === "desc" ? -comparison : comparison;
    });

    return filtered;
  };

  // Toggle sort direction
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <>
      <div className="p-4 md:p-6 rounded-xl bg-white border border-gray-50">
        <div>
          <h3 className="text-xl font-semibold">Your Donation History</h3>
          <p className="text-gray-500 text-sm mb-6 mt-1">
            View and manage your past blood donations
          </p>
        </div>
        <div>
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="whole blood">Whole Blood</SelectItem>
                <SelectItem value="plasma">Plasma</SelectItem>
                <SelectItem value="platelets">Platelets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Donations Table */}
          <div className="">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {sortField === "date" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => toggleSort("type")}
                  >
                    <div className="flex items-center">
                      Type
                      {sortField === "type" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => toggleSort("location")}
                  >
                    <div className="flex items-center">
                      Location
                      {sortField === "location" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Certificate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedDonations().length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-gray-500"
                    >
                      No donations found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedDonations().map((donation) => (
                    <TableRow key={donation?._id}>
                      <TableCell>
                        <div className="font-medium">
                          {new Date(donation?.donationDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 md:hidden">
                          {donation?.address || "no address provided"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "font-normal",
                            getDonationTypeBadgeColor(donation?.donationType)
                          )}
                        >
                          {donation?.donationType}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {donation?.address || "No address provided"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handlePreviewCertificate(donation)
                                  }
                                >
                                  View
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Preview Certificate</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Dialog
        open={!!previewCertificate}
        onOpenChange={(open) => !open && setPreviewCertificate(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Donation Certificate</DialogTitle>
            <DialogDescription>
              Certificate for donation on{" "}
              {previewCertificate &&
                new Date(previewCertificate.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {previewCertificate && (
            <div className="p-6 border rounded-md flex h-full justify-center" >
              <div id="certificate-preview">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <Droplet className="h-12 w-12 text-[#dc2626]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#dc2626] mb-1">
                    Certificate of Donation
                  </h2>
                  <p className="text-[#111111aa]">
                    Hope Drop Blood Donation Center
                  </p>
                </div>

                <div className="mb-6 text-center">
                  <p className="mb-2">This certifies that</p>
                  <p className="text-xl font-bold mb-2">{user?.firstName}</p>
                  <p className="mb-4">has generously donated</p>
                  <p className="text-lg font-semibold text-[#dc2626] mb-2">
                    {previewCertificate?.type}
                  </p>
                  <p className="text-gray-600">
                    on {new Date(previewCertificate?.donationDate).toLocaleDateString()}{" "}
                    at {previewCertificate?.address}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-[#111111aa] italic">
                    "Your donation has the potential to save up to three lives.
                    Thank you for your generosity."
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#111111aa]">Donation ID:</p>
                    <p className="font-medium">{previewCertificate?._id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#111111aa]">Blood Type:</p>
                    <p className="font-medium">{user?.bloodType}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPreviewCertificate(null)}
            >
              Close
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDownloadCertificate}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonationHistory;
