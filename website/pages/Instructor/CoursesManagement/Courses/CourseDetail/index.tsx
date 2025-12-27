import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCourse, useCurriculum } from '../../../../../hooks/useApi';
import { TabType, CourseState, API_BASE_URL } from './types';
import { CourseHeader } from './CourseHeader';
import { CourseAlerts } from './CourseAlerts';
import { TabNavigation } from './TabNavigation';
import { OverviewTab } from './OverviewTab';
import { CurriculumTab } from './CurriculumTab';
import { StudentsTab } from './StudentsTab';
import { ReviewsTab } from './ReviewsTab';
import { RevenueTab } from './RevenueTab';

const CourseOverviewPage: React.FC = () => {
    const { courseId } = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    // Tab state
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [expandedSections, setExpandedSections] = useState<number[]>([]);

    // Stats data state
    const [enrollmentsData, setEnrollmentsData] = useState<any[]>([]);
    const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
    const [enrollmentsError, setEnrollmentsError] = useState<string | null>(null);

    const [reviewsData, setReviewsData] = useState<any[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState<string | null>(null);

    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [revenueLoading, setRevenueLoading] = useState(false);
    const [revenueError, setRevenueError] = useState<string | null>(null);

    const { data: courseData, loading, error, refetch } = useCourse(Number(courseId));
    const { data: curriculumData, loading: curriculumLoading, error: curriculumError, refetch: refetchCurriculum } = useCurriculum(courseId!);

    // Local state for editing
    const [course, setCourse] = useState<CourseState>({
        title: '',
        short_description: '',
        description: '',
        category_id: null,
        level: 'ALL_LEVELS',
        price: 0,
        discount_price: 0,
        thumbnail: '',
        what_you_will_learn: [],
        requirements: [],
        target_audience: [],
    });

    // Fetch functions
    const fetchEnrollments = async () => {
        setEnrollmentsLoading(true);
        setEnrollmentsError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/course-enrollments/course/${courseId}`);
            if (response.ok) {
                const data = await response.json();
                setEnrollmentsData(Array.isArray(data) ? data : (data.data || []));
            } else {
                setEnrollmentsError('Không thể tải dữ liệu học viên');
            }
        } catch (err) {
            setEnrollmentsError('Lỗi kết nối server');
        } finally {
            setEnrollmentsLoading(false);
        }
    };

    const fetchReviews = async () => {
        setReviewsLoading(true);
        setReviewsError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/course-reviews/course/${courseId}`);
            if (response.ok) {
                const data = await response.json();
                setReviewsData(Array.isArray(data) ? data : (data.data || []));
            } else {
                setReviewsError('Không thể tải dữ liệu đánh giá');
            }
        } catch (err) {
            setReviewsError('Lỗi kết nối server');
        } finally {
            setReviewsLoading(false);
        }
    };

    const fetchRevenue = async () => {
        setRevenueLoading(true);
        setRevenueError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/transactions/course/${courseId}`);
            if (response.ok) {
                const data = await response.json();
                setRevenueData(Array.isArray(data) ? data : (data.data || []));
            } else {
                setRevenueError('Không thể tải dữ liệu doanh thu');
            }
        } catch (err) {
            setRevenueError('Lỗi kết nối server');
        } finally {
            setRevenueLoading(false);
        }
    };

    // Fetch data when tab changes
    useEffect(() => {
        if (activeTab === 'students' && enrollmentsData.length === 0 && !enrollmentsLoading) {
            fetchEnrollments();
        } else if (activeTab === 'reviews' && reviewsData.length === 0 && !reviewsLoading) {
            fetchReviews();
        } else if (activeTab === 'revenue' && revenueData.length === 0 && !revenueLoading) {
            fetchRevenue();
        }
    }, [activeTab]);

    useEffect(() => {
        if (courseData) {
            setCourse({
                ...courseData,
                thumbnail: courseData.thumbnail_url,
                what_you_will_learn: Array.isArray(courseData.what_you_will_learn) ? courseData.what_you_will_learn : [],
                requirements: Array.isArray(courseData.requirements) ? courseData.requirements : [],
                target_audience: Array.isArray(courseData.target_audience) ? courseData.target_audience : [],
            });

            if (!thumbnailFile && courseData.thumbnail_url) {
                setThumbnailPreview(courseData.thumbnail_url);
            }
        }
    }, [courseData, thumbnailFile]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            let thumbnailUrl = course.thumbnail;

            if (thumbnailFile) {
                setIsUploadingThumbnail(true);
                try {
                    const formData = new FormData();
                    formData.append('file', thumbnailFile);

                    const uploadResponse = await fetch(`${API_BASE_URL}/api/upload/thumbnail`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (uploadResponse.ok) {
                        const uploadData = await uploadResponse.json();
                        thumbnailUrl = uploadData.file?.url || uploadData.url;
                        toast.success('Đã tải ảnh lên thành công!');
                    } else {
                        toast.error('Không thể tải ảnh lên');
                        setIsSaving(false);
                        setIsUploadingThumbnail(false);
                        return;
                    }
                } catch (uploadError) {
                    console.error('Upload error:', uploadError);
                    toast.error('Có lỗi xảy ra khi tải ảnh');
                    setIsSaving(false);
                    setIsUploadingThumbnail(false);
                    return;
                } finally {
                    setIsUploadingThumbnail(false);
                }
            }

            const savePayload = {
                id: Number(courseId),
                title: course.title,
                short_description: course.short_description,
                description: course.description,
                category_id: course.category_id,
                level: course.level,
                price: Number(course.price) || 0,
                discount_price: Number(course.discount_price) || 0,
                thumbnail: thumbnailUrl,
                what_you_will_learn: course.what_you_will_learn,
                requirements: course.requirements,
                target_audience: course.target_audience,
            };

            const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(savePayload),
            });

            if (response.ok) {
                toast.success('Đã lưu thay đổi!');
                setThumbnailFile(null);
                setCourse({ ...course, thumbnail: thumbnailUrl });

                if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
                    URL.revokeObjectURL(thumbnailPreview);
                }
                setThumbnailPreview(thumbnailUrl);
                refetch();
            } else {
                const errorData = await response.json();
                toast.error(`Không thể lưu thay đổi: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Có lỗi xảy ra');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePreview = () => {
        window.open(`/courses/${courseId}`, '_blank');
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Vui lòng chọn file ảnh');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Kích thước ảnh không được vượt quá 5MB');
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setThumbnailFile(file);
        setThumbnailPreview(previewUrl);
        toast.success('Đã chọn ảnh. Nhấn "Lưu thay đổi" để cập nhật.');
    };

    const handleRemoveThumbnail = () => {
        if (thumbnailPreview && thumbnailPreview.startsWith('blob:')) {
            URL.revokeObjectURL(thumbnailPreview);
        }
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setCourse({ ...course, thumbnail: '' });
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64">�ang t?i...</div>;
    }

    if (error) {
        return <div className="text-red-500">L?i: {error}</div>;
    }

    if (!course) {
        return <div className="text-gray-500">Không tìm thấy khóa học</div>;
    }

    const isDisabled = course.status === 'PENDING';

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <CourseHeader
                course={course}
                courseId={courseId!}
                isSaving={isSaving}
                isDisabled={isDisabled}
                curriculumData={curriculumData}
                onSave={handleSave}
                onPreview={handlePreview}
                onRefetch={refetch}
            />

            <CourseAlerts course={course} />

            <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                curriculumCount={curriculumData?.length || 0}
                enrollmentsCount={enrollmentsData.length}
                reviewsCount={reviewsData.length}
                revenueCount={revenueData.length}
            />

            {activeTab === 'overview' && (
                <OverviewTab
                    course={course}
                    setCourse={setCourse}
                    isDisabled={isDisabled}
                    thumbnailPreview={thumbnailPreview}
                    thumbnailFile={thumbnailFile}
                    onThumbnailChange={handleThumbnailChange}
                    onRemoveThumbnail={handleRemoveThumbnail}
                    courseId={courseId!}
                />
            )}

            {activeTab === 'curriculum' && (
                <CurriculumTab
                    courseId={courseId!}
                    curriculumData={curriculumData}
                    curriculumLoading={curriculumLoading}
                    curriculumError={curriculumError}
                    expandedSections={expandedSections}
                    setExpandedSections={setExpandedSections}
                    refetchCurriculum={refetchCurriculum}
                />
            )}

            {activeTab === 'students' && (
                <StudentsTab
                    courseId={courseId!}
                    enrollmentsData={enrollmentsData}
                    enrollmentsLoading={enrollmentsLoading}
                    enrollmentsError={enrollmentsError}
                    fetchEnrollments={fetchEnrollments}
                />
            )}

            {activeTab === 'reviews' && (
                <ReviewsTab
                    courseId={courseId!}
                    reviewsData={reviewsData}
                    reviewsLoading={reviewsLoading}
                    reviewsError={reviewsError}
                    fetchReviews={fetchReviews}
                />
            )}

            {activeTab === 'revenue' && (
                <RevenueTab
                    courseId={courseId!}
                    revenueData={revenueData}
                    revenueLoading={revenueLoading}
                    revenueError={revenueError}
                    fetchRevenue={fetchRevenue}
                />
            )}
        </div>
    );
};

export default CourseOverviewPage;
