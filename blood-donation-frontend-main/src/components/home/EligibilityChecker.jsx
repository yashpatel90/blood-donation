import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Activity, AlertCircle, Calendar, Check, Heart, Plane, Weight, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function EligibilityChecker() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [recentTravel, setRecentTravel] = useState('');
  const [healthConditions, setHealthConditions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [errors, setErrors] = useState({});

  const healthConditionsList = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'heart-disease', label: 'Heart Disease' },
    { id: 'hepatitis', label: 'Hepatitis' },
    { id: 'hiv', label: 'HIV/AIDS' },
    { id: 'cancer', label: 'Cancer (current or recent)' },
    { id: 'pregnancy', label: 'Pregnancy' },
    { id: 'recent-surgery', label: 'Recent Surgery (last 6 months)' },
    { id: 'recent-tattoo', label: 'Recent Tattoo (last 3 months)' },
  ];

  const handleHealthConditionChange = (conditionId) => {
    setHealthConditions((prev) => {
      if (prev.includes(conditionId)) {
        return prev.filter((id) => id !== conditionId);
      } else {
        return [...prev, conditionId];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!age) {
      newErrors.age = 'Age is required';
    } else if (Number.parseInt(age) < 18) {
      newErrors.age = 'You must be at least 18 years old';
    }

    if (!weight) {
      newErrors.weight = 'Weight is required';
    } else if (Number.parseInt(weight) < 50) {
      newErrors.weight = 'You must weigh at least 50kg (110lbs)';
    }

    if (!recentTravel) {
      newErrors.recentTravel = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEligibility = () => {
    if (!validateForm()) return;

    // Simple eligibility logic
    const ageOk = Number.parseInt(age) >= 18;
    const weightOk = Number.parseInt(weight) >= 50;
    const travelOk = recentTravel === 'no';
    const healthOk = !healthConditions.some((condition) => ['hepatitis', 'hiv', 'cancer', 'pregnancy', 'recent-surgery', 'recent-tattoo'].includes(condition));

    setIsEligible(ageOk && weightOk && travelOk && healthOk);
    setShowResults(true);
  };

  return (
    <section
      className='py-16 bg-gray-50'
      id='eligibility-checker'
    >
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold mb-4'>Check Your Eligibility</h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>Find out if you're eligible to donate blood by answering a few simple questions.</p>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='md:border-r border-b md:border-b-0 border-gray-200 md:pr-8 pb-8 md:pb-0'>
            <h3 className='text-xl font-semibold mb-3 flex items-center'>
              <Heart className='mr-2 text-red-600' />
              Eligibility Guidelines
            </h3>
            <p className='text-gray-600 mb-6'>These are the basic guidelines you can follow.</p>

            <div className='space-y-6'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 bg-red-100 p-2 rounded-full mr-4'>
                  <Calendar className='h-5 w-5 text-red-600' />
                </div>
                <div>
                  <h4 className='font-medium'>Age Requirements</h4>
                  <p className='text-gray-600 mt-1'>You must be at least 18 years old to donate blood.</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0 bg-red-100 p-2 rounded-full mr-4'>
                  <Weight className='h-5 w-5 text-red-600' />
                </div>
                <div>
                  <h4 className='font-medium'>Weight Requirements</h4>
                  <p className='text-gray-600 mt-1'>You must weigh at least 50kg (110lbs) to be eligible.</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0 bg-red-100 p-2 rounded-full mr-4'>
                  <Plane className='h-5 w-5 text-red-600' />
                </div>
                <div>
                  <h4 className='font-medium'>Travel Restrictions</h4>
                  <p className='text-gray-600 mt-1'>Recent travel to certain countries may temporarily disqualify you from donating.</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='flex-shrink-0 bg-red-100 p-2 rounded-full mr-4'>
                  <Activity className='h-5 w-5 text-red-600' />
                </div>
                <div>
                  <h4 className='font-medium'>Health Conditions</h4>
                  <p className='text-gray-600 mt-1'>Certain health conditions may affect your eligibility to donate blood.</p>
                </div>
              </div>

              <div className='mt-8 p-4 bg-red-50 rounded-lg border border-red-100'>
                <p className='text-gray-700'>
                  <strong>Note:</strong> This eligibility checker provides general guidance only. The final determination will be made by healthcare professionals at the donation center.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h3 className='text-xl font-semibold mb-2 flex items-center'>Eligibility Checker</h3>
              <p className='text-gray-600 pb-4'>Answer these questions to check if you're eligible to donate blood.</p>
            </div>
            <div className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='age'>Age (years)</Label>
                <Input
                  id='age'
                  type='number'
                  placeholder='Enter your age'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={cn(errors.age && 'border-red-500')}
                />
                {errors.age && <p className='text-sm text-red-500'>{errors.age}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='weight'>Weight (kg)</Label>
                <Input
                  id='weight'
                  type='number'
                  placeholder='Enter your weight in kg'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={cn(errors.weight && 'border-red-500')}
                />
                {errors.weight && <p className='text-sm text-red-500'>{errors.weight}</p>}
              </div>

              <div className='space-y-2 flex flex-col md:flex-row justify-between md:gap-4 md:items-center'>
                <Label htmlFor='travel'>Have you traveled outside the country in the last 3 months?</Label>
                <Select
                  value={recentTravel}
                  onValueChange={setRecentTravel}
                >
                  <SelectTrigger
                    id='travel'
                    className={cn(errors.recentTravel && 'border-red-500')}
                  >
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='yes'>Yes</SelectItem>
                    <SelectItem value='no'>No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.recentTravel && <p className='text-sm text-red-500'>{errors.recentTravel}</p>}
              </div>

              <div className='space-y-3'>
                <Label>Do you have any of the following health conditions?</Label>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {healthConditionsList.map((condition) => (
                    <div
                      key={condition.id}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox
                        id={condition.id}
                        checked={healthConditions.includes(condition.id)}
                        onCheckedChange={() => handleHealthConditionChange(condition.id)}
                      />
                      <Label
                        htmlFor={condition.id}
                        className='text-sm font-normal cursor-pointer'
                      >
                        {condition.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              className='w-full mt-4 bg-red-600 hover:bg-red-700'
              onClick={checkEligibility}
            >
              Check Eligibility
            </Button>
          </div>
        </div>
      </div>

      {/* Results Dialog */}
      <Dialog
        open={showResults}
        onOpenChange={setShowResults}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center'>
              {isEligible ? (
                <>
                  <Check className='mr-2 h-5 w-5 text-green-500' />
                  You're Eligible to Donate!
                </>
              ) : (
                <>
                  <X className='mr-2 h-5 w-5 text-red-500' />
                  You May Not Be Eligible
                </>
              )}
            </DialogTitle>
            <DialogDescription>{isEligible ? 'Great news! Based on your responses, you appear to be eligible to donate blood.' : 'Based on your responses, you may not be eligible to donate blood at this time.'}</DialogDescription>
          </DialogHeader>

          <div className='p-6 bg-gray-50 rounded-md'>
            {isEligible ? (
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <Check className='mr-2 h-5 w-5 text-green-500 mt-0.5' />
                  <div>
                    <h4 className='font-medium'>Next Steps</h4>
                    <p className='text-gray-600 text-sm'>Schedule an appointment at your nearest donation center. Remember to bring a valid ID and get plenty of rest before your donation.</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Check className='mr-2 h-5 w-5 text-green-500 mt-0.5' />
                  <div>
                    <h4 className='font-medium'>Preparation Tips</h4>
                    <p className='text-gray-600 text-sm'>Drink plenty of water, eat a healthy meal, and avoid fatty foods before donating. Wear comfortable clothing with sleeves that can be rolled up.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <AlertCircle className='mr-2 h-5 w-5 text-amber-500 mt-0.5' />
                  <div>
                    <h4 className='font-medium'>Why You May Not Be Eligible</h4>
                    <p className='text-gray-600 text-sm'>Common reasons include age, weight, recent travel, certain medications, or health conditions. Some restrictions are temporary, while others may be permanent.</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <AlertCircle className='mr-2 h-5 w-5 text-amber-500 mt-0.5' />
                  <div>
                    <h4 className='font-medium'>What You Can Do</h4>
                    <p className='text-gray-600 text-sm'>Contact your local blood donation center for more information. You may still be able to help by volunteering or encouraging eligible friends and family to donate.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className='sm:justify-center'>
            {isEligible ? (
              <Link to={'/donate-blood'}>
                <Button
                  variant={'default'}
                  className={'bg-red-600 hover:bg-red-700'}
                  onClick={() => setShowResults(false)}
                >
                  Schedule Donation
                </Button>
              </Link>
            ) : (
              <Button
                variant={'outline'}
                onClick={() => setShowResults(false)}
              >
                Close
              </Button>
            )}
            {isEligible && (
              <Button
                variant='outline'
                onClick={() => setShowResults(false)}
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
