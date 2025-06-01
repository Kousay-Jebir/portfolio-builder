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
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tech_stack?: string[];
  
    @IsOptional()
    @IsUrl()
    link?: string;
  }
  
  class ExperienceDto {
    @IsOptional()
    @IsString()
    company?: string;
  
    @IsOptional()
    @IsString()
    position?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsDateString()
    start_date?: string;
  
    @IsOptional()
    @IsDateString()
    end_date?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  }
  
  class EducationDto {
    @IsOptional()
    @IsString()
    institution?: string;
  
    @IsOptional()
    @IsString()
    degree?: string;
  
    @IsOptional()
    @IsString()
    field_of_study?: string;
  
    @IsOptional()
    @IsDateString()
    start_date?: string;
  
    @IsOptional()
    @IsDateString()
    end_date?: string;
  
    @IsOptional()
    @IsString()
    grade?: string;
  }
  
  class CertificationDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    issuer?: string;
  
    @IsOptional()
    @IsDateString()
    date?: string;
  
    @IsOptional()
    @IsUrl()
    link?: string;
  }
  
  class SocialLinksDto {
    @IsOptional()
    @IsUrl()
    github?: string;
  
    @IsOptional()
    @IsUrl()
    linkedin?: string;
  
    @IsOptional()
    @IsUrl()
    website?: string;
  
    @IsOptional()
    @IsArray()
    @IsUrl({}, { each: true })
    other?: string[];
  }
  
  class JobTargetDto {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  }
  
  export class CvDataDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    skills?: string[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProjectDto)
    projects?: ProjectDto[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    experience?: ExperienceDto[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    education?: EducationDto[];
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CertificationDto)
    certifications?: CertificationDto[];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    achievements?: string[];
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interests?: string[];
  
    @IsOptional()
    @ValidateNested()
    @Type(() => SocialLinksDto)
    social_links?: SocialLinksDto;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => JobTargetDto)
    job_target?: JobTargetDto;
  }
  