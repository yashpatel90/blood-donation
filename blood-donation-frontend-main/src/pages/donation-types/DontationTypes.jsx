import { useState } from "react";
import {
  Droplet,
  Clock,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  Zap,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router";

const DonationTypes = () => {
  const [activeTab, setActiveTab] = useState("whole-blood");

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Types of Blood Donation
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            There are several ways to donate blood, each helping patients with
            different medical needs. Learn about the various donation types and
            find the one that's right for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Your Donation Makes a Difference
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Blood donation is a simple process that saves millions of lives
              each year. Different components of blood can be used to help
              patients with specific conditions. Understanding the types of
              donations can help you make an informed decision about how you'd
              like to contribute.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Droplet className="h-10 w-10 text-red-600 mb-2" />
                <span className="text-sm font-medium">Whole Blood</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Droplet className="h-10 w-10 text-yellow-500 mb-2" />
                <span className="text-sm font-medium">Plasma</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Droplet className="h-10 w-10 text-blue-500 mb-2" />
                <span className="text-sm font-medium">Platelets</span>
              </div>
            </div>
          </div>

          {/* Tabs for Donation Types */}
          <Tabs
            defaultValue="whole-blood"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="whole-blood" className="text-sm md:text-base">
                Whole Blood
              </TabsTrigger>
              <TabsTrigger value="plasma" className="text-sm md:text-base">
                Plasma
              </TabsTrigger>
              <TabsTrigger value="platelets" className="text-sm md:text-base">
                Platelets
              </TabsTrigger>
            </TabsList>

            {/* Whole Blood Content */}
            <TabsContent value="whole-blood" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
                    <Droplet className="mr-2 h-6 w-6" /> Whole Blood Donation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Whole blood donation is the most common type of blood
                    donation. During this process, approximately one pint of
                    whole blood is collected, which is then separated into its
                    components: red cells, plasma, and platelets.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Time Required</h4>
                        <p className="text-sm text-gray-600">
                          About 1 hour from check-in to completion
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Gauge className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Frequency</h4>
                        <p className="text-sm text-gray-600">
                          Every 56 days (up to 6 times per year)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Who It Helps</h4>
                        <p className="text-sm text-gray-600">
                          Trauma patients, surgery patients, anemia patients,
                          cancer patients
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to="/donate-blood">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Schedule Whole Blood Donation
                    </Button>
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Whole Blood Donation Process"
                    className="w-full h-auto rounded-md mb-4"
                  />
                  <h4 className="font-semibold text-lg mb-2">
                    The Donation Process
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Registration and health history questionnaire</li>
                    <li>
                      Mini-physical (temperature, blood pressure, pulse,
                      hemoglobin)
                    </li>
                    <li>The actual donation takes about 8-10 minutes</li>
                    <li>Refreshments and rest for 15 minutes</li>
                  </ol>
                </div>
              </div>

              {/* Uses and Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Uses and Benefits of Whole Blood Donation
                  </CardTitle>
                  <CardDescription>
                    Whole blood can be separated into multiple components,
                    helping several patients with a single donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-red-700">
                        <Droplet className="h-4 w-4 mr-2" /> Red Blood Cells
                      </h4>
                      <p className="text-sm">
                        Used for trauma, surgery, anemia, blood disorders, and
                        cancer treatments. Red cells deliver oxygen to body
                        tissues.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-yellow-700">
                        <Droplet className="h-4 w-4 mr-2" /> Plasma
                      </h4>
                      <p className="text-sm">
                        Used for burn patients, shock, bleeding disorders, and
                        liver disease. Plasma helps maintain blood pressure and
                        supplies critical proteins.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-blue-700">
                        <Droplet className="h-4 w-4 mr-2" /> Platelets
                      </h4>
                      <p className="text-sm">
                        Used for cancer patients, transplant recipients, and
                        people with blood disorders. Platelets help blood clot
                        and prevent bleeding.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm font-medium">
                      One donation can save up to three lives
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              {/* FAQ Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">
                  Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Is whole blood donation painful?
                    </AccordionTrigger>
                    <AccordionContent>
                      Most donors report only a brief pinch when the needle is
                      inserted. The actual donation process is typically
                      painless.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How long does it take to recover after donating?
                    </AccordionTrigger>
                    <AccordionContent>
                      Your body replaces the fluid lost from donation within 24
                      hours. Red blood cells are replaced within about 4-6
                      weeks.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Can I exercise after donating whole blood?
                    </AccordionTrigger>
                    <AccordionContent>
                      It's recommended to avoid strenuous exercise or heavy
                      lifting for 24 hours after donation. Light activity is
                      usually fine.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Plasma Content */}
            <TabsContent value="plasma" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-600 flex items-center">
                    <Droplet className="mr-2 h-6 w-6" /> Plasma Donation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Plasma is the liquid portion of your blood that carries
                    cells and proteins throughout your body. During plasma
                    donation, blood is drawn and separated into plasma and other
                    components. The red cells and platelets are returned to your
                    body while the plasma is collected.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Time Required</h4>
                        <p className="text-sm text-gray-600">
                          About 1-2 hours from check-in to completion
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Gauge className="h-5 w-5 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Frequency</h4>
                        <p className="text-sm text-gray-600">
                          Every 28 days (up to 13 times per year)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Who It Helps</h4>
                        <p className="text-sm text-gray-600">
                          Burn victims, trauma patients, people with clotting
                          disorders, immune deficiencies
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to="/donate-blood">
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      Schedule Plasma Donation
                    </Button>
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Plasma Donation Process"
                    className="w-full h-auto rounded-md mb-4"
                  />
                  <h4 className="font-semibold text-lg mb-2">
                    The Donation Process
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Registration and health screening</li>
                    <li>
                      Blood is drawn and sent through an apheresis machine
                    </li>
                    <li>
                      The machine separates plasma from other blood components
                    </li>
                    <li>Red cells and platelets are returned to your body</li>
                    <li>
                      The process repeats until the target amount of plasma is
                      collected
                    </li>
                  </ol>
                </div>
              </div>

              {/* Uses and Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Uses and Benefits of Plasma Donation</CardTitle>
                  <CardDescription>
                    Plasma is a versatile blood component used in many
                    life-saving treatments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-yellow-700">
                        <Heart className="h-4 w-4 mr-2" /> Trauma Treatment
                      </h4>
                      <p className="text-sm">
                        Plasma helps maintain blood pressure and is critical for
                        treating patients who have experienced severe trauma or
                        blood loss.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-yellow-700">
                        <Zap className="h-4 w-4 mr-2" /> Immune Disorders
                      </h4>
                      <p className="text-sm">
                        Plasma contains antibodies that help fight infections
                        and is used to treat patients with immune deficiencies
                        and autoimmune disorders.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-yellow-700">
                        <Droplet className="h-4 w-4 mr-2" /> Clotting Factors
                      </h4>
                      <p className="text-sm">
                        Plasma contains clotting factors essential for treating
                        patients with bleeding disorders like hemophilia.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium">
                      Plasma can be stored for up to one year
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              {/* FAQ Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">
                  Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Is plasma donation different from whole blood donation?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes. In plasma donation, only the plasma is collected
                      while red cells and platelets are returned to your body.
                      This process takes longer but allows for more frequent
                      donations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Why is plasma yellow?</AccordionTrigger>
                    <AccordionContent>
                      Plasma has a yellowish color due to the presence of
                      bilirubin, a breakdown product of red blood cells, and
                      other proteins.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Are there special eligibility requirements for plasma
                      donation?
                    </AccordionTrigger>
                    <AccordionContent>
                      Plasma donors must meet the same basic requirements as
                      whole blood donors, but may have additional protein level
                      tests. Some centers also have minimum weight requirements
                      that are higher than for whole blood donation.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            {/* Platelets Content */}
            <TabsContent value="platelets" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
                    <Droplet className="mr-2 h-6 w-6" /> Platelet Donation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Platelets are tiny cells in your blood that form clots and
                    stop bleeding. During platelet donation, an apheresis
                    machine collects your platelets and returns your plasma and
                    red cells to you. Platelets are especially needed by cancer
                    patients, transplant recipients, and patients with blood
                    disorders.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Time Required</h4>
                        <p className="text-sm text-gray-600">
                          About 2-3 hours from check-in to completion
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Gauge className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Frequency</h4>
                        <p className="text-sm text-gray-600">
                          Every 7 days (up to 24 times per year)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Who It Helps</h4>
                        <p className="text-sm text-gray-600">
                          Cancer patients, transplant recipients, surgery
                          patients, people with blood disorders
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to="/donate-blood">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Schedule Platelet Donation
                    </Button>
                  </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Platelet Donation Process"
                    className="w-full h-auto rounded-md mb-4"
                  />
                  <h4 className="font-semibold text-lg mb-2">
                    The Donation Process
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Registration and health screening</li>
                    <li>
                      Blood is drawn from one arm and passed through an
                      apheresis machine
                    </li>
                    <li>
                      The machine separates platelets from other blood
                      components
                    </li>
                    <li>
                      Remaining blood components are returned to your body
                      through the same arm or other arm
                    </li>
                    <li>
                      You can watch movies or read during the longer donation
                      process
                    </li>
                  </ol>
                </div>
              </div>

              {/* Uses and Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Uses and Benefits of Platelet Donation</CardTitle>
                  <CardDescription>
                    Platelets are essential for blood clotting and are in high
                    demand for many medical treatments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-blue-700">
                        <Heart className="h-4 w-4 mr-2" /> Cancer Treatment
                      </h4>
                      <p className="text-sm">
                        Chemotherapy can reduce platelet count, making cancer
                        patients the primary recipients of platelet
                        transfusions.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-blue-700">
                        <Zap className="h-4 w-4 mr-2" /> Surgical Procedures
                      </h4>
                      <p className="text-sm">
                        Platelets are used during major surgeries, organ
                        transplants, and other procedures where blood loss
                        occurs.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center text-blue-700">
                        <Droplet className="h-4 w-4 mr-2" /> Blood Disorders
                      </h4>
                      <p className="text-sm">
                        People with certain blood disorders cannot produce
                        enough platelets and rely on regular transfusions.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium">
                      Platelets must be used within 5 days of donation
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              {/* FAQ Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">
                  Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Why does platelet donation take longer?
                    </AccordionTrigger>
                    <AccordionContent>
                      The apheresis process for collecting platelets takes
                      longer because the machine needs to separate platelets
                      from other blood components and return the remaining
                      components to your body. This cycle repeats several times
                      to collect enough platelets.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Why are platelets in such high demand?
                    </AccordionTrigger>
                    <AccordionContent>
                      Platelets have a very short shelf life of just 5 days, and
                      the demand is constant, especially for cancer patients.
                      Additionally, many patients need multiple platelet
                      transfusions during their treatment.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      Are there any special restrictions before donating
                      platelets?
                    </AccordionTrigger>
                    <AccordionContent>
                      You should avoid taking aspirin or medications containing
                      aspirin for 48 hours before donation, as these can affect
                      platelet function. You'll also need to have a good vein in
                      each arm if the center uses a two-arm collection method.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Donation Types Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left border-b-2 border-gray-200"></th>
                  <th className="p-4 text-center border-b-2 border-gray-200">
                    <div className="flex flex-col items-center">
                      <Droplet className="h-6 w-6 text-red-600 mb-2" />
                      <span>Whole Blood</span>
                    </div>
                  </th>
                  <th className="p-4 text-center border-b-2 border-gray-200">
                    <div className="flex flex-col items-center">
                      <Droplet className="h-6 w-6 text-yellow-600 mb-2" />
                      <span>Plasma</span>
                    </div>
                  </th>
                  <th className="p-4 text-center border-b-2 border-gray-200">
                    <div className="flex flex-col items-center">
                      <Droplet className="h-6 w-6 text-blue-600 mb-2" />
                      <span>Platelets</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-gray-200 font-medium">
                    Time Required
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    1 hour
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    1-2 hours
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    2-3 hours
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 font-medium">
                    Donation Frequency
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    Every 56 days
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    Every 28 days
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    Every 7 days
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 font-medium">
                    Maximum Donations Per Year
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    6
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    13
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    24
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 font-medium">
                    Shelf Life
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    42 days
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    1 year (frozen)
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    5 days
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 font-medium">
                    Primary Recipients
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    Trauma, surgery, anemia patients
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    Burn victims, immune disorders
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    Cancer patients, transplant recipients
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 font-medium">
                    Recovery Time
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    24 hours for fluids, 4-6 weeks for red cells
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    24-48 hours
                  </td>
                  <td className="p-4 border-b border-gray-200 text-center">
                    24 hours
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Now that you understand the different types of blood donation, you
            can choose the one that works best for you. Every donation helps
            save lives, regardless of which type you choose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate-blood">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                Schedule a Donation
              </Button>
            </Link>
            <Link to="/#eligibility-checker">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-red-600 hover:bg-gray-100 "
              >
                Check Your Eligibility
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DonationTypes;
