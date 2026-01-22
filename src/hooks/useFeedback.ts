import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface FeedbackRating {
  id: string;
  user_id: string | null;
  platform_id: string;
  rating: number;
  feedback_text: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface FeatureRequest {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  votes: number;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export function useFeedback() {
  const { user } = useAuth();
  const [feedbackRatings, setFeedbackRatings] = useState<FeedbackRating[]>([]);
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all feedback ratings
  const fetchFeedbackRatings = async () => {
    const { data, error } = await supabase
      .from('feedback_ratings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback:', error);
    } else {
      setFeedbackRatings(data || []);
    }
  };

  // Fetch all feature requests
  const fetchFeatureRequests = async () => {
    const { data, error } = await supabase
      .from('feature_requests')
      .select('*')
      .order('votes', { ascending: false });

    if (error) {
      console.error('Error fetching feature requests:', error);
    } else {
      setFeatureRequests((data || []) as FeatureRequest[]);
    }
  };

  // Submit a new feedback rating
  const submitFeedback = async (
    platformId: string,
    rating: number,
    feedbackText?: string,
    category?: string
  ) => {
    if (!user) {
      toast.error('Please log in to submit feedback');
      return null;
    }

    const { data, error } = await supabase
      .from('feedback_ratings')
      .insert({
        user_id: user.id,
        platform_id: platformId,
        rating,
        feedback_text: feedbackText || null,
        category: category || 'general'
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
      return null;
    }

    toast.success('Thank you for your feedback!');
    return data;
  };

  // Submit a new feature request
  const submitFeatureRequest = async (
    title: string,
    description?: string,
    priority?: 'low' | 'medium' | 'high' | 'critical',
    category?: string
  ) => {
    if (!user) {
      toast.error('Please log in to submit a feature request');
      return null;
    }

    const { data, error } = await supabase
      .from('feature_requests')
      .insert({
        user_id: user.id,
        title,
        description: description || null,
        priority: priority || 'medium',
        category: category || 'enhancement'
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting feature request:', error);
      toast.error('Failed to submit feature request');
      return null;
    }

    toast.success('Feature request submitted!');
    return data;
  };

  // Vote for a feature request
  const voteForFeature = async (featureId: string) => {
    const feature = featureRequests.find(f => f.id === featureId);
    if (!feature) return;

    const { error } = await supabase
      .from('feature_requests')
      .update({ votes: feature.votes + 1 })
      .eq('id', featureId);

    if (error) {
      console.error('Error voting:', error);
      toast.error('Failed to vote');
    } else {
      toast.success('Vote recorded!');
    }
  };

  // Set up realtime subscriptions
  useEffect(() => {
    fetchFeedbackRatings();
    fetchFeatureRequests();
    setLoading(false);

    // Subscribe to feedback_ratings changes
    const feedbackChannel = supabase
      .channel('feedback_ratings_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feedback_ratings' },
        () => {
          fetchFeedbackRatings();
        }
      )
      .subscribe();

    // Subscribe to feature_requests changes
    const featureChannel = supabase
      .channel('feature_requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feature_requests' },
        () => {
          fetchFeatureRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(feedbackChannel);
      supabase.removeChannel(featureChannel);
    };
  }, []);

  // Calculate statistics
  const stats = {
    averageRating: feedbackRatings.length > 0
      ? feedbackRatings.reduce((sum, f) => sum + f.rating, 0) / feedbackRatings.length
      : 0,
    totalFeedback: feedbackRatings.length,
    totalFeatureRequests: featureRequests.length,
    pendingRequests: featureRequests.filter(f => f.status === 'pending').length,
    approvedRequests: featureRequests.filter(f => f.status === 'approved').length,
    completedRequests: featureRequests.filter(f => f.status === 'completed').length,
  };

  return {
    feedbackRatings,
    featureRequests,
    loading,
    stats,
    submitFeedback,
    submitFeatureRequest,
    voteForFeature,
    refetch: () => {
      fetchFeedbackRatings();
      fetchFeatureRequests();
    }
  };
}
