
import React, { useState } from 'react';
import { COURSES } from '../mockData';
import CourseCard from '../components/CourseCard';
import { IoHomeOutline } from 'react-icons/io5';

const FilterCheckbox: React.FC<{ label: string, id: string, checked?: boolean, onChange?:()=>void }> = ({ label, id, checked, onChange }) => (
    <div className="flex items-center">
        <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
        <label htmlFor={id} className="ml-3 text-sm text-slate-600">{label}</label>
    </div>
);


const CoursesPage: React.FC = () => {
    const [courses, setCourses] = useState(COURSES);

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-secondary">Khám phá các khóa học</h1>
                <p className="mt-2 text-lg text-slate-600">Tìm kiếm khóa học phù hợp nhất với mục tiêu của bạn.</p>
                <div className="mt-6 flex justify-center">
                    <div className="relative w-full max-w-2xl">
                    <input type="search" placeholder="Tìm kiếm khóa học, giảng viên..." className="w-full rounded-full border-slate-300 py-3 pl-5 pr-12 text-base focus:ring-primary focus:border-primary" />
                    <IoHomeOutline name="search-outline" className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400"></IoHomeOutline>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters */}
                <aside className="lg:w-1/4">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Danh mục</h3>
                            <div className="space-y-3">
                                <FilterCheckbox id="cat-digital" label="Kỹ năng số" />
                                <FilterCheckbox id="cat-language" label="Ngoại ngữ ứng dụng" />
                                <FilterCheckbox id="cat-business" label="Kinh doanh & Marketing" />
                                <FilterCheckbox id="cat-design" label="Thiết kế & Sáng tạo" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Trình độ</h3>
                            <div className="space-y-3">
                                <FilterCheckbox id="level-beginner" label="Người mới bắt đầu" />
                                <FilterCheckbox id="level-intermediate" label="Trung cấp" />
                                <FilterCheckbox id="level-advanced" label="Nâng cao" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Mức giá</h3>
                            <div className="space-y-3">
                                <FilterCheckbox id="price-paid" label="Trả phí" />
                                <FilterCheckbox id="price-free" label="Miễn phí" />
                            </div>
                        </div>
                    </div>
                </aside>
                
                {/* Course Grid */}
                <main className="lg:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                    {/* Pagination */}
                    <nav className="mt-12 flex items-center justify-center space-x-2">
                        <a href="#" className="px-4 py-2 rounded-md text-slate-600 bg-white hover:bg-slate-100">&laquo;</a>
                        <a href="#" className="px-4 py-2 rounded-md text-white bg-primary">1</a>
                        <a href="#" className="px-4 py-2 rounded-md text-slate-600 bg-white hover:bg-slate-100">2</a>
                        <a href="#" className="px-4 py-2 rounded-md text-slate-600 bg-white hover:bg-slate-100">3</a>
                        <span className="px-4 py-2 text-slate-600">...</span>
                        <a href="#" className="px-4 py-2 rounded-md text-slate-600 bg-white hover:bg-slate-100">10</a>
                        <a href="#" className="px-4 py-2 rounded-md text-slate-600 bg-white hover:bg-slate-100">&raquo;</a>
                    </nav>
                </main>
            </div>
        </div>
    )
}

export default CoursesPage;
