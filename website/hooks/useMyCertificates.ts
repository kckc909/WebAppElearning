import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface StudentCertificate {
    id: number;
    user_id: number;
    course_id: number;
    courseTitle: string;
    courseThumbnail: string;
    certificateCode: string;
    issuedDate: string;
    instructor: string;
    category: string;
    certificateUrl: string;
    verificationUrl: string;
}

export const useMyCertificates = (studentId?: number) => {
    const api = getApiInstance();

    return useQuery<StudentCertificate[]>({
        queryKey: ['my-certificates', studentId],
        queryFn: async () => {
            const certificates = await api.certificates.getCertificates({ student_id: studentId });
            return certificates;
        },
    });
};
