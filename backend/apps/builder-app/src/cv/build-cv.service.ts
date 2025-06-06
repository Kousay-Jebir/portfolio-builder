import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BlacklistGuard, CvService, JwtAuthGuard, PdfService, PortfolioService } from '@portfolio-builder/shared';
import axios from 'axios';
import { CvDataDto } from '../dto/cv-data.dto';
import { CreateCvDto } from '../dto/create-cv.dto';

@Injectable()
export class BuildCvService {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly cvService: CvService,
    private readonly pdfService: PdfService
  ) { }

  private extractPortfolioText(rawPortfolioContent) {
    const parsed = JSON.parse(rawPortfolioContent);
    const textValues: string[] = [];
    for (const key in parsed) {
      const node = parsed[key];

      if (node && typeof node === 'object' && node.props && typeof node.props === 'object') {
        if ('text' in node.props) {
          textValues.push(node.props.text);
        }
      }
    }
    return textValues
  }

  async getQuestions(portfolioId: string, userId: string) {
    const portfolio = await this.portfolioService.findById(portfolioId);
    console.log(this.extractPortfolioText(portfolio?.content))
    const textContent = this.extractPortfolioText(portfolio?.content)
    if (!portfolio) {
      return new NotFoundException('portfolio not found');
    }
    try {
      // const questions = await axios.post(`${process.env.AI_BASE_URL}/${process.env.AI_QUESTIONS_ENDPOINT}`, {
      //   portfolio: textContent
      //   // userId: userId,
      // });
      const questions = await this.generateQuestions(['skills','projects'])
      // const questions=[]
         return questions
}
     

     catch (err) {
      throw new Error(err);
    }

  }
  async sendResponse(data: any) {
    axios.post(`${process.env.AI_BASE_URL}/${process.env.AI_RESUME_GENERATION}`, { data }).then((res) => { return res.data }).catch((err) => { return new Error(err.meesage) })



  }
  async createCv(createCvDto: CreateCvDto, userId: string) {
    return await this.cvService.create({ title: createCvDto.title, path: createCvDto.path, filename: createCvDto.filename, user: userId })

  }



  async generateQuestions(sections: any[]) {
    const questions = sections.map((section) => {
      switch (section) {
        case "skills":
          return {
            section,
            questions: [
              "What are your skills?",
              "Which tools or technologies are you proficient in?",
            ],
          };

        case "projects":
          return {
            section,
            questions: [
              "What are your projects?",
              "What is the title of the project?",
              "Can you describe the project?",
              "Which technologies did you use?",
              "Is there a link to the project?",
            ],
          };

        case "experience":
          return {
            section,
            questions: [
              "Where have you worked before?",
              "What was your position at the company?",
              "Where was the company located?",
              "What was the start date?",
              "What was the end date?",
              "What did you do in this role?",
            ],
          };

        case "education":
          return {
            section,
            questions: [
              "Where did you study?",
              "What degree did you receive?",
              "What was your field of study?",
              "When did you start your studies?",
              "When did you finish your studies?",
              "What was your final grade?",
            ],
          };

        case "certifications":
          return {
            section,
            questions: [
              "Do you have any certifications?",
              "What is the name of the certification?",
              "Who issued the certification?",
              "When did you receive it?",
              "Is there a link to the certification?",
            ],
          };

        case "achievements":
          return {
            section,
            questions: [
              "What achievements are you proud of?",
            ],
          };

        case "interests":
          return {
            section,
            questions: [
              "What are your interests or hobbies?",
            ],
          };

        case "social_links":
          return {
            section,
            questions: [
              "What is your GitHub profile?",
              "What is your LinkedIn profile?",
              "Do you have a personal website?",
              "Any other social links you'd like to include?",
            ],
          };

        case "job_target":
          return {
            section,
            questions: [
              "What job are you targeting?",
              "Can you describe the type of role you're looking for?",
            ],
          };

        default:
          return {
            section,
            questions: ["No questions available for this section."],
          };
      }
    });

    return questions



  }
  async getCv(userId: string): Promise<String> {
    const cv = await this.cvService.findByOwnerId(userId)
    if (!cv) {
      throw new NotFoundException('cv inexistant')
    }
    return cv.filename
  }

  async generateCv(ownerId: string, portfolioId: string, cvDataDto?: Partial<CvDataDto>) {
    const portfolio = await this.portfolioService.findById(portfolioId)
    const portfolioTextContent= this.extractPortfolioText(portfolio?.content)
    const finalData=cvDataDto? portfolioTextContent+this.extractAnswersWithSections(cvDataDto):portfolioTextContent
    return finalData
    // const result = await this.sendResponse(finalData)
    // const data = {
    //   "user": {
    //     "id": "1",
    //     "full_name": "Jane Doe",
    //     "email": "jane.doe@example.com",
    //     "phone": "+1 555 123 4567",
    //     "location": "San Francisco, CA",
    //     "summary": "A results-driven software engineer with 5+ years of experience in building web applications using modern technologies. Passionate about clean code, agile development, and user-focused design.",
    //     "languages": ["English", "Spanish", "French"]
    //   },
    //   "portfolio": {
    //     "skills": ["JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Docker", "AWS", "GraphQL"],
    //     "projects": [
    //       {
    //         "title": "SmartTask Manager",
    //         "description": "A productivity app that helps teams manage tasks, track time, and collaborate efficiently.",
    //         "tech_stack": ["React", "Node.js", "Express", "MongoDB"],
    //         "link": "https://github.com/janedoe/smart-task-manager"
    //       },
    //       {
    //         "title": "Personal Portfolio",
    //         "description": "A mobile-responsive portfolio showcasing my projects and blogs.",
    //         "tech_stack": ["HTML", "CSS", "JavaScript"],
    //         "link": "https://janedoe.dev"
    //       }
    //     ],
    //     "experience": [
    //       {
    //         "company": "Tech Solutions Inc.",
    //         "position": "Senior Software Engineer",
    //         "location": "Remote",
    //         "start_date": "Jan 2022",
    //         "end_date": "Present",
    //         "description": "Led the front-end team to redesign the main platform UI. Improved performance by 30%."
    //       },
    //       {
    //         "company": "CodeBase",
    //         "position": "Software Developer",
    //         "location": "New York, NY",
    //         "start_date": "Jun 2019",
    //         "end_date": "Dec 2021",
    //         "description": "Developed RESTful APIs and integrated third-party services to support business operations."
    //       }
    //     ],
    //     "education": [
    //       {
    //         "institution": "Stanford University",
    //         "degree": "Bachelor of Science",
    //         "field_of_study": "Computer Science",
    //         "start_date": "2015",
    //         "end_date": "2019",
    //         "grade": "3.9 GPA"
    //       }
    //     ],
    //     "certifications": [
    //       {
    //         "name": "AWS Certified Developer – Associate",
    //         "issuer": "Amazon Web Services",
    //         "date": "March 2022",
    //         "link": "https://aws.amazon.com/certification/certified-developer-associate/"
    //       },
    //       {
    //         "name": "Full-Stack Web Developer",
    //         "issuer": "Udacity",
    //         "date": "June 2020",
    //         "link": "https://confirm.udacity.com/XYZ123"
    //       }
    //     ],
    //     "achievements": [
    //       "Built an internal CI/CD tool saving 10+ developer hours/week",
    //       "Top 5 finalist in Hack the Valley 2021",
    //       "Open source contributor to several npm packages"
    //     ],
    //     "interests": ["Hiking", "Photography", "Open Source", "Travel"],
    //     "social_links": {
    //       "github": "https://github.com/janedoe",
    //       "linkedin": "https://linkedin.com/in/janedoe",
    //       "website": "https://janedoe.dev",
    //       "other": ["https://twitter.com/janedoe"]
    //     }
    //   },
    //   "job_target": {
    //     "title": "Full-Stack Developer",
    //     "description": "Seeking a challenging role in a fast-paced tech company to build scalable web applications."
    //   }
    // }

    // const { filePath, filename } = await this.pdfService.generateResumePdf(data)
    // return this.cvService.create({ title: 'cv', user: ownerId, path: filePath, filename })
  }
  private extractAnswersWithSections(data: any): string {
  return data
    .map(item => {
      const answers = item.answers.flat().join(' ');
      return `${item.section}: ${answers}`;
    })
    .join(' ');
}



}
