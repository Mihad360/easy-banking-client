/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";

const ContactUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-16 px-4 overflow-hidden">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#104042] mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#104042] mb-6">
                  Leave Your Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[#104042] font-medium"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        className="border-gray-200 focus:border-[#104042] focus:ring-[#104042]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-[#104042] font-medium"
                      >
                        Your Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        className="border-gray-200 focus:border-[#104042] focus:ring-[#104042]/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-[#104042] font-medium"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Subject"
                      className="border-gray-200 focus:border-[#104042] focus:ring-[#104042]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[#104042] font-medium"
                    >
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      cols={12}
                      rows={12}
                      className="border-gray-200 focus:border-[#104042] focus:ring-[#104042]/20 resize-none"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-[#104042] hover:bg-[#0d353a] text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Side - Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#104042] mb-2">
                Get In Touch{" "}
                <span className="text-gray-600">With Us Today</span>
              </h3>
              <p className="text-gray-600 mb-8">
                Sed ut perspiciatis unde omnis iste natus error sit amet
                voluptatem accusantium doloremque laudantium elit.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">
                        Our Office
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      4 Sunset Road B15, Bali
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <Mail className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">
                        For Consultation
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      contact@yourdomain.com
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <Phone className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">For Call</h4>
                    </div>
                    <p className="text-gray-600 text-sm">(+62) 81 6764 345</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-l-4 border-l-[#104042] shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#104042]/10 rounded-lg">
                        <Clock className="w-5 h-5 text-[#104042]" />
                      </div>
                      <h4 className="font-semibold text-[#104042]">
                        Work Hours
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Everyday 08 am - 07 pm
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Social Media */}
            <motion.div variants={itemVariants} className="pt-6">
              <h4 className="font-semibold text-[#104042] mb-4">
                Social Media -
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, color: "#1877F2" },
                  { icon: Twitter, color: "#1DA1F2" },
                  { icon: Linkedin, color: "#0A66C2" },
                  { icon: Youtube, color: "#FF0000" },
                  { icon: Instagram, color: "#E4405F" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer"
                  >
                    <div className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <social.icon
                        className="w-5 h-5"
                        style={{ color: social.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
