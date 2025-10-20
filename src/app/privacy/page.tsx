import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Salon Booking System",
  description: "Learn how we collect, use, and protect your personal information when you book appointments with our salon.",
  keywords: "privacy policy, data protection, salon booking, personal information, GDPR compliance",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Introduction</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Welcome to our salon booking system. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you use our website and book appointments
                  with us. Please read this privacy policy carefully. If you do not agree with the terms
                  of this privacy policy, please do not access the site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <p>We collect the following personal information when you book an appointment:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Name:</strong> Your full name for appointment identification</li>
                  <li><strong>Phone Number:</strong> Your mobile number for appointment confirmations and communications</li>
                  <li><strong>Service Preferences:</strong> The salon services you select</li>
                  <li><strong>Appointment Details:</strong> Date and time slot preferences</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on the website</li>
                  <li>Appointment booking patterns and preferences</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Appointment Management:</strong> To process, confirm, and manage your salon appointments</li>
                  <li><strong>Communication:</strong> To send appointment confirmations, reminders, and updates via WhatsApp</li>
                  <li><strong>Service Improvement:</strong> To understand customer preferences and improve our services</li>
                  <li><strong>Customer Support:</strong> To respond to your inquiries and provide assistance</li>
                  <li><strong>Business Operations:</strong> To manage our salon operations and maintain accurate records</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">WhatsApp Communications</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We use WhatsApp Business API to communicate with you about your appointments.
                  By providing your phone number, you consent to receive:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Appointment confirmation messages</li>
                  <li>Appointment status updates (approved/rejected)</li>
                  <li>Important notifications related to your booking</li>
                </ul>
                <p className="mt-4">
                  You can opt out of WhatsApp communications at any time by contacting us directly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold mb-3">Data Storage</h3>
                <p>
                  Your appointment data is securely stored in our MongoDB database with the following security measures:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Encrypted data transmission (HTTPS/SSL)</li>
                  <li>Secure database access controls</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Limited access to authorized personnel only</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6">Data Retention</h3>
                <p>
                  We retain your personal information only as long as necessary to provide our services
                  and fulfill the purposes outlined in this policy. Appointment records are typically
                  retained for 2 years for business and legal compliance purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> With trusted third-party services (MongoDB, WhatsApp Business API) that help us operate our business</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfer:</strong> In the event of a merger, acquisition, or sale of business assets</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Objection:</strong> Object to the processing of your personal information</li>
                  <li><strong>Data Portability:</strong> Request transfer of your data to another service provider</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us using the information provided below.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Our website may use cookies and similar tracking technologies to enhance your browsing experience.
                  These technologies help us:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p className="mt-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly
                  collect personal information from children under 13. If we become aware that we have
                  collected personal information from a child under 13, we will take steps to delete
                  such information promptly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices
                  or for other operational, legal, or regulatory reasons. We will notify you of any material
                  changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p className="mt-4">
                  We encourage you to review this Privacy Policy periodically to stay informed about how
                  we protect your information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or
                  our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p><strong>Phone:</strong> +91 9178544404</p>
                  <p><strong>Email:</strong> privacy@yoursalon.com</p>
                  <p><strong>Address:</strong> [Your Salon Address]</p>
                </div>
                <p className="mt-4">
                  We will respond to your inquiries within a reasonable timeframe and work to address
                  any concerns you may have.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Consent</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  By using our website and booking appointments with us, you consent to the collection,
                  use, and disclosure of your personal information as described in this Privacy Policy.
                  If you do not agree with our privacy practices, please do not use our services.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              This Privacy Policy is effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} and will remain in effect except with respect to any changes in its provisions in the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}