import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatDate,
  getDonationTypeBadgeColor,
} from "@/pages/donate-blood/DonateBlood";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Info, MapPin, Phone } from "lucide-react";
import { Badge } from "../ui/badge";

const DonationConfirm = ({
  showConfirmation,
  setShowConfirmation,
  selectedCenter,
  selectedDate,
  selectedTime,
  formData,
  confirmAppointment,
  isSubmitting,
}) => {
  return (
    <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Appointment</DialogTitle>
          <DialogDescription>
            Please review your appointment details before confirming.
          </DialogDescription>
        </DialogHeader>

        {selectedCenter && selectedDate && selectedTime && (
          <div className="py-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-lg">{selectedCenter.name}</h3>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <p className="text-sm text-gray-500">
                    {selectedCenter.address}
                  </p>
                </div>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 text-gray-500 mr-1" />
                  <p className="text-sm text-gray-500">
                    {selectedCenter.phone}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(selectedDate)}</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{selectedTime}</p>
                </div>
                <div className="border rounded-md p-3 md:col-span-2">
                  <p className="text-sm text-gray-500">Donation Type</p>
                  <Badge
                    className={cn(
                      "mt-1",
                      getDonationTypeBadgeColor(formData.donationType)
                    )}
                  >
                    {formData.donationType}
                  </Badge>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Important Information
                    </h4>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1 list-disc pl-5">
                      <li>Please bring a valid photo ID</li>
                      <li>
                        Eat a healthy meal and drink plenty of water before your
                        appointment
                      </li>
                      <li>Get a good night's sleep before donating</li>
                      <li>
                        If you feel unwell on the day of your appointment,
                        please reschedule
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={confirmAppointment}
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
                Processing...
              </>
            ) : (
              "Confirm Appointment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationConfirm;
