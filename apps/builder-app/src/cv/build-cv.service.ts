import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BlacklistGuard, CvService, JwtAuthGuard, PortfolioService } from '@portfolio-builder/shared';
import axios from 'axios';
import { CvDataDto } from '../dto/cv-data.dto';
import { CreateCvDto } from '../dto/create-cv.dto';

@Injectable()
export class BuildCvService {
   constructor(
      private readonly portfolioService: PortfolioService,
      private readonly cvService : CvService
    ){}
    async getQuestions(portfolioId:string,userId:string){
        const portfolio = await this.portfolioService.findById(portfolioId);
    if (!portfolio) {
      return new NotFoundException('portfolio not found');
    }
    try {
      const result = await axios.post(`${process.env.AI_API}`, {
        portfolio: portfolio.content,
        userId: userId,
      });
      const questions = await this.generateQuestions(result.data)

      return questions
    } catch (err) {
      throw new Error(err);
    }

    }
    async sendResponse(cvDataDto:CvDataDto,userId:string){
        axios.post(`${process.env.AI_API}`,{...cvDataDto,userId}).then((res)=>{return res.data}).catch((err)=>{return new Error(err.meesage)})


    
    }
    async createCv(createCvDto : CreateCvDto,userId:string){
        return await this.cvService.create({title:createCvDto.title,path:createCvDto.path,user:userId})

    }



    async generateQuestions(sections : any[]){
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

}
