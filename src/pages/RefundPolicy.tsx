import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl text-center mb-4">Refund Policy</h1>
          <p className="text-center text-muted-foreground mb-12">Last Updated: 20 January 2026</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-foreground/80 leading-relaxed">
              At Tiora, we engineer jewellery for longevity and confidence. We adhere to strict quality control measures to ensure that every piece you receive is pristine.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              To maintain these hygiene and quality standards, we operate on a strict <strong>Refund-Only Policy</strong>. We do not offer exchanges or replacements. Please read the terms below carefully before initiating a request. By purchasing from Tiora, you agree to these terms.
            </p>

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">1. Overview: No Exchanges, Refunds Only</h2>
              <p className="text-foreground/80 leading-relaxed">
                We believe in efficiency. To streamline our operations and ensure transparency:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>No Exchanges:</strong> We do not exchange products for different sizes, designs, or colors.</li>
                <li><strong>Refunds Only:</strong> If you are not satisfied with your purchase, you may return the item for a full refund of the purchase price, subject to the conditions below.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">2. Eligibility for Refund</h2>
              <p className="text-foreground/80 leading-relaxed">
                A refund request will only be processed if all the following conditions are met. Tiora reserves the right to reject any return that does not meet these criteria:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Timeframe:</strong> The request must be raised via email within <strong>7 days</strong> of the delivery date.</li>
                <li><strong>Condition:</strong> The product must be unused, unworn, and unwashed. It must be in the exact condition you received it.</li>
                <li><strong>Packaging:</strong> All original packaging—including the rigid box, pouches, tags, and the physical invoice—must be intact and included in the return package.</li>
                <li><strong>Hygiene:</strong> For hygiene reasons, earrings that have been tried on or worn cannot be accepted.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">3. The Refund Process (Step-by-Step)</h2>
              
              <div className="space-y-6">
                <div className="bg-secondary/30 p-6 rounded-xl">
                  <h3 className="font-display text-xl text-foreground mb-3">Step 1: Initiate the Request</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Email our support team at <a href="mailto:support@tiora.co" className="text-primary hover:underline font-medium">support@tiora.co</a> with the subject line: <strong>Refund Request - Order #[Your Order ID]</strong>. Please include:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                    <li>Order Number</li>
                    <li>Reason for return</li>
                    <li>Clear photos of the product and packaging</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 p-6 rounded-xl">
                  <h3 className="font-display text-xl text-foreground mb-3">Step 2: Approval & Shipping</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Once your request is reviewed, you will receive an email approval.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li><strong>Self-Ship Policy:</strong> Tiora does not offer reverse pick-up services. You are responsible for securely shipping the product back to our warehouse.</li>
                    <li><strong>Cost:</strong> The customer bears the shipping cost for returning the item.</li>
                    <li><strong>Tracking:</strong> We strongly recommend using a trackable courier service (e.g., Delhivery, BlueDart, DTDC). Tiora is not liable for returns lost in transit.</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 p-6 rounded-xl">
                  <h3 className="font-display text-xl text-foreground mb-3">Step 3: Inspection</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Upon arrival at our warehouse, your return will undergo a strict Quality Check (QC). We inspect for signs of wear, scratches, or missing packaging.
                  </p>
                </div>

                <div className="bg-secondary/30 p-6 rounded-xl">
                  <h3 className="font-display text-xl text-foreground mb-3">Step 4: Refund Processing</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                    <li><strong>Approved:</strong> If the item passes QC, a refund for 100% of the product purchase amount will be initiated.</li>
                    <li><strong>Rejected:</strong> If the item shows signs of wear or damage, the refund will be denied, and the item will be shipped back to you at your expense.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">4. Refund Timeline & Method</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Method:</strong> Refunds are strictly processed to the original source of payment (Credit Card, Debit Card, UPI, or Net Banking). We do not offer cash refunds or store credit.</li>
                <li><strong>Timeline:</strong> Once approved, the refund will reflect in your account within <strong>5–7 business days</strong>, depending on your bank's processing time.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">5. Important Exceptions & Notes</h2>
              <ul className="list-disc pl-6 space-y-3 text-foreground/80">
                <li><strong>Shipping Charges:</strong> Original shipping charges (if applicable) are non-refundable. Only the cost of the jewellery itself will be refunded.</li>
                <li>
                  <strong>Damaged/Defective Items:</strong> In the rare event that you receive a product that is damaged during transit, you must report it to us within <strong>24 hours</strong> of delivery.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Email <a href="mailto:support@tiora.co" className="text-primary hover:underline font-medium">support@tiora.co</a> with an unboxing video or clear photos of the damage.</li>
                    <li>Requests made after 24 hours regarding physical damage will not be entertained.</li>
                  </ul>
                </li>
                <li><strong>Final Discretion:</strong> Tiora reserves the right to make the final decision on all refund requests based on the physical inspection of the returned product.</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="bg-primary/5 p-8 rounded-2xl space-y-4">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                For any questions regarding this policy, please contact us at:
              </p>
              <div className="space-y-2 text-foreground/80">
                <p><strong>Email:</strong> <a href="mailto:support@tiora.co" className="text-primary hover:underline">support@tiora.co</a></p>
                <p><strong>WhatsApp:</strong> <a href="https://wa.me/918800823166" className="text-primary hover:underline">+91 8800823166</a></p>
                <p><strong>Operating Hours:</strong> Monday – Friday, 10:00 AM – 6:00 PM IST</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
