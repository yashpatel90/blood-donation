"use client";

import { useState } from "react";
import { format, addDays } from "date-fns";
import {
  Clock,
  Plus,
  Trash2,
  CalendarDays,
  Users,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MapPin,
  Building,
  School,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import api from "@/interceptors/axiosInstance";
import toast from "react-hot-toast";

const HostBloodDrive = () => {
  // State for multi-step form
  console.log("running");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    reason: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    desiredDate: "",
    isStudent: null,
    organization: "",
    zip: "",
    expectedAttendees: "",
    schedules: [
      {
        date: "",
        slots: [
          {
            time: "Morning (9:00 AM - 12:00 PM)",
            donationType: "Whole Blood",
            capacity: 100,
          },
          {
            time: "Afternoon (1:00 PM - 4:00 PM)",
            donationType: "Plasma",
            capacity: 100,
          },
          {
            time: "Evening (5:00 PM - 8:00 PM)",
            donationType: "Platelets",
            capacity: 100,
          },
        ],
      },
    ],
  });

  // Form validation
  const [errors, setErrors] = useState({});
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle radio button changes
  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      isStudent: value === "yes",
    }));

    // Clear error
    if (errors.isStudent) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.isStudent;
        return newErrors;
      });
    }
  };

  // Handle date selection
  const handleDateChange = (date, index) => {
    const newSchedules = [...formData.schedules];
    newSchedules[index].date = date;

    setFormData((prev) => ({
      ...prev,
      schedules: newSchedules,
    }));

    // Clear error
    if (errors[`schedules[${index}].date`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`schedules[${index}].date`];
        return newErrors;
      });
    }
  };

  // Handle slot changes
  const handleSlotChange = (index, slotIndex, field, value) => {
    const newSchedules = [...formData.schedules];
    newSchedules[index].slots[slotIndex][field] = value;

    setFormData((prev) => ({
      ...prev,
      schedules: newSchedules,
    }));
  };

  // Add new schedule
  const addSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        {
          date: "",
          slots: [
            {
              time: "Morning (9:00 AM - 12:00 PM)",
              donationType: "Whole Blood",
              capacity: 10,
            },
            {
              time: "Afternoon (1:00 PM - 4:00 PM)",
              donationType: "Plasma",
              capacity: 10,
            },
            {
              time: "Evening (5:00 PM - 8:00 PM)",
              donationType: "Platelets",
              capacity: 10,
            },
          ],
        },
      ],
    }));
  };

  // Remove schedule
  const removeSchedule = (index) => {
    if (formData.schedules.length === 1) {
      return; // Don't remove the last schedule
    }

    const newSchedules = [...formData.schedules];
    newSchedules.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      schedules: newSchedules,
    }));
  };

  // Validate form for each step
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if(!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if(!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.reason.trim())
        newErrors.reason = "Reason for hosting is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.zip.trim()) newErrors.zip = "Zip code is required";
      if (!formData.country.trim()) newErrors.country = "Country is required";
      if (!formData.desiredDate.trim())
        newErrors.desiredDate = "Desired date is required";
      if (formData.isStudent === null)
        newErrors.isStudent = "Please select an option";

      if (!formData.organization.trim())
        newErrors.organization = "Organization name is required";

      if (!formData.expectedAttendees.trim()) {
        newErrors.expectedAttendees =
          "Expected number of attendees is required";
      } else if (
        isNaN(formData.expectedAttendees) ||
        Number.parseInt(formData.expectedAttendees) <= 0
      ) {
        newErrors.expectedAttendees = "Please enter a valid number";
      }
    } else if (currentStep === 2) {
      formData.schedules.forEach((schedule, index) => {
        if (!schedule.date) {
          newErrors[`schedules[${index}].date`] = "Date is required";
        }

        schedule.slots.forEach((slot, slotIndex) => {
          if (!slot.donationType) {
            newErrors[`schedules[${index}].slots[${slotIndex}].donationType`] =
              "Donation type is required";
          }
          if (!slot.time) {
            newErrors[`schedules[${index}].slots[${slotIndex}].time`] =
              "Time slot is required";
          }
          if (!slot.capacity || Number.parseInt(slot.capacity) <= 0) {
            newErrors[`schedules[${index}].slots[${slotIndex}].capacity`] =
              "Valid capacity is required";
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submiting", formData);
    if (validateStep(step)) {
      setIsSubmitting(true);

      // Simulate API call

      try {
        const res = await api.post(
          `${import.meta.env.VITE_API_URL}/host/create`,
          formData
        );
        if (!res?.data?.success) {
          toast.error(res?.data?.message);
        }
        toast.success(res?.data?.message);
        setIsSubmitting(false);
        setShowSuccessDialog(true);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      } finally{
        setIsSubmitting(false);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // Get donation type badge color
  const getDonationTypeBadgeColor = (type) => {
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

  return (
    <div className="min-h-screen pt-16 pb-16 mt-16 bg-gray-50">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Host a Blood Drive</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Make a significant impact in your community by hosting a blood
            drive. Fill out the form below to get started.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex justify-between items-center">
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
              <span className="text-sm font-medium text-center">
                Basic Information
              </span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${
                step >= 2 ? "bg-red-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex flex-col items-center self-start ${
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
              <span className="text-sm font-medium text-center">Schedule</span>
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
              <span className="text-sm font-medium text-center">
                Review & Submit
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-50 p-4 lg:p-6">
          <div>
            <div>
              <h3 className="text-lg font-semibold">
                {step === 1 && "Host Information"}
                {step === 2 && "Schedule Your Blood Drive"}
                {step === 3 && "Review Your Information"}
              </h3>
              <CardDescription>
                {step === 1 &&
                  "Please provide your contact information and details about the blood drive."}
                {step === 2 &&
                  "Set up the schedule for your blood drive with dates and donation types."}
                {step === 3 &&
                  "Review all information before submitting your request."}
              </CardDescription>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 mt-6">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={cn(errors.firstName && "border-red-500")}
                          placeholder="e.g., John"
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-500">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={cn(errors.lastName && "border-red-500")}
                          placeholder="e.g., Doe"
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-500">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={cn(errors.email && "border-red-500")}
                          placeholder="e.g., john@mail.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={cn(errors.phone && "border-red-500")}
                          placeholder="e.g., (123) 456-7890"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div> 

                    <div className="space-y-2">
                      <Label htmlFor="address">Location (Address)</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={cn(errors.address && "border-red-500")}
                        placeholder="e.g., 123 Main St"
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={cn(errors.city && "border-red-500")}
                          placeholder="e.g., Los Angeles"
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, country: value }))
                          }
                        >
                          <SelectTrigger id="country" className="w-full">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States" selected>
                              United States
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <p className="text-sm text-red-500">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">Zip Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className={cn(errors.zip && "border-red-500")}
                          placeholder="e.g., 1200"
                        />
                        {errors.zip && (
                          <p className="text-sm text-red-500">{errors.zip}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="desiredDate">Desired Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.desiredDate &&
                                  "text-muted-foreground",
                                errors.desiredDate && "border-red-500"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.desiredDate
                                ? formatDate(formData.desiredDate)
                                : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                formData.desiredDate
                                  ? new Date(formData.desiredDate)
                                  : undefined
                              }
                              onSelect={(date) => {
                                if (date) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    desiredDate: date.toISOString(),
                                  }));
                                  if (errors.desiredDate) {
                                    setErrors((prev) => {
                                      const newErrors = { ...prev };
                                      delete newErrors.desiredDate;
                                      return newErrors;
                                    });
                                  }
                                }
                              }}
                              initialFocus
                              disabled={(date) =>
                                date < addDays(new Date(), 14)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.desiredDate && (
                          <p className="text-sm text-red-500">
                            {errors.desiredDate}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Blood drives must be scheduled at least 2 weeks in
                          advance.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Are You a Student?</Label>
                      <RadioGroup
                        value={
                          formData.isStudent === null
                            ? undefined
                            : formData.isStudent
                            ? "yes"
                            : "no"
                        }
                        onValueChange={handleRadioChange}
                        className={cn(
                          errors.isStudent && "border-red-500 p-2 rounded"
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="student-yes" />
                          <Label htmlFor="student-yes" className="font-normal">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="student-no" />
                          <Label htmlFor="student-no" className="font-normal">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.isStudent && (
                        <p className="text-sm text-red-500">
                          {errors.isStudent}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization Name</Label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className={cn(errors.organization && "border-red-500")}
                        placeholder="Acme Corporation"
                      />
                      {errors.organization && (
                        <p className="text-sm text-red-500">
                          {errors.organization}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedAttendees">
                        Expected Number of Attendees
                      </Label>
                      <Input
                        id="expectedAttendees"
                        name="expectedAttendees"
                        type="number"
                        min="1"
                        placeholder="e.g., 50"
                        value={formData.expectedAttendees}
                        onChange={handleInputChange}
                        className={cn(
                          errors.expectedAttendees && "border-red-500"
                        )}
                      />
                      {errors.expectedAttendees && (
                        <p className="text-sm text-red-500">
                          {errors.expectedAttendees}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Hosting</Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className={cn(errors.reason && "border-red-500")}
                        placeholder="Tell us why you want to host a blood drive..."
                      />
                      {errors.reason && (
                        <p className="text-sm text-red-500">{errors.reason}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Step 2: Schedule */}
                {step === 2 && (
                  <>
                    <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Schedule Information</AlertTitle>
                      <AlertDescription>
                        For each day of your blood drive, you can set up to
                        three time slots for different types of blood donations.
                      </AlertDescription>
                    </Alert>

                    {formData.schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">
                            Day {index + 1}
                          </h3>
                          {formData.schedules.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeSchedule(index)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remove Day
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !schedule.date && "text-muted-foreground",
                                  errors[`schedules[${index}].date`] &&
                                    "border-red-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {schedule.date
                                  ? formatDate(schedule.date)
                                  : "Select a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={
                                  schedule.date
                                    ? new Date(schedule.date)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  date &&
                                  handleDateChange(date.toISOString(), index)
                                }
                                initialFocus
                                disabled={(date) => {
                                  if (!formData.desiredDate) return true;
                                  return date < new Date(formData.desiredDate);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                          {errors[`schedules[${index}].date`] && (
                            <p className="text-sm text-red-500">
                              {errors[`schedules[${index}].date`]}
                            </p>
                          )}
                        </div>

                        <div className="space-y-4">
                          <Label>Time Slots</Label>
                          {schedule.slots.map((slot, slotIndex) => (
                            <div
                              key={slotIndex}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4 last:border-0"
                            >
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`slot-${index}-${slotIndex}-time`}
                                >
                                  Time
                                </Label>
                                <Select
                                  value={slot.time}
                                  onValueChange={(value) =>
                                    handleSlotChange(
                                      index,
                                      slotIndex,
                                      "time",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger
                                    id={`slot-${index}-${slotIndex}-time`}
                                  >
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Morning (9:00 AM - 12:00 PM)">
                                      Morning (9:00 AM - 12:00 PM)
                                    </SelectItem>
                                    <SelectItem value="Afternoon (1:00 PM - 4:00 PM)">
                                      Afternoon (1:00 PM - 4:00 PM)
                                    </SelectItem>
                                    <SelectItem value="Evening (5:00 PM - 8:00 PM)">
                                      Evening (5:00 PM - 8:00 PM)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor={`slot-${index}-${slotIndex}-type`}
                                >
                                  Donation Type
                                </Label>
                                <Select
                                  value={slot.donationType}
                                  onValueChange={(value) =>
                                    handleSlotChange(
                                      index,
                                      slotIndex,
                                      "donationType",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger
                                    id={`slot-${index}-${slotIndex}-type`}
                                  >
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Whole Blood">
                                      Whole Blood
                                    </SelectItem>
                                    <SelectItem value="Plasma">
                                      Plasma
                                    </SelectItem>
                                    <SelectItem value="Platelets">
                                      Platelets
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor={`slot-${index}-${slotIndex}-capacity`}
                                >
                                  Available Seats
                                </Label>
                                <Input
                                  id={`slot-${index}-${slotIndex}-capacity`}
                                  type="number"
                                  min="1"
                                  value={slot.capacity}
                                  onChange={(e) =>
                                    handleSlotChange(
                                      index,
                                      slotIndex,
                                      "capacity",
                                      e.target.value
                                    )
                                  }
                                  className={cn(
                                    errors[
                                      `schedules[${index}].slots[${slotIndex}].capacity`
                                    ] && "border-red-500"
                                  )}
                                />
                                {errors[
                                  `schedules[${index}].slots[${slotIndex}].capacity`
                                ] && (
                                  <p className="text-sm text-red-500">
                                    {
                                      errors[
                                        `schedules[${index}].slots[${slotIndex}].capacity`
                                      ]
                                    }
                                  </p>
                                )}
                                <p className="text-xs text-gray-500">
                                  Maximum number of donors that can be
                                  accommodated in this time slot
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSchedule}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Another Day
                    </Button>
                  </>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold mb-4">
                          Host Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">
                              {formData.firstName} {formData.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{formData.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Organization
                            </p>
                            <p className="font-medium">
                              {formData.organization}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Student Status
                            </p>
                            <p className="font-medium">
                              {formData.isStudent ? "Student" : "Non-Student"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Expected Attendees
                            </p>
                            <p className="font-medium">
                              {formData.expectedAttendees}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-gray-500">
                            Reason for Hosting
                          </p>
                          <p className="font-medium">{formData.reason}</p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">
                            {formData.address}, {formData.city},{" "}
                            {formData.country}
                          </p>
                        </div>
                      </div>

                      <div className="border rounded-lg p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold mb-4">Schedule</h3>
                        <div className="space-y-4">
                          {formData.schedules.map((schedule, index) => (
                            <div
                              key={index}
                              className="border-b pb-4 last:border-0"
                            >
                              <div className="flex items-center mb-2">
                                <CalendarDays className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium">
                                  Day {index + 1}: {formatDate(schedule.date)}
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                {schedule.slots.map((slot, slotIndex) => (
                                  <div
                                    key={slotIndex}
                                    className="bg-white p-3 rounded border"
                                  >
                                    <div className="flex items-center mb-2">
                                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                                      <span className="text-sm font-medium">
                                        {slot.time}
                                      </span>
                                    </div>
                                    <Badge
                                      className={cn(
                                        "font-normal mb-2",
                                        getDonationTypeBadgeColor(
                                          slot.donationType
                                        )
                                      )}
                                    >
                                      {slot.donationType}
                                    </Badge>
                                    <div className="text-xs text-gray-500 flex items-center">
                                      <Users className="h-3 w-3 mr-1" />
                                      <span>
                                        {slot.capacity} available seats
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between mt-4">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : (
                  <div></div> // Empty div to maintain spacing
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleNextStep}
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700"
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
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                Request Submitted Successfully
              </DialogTitle>
              <DialogDescription>
                Thank you for your interest in hosting a blood drive. We've
                received your request and will contact you shortly.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  {formData.isStudent ? (
                    <School className="h-5 w-5 text-red-600" />
                  ) : (
                    <Building className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{formData.organization}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(formData.desiredDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Expected Impact</p>
                  <p className="text-sm text-gray-600">
                    Your blood drive could help save up to{" "}
                    {Number.parseInt(formData.expectedAttendees) * 3} lives!
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={() => (window.location.href = "/")}
              >
                Return to Home
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HostBloodDrive;
