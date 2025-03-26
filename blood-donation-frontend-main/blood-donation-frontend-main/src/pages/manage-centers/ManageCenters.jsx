"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Plus, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import api from "@/interceptors/axiosInstance";

const ManageCenters = () => {
  // Sample centers data
  const [centers, setCenters] = useState([]);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for edit/view modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCenter, setCurrentCenter] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
    country: "",
  });

  // State for delete confirmation
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [centerToDelete, setCenterToDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);
  // State for add new center modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCenterData, setNewCenterData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
    country: "United States",
  });

  const fetchData = async () => {
    try {
      const res = await api.get("/center");
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      setCenters(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy 'at' h:mm a");
    } catch (error) {
      console.error(error);
      return "Invalid date";
    }
  };

  // Handle opening the edit modal
  const handleEditCenter = async (center) => {
    setCurrentCenter(center);
    setFormData({
      name: center?.name,
      address: center?.address,
      city: center?.city,
      zip: center?.zip,
      country: center?.country,
      phone: center?.phone,
      email: center?.email,
    });
    setIsEditMode(true);
    setIsEditModalOpen(true);
  };

  // Handle opening the view modal
  const handleViewCenter = (center) => {
    setCurrentCenter(center);
    setFormData({
      name: center?.name,
      address: center?.address,
      city: center?.city,
      zip: center?.zip,
      country: center?.country,
      phone: center?.phone,
      email: center?.email,
    });
    setIsEditMode(false);
    setIsEditModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle new center form input changes
  const handleNewCenterInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle saving edited center
  const handleSaveCenter = async() => {
    // Validate form
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.zip ||
      !formData.country ||
      !formData.phone ||
      !formData.email
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await api.put(`/center/update/${currentCenter?._id}`, formData);
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success(res?.data?.message);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
    setIsEditModalOpen(false);
  };

  // Handle adding new center api
  const handleAddCenter = async () => {
    // Validate form
    if (
      !newCenterData.name ||
      !newCenterData.address ||
      !newCenterData.city ||
      !newCenterData.zip ||
      !newCenterData.country ||
      !newCenterData.phone ||
      !newCenterData.email
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await api.post("/center/create", newCenterData);
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success(res?.data?.message);
      setIsAddModalOpen(false);
      setNewCenterData({
        name: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        email: "",
        country: "United States",
      });
      setRefetch((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // Handle opening delete confirmation
  const handleDeleteClick = (center) => {
    setCenterToDelete(center);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirming deletion api
  const handleConfirmDelete = async() => {
    if (!centerToDelete) return;

    try {
      const res = await api.delete(`/center/delete/${centerToDelete?._id}`);
    if (!res?.data?.success) {
      toast.error(res?.data?.message);
      return;
    }
    toast.success(res?.data?.message);
    setRefetch((prev) => !prev);
    setIsDeleteDialogOpen(false);
    setCenterToDelete(null);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // Filter centers based on search term
  const filteredCenters = centers.filter((center) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      center.name.toLowerCase().includes(searchLower) ||
      center.address.toLowerCase().includes(searchLower) ||
      center.city.toLowerCase().includes(searchLower) ||
      center.country.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Donation Centers Management</h1>
        <p className="text-gray-600">
          View, add, update, and delete blood donation centers
        </p>
      </div>

      <div className="mb-8 bg-white p-6 rounded-xl">
        <div className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Donation Centers</CardTitle>
            <CardDescription>
              Manage your organization's donation centers
            </CardDescription>
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Add New Center
          </Button>
        </div>
        <div>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search centers by name, address, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Address
                  </TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Country
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCenters.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-500"
                    >
                      No centers found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCenters.map((center) => (
                    <TableRow key={center._id}>
                      <TableCell className="font-medium">
                        {center.name}
                        <div className="md:hidden text-xs text-gray-500 mt-1">
                          {center.address}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {center.address}
                      </TableCell>
                      <TableCell>
                        {center.city}
                        <div className="text-xs text-gray-500">
                          {center.zip}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {center.country}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewCenter(center)}
                            title="View Details"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCenter(center)}
                            title="Edit Center"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(center)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-100"
                            title="Delete Center"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

      {/* View/Edit Center Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Center" : "Center Details"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the information for this donation center."
                : "View detailed information about this donation center."}
            </DialogDescription>
          </DialogHeader>

          {currentCenter && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Center Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Center Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Center Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>

              {!isEditMode && (
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Created:</span>
                    <span>{formatDate(currentCenter.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Updated:</span>
                    <span>{formatDate(currentCenter.updatedAt)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            {isEditMode ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleSaveCenter}
                >
                  <Check className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit Center
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Center Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Center</DialogTitle>
            <DialogDescription>
              Enter the details for the new donation center.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Center Name</Label>
              <Input
                id="new-name"
                name="name"
                value={newCenterData.name}
                onChange={handleNewCenterInputChange}
                placeholder="e.g., City Blood Bank"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">Center Email</Label>
              <Input
                id="new-email"
                name="email"
                value={newCenterData.email}
                onChange={handleNewCenterInputChange}
                placeholder="e.g., center@mail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">Center Phone</Label>
              <Input
                id="new-phone"
                name="phone"
                value={newCenterData.phone}
                onChange={handleNewCenterInputChange}
                placeholder="e.g., 0123456789"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-address">Address</Label>
              <Textarea
                id="new-address"
                name="address"
                value={newCenterData.address}
                onChange={handleNewCenterInputChange}
                placeholder="e.g., 123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-city">City</Label>
                <Input
                  id="new-city"
                  name="city"
                  value={newCenterData.city}
                  onChange={handleNewCenterInputChange}
                  placeholder="e.g., Los Angeles"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-zip">ZIP Code</Label>
                <Input
                  id="new-zip"
                  name="zip"
                  value={newCenterData.zip}
                  onChange={handleNewCenterInputChange}
                  placeholder="e.g., 90001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-country">Country</Label>
              <Input
                id="new-country"
                name="country"
                value={newCenterData.country}
                onChange={handleNewCenterInputChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleAddCenter}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Center
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the center "{centerToDelete?.name}
              ". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ManageCenters;
