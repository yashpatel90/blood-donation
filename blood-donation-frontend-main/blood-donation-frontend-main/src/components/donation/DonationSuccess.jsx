import { formatDate } from "@/pages/donate-blood/DonateBlood";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

const DonationSuccess = ({
  showSuccess,
  setShowSuccess,
  selectedCenter,
  selectedDate,
  selectedTime,
  setShowForm,
}) => {
  return (
    <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
            Appointment Scheduled Successfully
          </DialogTitle>
          <DialogDescription>
            Thank you for scheduling your blood donation appointment. Your
            generosity will help save lives.
          </DialogDescription>
        </DialogHeader>

        {selectedCenter && selectedDate && selectedTime && (
          <div className="py-4">
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-medium">{selectedCenter.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedCenter.address}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(selectedDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-medium">{selectedTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                We've sent a confirmation email with these details and
                instructions on how to prepare for your donation.
              </p>
              <p className="text-sm">
                You can manage or reschedule your appointment through your
                account dashboard.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => {
              setShowSuccess(false);
              setShowForm(false);
              window.scrollTo(0, 0);
            }}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationSuccess;
