import { useState } from "react";
import { ProfileDisplay } from "./profileDisplay";
import { FieldTypeEnum } from "@/lib/enums";
import BackToMainArrow from "@/components/BackToMainArrow";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    bio: "Senior UX Designer with 8+ years of experience creating beautiful, user-friendly interfaces. Passionate about design systems and accessibility.",
    location: "San Francisco, CA",
    field: FieldTypeEnum.UX_DESIGNER,
    contacts: {
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
    },
    socialLinks: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
    },
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Accessibility",
      "Design Systems",
    ],
    file: null, // This would be a File object in reality
  });

  return (
    <>
      <BackToMainArrow />
      <ProfileDisplay profile={profile} />
    </>
  );
}
