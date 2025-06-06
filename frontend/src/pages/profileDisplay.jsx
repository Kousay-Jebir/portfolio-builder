import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FieldTypeEnum } from "@/lib/enums";

export function ProfileDisplay({ profile }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Unified Profile Card */}

        {/* Profile Content */}
        <div className="pt-28 px-8 pb-8">
          {/* Name and Title Section */}
          <div className="text-center mb-8 flex gap-3 items-center justify-evenly">
            <div className="h-48 w-48 rounded-full border-4 border-white shadow-lg bg-white p-1">
              {profile.file ? (
                <Avatar className="h-full w-full">
                  <AvatarImage src={URL.createObjectURL(profile.file)} />
                  <AvatarFallback className="bg-orange-100 text-orange-800 text-5xl">
                    {profile.firstName.charAt(0)}
                    {profile.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-full w-full rounded-full bg-orange-100 flex items-center justify-center text-5xl text-orange-800">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-orange-600 font-medium">
                  {profile.field}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-orange-100 my-6"></div>

          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {profile.bio || "No bio provided yet."}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-orange-100 my-6"></div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-orange-500 text-white p-3 rounded-2xl"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-orange-100 my-6"></div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-4">
                {profile.contacts?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-orange-500" />
                    <a
                      href={`mailto:${profile.contacts.email}`}
                      className="text-gray-700 hover:text-orange-600"
                    >
                      {profile.contacts.email}
                    </a>
                  </div>
                )}

                {profile.contacts?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-orange-500" />
                    <a
                      href={`tel:${profile.contacts.phone}`}
                      className="text-gray-700 hover:text-orange-600"
                    >
                      {profile.contacts.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links & Expertise */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Connect
                </h2>
                <div className="flex gap-4">
                  {profile.socialLinks?.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socialLinks?.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socialLinks?.twitter && (
                    <a
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Expertise
                </h2>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                    {getFieldIcon(profile.field)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {profile.field}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {getFieldDescription(profile.field)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          <div className="mt-8 text-center">
            <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-4">
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions remain the same
function getFieldIcon(field) {
  const icons = {
    [FieldTypeEnum.SOFTWARE_ENGINEER]: "💻",
    [FieldTypeEnum.FRONTEND_DEVELOPER]: "🖥️",
    [FieldTypeEnum.BACKEND_DEVELOPER]: "⚙️",
  };
  return icons[field] || "👤";
}

function getFieldDescription(field) {
  const descriptions = {
    [FieldTypeEnum.SOFTWARE_ENGINEER]: "Software Development Expert",
    [FieldTypeEnum.FRONTEND_DEVELOPER]: "User Interface Specialist",
    [FieldTypeEnum.BACKEND_DEVELOPER]: "Server-Side Systems Architect",
  };
  return descriptions[field] || "Professional in their field";
}
