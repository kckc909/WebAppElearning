/**
 * MOCK DB - user_profiles
 * Maps 1:1 to Prisma schema
 */

export interface UserProfile {
    id: number;
    user_id: number;
    bio: string | null;
    phone: string | null;
    gender: number | null;
    dob: string | null;
    job_title: string | null;
    social_links: Record<string, string> | null;
    country: string | null;
    language: string | null;
}

export const USER_PROFILES: UserProfile[] = [
    { id: 1, user_id: 3, bio: 'Senior Full-stack Developer với 10+ năm kinh nghiệm. Từng làm việc tại FPT, VNG.', phone: '0912345678', gender: 1, dob: '1990-05-15', job_title: 'Senior Developer', social_links: { linkedin: 'https://linkedin.com/in/hungtran', github: 'https://github.com/hungtran' }, country: 'Vietnam', language: 'vi' },
    { id: 2, user_id: 4, bio: 'IELTS 9.0, giảng viên tiếng Anh với 8 năm kinh nghiệm.', phone: '0912345679', gender: 2, dob: '1992-08-20', job_title: 'English Teacher', social_links: { linkedin: 'https://linkedin.com/in/lannguyen' }, country: 'Vietnam', language: 'vi' },
    { id: 3, user_id: 5, bio: 'UI/UX Designer tại Grab. 6 năm kinh nghiệm thiết kế sản phẩm.', phone: '0912345680', gender: 1, dob: '1994-03-10', job_title: 'UI/UX Designer', social_links: { dribbble: 'https://dribbble.com/ducle' }, country: 'Vietnam', language: 'vi' },
    { id: 4, user_id: 6, bio: 'Data Scientist, AI Engineer tại VinAI. Chuyên gia về Machine Learning.', phone: '0912345681', gender: 1, dob: '1991-11-25', job_title: 'Data Scientist', social_links: { linkedin: 'https://linkedin.com/in/nampham' }, country: 'Vietnam', language: 'vi' },
    { id: 5, user_id: 7, bio: 'Sinh viên CNTT đam mê công nghệ.', phone: '0987654321', gender: 1, dob: '2000-06-12', job_title: 'Student', social_links: {}, country: 'Vietnam', language: 'vi' },
];
