import { useState, useEffect } from 'react';
import axiosInstance from '../API/api';

interface StatsOverview {
  total_hours: number;
  total_courses: number;
  completed_courses: number;
  certificates: number;
  completion_rate: number;
}

interface Streak {
  current_streak: number;
  longest_streak: number;
}

interface Activity {
  date: string;
  minutes: number;
  hours: number;
}

interface CategoryDistribution {
  category: string;
  courses: number;
  hours: number;
  percentage: number;
}

interface WeeklyActivity {
  day: string;
  minutes: number;
  hours: number;
}

interface CourseProgress {
  course_id: number;
  title: string;
  thumbnail: string | null;
  progress: number;
  completed_lessons: number;
  total_lessons: number;
  status: string;
  last_accessed: string | null;
}

// Helper to get userId from sessionStorage
const getUserId = (): number => {
  try {
    const accountStr = sessionStorage.getItem('Account');
    if (accountStr) {
      const account = JSON.parse(accountStr);
      return account.id || 1;
    }
  } catch (e) {
    console.error('Error getting userId:', e);
  }
  return 1; // Default fallback
};

export const useStatsOverview = () => {
  const [data, setData] = useState<StatsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await axiosInstance.get(`/api/stats/overview?userId=${userId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStatsStreak = () => {
  const [data, setData] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await axiosInstance.get(`/api/stats/streak?userId=${userId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStatsActivity = (period: 'week' | 'month' | 'year' = 'month') => {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await axiosInstance.get(`/api/stats/activity?period=${period}&userId=${userId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return { data, loading, error };
};

export const useStatsCategoryDistribution = () => {
  const [data, setData] = useState<CategoryDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await axiosInstance.get(`/api/stats/category-distribution?userId=${userId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStatsWeeklyActivity = () => {
  const [data, setData] = useState<WeeklyActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await axiosInstance.get(`/api/stats/weekly-activity?userId=${userId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStatsCourseProgress = () => {
  const [data, setData] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const response = await axiosInstance.get(`/api/stats/course-progress?userId=${userId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
