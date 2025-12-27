/**
 * MOCK DB - Student Certificates
 * Certificates earned by students
 */

export interface StudentCertificate {
    id: number;
    user_id: number;
    courseTitle: string;
    courseThumbnail: string;
    certificateCode: string;
    issuedDate: string;
    instructor: string;
    category: string;
    certificateUrl: string;
    verificationUrl: string;
}

export const STUDENT_CERTIFICATES: StudentCertificate[] = [
    {
        id: 1,
        user_id: 7,
        courseTitle: 'Complete Web Development Bootcamp 2024',
        courseThumbnail: 'https://picsum.photos/seed/cert1/400/250',
        certificateCode: 'CERT-WD-2024-001',
        issuedDate: '2024-12-01',
        instructor: 'Dr. Angela Yu',
        category: 'Web Development',
        certificateUrl: '/certificates/cert-wd-001.pdf',
        verificationUrl: 'https://milearn.com/verify/CERT-WD-2024-001',
    },
    {
        id: 2,
        user_id: 7,
        courseTitle: 'React - The Complete Guide',
        courseThumbnail: 'https://picsum.photos/seed/cert2/400/250',
        certificateCode: 'CERT-REACT-2024-042',
        issuedDate: '2024-11-15',
        instructor: 'Maximilian Schwarzmüller',
        category: 'Frontend Development',
        certificateUrl: '/certificates/cert-react-042.pdf',
        verificationUrl: 'https://milearn.com/verify/CERT-REACT-2024-042',
    },
    {
        id: 3,
        user_id: 7,
        courseTitle: 'Python for Data Science',
        courseThumbnail: 'https://picsum.photos/seed/cert3/400/250',
        certificateCode: 'CERT-PY-2024-128',
        issuedDate: '2024-10-20',
        instructor: 'Jose Portilla',
        category: 'Data Science',
        certificateUrl: '/certificates/cert-py-128.pdf',
        verificationUrl: 'https://milearn.com/verify/CERT-PY-2024-128',
    },
    {
        id: 4,
        user_id: 7,
        courseTitle: 'UI/UX Design Masterclass',
        courseThumbnail: 'https://picsum.photos/seed/cert4/400/250',
        certificateCode: 'CERT-UX-2024-089',
        issuedDate: '2024-09-10',
        instructor: 'Daniel Schifano',
        category: 'Design',
        certificateUrl: '/certificates/cert-ux-089.pdf',
        verificationUrl: 'https://milearn.com/verify/CERT-UX-2024-089',
    },
    {
        id: 5,
        user_id: 8,
        courseTitle: 'NodeJS Backend Development',
        courseThumbnail: 'https://picsum.photos/seed/cert5/400/250',
        certificateCode: 'CERT-NODE-2024-015',
        issuedDate: '2024-11-28',
        instructor: 'Andrew Mead',
        category: 'Backend Development',
        certificateUrl: '/certificates/cert-node-015.pdf',
        verificationUrl: 'https://milearn.com/verify/CERT-NODE-2024-015',
    },
];

// Helper to get certificates by user
export const getCertificatesByUser = (userId: number): StudentCertificate[] => {
    return STUDENT_CERTIFICATES.filter(c => c.user_id === userId);
};
