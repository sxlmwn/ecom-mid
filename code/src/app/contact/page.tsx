import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const contactCards = [
    {
      title: "Campus Location",
      desc: "COMSATS University Islamabad, Park Road, Tarlai Kalan, Islamabad, 45550 (Student Center, Ground Floor)",
      icon: MapPin,
    },
    {
      title: "Direct Extension",
      desc: "+92 (051) 9247000-2 Ext: 304 (Cafe Administration & Catering Desk)",
      icon: Phone,
    },
    {
      title: "Official Email",
      desc: "cafe@comsats.edu.pk | studenthelp@cuicafe.pk",
      icon: Mail,
    },
    {
      title: "Operating Timings",
      desc: "Monday through Friday: 8:00 AM – 6:00 PM (Closed on Weekends)",
      icon: Clock,
    },
  ];

  return (
    <div className="py-10 sm:py-16 space-y-10">
      <Container>
        <SectionHeading
          as="h1"
          tag="Get In Touch"
          title="Contact CUI Cafe"
          subtitle="Have feedback on our food, queries regarding society event catering, or suggestions for new student snacks? We would love to hear from you."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {contactCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-coffee">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <Card className="bg-tan/30 border-tan p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-coffee text-cream flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-cream" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-coffee text-base">
                  Student Suggestion Box
                </h4>
                <p className="text-xs text-espresso/70">
                  Interactive contact and feedback form will be connected in subsequent project stages.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cream text-coffee border border-coffee/15">
              Campus Desk Counter #2
            </span>
          </Card>
        </div>
      </Container>
    </div>
  );
}
