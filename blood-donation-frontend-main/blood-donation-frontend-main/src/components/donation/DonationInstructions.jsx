import React from "react";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "../ui/card";
import { AccordionContent,Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";

const DonationInstructions = ({ showForm }) => {
  return (
    <>
      {!showForm && (
        <div className="mb-16">
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>The Donation Process</CardTitle>
              <CardDescription>
                What to expect when you donate blood
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex items-center justify-center bg-red-100 rounded-full w-12 h-12 text-red-600 font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Registration</h3>
                    <p className="text-gray-600">
                      You'll sign in, show ID, and read some information about
                      donating blood.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex items-center justify-center bg-red-100 rounded-full w-12 h-12 text-red-600 font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Health History & Mini-Physical
                    </h3>
                    <p className="text-gray-600">
                      A staff member will ask you questions about your health
                      history and check your temperature, pulse, blood pressure,
                      and hemoglobin levels.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex items-center justify-center bg-red-100 rounded-full w-12 h-12 text-red-600 font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">The Donation</h3>
                    <p className="text-gray-600">
                      A sterile needle is inserted for the blood draw, which
                      takes about 8-10 minutes. You'll donate about one pint of
                      blood.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="flex items-center justify-center bg-red-100 rounded-full w-12 h-12 text-red-600 font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Refreshments & Recovery
                    </h3>
                    <p className="text-gray-600">
                      After donating, you'll be given snacks and drinks to help
                      replenish your fluids. You should rest for 10-15 minutes
                      before leaving.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about blood donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Who can donate blood?</AccordionTrigger>
                  <AccordionContent>
                    <p>In general, to donate blood you must be:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        At least 17 years old (16 with parental consent in some
                        states)
                      </li>
                      <li>Weighing at least 110 pounds</li>
                      <li>In good health and feeling well</li>
                      <li>Not have donated blood in the last 56 days</li>
                    </ul>
                    <p className="mt-2">
                      Some medical conditions or medications may affect your
                      eligibility. The staff at the donation center will
                      determine if you're eligible to donate.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How often can I donate blood?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      You can donate whole blood every 56 days (about 8 weeks).
                      If you donate platelets, you can donate every 7 days, up
                      to 24 times a year. Plasma donors can donate every 28
                      days, and double red cell donors can donate every 112
                      days.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is donating blood safe?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Yes, donating blood is very safe. All equipment used for
                      blood donation is sterile and used only once. There's no
                      risk of contracting any disease by donating blood. Most
                      people feel fine after donating, though some may
                      experience mild side effects like lightheadedness or
                      bruising at the needle site.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    What are the different types of blood donations?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>There are several types of blood donations:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        <strong>Whole Blood:</strong> The most common type of
                        donation, which can be separated into red cells, plasma,
                        and platelets.
                      </li>
                      <li>
                        <strong>Platelets:</strong> Takes longer (about 2-3
                        hours) but allows for more platelets to be collected.
                        Platelets are vital for cancer patients and others.
                      </li>
                      <li>
                        <strong>Plasma:</strong> The liquid portion of blood
                        that carries proteins important for clotting and
                        immunity.
                      </li>
                      <li>
                        <strong>Double Red Cells:</strong> Allows you to donate
                        two units of red cells in one visit.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    What should I do before donating blood?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>To prepare for blood donation:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Get a good night's sleep</li>
                      <li>Eat a healthy meal before donating</li>
                      <li>
                        Drink plenty of fluids (an extra 16 oz) before donation
                      </li>
                      <li>Avoid fatty foods before donating</li>
                      <li>Bring a list of medications you're taking</li>
                      <li>Bring ID</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    What blood types are most needed?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      All blood types are needed, but there's often a special
                      need for:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        <strong>O Negative:</strong> The universal donor type
                        that can be given to anyone in an emergency
                      </li>
                      <li>
                        <strong>O Positive:</strong> The most common blood type
                      </li>
                      <li>
                        <strong>A and B Negative:</strong> Rare blood types that
                        are always in demand
                      </li>
                    </ul>
                    <p className="mt-2">
                      However, every blood type is important and needed for
                      different patients.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default DonationInstructions;
