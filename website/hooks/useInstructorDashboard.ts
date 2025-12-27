/**
 * Instructor Dashboard Hook
 */

import { useState, useEffect } from 'react';
import { coursesApi, classesApi } from '../API';

export function useInstructorDashboard(instructorId: number) {
    const [data, setData] = useState<any>({
        courses: [],
        classes: [],
        stats: {
            totalStudents: 0,
            totalCourses: 0,
            totalClasses: 0,
            totalRevenue: 0
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch instructor's courses
                const coursesResult = await coursesApi.getByInstructor(instructorId);
                
                // Fetch instructor's classes
                const classesResult = await classesApi.getAll({ instructor_id: instructorId });
                
                if (coursesResult.success && classesResult.success) {
                    const courses = coursesResult.data;
                    const classes = classesResult.data;
                    
                    // Calculate stats
                    const totalStudents = classes.reduce((sum: number, c: any) => sum + (c.student_count || 0), 0);
                    const totalRevenue = courses.reduce((sum: number, c: any) => sum + (c.revenue || 0), 0);
                    
                    setData({
                        courses,
                        classes,
                        stats: {
                            totalStudents,
                            totalCourses: courses.length,
                            totalClasses: classes.length,
                            totalRevenue
                        }
                    });
                } else {
                    setError('Failed to fetch dashboard data');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (instructorId) {
            fetchData();
        }
    }, [instructorId]);

    return { data, loading, error };
}
