/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
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
import { toast } from "sonner";

const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null);
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

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm("service_mob0n5y", "template_owyg79e", form.current!, {
        publicKey: "jSFNkrUxU0F-VKblX",
      })
      .then(
        (res) => {
          console.log(res, "SUCCESS!");
          if (res.status === 200) {
            form.current?.reset();
            toast.success("Email sent successfully ✔️", { duration: 3000 });
          }
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
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
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        required
                        className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Your Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required
                        className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Email Subject"
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      required
                      rows={5}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-[#104042] focus:ring focus:ring-[#104042]/20 outline-none transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer w-full mt-3 bg-[#104042] hover:bg-[#0d353a] text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-md"
                  >
                    Send Message
                  </button>
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
