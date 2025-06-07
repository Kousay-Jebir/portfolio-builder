import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { FieldTypeEnum } from "@/lib/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import BackToMainArrow from "@/components/BackToMainArrow";

export function CreateProfileForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    field: "",
    contacts: {
      email: "",
      phone: "",
    },
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
    },
    skills: [],
    file: "",
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contacts: { ...prev.contacts, [name]: value },
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, file }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (formData.bio.length < 10) {
      newErrors.bio = "Bio must be at least 10 characters";
    }

    if (formData.location.length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    }

    if (!formData.field) {
      newErrors.field = "Field is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let response;

      // If there's a file, use FormData (multipart)
      if (formData.file) {
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("bio", formData.bio);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("field", formData.field);
        formDataToSend.append("contacts", JSON.stringify(formData.contacts));
        formDataToSend.append(
          "socialLinks",
          JSON.stringify(formData.socialLinks)
        );
        formDataToSend.append("skills", JSON.stringify(formData.skills));
        formDataToSend.append("file", formData.file);

        response = await fetch("/main/user/profile", {
          method: "POST",
          body: formDataToSend,
        });
      } else {
        // Otherwise send JSON
        response = await fetch("/main/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      navigate("/profile");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BackToMainArrow />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Create Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700">First Name</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors.firstName && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-gray-700">Last Name</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors.lastName && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="text-gray-700">Bio</Label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
              />
              {errors.bio && (
                <p className="text-sm font-medium text-red-500">{errors.bio}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-700">Location</Label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
              />
              {errors.location && (
                <p className="text-sm font-medium text-red-500">
                  {errors.location}
                </p>
              )}
            </div>

            <div>
              <Label className="text-gray-700">Field</Label>
              <Select
                value={formData.field}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, field: value }))
                }
              >
                <SelectTrigger className="border-gray-200 focus:ring-orange-400">
                  <SelectValue placeholder="Select your field" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(FieldTypeEnum).map((field) => (
                    <SelectItem
                      key={field}
                      value={field}
                      className="hover:bg-orange-50"
                    >
                      {field}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.field && (
                <p className="text-sm font-medium text-red-500">
                  {errors.field}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700">Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border-gray-200 focus:border-orange-400 focus:ring-orange-400 flex-1"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="outline"
                  className="border-orange-400 text-orange-600 hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-white text-gray-700 border-orange-300 hover:bg-orange-50"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {errors.skills && (
                <p className="text-sm font-medium text-red-500">
                  {errors.skills}
                </p>
              )}
            </div>

            <div>
              <Label className="text-gray-700">Profile Image</Label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
                className="border-gray-200 hover:border-orange-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-gray-700">Contact Information</Label>
                {["email", "phone"].map((contactType) => (
                  <div key={contactType} className="space-y-2">
                    <Label className="text-gray-700 capitalize">
                      {contactType}
                    </Label>
                    <Input
                      name={contactType}
                      value={formData.contacts[contactType]}
                      onChange={handleContactChange}
                      placeholder={`Your ${contactType}`}
                      className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700">Social Links</Label>
                {["github", "linkedin", "twitter"].map((socialType) => (
                  <div key={socialType} className="space-y-2">
                    <Label className="text-gray-700 capitalize">
                      {socialType}
                    </Label>
                    <Input
                      name={socialType}
                      value={formData.socialLinks[socialType]}
                      onChange={handleSocialLinkChange}
                      placeholder={`Your ${socialType} URL`}
                      className="border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Profile"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
