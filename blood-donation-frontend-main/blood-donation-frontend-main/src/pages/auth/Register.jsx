import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import api from "@/interceptors/axiosInstance";
import { cn } from "@/lib/utils";
import { calculateAge } from "@/utils/date";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    healthInformation: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const countries = ["United States"];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Calculate password strength when password changes
    if (field === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else if (currentStep === 2) {
      if (!formData.phoneNumber.trim())
        newErrors.phoneNumber = "Phone number is required";
      if (formData.phoneNumber.length > 13) {
        newErrors.phoneNumber = "Phone number is invalid.";
      }
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (calculateAge(formData.dateOfBirth) < 16)
        newErrors.dateOfBirth = "You must be at least 16 years old";
      if (!formData.gender) newErrors.gender = "Gender is required";
    } else if (currentStep === 3) {
      if (!formData.street.trim())
        newErrors.street = "Street address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
      if (!formData.country) newErrors.country = "Country is required";
    } else if (currentStep === 4) {
      if (!formData.emergencyContactName.trim())
        newErrors.emergencyContactName = "Emergency contact name is required";
      if (!formData.emergencyContactPhone.trim())
        newErrors.emergencyContactPhone = "Emergency contact phone is required";
      if (!formData.healthInformation.trim())
        newErrors.healthInformation = "Health information is required";
      if (!formData.agreeToTerms)
        newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      delete formData.confirmPassword;
      delete formData.agreeToTerms;
      console.log("Registration submitted", formData);
      try {
        const res = await api.post(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          formData
        );
        if (!res?.data?.success) {
          toast.error(res?.data?.message);
        }
        toast.success(res?.data?.message);
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === stepNumber
                  ? "bg-red-600 text-white"
                  : step > stepNumber
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {step > stepNumber ? <Check size={16} /> : stepNumber}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 mt-4 rounded-full">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep1 = () => {
    return (
      <>
        <CardHeader className="px-0">
          <CardTitle>Create an account</CardTitle>
          <CardDescription className="mb-6">
            Enter your personal information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                className={cn(errors.firstName && "border-red-500")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                className={cn(errors.lastName && "border-red-500")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className={cn(errors.password && "border-red-500")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
            {formData.password && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Password Strength:</span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      passwordStrength <= 25
                        ? "text-red-500"
                        : passwordStrength <= 50
                        ? "text-yellow-500"
                        : passwordStrength <= 75
                        ? "text-blue-500"
                        : "text-green-500"
                    )}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <Progress
                  value={passwordStrength}
                  className={`h-1 ${getPasswordStrengthColor()}`}
                />
                <ul className="text-xs space-y-1 text-gray-500 mt-2">
                  <li
                    className={cn(
                      formData.password.length >= 8 ? "text-green-500" : ""
                    )}
                  >
                    {formData.password.length >= 8 ? (
                      <Check size={12} className="inline mr-1" />
                    ) : (
                      <X size={12} className="inline mr-1" />
                    )}
                    At least 8 characters
                  </li>
                  <li
                    className={cn(
                      /[A-Z]/.test(formData.password) ? "text-green-500" : ""
                    )}
                  >
                    {/[A-Z]/.test(formData.password) ? (
                      <Check size={12} className="inline mr-1" />
                    ) : (
                      <X size={12} className="inline mr-1" />
                    )}
                    At least one uppercase letter
                  </li>
                  <li
                    className={cn(
                      /[0-9]/.test(formData.password) ? "text-green-500" : ""
                    )}
                  >
                    {/[0-9]/.test(formData.password) ? (
                      <Check size={12} className="inline mr-1" />
                    ) : (
                      <X size={12} className="inline mr-1" />
                    )}
                    At least one number
                  </li>
                  <li
                    className={cn(
                      /[^A-Za-z0-9]/.test(formData.password)
                        ? "text-green-500"
                        : ""
                    )}
                  >
                    {/[^A-Za-z0-9]/.test(formData.password) ? (
                      <Check size={12} className="inline mr-1" />
                    ) : (
                      <X size={12} className="inline mr-1" />
                    )}
                    At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateFormData("confirmPassword", e.target.value)
                }
                className={cn(errors.confirmPassword && "border-red-500")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </CardContent>
      </>
    );
  };

  const renderStep2 = () => {
    return (
      <>
        <CardHeader className="px-0">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription className="mb-6">
            Please provide your contact information and personal details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData("phoneNumber", e.target.value)}
              className={cn(errors.phoneNumber && "border-red-500")}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
              className={cn(errors.dateOfBirth && "border-red-500")}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => updateFormData("gender", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="font-normal">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="font-normal">
                  Female
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal">
                  Other
                </Label>
              </div>
            </RadioGroup>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodType">Blood Type (optional)</Label>
            <Select
              value={formData.bloodType}
              onValueChange={(value) => updateFormData("bloodType", value)}
            >
              <SelectTrigger id="bloodType">
                <SelectValue placeholder="Select your blood type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </>
    );
  };

  const renderStep3 = () => {
    return (
      <>
        <CardHeader className="px-0">
          <CardTitle>Address Information</CardTitle>
          <CardDescription className="mb-6">
            Please provide your address details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => updateFormData("street", e.target.value)}
              className={cn(errors.street && "border-red-500")}
            />
            {errors.street && (
              <p className="text-sm text-red-500">{errors.street}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                className={cn(errors.city && "border-red-500")}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => updateFormData("state", e.target.value)}
                className={cn(errors.state && "border-red-500")}
              />
              {errors.state && (
                <p className="text-sm text-red-500">{errors.state}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip/Postal Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => updateFormData("zipCode", e.target.value)}
                className={cn(errors.zipCode && "border-red-500")}
              />
              {errors.zipCode && (
                <p className="text-sm text-red-500">{errors.zipCode}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => updateFormData("country", value)}
              >
                <SelectTrigger
                  id="country"
                  className={cn(errors.country && "border-red-500 w-full")}
                >
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country}</p>
              )}
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  const renderStep4 = () => {
    return (
      <>
        <CardHeader className="px-0">
          <CardTitle>Emergency & Health Information</CardTitle>
          <CardDescription className="mb-6">
            Please provide emergency contact and health information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
            <Input
              id="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={(e) =>
                updateFormData("emergencyContactName", e.target.value)
              }
              className={cn(errors.emergencyContactName && "border-red-500")}
            />
            {errors.emergencyContactName && (
              <p className="text-sm text-red-500">
                {errors.emergencyContactName}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">
              Emergency Contact Phone
            </Label>
            <Input
              id="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) =>
                updateFormData("emergencyContactPhone", e.target.value)
              }
              className={cn(errors.emergencyContactPhone && "border-red-500")}
            />
            {errors.emergencyContactPhone && (
              <p className="text-sm text-red-500">
                {errors.emergencyContactPhone}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="healthInformation">
              Health Information (allergies, chronic conditions)
            </Label>
            <Textarea
              id="healthInformation"
              placeholder="Please list any allergies, chronic conditions, or other health information that may be relevant"
              value={formData.healthInformation}
              onChange={(e) =>
                updateFormData("healthInformation", e.target.value)
              }
              className="min-h-[100px]"
            />
            {errors.healthInformation && (
              <p className="text-sm text-red-500">{errors.healthInformation}</p>
            )}
          </div>
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) =>
                updateFormData("agreeToTerms", checked)
              }
              className={cn(errors.agreeToTerms && "border-red-500")}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="agreeToTerms"
                className="text-sm font-normal cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-red-600 hover:text-red-500 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Terms and Conditions document would open here");
                  }}
                >
                  terms and conditions
                </a>
              </Label>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-500">{errors.agreeToTerms}</p>
              )}
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="w-full max-w-2xl bg-white p-6 lg:p-8 rounded-lg">
        {renderStepIndicator()}
        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <CardFooter className="flex justify-between mt-6 px-0">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-red-600 hover:underline">
                  Login
                </Link>
              </p>
            )}

            {step < 4 ? (
              <Button
                type="button"
                className="bg-red-600 hover:bg-red-700"
                onClick={nextStep}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                <UserPlus className="mr-2 h-4 w-4" /> Register
              </Button>
            )}
          </CardFooter>
        </form>
      </div>
    </div>
  );
};
export default Register;
