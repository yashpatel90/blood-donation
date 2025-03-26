"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserInformation from "@/components/profile/UserInformation";
import DonationHistory from "@/components/profile/DonationHistory";
import Appointment from "@/components/profile/Appointment";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import MyHosts from "@/components/profile/MyHosts";
import UpcomingHost from "@/components/profile/UpcomingHost";

const Profile = () => {
  // user data
  const [user, setUser] = useState({});

  // Mock donation history
  const [donations, setDonations] = useState([]);

  // Upcoming appointments
  const [appointments, setAppointments] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [allHosts, setAllHosts] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await api.get(`${import.meta.env.VITE_API_URL}/user`);
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      console.log(res?.data);
      setUser(res?.data?.data?.user);
      setDonations(res?.data?.data?.donations);
      setAppointments(res?.data?.data?.appointments);
      setHosts(res?.data?.data?.hosts);
      setAllHosts(res?.data?.data?.allHosts);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [refetch]);

  // State for donation ID input
  // const [donationId, setDonationId] = useState("");
  // const [donationIdError, setDonationIdError] = useState("");
  // const [donationIdSuccess, setDonationIdSuccess] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle donation ID submission
  // const handleDonationIdSubmit = (e) => {
  //   e.preventDefault();
  //   setDonationIdError("");
  //   setDonationIdSuccess(false);

  //   if (!donationId.trim()) {
  //     setDonationIdError("Please enter a donation ID");
  //     return;
  //   }
  // };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-gray-50 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserInformation
              user={user}
              donations={donations}
              setRefetch={setRefetch}
            />
          </div>
          <div className="lg:col-span-2">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="history">Donation History</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="hosts">My Hosts</TabsTrigger>
                {/* <TabsTrigger value="add-donation">Add New</TabsTrigger> */}
              </TabsList>

              {/* Donation History Tab */}
              <TabsContent value="history" className="space-y-6">
                <DonationHistory donations={donations} user={user} />
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-6">
                <Appointment appointments={appointments} />
              </TabsContent>
              <TabsContent value="hosts" className="space-y-6">
                <MyHosts myHosts={hosts} />
              </TabsContent>

              {/* Add Donation Tab */}
              <TabsContent value="add-donation" className="space-y-6">
                <div className="p-4 md:p-6 rounded-xl bg-white border border-gray-50">
                  <div>
                    <h3 className="text-lg font-medium">
                      Add Donation to Your Profile
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 mb-6">
                      Enter your donation ID to add a recent donation to your
                      profile
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium">
                            How to add your donation
                          </p>
                          <p className="text-sm mt-1">
                            After donating blood, you'll receive a donation ID.
                            Enter it below to update your profile with your
                            latest contribution.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* {donationIdSuccess && (
                      <Alert className="bg-green-50 border-green-200 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                          Your donation has been successfully added to your
                          profile.
                        </AlertDescription>
                      </Alert>
                    )} */}

                    {/* <form
                      onSubmit={handleDonationIdSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="donationId">Donation ID</Label>
                        <Input
                          id="donationId"
                          placeholder="e.g., DON-2023-1205"
                          value={donationId}
                          onChange={(e) => {
                            setDonationId(e.target.value);
                            if (donationIdError) setDonationIdError("");
                          }}
                          className={cn(donationIdError && "border-red-500")}
                        />
                        {donationIdError && (
                          <p className="text-sm text-red-500">
                            {donationIdError}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Your donation ID can be found on your donation receipt
                          or in the confirmation email.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Verifying...
                          </>
                        ) : (
                          "Add Donation"
                        )}
                      </Button>
                    </form>

                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">
                        Can't find your donation ID?
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                          Contact Support
                        </Button>
                        <Button variant="outline" className="w-full">
                          View FAQ
                        </Button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="lg-col-span-2 mt-4 lg:mt-6">
              <UpcomingHost allHosts={allHosts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
