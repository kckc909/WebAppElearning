import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCourses, useCategories, useMyEnrollments } from '../../../hooks/useApi';
import CourseCard from '../../../components/CourseCard';
import { Loader2, BookOpen, Search, Filter, X, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { ErrorState, EmptyState } from '../../../components/DataStates';

// Level enum matching database
type LevelType = 'ALL_LEVELS' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const COURSES_PER_PAGE = 9;

const FilterCheckbox: React.FC<{
    label: string;
    id: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    count?: number;
}> = ({
    label,
    id,
    checked = false,
    onChange,
    count
}) => (
        <div className="flex items-center justify-between group">
            <div className="flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange?.(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
                />
                <label htmlFor={id} className="ml-3 text-sm text-slate-600 cursor-pointer group-hover:text-primary transition-colors">
                    {label}
                </label>
            </div>
            {count !== undefined && (
                <span className="text-xs text-slate-400">({count})</span>
            )}
        </div>
    );

const CoursesPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // State
    const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<LevelType[]>([]);
    const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Get current user from localStorage
    const getCurrentUser = (): { id: number } | null => {
        try {
            const accountData = sessionStorage.getItem('Account');
            if (accountData) {
                return JSON.parse(accountData);
            }
        } catch {
            return null;
        }
        return null;
    };

    const currentUser = getCurrentUser();
    const isLoggedIn = !!currentUser?.id;

    // API calls
    const { data: courses, loading, error, refetch } = useCourses({
        search: searchParams.get('search') || undefined
    });
    const { data: categories } = useCategories();

    // Fetch enrollments for logged-in user
    const { data: enrollments, loading: enrollmentsLoading } = useMyEnrollments(currentUser?.id || 0);

    // Create enrollment map for quick lookup
    const enrollmentMap = useMemo(() => {
        const map = new Map<number, {
            isEnrolled: boolean;
            progress: number;
            isCompleted: boolean;
            nextLessonId: number | null;
            certificateCode: string | null;
        }>();

        if (isLoggedIn && Array.isArray(enrollments)) {
            enrollments.forEach((enrollment: any) => {
                const courseId = enrollment.course_id || enrollment.course?.id;
                if (courseId) {
                    map.set(courseId, {
                        isEnrolled: true,
                        progress: enrollment.progress || 0,
                        isCompleted: enrollment.status === 'completed' || enrollment.progress >= 100,
                        nextLessonId: enrollment.next_lesson_id || null,
                        certificateCode: enrollment.certificate_code || null
                    });
                }
            });
        }

        return map;
    }, [enrollments, isLoggedIn]);

    // Filter courses
    const filteredCourses = useMemo(() => {
        if (!Array.isArray(courses)) return [];

        return courses.filter((course: any) => {
            // Category filter
            if (selectedCategories.length > 0) {
                const courseCategory = course.category_id || course.course_categories?.id;
                if (!selectedCategories.includes(courseCategory)) return false;
            }

            // Level filter - match string enum values
            if (selectedLevels.length > 0) {
                const courseLevel = course.level?.toUpperCase?.() || course.level;
                // Also match ALL_LEVELS courses if any specific level is selected
                if (!selectedLevels.includes(courseLevel) && courseLevel !== 'ALL_LEVELS') return false;
            }

            // Price filter
            const effectivePrice = course.discount_price ?? course.price ?? 0;
            if (priceFilter === 'free' && effectivePrice > 0) return false;
            if (priceFilter === 'paid' && effectivePrice == 0) return false;

            return true;
        });
    }, [courses, selectedCategories, selectedLevels, priceFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
    const paginatedCourses = useMemo(() => {
        const start = (currentPage - 1) * COURSES_PER_PAGE;
        return filteredCourses.slice(start, start + COURSES_PER_PAGE);
    }, [filteredCourses, currentPage]);

    // Reset to page 1 when filters change
    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    // Search handler
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchParams({ search: searchInput.trim() });
        } else {
            setSearchParams({});
        }
        handleFilterChange();
    };

    // Handle price filter change - acts like radio buttons
    const handlePriceFilter = (newFilter: 'all' | 'free' | 'paid') => {
        setPriceFilter(newFilter);
        handleFilterChange();
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedLevels([]);
        setPriceFilter('all');
        setSearchInput('');
        setSearchParams({});
        handleFilterChange();
    };

    // Category toggle
    const toggleCategory = (categoryId: number) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
        handleFilterChange();
    };

    // Level toggle - using string enum values
    const toggleLevel = (level: LevelType) => {
        setSelectedLevels(prev =>
            prev.includes(level)
                ? prev.filter(l => l !== level)
                : [...prev, level]
        );
        handleFilterChange();
    };

    // Count courses by category
    const getCategoryCount = (categoryId: number) => {
        if (!Array.isArray(courses)) return 0;
        return courses.filter((c: any) =>
            (c.category_id || c.course_categories?.id) === categoryId
        ).length;
    };

    // Count courses by level - using string enum
    const getLevelCount = (level: LevelType) => {
        if (!Array.isArray(courses)) return 0;
        return courses.filter((c: any) => {
            const courseLevel = c.level?.toUpperCase?.() || c.level;
            return courseLevel === level || courseLevel === 'ALL_LEVELS';
        }).length;
    };

    // Count free/paid courses
    const getFreeCount = () => {
        if (!Array.isArray(courses)) return 0;
        return courses.filter((c: any) => (c.discount_price ?? c.price ?? 0) === 0).length;
    };

    const getPaidCount = () => {
        if (!Array.isArray(courses)) return 0;
        return courses.filter((c: any) => (c.discount_price ?? c.price ?? 0) > 0).length;
    };

    const hasActiveFilters = selectedCategories.length > 0 || selectedLevels.length > 0 || priceFilter !== 'all' || searchParams.get('search');

    // Sidebar filters component
    const FiltersContent = () => (
        <div className="space-y-6">
            {/* Categories */}
            <div>
                <h3 className="text-lg font-semibold text-secondary mb-4 pb-2 border-b border-slate-200">Danh mục</h3>
                <div className="space-y-3">
                    {Array.isArray(categories) && categories.map((cat: any) => (
                        <FilterCheckbox
                            key={cat.id}
                            id={`cat-${cat.id}`}
                            label={cat.name}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            count={getCategoryCount(cat.id)}
                        />
                    ))}
                    {(!categories || categories.length === 0) && (
                        <p className="text-sm text-slate-400">Không có danh mục</p>
                    )}
                </div>
            </div>

            {/* Levels */}
            <div>
                <h3 className="text-lg font-semibold text-secondary mb-4 pb-2 border-b border-slate-200">Trình độ</h3>
                <div className="space-y-3">
                    <FilterCheckbox
                        id="level-beginner"
                        label="Cơ bản"
                        checked={selectedLevels.includes('BEGINNER')}
                        onChange={() => toggleLevel('BEGINNER')}
                        count={getLevelCount('BEGINNER')}
                    />
                    <FilterCheckbox
                        id="level-intermediate"
                        label="Trung cấp"
                        checked={selectedLevels.includes('INTERMEDIATE')}
                        onChange={() => toggleLevel('INTERMEDIATE')}
                        count={getLevelCount('INTERMEDIATE')}
                    />
                    <FilterCheckbox
                        id="level-advanced"
                        label="Nâng cao"
                        checked={selectedLevels.includes('ADVANCED')}
                        onChange={() => toggleLevel('ADVANCED')}
                        count={getLevelCount('ADVANCED')}
                    />
                </div>
            </div>

            {/* Price - acts like radio buttons */}
            <div>
                <h3 className="text-lg font-semibold text-secondary mb-4 pb-2 border-b border-slate-200">Mức giá</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center">
                            <input
                                id="price-all"
                                type="radio"
                                name="priceFilter"
                                checked={priceFilter === 'all'}
                                onChange={() => handlePriceFilter('all')}
                                className="h-4 w-4 border-slate-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <label htmlFor="price-all" className="ml-3 text-sm text-slate-600 cursor-pointer group-hover:text-primary transition-colors">
                                Tất cả
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center">
                            <input
                                id="price-free"
                                type="radio"
                                name="priceFilter"
                                checked={priceFilter === 'free'}
                                onChange={() => handlePriceFilter('free')}
                                className="h-4 w-4 border-slate-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <label htmlFor="price-free" className="ml-3 text-sm text-slate-600 cursor-pointer group-hover:text-primary transition-colors">
                                Miễn phí
                            </label>
                        </div>
                        <span className="text-xs text-slate-400">({getFreeCount()})</span>
                    </div>
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center">
                            <input
                                id="price-paid"
                                type="radio"
                                name="priceFilter"
                                checked={priceFilter === 'paid'}
                                onChange={() => handlePriceFilter('paid')}
                                className="h-4 w-4 border-slate-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <label htmlFor="price-paid" className="ml-3 text-sm text-slate-600 cursor-pointer group-hover:text-primary transition-colors">
                                Trả phí
                            </label>
                        </div>
                        <span className="text-xs text-slate-400">({getPaidCount()})</span>
                    </div>
                </div>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="w-full py-2 px-4 text-sm text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                >
                    <X className="w-4 h-4" />
                    Xóa bộ lọc
                </button>
            )}
        </div>
    );

    return (
        <>
            {/* Hero Banner with Background */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-indigo-700 py-16 lg:py-20">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Floating Shapes */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                            <GraduationCap className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl lg:text-5xl font-extrabold text-white text-center mb-4">
                        Khám phá các khóa học
                    </h1>
                    <p className="text-lg lg:text-xl text-white/80 text-center max-w-2xl mx-auto mb-8">
                        Tìm kiếm khóa học phù hợp nhất với mục tiêu của bạn.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex justify-center">
                        <div className="relative w-full max-w-2xl">
                            <input
                                type="search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Tìm kiếm khóa học, giảng viên..."
                                className="w-full rounded-full border-0 py-4 pl-6 pr-14 text-base shadow-xl focus:ring-4 focus:ring-white/30 bg-white/95 backdrop-blur-sm placeholder:text-slate-400 text-slate-700"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-full hover:bg-primary-hover transition-all shadow-lg hover:scale-105"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Active search indicator */}
                    {searchParams.get('search') && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            <span className="text-white/80">Kết quả cho:</span>
                            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium flex items-center gap-2 border border-white/30">
                                "{searchParams.get('search')}"
                                <button
                                    onClick={() => { setSearchInput(''); setSearchParams({}); }}
                                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        </div>
                    )}
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 lg:py-12">

                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm"
                >
                    <Filter className="w-4 h-4" />
                    Bộ lọc
                    {hasActiveFilters && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                    )}
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <FiltersContent />
                        </div>
                    </aside>

                    {/* Mobile Sidebar Overlay */}
                    {showMobileFilter && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
                            <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-secondary">Bộ lọc</h2>
                                    <button onClick={() => setShowMobileFilter(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <FiltersContent />
                            </div>
                        </div>
                    )}

                    {/* Course Grid */}
                    <main className="lg:w-3/4">
                        {/* Results count */}
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-slate-600">
                                {loading ? 'Đang tải...' : `${filteredCourses.length} khóa học`}
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <span className="ml-3 text-slate-500">Đang tải khóa học...</span>
                            </div>
                        ) : error ? (
                            <ErrorState error={error} onRetry={refetch} />
                        ) : paginatedCourses.length === 0 ? (
                            <EmptyState
                                title={hasActiveFilters ? "Không tìm thấy khóa học" : "Chưa có khóa học nào"}
                                message={hasActiveFilters
                                    ? "Thử thay đổi bộ lọc để xem thêm khóa học."
                                    : "Hiện tại chưa có khóa học nào trong hệ thống. Vui lòng quay lại sau."
                                }
                                icon={<BookOpen className="w-12 h-12 text-slate-300" />}
                                action={hasActiveFilters ? (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                                    >
                                        Xóa bộ lọc
                                    </button>
                                ) : undefined}
                            />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {paginatedCourses.map((course: any) => {
                                        const enrollment = enrollmentMap.get(course.id);
                                        return (
                                            <CourseCard
                                                key={course.id}
                                                course={course}
                                                enrollment={enrollment || null}
                                                currentUserId={currentUser?.id}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <nav className="mt-10 flex items-center justify-center">
                                        <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm border border-slate-200 p-1">
                                            {/* Previous */}
                                            <button
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="p-2 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>

                                            {/* Page numbers */}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                                .filter(page => {
                                                    // Show first, last, current, and adjacent pages
                                                    if (page === 1 || page === totalPages) return true;
                                                    if (Math.abs(page - currentPage) <= 1) return true;
                                                    return false;
                                                })
                                                .map((page, index, array) => (
                                                    <React.Fragment key={page}>
                                                        {/* Ellipsis */}
                                                        {index > 0 && array[index - 1] !== page - 1 && (
                                                            <span className="px-2 text-slate-400">...</span>
                                                        )}
                                                        <button
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`px-4 py-2 rounded-md font-medium transition-colors ${currentPage === page
                                                                ? 'bg-primary text-white'
                                                                : 'text-slate-600 hover:bg-slate-100'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    </React.Fragment>
                                                ))
                                            }

                                            {/* Next */}
                                            <button
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="p-2 rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </nav>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </>
    )
}

export default CoursesPage;
