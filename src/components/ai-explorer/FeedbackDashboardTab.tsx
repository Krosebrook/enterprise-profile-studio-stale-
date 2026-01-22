import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, MessageSquare, Lightbulb, TrendingUp, ThumbsUp, Send, ArrowUp } from 'lucide-react';
import { useFeedback } from '@/hooks/useFeedback';
import { useAuth } from '@/contexts/AuthContext';

export function FeedbackDashboardTab() {
  const { user } = useAuth();
  const { 
    feedbackRatings, 
    featureRequests, 
    stats, 
    loading,
    submitFeedback, 
    submitFeatureRequest, 
    voteForFeature 
  } = useFeedback();

  const [newFeedback, setNewFeedback] = useState({ 
    rating: 0, 
    comment: '', 
    platformId: 'general' 
  });
  const [newFeatureRequest, setNewFeatureRequest] = useState({
    title: '',
    description: '',
    priority: 'medium' as const
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: feedbackRatings.filter(f => f.rating === rating).length,
    percentage: feedbackRatings.length > 0 
      ? (feedbackRatings.filter(f => f.rating === rating).length / feedbackRatings.length) * 100 
      : 0
  }));

  const handleSubmitFeedback = async () => {
    if (newFeedback.rating === 0) return;
    await submitFeedback(
      newFeedback.platformId, 
      newFeedback.rating, 
      newFeedback.comment || undefined
    );
    setNewFeedback({ rating: 0, comment: '', platformId: 'general' });
  };

  const handleSubmitFeatureRequest = async () => {
    if (!newFeatureRequest.title.trim()) return;
    await submitFeatureRequest(
      newFeatureRequest.title,
      newFeatureRequest.description || undefined,
      newFeatureRequest.priority
    );
    setNewFeatureRequest({ title: '', description: '', priority: 'medium' });
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(stats.averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
                <p className="text-3xl font-bold">{stats.totalFeedback}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">All time responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Feature Requests</p>
                <p className="text-3xl font-bold">{stats.totalFeatureRequests}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.pendingRequests} pending, {stats.completedRequests} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold">{stats.approvedRequests}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">In development queue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  </div>
                  <span className="text-muted-foreground">{count} responses ({percentage.toFixed(0)}%)</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Feature Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-500" />
              Top Feature Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {featureRequests.length > 0 ? (
                featureRequests.slice(0, 5).map((request, index) => (
                  <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <div>
                        <span className="font-medium">{request.title}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{request.status}</Badge>
                          <Badge variant="outline" className="text-xs">{request.priority}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1"
                      onClick={() => voteForFeature(request.id)}
                    >
                      <ArrowUp className="h-4 w-4" />
                      {request.votes}
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-6">No feature requests yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Recent Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackRatings.length > 0 ? (
                feedbackRatings.slice(0, 5).map((feedback) => (
                  <div key={feedback.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(feedback.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {feedback.feedback_text && (
                      <p className="text-sm">{feedback.feedback_text}</p>
                    )}
                    <Badge variant="outline" className="text-xs mt-2">{feedback.platform_id}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-6">No feedback yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Feedback & Feature Request */}
        <div className="space-y-6">
          {/* Submit Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-green-500" />
                Submit Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Your Rating</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-8 w-8 ${star <= newFeedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted hover:text-yellow-400'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Comments (optional)</p>
                <Textarea
                  placeholder="Share your experience..."
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                  rows={2}
                />
              </div>
              <Button 
                className="w-full gap-2" 
                onClick={handleSubmitFeedback}
                disabled={newFeedback.rating === 0 || !user}
              >
                <ThumbsUp className="h-4 w-4" />
                Submit Feedback
              </Button>
              {!user && (
                <p className="text-xs text-muted-foreground text-center">
                  Sign in to submit feedback
                </p>
              )}
            </CardContent>
          </Card>

          {/* Submit Feature Request */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-500" />
                Request a Feature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Feature Title</p>
                <Input
                  placeholder="What feature would you like?"
                  value={newFeatureRequest.title}
                  onChange={(e) => setNewFeatureRequest({ ...newFeatureRequest, title: e.target.value })}
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Description (optional)</p>
                <Textarea
                  placeholder="Describe the feature..."
                  value={newFeatureRequest.description}
                  onChange={(e) => setNewFeatureRequest({ ...newFeatureRequest, description: e.target.value })}
                  rows={2}
                />
              </div>
              <Button 
                className="w-full gap-2" 
                onClick={handleSubmitFeatureRequest}
                disabled={!newFeatureRequest.title.trim() || !user}
              >
                <Send className="h-4 w-4" />
                Submit Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
