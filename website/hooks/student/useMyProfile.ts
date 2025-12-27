import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ProfileData {
    id: number;
    fullName: string;
    email: string;
    username: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    country?: string;
    city?: string;
    bio?: string;
    jobTitle?: string;
    avatarUrl?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    createdAt?: string;
}

export interface ProfileUpdateData {
    fullName?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    country?: string;
    city?: string;
    bio?: string;
    jobTitle?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
}

/**
 * Hook to fetch and manage user profile
 */
export const useMyProfile = (userId: number) => {
    const queryClient = useQueryClient();
    const API_BASE_URL = (import.meta as any).env.VITE_BACK_END_API_PATH || 'http://localhost:4000';

    // Fetch profile
    const { data, isLoading, error, refetch } = useQuery<ProfileData>({
        queryKey: ['my-profile', userId],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/accounts/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();

            // Map backend fields to frontend schema
            return {
                id: data.id,
                fullName: data.full_name || '',
                email: data.email || '',
                username: data.username || '',
                phone: data.phone || '',
                dateOfBirth: data.date_of_birth || '',
                gender: data.gender || 'other',
                country: data.country || '',
                city: data.city || '',
                bio: data.bio || '',
                jobTitle: data.job_title || '',
                avatarUrl: data.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.full_name || 'User')}&size=128&background=2563eb&color=fff`,
                linkedin: data.linkedin || '',
                github: data.github || '',
                twitter: data.twitter || '',
                facebook: data.facebook || '',
                createdAt: data.created_at || ''
            };
        },
        enabled: !!userId,
    });

    // Update profile mutation
    const updateMutation = useMutation({
        mutationFn: async (updates: ProfileUpdateData) => {
            const response = await fetch(`${API_BASE_URL}/accounts/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    full_name: updates.fullName,
                    phone: updates.phone,
                    date_of_birth: updates.dateOfBirth,
                    gender: updates.gender,
                    country: updates.country,
                    city: updates.city,
                    bio: updates.bio,
                    job_title: updates.jobTitle,
                    linkedin: updates.linkedin,
                    github: updates.github,
                    twitter: updates.twitter,
                    facebook: updates.facebook,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            return response.json();
        },
        onSuccess: () => {
            // Invalidate and refetch profile
            queryClient.invalidateQueries({ queryKey: ['my-profile', userId] });
        },
    });

    return {
        profile: data,
        isLoading,
        error,
        refetch,
        updateProfile: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.error,
    };
};
