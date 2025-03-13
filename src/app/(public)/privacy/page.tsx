import { Metadata } from "next";
import { Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | Funcraft",
  description:
    "Our commitment to protecting your privacy and personal information",
};

const Page = () => {
  const lastUpdated = "March 14, 2024";

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
          <CardDescription>
            Our commitment to protecting your privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            {`At Funcraft ("we," "our," or "us"), we value your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or make purchases from our
            online store.`}
          </p>
          <p>
            {`Please read this Privacy Policy carefully. By accessing or using our
            website, you acknowledge that you have read, understood, and agree
            to be bound by all the terms outlined in this policy. If you do not
            agree with our policies and practices, please do not use our
            website.`}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
          <CardDescription>
            Types of data we gather when you use our services
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>
          <ul>
            <li>Register for an account</li>
            <li>Place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact our customer service</li>
            <li>Participate in promotions or surveys</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>Payment information</li>
            <li>Order history</li>
          </ul>

          <h3 className="text-lg font-medium mt-6">
            Automatically Collected Information
          </h3>
          <p>
            When you visit our website, we automatically collect certain
            information about your device and browsing actions, including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages you view</li>
            <li>Time and date of your visit</li>
            <li>Time spent on pages</li>
            <li>Other browsing statistics</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How We Use Your Information</CardTitle>
          <CardDescription>
            Purposes for which we process your data
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            We use the information we collect for various purposes, including
            to:
          </p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Create and manage your account</li>
            <li>Provide customer support</li>
            <li>
              Send transactional emails (order confirmations, shipping updates)
            </li>
            <li>Send marketing communications (if you have opted in)</li>
            <li>Improve our website and product offerings</li>
            <li>Analyze usage patterns and trends</li>
            <li>Protect against fraudulent transactions</li>
            <li>Comply with legal obligations</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cookies and Tracking Technologies</CardTitle>
          <CardDescription>
            How we use cookies and similar technologies
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            We use cookies, web beacons, and similar tracking technologies to
            collect information about your browsing activities. These
            technologies help us analyze website traffic, customize content, and
            improve your experience.
          </p>

          <h3 className="text-lg font-medium mt-4">Types of Cookies We Use</h3>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for the website to
              function properly
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences and
              settings
            </li>
            <li>
              <strong>Analytical Cookies:</strong> Help us understand how
              visitors interact with our website
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Track your browsing habits to
              deliver targeted advertising
            </li>
          </ul>

          <p className="mt-4">
            You can control cookies through your browser settings. However,
            disabling certain cookies may limit your ability to use some
            features of our website.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sharing Your Information</CardTitle>
          <CardDescription>
            Third parties with whom we may share your data
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>We may share your personal information with:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Companies that help us operate
              our website, process payments, fulfill orders, and provide
              customer service
            </li>
            <li>
              <strong>Business Partners:</strong> Trusted third parties who help
              us provide products and services
            </li>
            <li>
              <strong>Marketing Partners:</strong> Third parties who help us
              with marketing efforts (with your consent)
            </li>
            <li>
              <strong>Legal Authorities:</strong> When required by law or to
              protect our rights
            </li>
          </ul>

          <p className="mt-4">
            We do not sell your personal information to third parties. When we
            share information with service providers, we ensure they use
            appropriate safeguards to protect your data.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Data Security</CardTitle>
          <CardDescription>
            How we protect your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. These measures include:
          </p>
          <ul>
            <li>Encryption of sensitive data</li>
            <li>Secure socket layer (SSL) technology</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication procedures</li>
            <li>Data backup and recovery processes</li>
          </ul>

          <p className="mt-4">
            While we strive to protect your personal information, no method of
            transmission over the Internet or electronic storage is 100% secure.
            We cannot guarantee absolute security of your data.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Rights and Choices</CardTitle>
          <CardDescription>
            Control over your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of the personal
              information we hold about you
            </li>
            <li>
              <strong>Correction:</strong> Request that we correct inaccurate or
              incomplete information
            </li>
            <li>
              <strong>Deletion:</strong> Request that we delete your personal
              information
            </li>
            <li>
              <strong>Restriction:</strong> Request that we limit how we use
              your data
            </li>
            <li>
              <strong>Portability:</strong> Request a copy of your data in a
              structured, machine-readable format
            </li>
            <li>
              <strong>Objection:</strong> Object to our processing of your data
            </li>
          </ul>

          <p className="mt-4">
            {`To exercise these rights, please contact us using the information
            provided in the "Contact Us" section below.`}
          </p>

          <h3 className="text-lg font-medium mt-6">Marketing Communications</h3>
          <p>
            You can opt out of receiving marketing communications from us by:
          </p>
          <ul>
            <li>{`Clicking the "unsubscribe" link in our emails`}</li>
            <li>
              Updating your communication preferences in your account settings
            </li>
            <li>Contacting our customer service team</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{`Children's Privacy`}</CardTitle>
          <CardDescription>Information regarding minors</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            Our website is not intended for children under 16 years of age. We
            do not knowingly collect personal information from children under
            16. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us
            immediately.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Changes to This Privacy Policy</CardTitle>
          <CardDescription>How we update our privacy practices</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            {`We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. The updated policy will be posted on this page
            with a revised "Last Updated" date.`}
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay
            informed about how we collect, use, and protect your information.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            How to reach us with questions about privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="mt-4 not-prose">
            <p className="font-medium">Funcraft</p>
            <p>Mirpur-1, Dhaka, Bangladesh</p>
            <p>Email: info.jhshakil@gmail.com</p>
            <p>Phone: +8801851891846</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
