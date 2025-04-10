import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Edit, MapPin, Phone, User, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";

const UserInformation = ({ user, donations, setRefetch }) => {
  const [street, setStreet] = useState(user?.street);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [city, setCity] = useState(user?.city);

  useEffect(() => {
    setStreet(user?.street);
    setPhoneNumber(user?.phoneNumber);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setCity(user?.city);
  }, [user]);

  const handleUpdateUser = async () => {
    console.log({ street, phoneNumber });
    if (phoneNumber.length > 13)
      return toast.error("Enter a valid phone number");
    try {
      const res = await api.put(`${import.meta.env.VITE_API_URL}/user/update`, {
        street,
        phoneNumber,
        firstName,
        lastName,
        city,
      });
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success("Profile updated successfully");
      setRefetch((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await api.delete(
        `${import.meta.env.VITE_API_URL}/user/delete`
      );
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mb-6 p-4 lg:p-6 rounded-xl bg-white border border-gray-100 relative">
      <div className="absolute flex top-4 right-4 items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Edit className="h-5 w-5 text-gray-500" /> Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  className="col-span-3"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  className="col-span-3"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  className="col-span-3"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="street" className="text-right">
                  Address
                </Label>
                <Input
                  id="street"
                  value={street}
                  className="col-span-3"
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  value={city}
                  className="col-span-3"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={handleUpdateUser}
                  className="bg-red-600 hover:bg-red-700"
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col items-center text-center px-0">
        <div className="relative mb-4">
          <User2 className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
          <Badge className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700">
            {user?.bloodType}
          </Badge>
        </div>

        <h2 className="text-2xl font-bold mb-1">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-500 mb-4">
          Donor since {new Date(user?.createdAt).toLocaleDateString()}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {donations?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Donations</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {donations?.length * 3 || 0}
            </div>
            <div className="text-sm text-gray-600">Lives Saved</div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-600 text-sm">{user?.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-500 mr-3" />
            <span className="text-gray-600 text-sm">{user.phoneNumber}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <span className="text-gray-600 text-sm">
              {user?.street}, {user?.city}, {user?.country}
            </span>
          </div>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription className="mt-4">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      onClick={handleDeleteAccount}
                      type="button"
                      variant="destructive"
                    >
                      Confirm Deletion
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
