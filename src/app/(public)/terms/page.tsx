import type { Metadata } from "next";
import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms & Conditions | Funcraft",
  description: "Legal terms and conditions for using our website and services",
};

const Page = () => {
  const lastUpdated = "March 14, 2024";

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Terms & Conditions
          </h1>
        </div>
        <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
          <CardDescription>Agreement between you and Funcraft</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            {`Welcome to Funcraft. These Terms and Conditions ("Terms") govern your access to and use of our website,
            including any content, functionality, and services offered on or through our website.`}
          </p>
          <p>
            Please read these Terms carefully before using our website. By
            accessing or using our website, you agree to be bound by these
            Terms. If you do not agree to these Terms, you must not access or
            use our website.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Definitions</CardTitle>
          <CardDescription>
            Key terms used throughout this agreement
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <ul>
            <li>
              <strong>{`"Website"`}</strong> refers to Funcraft, accessible at
              [website URL].
            </li>
            <li>
              <strong>{`"We," "Us," "Our"`}</strong> refers to Funcraft.
            </li>
            <li>
              <strong>{`"You," "Your"`}</strong> refers to the individual
              accessing or using our Website, or the company or organization on
              behalf of which that individual is accessing our Website.
            </li>
            <li>
              <strong>{`"Goods"`}</strong> refers to the items offered for sale
              on our Website.
            </li>
            <li>
              <strong>{`"Services"`}</strong> refers to any services offered on
              our Website.
            </li>
            <li>
              <strong>{`"Content"`}</strong> refers to text, images, photos,
              audio, video, and all other forms of data or communication.
            </li>
            <li>
              <strong>{`"User Content"`}</strong> refers to Content that you
              submit or transmit to, through, or in connection with our Website.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Account Registration</CardTitle>
          <CardDescription>
            Requirements for creating and maintaining an account
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <h3 className="text-lg font-medium">Creating an Account</h3>
          <p>
            To access certain features of our Website, you may be required to
            register for an account. When you register, you agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your password secure and confidential</li>
            <li>
              Be responsible for all activities that occur under your account
            </li>
            <li>
              Notify us immediately of any unauthorized use of your account
            </li>
          </ul>

          <h3 className="text-lg font-medium mt-6">Account Restrictions</h3>
          <p>You may not:</p>
          <ul>
            <li>Create more than one account per person</li>
            <li>Share your account or login credentials with others</li>
            <li>Transfer your account to another person</li>
            <li>{`Use another person's account`}</li>
            <li>Create an account if you are under 16 years of age</li>
          </ul>

          <p className="mt-4">
            We reserve the right to suspend or terminate your account at our
            discretion, without notice, for conduct that we determine violates
            these Terms or is harmful to other users, us, or third parties, or
            for any other reason.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Products and Pricing</CardTitle>
          <CardDescription>
            Information about our products, pricing, and availability
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <h3 className="text-lg font-medium">Product Information</h3>
          <p>
            We strive to display our products and their features accurately on
            our Website. However, the colors, dimensions, and other physical
            aspects you see on your screen may vary depending on your monitor,
            settings, and other factors.
          </p>

          <h3 className="text-lg font-medium mt-6">Pricing and Availability</h3>
          <p>
            All prices are shown in [currency] and are inclusive/exclusive of
            applicable taxes unless otherwise stated. We reserve the right to
            change prices at any time without notice.
          </p>
          <p>
            We do our best to maintain sufficient stock of all products.
            However, availability of products is subject to change without
            notice. If a product is unavailable after you place an order, we
            will notify you and provide options for substitution, backorder, or
            refund.
          </p>

          <h3 className="text-lg font-medium mt-6">Discounts and Promotions</h3>
          <p>
            We may offer discounts, promotions, or special pricing from time to
            time. These offers:
          </p>
          <ul>
            <li>May be subject to additional terms and conditions</li>
            <li>
              Cannot be combined with other offers unless explicitly stated
            </li>
            <li>May be withdrawn at any time without notice</li>
            <li>Are not valid on previous purchases</li>
            <li>May have expiration dates</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Orders and Payment</CardTitle>
          <CardDescription>
            How to place orders and our payment policies
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <h3 className="text-lg font-medium">Placing Orders</h3>
          <p>
            By placing an order, you are making an offer to purchase products.
            We reserve the right to accept or decline your order for any reason,
            including but not limited to:
          </p>
          <ul>
            <li>Product availability</li>
            <li>Errors in product or pricing information</li>
            <li>Problems with your account or payment method</li>
            <li>Suspected fraudulent activity</li>
          </ul>
          <p>
            Once we accept your order, we will send you an order confirmation
            email. This email constitutes our acceptance of your order and forms
            a binding agreement between you and us.
          </p>

          <h3 className="text-lg font-medium mt-6">Payment Methods</h3>
          <p>We accept the following payment methods:</p>
          <ul>
            <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
            <li>PayPal</li>
            <li>Bank Transfer</li>
            <li>Mobile Banking</li>
          </ul>
          <p>
            By providing payment information, you represent and warrant that:
          </p>
          <ul>
            <li>You have the legal right to use the payment method</li>
            <li>
              The payment information you provide is true, correct, and complete
            </li>
            <li>
              You authorize us to charge your payment method for the order
            </li>
          </ul>

          <h3 className="text-lg font-medium mt-6">Order Cancellation</h3>
          <p>
            You may request to cancel an order before it has been shipped by
            contacting our customer service. However, we cannot guarantee that
            we will be able to cancel your order once it has been processed.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Shipping and Delivery</CardTitle>
          <CardDescription>
            Our shipping policies and delivery information
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <h3 className="text-lg font-medium">Shipping Methods and Costs</h3>
          <p>We offer various shipping methods, including:</p>
          <ul>
            <li>Standard Shipping (5-7 business days)</li>
            <li>Express Shipping (2-3 business days)</li>
            <li>Next Day Delivery (where available)</li>
          </ul>
          <p>
            Shipping costs are calculated based on the delivery address, weight,
            and dimensions of the products. The exact shipping cost will be
            displayed during checkout before you complete your order.
          </p>

          <h3 className="text-lg font-medium mt-6">Delivery Times</h3>
          <p>
            Delivery times are estimates and not guaranteed. Factors that may
            affect delivery times include:
          </p>
          <ul>
            <li>Order processing time</li>
            <li>Shipping method selected</li>
            <li>Destination address</li>
            <li>Customs clearance (for international orders)</li>
            <li>Weather conditions and other unforeseen circumstances</li>
          </ul>
          <p>We are not responsible for delays that are beyond our control.</p>

          <h3 className="text-lg font-medium mt-6">International Shipping</h3>
          <p>
            For international orders, you may be subject to import duties and
            taxes, which are levied once the package reaches your country. These
            additional charges are your responsibility as the customer.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Returns and Refunds</CardTitle>
          <CardDescription>
            Our policies for returns, exchanges, and refunds
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <h3 className="text-lg font-medium">Return Policy</h3>
          <p>
            You may return most new, unopened items within 30 days of delivery
            for a full refund. To be eligible for a return, your item must be:
          </p>
          <ul>
            <li>In the same condition that you received it</li>
            <li>In the original packaging</li>
            <li>Accompanied by the receipt or proof of purchase</li>
          </ul>

          <h3 className="text-lg font-medium mt-6">Return Process</h3>
          <p>To initiate a return:</p>
          <ol>
            <li>
              Contact our customer service to request a return authorization
            </li>
            <li>Pack the item securely in its original packaging</li>
            <li>Include the return authorization and your order information</li>
            <li>
              Ship the item to the address provided by our customer service
            </li>
          </ol>
          <p>
            Return shipping costs are the responsibility of the customer unless
            the return is due to our error (you received an incorrect or
            defective item).
          </p>

          <h3 className="text-lg font-medium mt-6">Refunds</h3>
          <p>
            Once we receive and inspect your return, we will notify you of the
            status of your refund. If approved, your refund will be processed,
            and a credit will automatically be applied to your original method
            of payment within 7-14 business days.
          </p>

          <h3 className="text-lg font-medium mt-6">Non-Returnable Items</h3>
          <p>The following items cannot be returned:</p>
          <ul>
            <li>Gift cards</li>
            <li>Downloadable products</li>
            <li>Personalized or custom-made items</li>
            <li>Items marked as final sale or clearance</li>
            <li>Items that have been used, damaged, or altered</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Intellectual Property</CardTitle>
          <CardDescription>
            Rights regarding content and materials on our website
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <h3 className="text-lg font-medium">Our Intellectual Property</h3>
          <p>
            The Website and its entire contents, features, and functionality
            (including but not limited to all information, software, text,
            displays, images, video, and audio, and the design, selection, and
            arrangement thereof) are owned by us, our licensors, or other
            providers of such material and are protected by copyright,
            trademark, patent, trade secret, and other intellectual property or
            proprietary rights laws.
          </p>

          <h3 className="text-lg font-medium mt-6">Limited License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable, and
            revocable license to access and use the Website for personal,
            non-commercial purposes. This license does not include:
          </p>
          <ul>
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose</li>
            <li>
              Attempting to decompile or reverse engineer any software contained
              on the Website
            </li>
            <li>
              Removing any copyright or other proprietary notations from the
              materials
            </li>
            <li>{`Transferring the materials to another person or "mirroring" the materials on any other server`}</li>
          </ul>

          <h3 className="text-lg font-medium mt-6">User Content</h3>
          <p>
            By posting, uploading, or otherwise making available any User
            Content on our Website, you grant us a non-exclusive, royalty-free,
            worldwide, perpetual, and irrevocable right to use, copy, modify,
            adapt, publish, translate, create derivative works from, distribute,
            and display such User Content in any media.
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>You own or have the necessary rights to the User Content</li>
            <li>
              The User Content does not infringe upon the intellectual property
              rights of any third party
            </li>
            <li>
              The User Content does not violate these Terms or any applicable
              law
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Limitation of Liability</CardTitle>
          <CardDescription>
            Our liability limitations and disclaimers
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            To the fullest extent permitted by applicable law, in no event shall
            we, our affiliates, officers, directors, employees, agents,
            suppliers, or licensors be liable for any indirect, incidental,
            special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from:
          </p>
          <ul>
            <li>
              Your access to or use of or inability to access or use the Website
            </li>
            <li>Any conduct or content of any third party on the Website</li>
            <li>Any content obtained from the Website</li>
            <li>
              Unauthorized access, use, or alteration of your transmissions or
              content
            </li>
          </ul>
          <p>
            Our liability is limited whether or not we have been informed of the
            possibility of such damages, and even if a remedy set forth herein
            is found to have failed of its essential purpose.
          </p>
          <p>
            In no event shall our total liability to you for all claims exceed
            the amount paid by you to us during the 12 months preceding the
            event giving rise to the liability.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Indemnification</CardTitle>
          <CardDescription>
            Your responsibilities to protect us from claims
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            {`You agree to defend, indemnify, and hold harmless us, our affiliates, licensors, and service providers, and
            our and their respective officers, directors, employees, contractors, agents, licensors, suppliers,
            successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs,
            expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:`}
          </p>
          <ul>
            <li>Your violation of these Terms</li>
            <li>Your User Content</li>
            <li>Your use of the Website</li>
            <li>Your violation of any rights of another</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Governing Law and Jurisdiction</CardTitle>
          <CardDescription>
            Legal framework governing these terms
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            These Terms and your use of the Website shall be governed by and
            construed in accordance with the laws of Bangladesh, without regard
            to its conflict of law provisions.
          </p>
          <p>
            Any legal action or proceeding arising out of or relating to these
            Terms or your use of the Website shall be exclusively brought in the
            courts located in Dhaka, Bangladesh, and you consent to the personal
            jurisdiction and venue of such courts.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Changes to Terms</CardTitle>
          <CardDescription>
            How and when these terms may be updated
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting on the Website. Your continued
            use of the Website following the posting of revised Terms means that
            you accept and agree to the changes.
          </p>
          <p>
            {` We will provide notice of material changes by updating the "Last Updated" date at the top of these Terms
            and/or by sending an email to the address associated with your account. It is your responsibility to check
            these Terms periodically for changes.`}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Termination</CardTitle>
          <CardDescription>
            Conditions under which access may be terminated
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            We may terminate or suspend your account and access to the Website
            immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use the Website will immediately
            cease. If you wish to terminate your account, you may simply
            discontinue using the Website or contact us to request account
            deletion.
          </p>
          <p>
            All provisions of these Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity,
            and limitations of liability.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            How to reach us with questions about these terms
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose max-w-none">
          <p>
            If you have any questions about these Terms, please contact us at:
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
