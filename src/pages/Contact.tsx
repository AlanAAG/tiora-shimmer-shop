import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  contactMethod: z.enum(["email", "whatsapp"], { required_error: "Please select a contact method" }),
  email: z.string().trim().max(255, "Email must be less than 255 characters").optional(),
  whatsapp: z.string().trim().max(20, "WhatsApp number must be less than 20 characters").optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
}).refine((data) => {
  if (data.contactMethod === "email") {
    return data.email && data.email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  }
  if (data.contactMethod === "whatsapp") {
    return data.whatsapp && data.whatsapp.length >= 10;
  }
  return false;
}, {
  message: "Please provide a valid email or WhatsApp number",
  path: ["email"],
});

type ContactFormData = {
  name: string;
  contactMethod: "email" | "whatsapp";
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    contactMethod: "email",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContactMethodChange = (value: "email" | "whatsapp") => {
    setFormData((prev) => ({ ...prev, contactMethod: value }));
    setErrors((prev) => ({ ...prev, email: undefined, whatsapp: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          const field = err.path[0] as keyof ContactFormData;
          if (field === "email" && formData.contactMethod === "whatsapp") {
            fieldErrors.whatsapp = "Please provide a valid WhatsApp number";
          } else {
            fieldErrors[field] = err.message;
          }
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent!", {
      description: "Thank you for reaching out. We'll get back to you within 24-48 hours.",
    });

    setFormData({ name: "", contactMethod: "email", email: "", whatsapp: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBanner={false} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-24 md:pt-28 pb-12 bg-gradient-hero"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg text-primary-foreground/90 max-w-2xl mx-auto"
          >
            We'd love to hear from you. Whether you have a question about our pieces, 
            need styling advice, or just want to say hello — we're here for you.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                  We're Here to Help
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Our dedicated team is ready to assist you with any inquiries about 
                  your order, our jewelry collections, or custom requests. We strive to 
                  respond to all messages within 24-48 hours.
                </p>
              </div>

              {/* Working Hours */}
              <div className="bg-secondary/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground">Working Hours</h3>
                </div>
                <div className="font-body text-muted-foreground space-y-1 pl-13">
                  <p><span className="text-foreground font-medium">Monday – Friday:</span> 10:00 AM – 7:00 PM IST</p>
                  <p><span className="text-foreground font-medium">Saturday:</span> 11:00 AM – 5:00 PM IST</p>
                  <p><span className="text-foreground font-medium">Sunday:</span> Closed</p>
                  <p className="text-sm text-muted-foreground/80 mt-2">
                    * All times are in Indian Standard Time (New Delhi)
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">Email Us</h3>
                    <a 
                      href="mailto:admin@tiora.co" 
                      className="font-body text-muted-foreground hover:text-primary transition-colors"
                    >
                      admin@tiora.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/918800823166" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-muted-foreground hover:text-[#25D366] transition-colors"
                    >
                      +91 8800823166
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">Location</h3>
                    <p className="font-body text-muted-foreground">
                      Sector 80, Dpt B1<br />
                      Gurugram, Haryana 122012<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body text-sm text-foreground">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Contact Method Selection */}
                  <div className="space-y-3">
                    <Label className="font-body text-sm text-foreground">
                      How should we contact you?
                    </Label>
                    <RadioGroup
                      value={formData.contactMethod}
                      onValueChange={handleContactMethodChange}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact-email" />
                        <Label htmlFor="contact-email" className="font-body text-sm cursor-pointer">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
                        <Label htmlFor="contact-whatsapp" className="font-body text-sm cursor-pointer">WhatsApp</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.contactMethod === "email" ? (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body text-sm text-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`rounded-xl ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="font-body text-sm text-foreground">
                        WhatsApp Number
                      </Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="+91 XXXXXXXXXX"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className={`rounded-xl ${errors.whatsapp ? "border-destructive" : ""}`}
                      />
                      {errors.whatsapp && (
                        <p className="text-sm text-destructive">{errors.whatsapp}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-body text-sm text-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`rounded-xl ${errors.subject ? "border-destructive" : ""}`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-body text-sm text-foreground">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`rounded-xl resize-none ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl h-12 font-body text-sm tracking-wide"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
