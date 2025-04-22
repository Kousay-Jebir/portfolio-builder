import {
    IsString,
    IsArray,
    IsOptional,
    IsUrl,
    IsDateString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class ProjectDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsArray()
    @IsString({ each: true })
    tech_stack: string[];
  
    @IsUrl()
    link: string;
  }
  
  class ExperienceDto {
    @IsString()
    company: string;
  
    @IsString()
    position: string;
  
    @IsString()
    location: string;
  
    @IsDateString()
    start_date: string;
  
    @IsDateString()
    end_date: string;
  
    @IsString()
    description: string;
  }
  
  class EducationDto {
    @IsString()
    institution: string;
  
    @IsString()
    degree: string;
  
    @IsString()
    field_of_study: string;
  
    @IsDateString()
    start_date: string;
  
    @IsDateString()
    end_date: string;
  
    @IsString()
    grade: string;
  }
  
  class CertificationDto {
    @IsString()
    name: string;
  
    @IsString()
    issuer: string;
  
    @IsDateString()
    date: string;
  
    @IsUrl()
    link: string;
  }
  
  class SocialLinksDto {
    @IsUrl()
    github: string;
  
    @IsUrl()
    linkedin: string;
  
    @IsUrl()
    website: string;
  
    @IsArray()
    @IsUrl({}, { each: true })
    other: string[];
  }
  
  class JobTargetDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  }
  
  export class CvDataDto {
    @IsArray()
    @IsString({ each: true })
    skills: string[];
  
    @ValidateNested({ each: true })
    @Type(() => ProjectDto)
    projects: ProjectDto[];
  
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    experience: ExperienceDto[];
  
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    education: EducationDto[];
  
    @ValidateNested({ each: true })
    @Type(() => CertificationDto)
    certifications: CertificationDto[];
  
    @IsArray()
    @IsString({ each: true })
    achievements: string[];
  
    @IsArray()
    @IsString({ each: true })
    interests: string[];
  
    @ValidateNested()
    @Type(() => SocialLinksDto)
    social_links: SocialLinksDto;
  
    @ValidateNested()
    @Type(() => JobTargetDto)
    job_target: JobTargetDto;
  }
  