import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { MapPin, Phone, Search, AlertCircle, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";
import DonationInstructions from "@/components/donation/DonationInstructions";
import DonationHeroSection from "@/components/donation/DonationHeroSection";
import DonationSuccess from "@/components/donation/DonationSuccess";
import DonationConfirm from "@/components/donation/DonationConfirm";
import { getDate } from "@/utils/date";

export const formatDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMMM d, yyyy");
};

export const getDonationTypeBadgeColor = (type) => {
  switch (type) {
    case "Whole Blood":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "Plasma":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Platelets":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
  }
};

const DonateBlood = () => {
  // State for form steps
  const [step, setStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [centers, setCenters] = useState([]);
  const [formData, setFormData] = useState({
    zip: "",
    country: "United States",
    donationType: "Whole Blood",
  });
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle donation type selection
  const handleDonationTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      donationType: value,
    }));
  };

  // Handle search
  const handleSearch = async () => {
    try {
      const res = await api.get(
        `${import.meta.env.VITE_API_URL}/center/slots`,
        {
          params: {
            zip: formData.zip,
          },
        }
      );
      console.log("checking res", res);
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      setCenters(res?.data?.data);
      setTimeSlots(res?.data?.slots);
      console.log(res?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
    setStep(2);
  };

  // Handle center selection
  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
    setSelectedDate(null);
    setSelectedTime({});
    setStep(3);
  };

  // Handle date selection for appointment
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime({});
  };

  // Handle time selection for appointment
  const handleSelectTime = (time, id) => {
    console.log(time, id);
    setSelectedTime({ time, id });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCenter || !selectedDate || !selectedTime) {
      return;
    }
    setShowConfirmation(true);
  };

  // Confirm appointment
  const confirmAppointment = async () => {
    setIsSubmitting(true);

    const data = {
      center: selectedCenter.name,
      address: selectedCenter.address,
      donationDate: getDate(selectedDate),
      schedule: selectedTime,
      donationType: formData.donationType,
    };
    console.log("submitting", data);

    try {
      console.log("checking", data);
      const res = await api.put(
        `${import.meta.env.VITE_API_URL}/donation/create`,
        data
      );
      if (!res?.data?.success) {
        toast.error(res?.data?.message);
      }
      toast.success(res?.data?.message);

      if (res?.data?.success) {
        const user = res?.data?.user;
        const templateParams = {
          user_name: user?.name,
          user_email: user?.email,
          user_phone: user?.phone,
          email: selectedCenter?.email,
          time: selectedTime?.time,
          date: formatDate(selectedDate),
          message: `Congratulations! A new donator just reserved an appointment.
          `,
        };
        const emailRes = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        console.log("checking", emailRes);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        toast.success("Center is notified successfully!");
        setShowConfirmation(false);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get available dates dynamically (excluding today and yesterday)
  const getAvailableDates = () => {
    const today = new Date();
    return timeSlots
      .map((slot) => new Date(slot.date))
      .filter((date) => date > today); // Exclude today and past dates
  };

  // Get available times for the selected date
  const getAvailableTimes = () => {
    if (!selectedDate) return [];

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    // Find the slot object for the selected date
    const dateSlot = timeSlots.find((slot) => {
      const slotDate = format(parseISO(slot.date), "yyyy-MM-dd");
      return slotDate === formattedDate;
    });

    return dateSlot ? dateSlot.slot : []; // Return slots if found, else return empty array
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16 mt-16">
      <div className="container mx-auto">
        {/* Hero Section */}
        <DonationHeroSection setShowForm={setShowForm} showForm={showForm} />

        {/* Information Sections */}
        <DonationInstructions showForm={showForm} />

        {/* Appointment Form */}
        {showForm && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white py-6 rounded-xl">
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Find a Donation Center"}
                  {step === 2 && "Select a Donation Center"}
                  {step === 3 && "Schedule Your Appointment"}
                </CardTitle>
                <CardDescription>
                  {step === 1 &&
                    "Enter your location and preferences to find nearby donation centers"}
                  {step === 2 &&
                    "Choose from available donation centers in your area"}
                  {step === 3 &&
                    "Select a date and time for your blood donation"}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Step Indicator */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex flex-col items-center ${
                        step >= 1 ? "text-red-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          step >= 1
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        1
                      </div>
                      <span className="text-sm font-medium">Find Centers</span>
                    </div>
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        step >= 2 ? "bg-red-600" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`flex flex-col items-center ${
                        step >= 2 ? "text-red-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          step >= 2
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        2
                      </div>
                      <span className="text-sm font-medium">Select Center</span>
                    </div>
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        step >= 3 ? "bg-red-600" : "bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`flex flex-col items-center ${
                        step >= 3 ? "text-red-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          step >= 3
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        3
                      </div>
                      <span className="text-sm font-medium">Schedule</span>
                    </div>
                  </div>

                  {/* Step 1: Find Centers */}
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            placeholder="Enter your zip"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                country: value,
                              }))
                            }
                          >
                            <SelectTrigger id="country" className="w-full">
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">
                                United States
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Donation Type</Label>
                        <RadioGroup
                          value={formData.donationType}
                          onValueChange={handleDonationTypeChange}
                          className="grid grid-cols-1 md:grid-cols-2 gap-2"
                        >
                          {["Whole Blood", "Plasma", "Platelets"].map(
                            (type) => (
                              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                                <RadioGroupItem value={type} id={type} />
                                <Label
                                  htmlFor={type}
                                  className="flex items-center cursor-pointer"
                                >
                                  <Badge
                                    className={cn(
                                      "mr-2",
                                      getDonationTypeBadgeColor(type)
                                    )}
                                  >
                                    {type}
                                  </Badge>
                                </Label>
                              </div>
                            )
                          )}
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  {/* Step 2: Select Center */}
                  {step === 2 && (
                    <>
                      {centers.length === 0 ? (
                        <div className="text-center py-8">
                          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium">
                            No donation centers found
                          </h3>
                          <p className="text-gray-500 mt-2">
                            Try adjusting your search criteria or expanding your
                            date range.
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setStep(1)}
                          >
                            Back to Search
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              Found {centers.length} donation centers for{" "}
                              {formData.donationType}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500"
                              onClick={() => setStep(1)}
                            >
                              Modify Search
                            </Button>
                          </div>

                          {centers.map((center) => (
                            <div
                              className="border rounded-xl"
                              key={center?._id}
                            >
                              <CardContent className="p-0">
                                <div className="flex-1 p-6">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h3 className="text-lg font-semibold">
                                        {center?.name}
                                      </h3>
                                      <div className="flex items-center mt-1">
                                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                        <p className="text-sm text-gray-500">
                                          {center?.address}
                                        </p>
                                      </div>
                                      <div className="flex items-center mt-1">
                                        <Phone className="h-4 w-4 text-gray-500 mr-1" />
                                        <p className="text-sm text-gray-500">
                                          {center?.phone}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-4">
                                    <p className="text-sm font-medium mb-2">
                                      Available Donation Types:
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {[
                                        "Plasma",
                                        "Platelets",
                                        "Whole Blood",
                                      ].map((type) => (
                                        <Badge
                                          key={type}
                                          className={getDonationTypeBadgeColor(
                                            type
                                          )}
                                        >
                                          {type}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <Button
                                    className="bg-red-600 hover:bg-red-700 text-white w-fit mt-4"
                                    onClick={() => handleSelectCenter(center)}
                                  >
                                    Select
                                  </Button>
                                </div>
                              </CardContent>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* Step 3: Schedule Appointment */}
                  {step === 3 && selectedCenter && (
                    <>
                      <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">
                              {selectedCenter.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                              <p className="text-sm text-gray-500">
                                {selectedCenter.address}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={getDonationTypeBadgeColor(
                              formData.donationType
                            )}
                          >
                            {formData.donationType}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">
                            Select a Date
                          </h3>
                          <div className="border rounded-md p-4 w-fit">
                            <CalendarComponent
                              mode="single"
                              onValueChange={(date) =>
                                handleSelectDate(date[0] || null)
                              }
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => {
                                const dateStr = format(date, "yyyy-MM-dd");
                                return !getAvailableDates().some(
                                  (availableDate) =>
                                    format(availableDate, "yyyy-MM-dd") ===
                                    dateStr
                                );
                              }}
                              availableDates={getAvailableDates()}
                              className="mx-auto"
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-3">
                            Select a Time
                          </h3>
                          {!selectedDate ? (
                            <div className="border rounded-md p-8 flex items-center justify-center h-auto">
                              <p className="text-gray-500">
                                Please select a date first
                              </p>
                            </div>
                          ) : (
                            <div className="border rounded-md p-4 h-auto">
                              <p className="text-sm mb-3">
                                Available times for{" "}
                                {format(selectedDate, "yyyy-MM-dd")}:
                              </p>
                              <div className="flex flex-col gap-2">
                                {getAvailableTimes().map((slot) => (
                                  <Button
                                    key={slot.id}
                                    type="button"
                                    disabled={slot.seatLeft === 0}
                                    variant={
                                      selectedTime?.id === slot.id
                                        ? "default"
                                        : "outline"
                                    }
                                    className={cn(
                                      selectedTime?.id === slot.id
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "",
                                      "w-full"
                                    )}
                                    onClick={() =>
                                      handleSelectTime(slot.time, slot.id)
                                    }
                                  >
                                    {slot.time} &nbsp; &nbsp;
                                    {/* <span
                                      className={
                                        selectedTime?.id === slot.id
                                          ? "text-yellow-300"
                                          : "text-yellow-600"
                                      }
                                    >
                                      {slot.seatLeft} slot left
                                    </span> */}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between mt-4">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  )}

                  {step === 1 ? (
                    <Button
                      type="button"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleSearch}
                      disabled={!formData.zip || !formData.donationType}
                    >
                      Search <Search className="ml-2 h-4 w-4" />
                    </Button>
                  ) : step === 2 ? (
                    <div></div>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!selectedDate || !selectedTime}
                    >
                      Schedule Appointment
                    </Button>
                  )}
                </CardFooter>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        <DonationConfirm
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          selectedCenter={selectedCenter}
          selectedDate={selectedDate}
          selectedTime={selectedTime.time}
          formData={formData}
          confirmAppointment={confirmAppointment}
          isSubmitting={isSubmitting}
        />

        {/* Success Dialog */}
        <DonationSuccess
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          selectedCenter={selectedCenter}
          selectedDate={selectedDate}
          selectedTime={selectedTime.time}
          setShowForm={setShowForm}
        />
      </div>
    </div>
  );
};

export default DonateBlood;
