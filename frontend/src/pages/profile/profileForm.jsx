import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Loader2 } from "lucide-react";
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
import { createProfile } from "@/api/main/user";
import BackToMainArrow from "@/components/BackToMainArrow";
// import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

const DEFAULT_FORM_DATA = {
  firstName: "",
  lastName: "",
  bio: "",
  location: "",
  field: "",
  skills: [],
  contacts: {
    email: "",
    phone: "",
  },
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
  },
  file: null,
};

export function CreateProfileForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [newSkill, setNewSkill] = useState("");

  // Handle file drop with react-dropzone
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFormData(prev => ({ ...prev, file: acceptedFiles[0] }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  // Memoized handlers for better performance
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleContactChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contacts: { ...prev.contacts, [name]: value },
    }));
  }, []);

  const handleSocialLinkChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  }, []);

  const addSkill = useCallback(() => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  }, [newSkill, formData.skills]);

  const removeSkill = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    } else if (formData.bio.length < 10) {
      newErrors.bio = "Bio must be at least 10 characters";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (formData.location.length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    }

    if (!formData.field) {
      newErrors.field = "Field is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    // Validate email if provided
    if (formData.contacts.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contacts.email)) {
      newErrors.contacts = {
        ...newErrors.contacts,
        email: "Please enter a valid email address"
      };
    }

    // Validate URLs if provided
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    if (formData.socialLinks.github && !urlPattern.test(formData.socialLinks.github)) {
      newErrors.socialLinks = {
        ...newErrors.socialLinks,
        github: "Please enter a valid URL"
      };
    }

    if (formData.socialLinks.linkedin && !urlPattern.test(formData.socialLinks.linkedin)) {
      newErrors.socialLinks = {
        ...newErrors.socialLinks,
        linkedin: "Please enter a valid URL"
      };
    }

    if (formData.socialLinks.twitter && !urlPattern.test(formData.socialLinks.twitter)) {
      newErrors.socialLinks = {
        ...newErrors.socialLinks,
        twitter: "Please enter a valid URL"
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // toast.error("Please fix the errors in the form");
      alert('please fix')
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("field", formData.field);
      formDataToSend.append("contacts", JSON.stringify(formData.contacts));
      formDataToSend.append("socialLinks", JSON.stringify(formData.socialLinks));
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      await createProfile(formDataToSend);
      // toast.success("Profile created successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Profile creation error:", error);
      // toast.error(error?.message || "Failed to create profile");
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
                <Label htmlFor="firstName" className="text-gray-700">
                  First Name*
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`mt-1 ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-gray-700">
                  Last Name*
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`mt-1 ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-gray-700">
                Bio*
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className={`mt-1 ${errors.bio ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-500">{errors.bio}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location" className="text-gray-700">
                Location*
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className={`mt-1 ${errors.location ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            <div>
              <Label htmlFor="field" className="text-gray-700">
                Field*
              </Label>
              <Select
                value={formData.field}
                onValueChange={(value) => setFormData(prev => ({ ...prev, field: value }))}
              >
                <SelectTrigger
                  id="field"
                  className={`mt-1 ${errors.field ? 'border-red-500' : 'border-gray-200'}`}
                >
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
                <p className="mt-1 text-sm text-red-500">{errors.field}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label className="text-gray-700">Skills*</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
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
                      aria-label={`Remove ${skill}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {errors.skills && (
                <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-700">Profile Image</Label>
              <div
                {...getRootProps()}
                className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                  isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                }`}
              >
                <input {...getInputProps()} />
                {formData.file ? (
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-600">{formData.file.name}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-orange-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, file: null }));
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : isDragActive ? (
                  <p className="text-orange-600">Drop the image here...</p>
                ) : (
                  <p className="text-gray-600">
                    Drag & drop an image here, or click to select
                  </p>
                )}
              </div>
              {errors.file && (
                <p className="mt-1 text-sm text-red-500">{errors.file}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label className="text-gray-700">Contact Information</Label>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.contacts.email}
                    onChange={handleContactChange}
                    placeholder="your.email@example.com"
                    className={errors.contacts?.email ? 'border-red-500' : 'border-gray-200'}
                  />
                  {errors.contacts?.email && (
                    <p className="text-sm text-red-500">{errors.contacts.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.contacts.phone}
                    onChange={handleContactChange}
                    placeholder="+1234567890"
                    className={errors.contacts?.phone ? 'border-red-500' : 'border-gray-200'}
                  />
                  {errors.contacts?.phone && (
                    <p className="text-sm text-red-500">{errors.contacts.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700">Social Links</Label>
                <div className="space-y-2">
                  <Label htmlFor="github" className="text-gray-700">
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    name="github"
                    value={formData.socialLinks.github}
                    onChange={handleSocialLinkChange}
                    placeholder="https://github.com/username"
                    className={errors.socialLinks?.github ? 'border-red-500' : 'border-gray-200'}
                  />
                  {errors.socialLinks?.github && (
                    <p className="text-sm text-red-500">{errors.socialLinks.github}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-gray-700">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleSocialLinkChange}
                    placeholder="https://linkedin.com/in/username"
                    className={errors.socialLinks?.linkedin ? 'border-red-500' : 'border-gray-200'}
                  />
                  {errors.socialLinks?.linkedin && (
                    <p className="text-sm text-red-500">{errors.socialLinks.linkedin}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-gray-700">
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleSocialLinkChange}
                    placeholder="https://twitter.com/username"
                    className={errors.socialLinks?.twitter ? 'border-red-500' : 'border-gray-200'}
                  />
                  {errors.socialLinks?.twitter && (
                    <p className="text-sm text-red-500">{errors.socialLinks.twitter}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Profile"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}