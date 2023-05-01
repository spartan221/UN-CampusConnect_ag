export const tutorprofileTypeDef = `
    type Tutor {
        user_id: ID,
        name: String,
        last_name: String,
        birth_place: String,
        birthdate: String,
        address: String,
        email: String,
        phone: String,
        description: String,
        photo: String,
        skills: [Skill],
        languages: [Language],
        tutor_languages: [TutorLanguage],
        jobs: [Job],
        tutor_jobs: [TutorJob],
        schools: [School],
        tutor_schools: [TutorSchool]
    }
    type Skill {
        id: ID,
        name: String
    }
    input SkillInput {
        name: String
    }
    type Language {
        id: ID,
        name: String,
    }
    type TutorLanguage {,
        language_id: ID,
        level: String
    }
    input LanguageAttribute {
        name: String,
        level: String
    }
    type Job { 
        id: ID,
        name: String,
    }
    type TutorJob {
        job_id: ID,
        position: String,
        start_year: String,
        end_year: String
    }
    input JobAttribute {
        name: String,
        position: String,
        start_year: String,
        end_year: String
    }
    type School {
        id: ID,
        name: String,
    }
    type TutorSchool {
        school_id: ID,
        start_year: String,
        end_year: String,
        title: String
    }
    input SchoolAttribute {
        name: String,
        start_year: String,
        end_year: String,
        title: String
    }
    input TutorInput {
        name: String,
        last_name: String,
        birth_place: String,
        birthdate: String,
        address: String,
        email: String,
        phone: String,
        description: String,
        photo: String,
        skills_attributes: [SkillInput!],
        languages_attributes: [LanguageAttribute!],
        schools_attributes: [SchoolAttribute!],
        jobs_attributes: [JobAttribute!]
    }
    type TutorProfile {
        tutor: Tutor
    }
    input TutorProfileInput {
        tutor: TutorInput
    }
    type TutorProfileDeleteResponse {
        message: String!
    }
`;

export const tutorprofileQueries = `
    getTutorProfile(id: String!): Tutor,
    getTutorProfiles: [Tutor],
`;

export const tutorprofileMutations = `
    createTutorProfile(tutor: TutorProfileInput!): Tutor,
    updateTutorProfile(id: String!, tutor: TutorProfileInput!): Tutor,
    deleteTutorProfile(id: String!): TutorProfileDeleteResponse,
`;