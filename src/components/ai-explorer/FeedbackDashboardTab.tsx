import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, Lightbulb, TrendingUp, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { toast } from 'sonner';

// Mock feedback data for demonstration
const mockFeedbacks = [
  { id: '1', rating: 5, usefulness_score: 4, missing_features: ['API Integration', 'Mobile App'], comment: 'Great platform for AI assessment!', created_date: '2025-01-20' },
  { id: '2', rating: 4, usefulness_score: 5, missing_features: ['Slack Integration', 'Custom Reports'], comment: 'Very comprehensive tool.', created_date: '2025-01-19' },
  { id: '3', rating: 5, usefulness_score: 4, missing_features: ['API Integration', 'SSO'], comment: 'Excellent for enterprise planning.', created_date: '2025-01-18' },
  { id: '4', rating: 3, usefulness_score: 3, missing_features: ['Mobile App', 'Offline Mode'], comment: 'Good but needs mobile support.', created_date: '2025-01-17' },
  { id: '5', rating: 4, usefulness_score: 4, missing_features: ['API Integration'], comment: 'Solid platform overall.', created_date: '2025-01-16' },
  { id: '6', rating: 5, usefulness_score: 5, missing_features: ['Custom Reports', 'White Label'], comment: 'Perfect for our needs!', created_date: '2025-01-15' },
  { id: '7', rating: 4, usefulness_score: 4, missing_features: ['Slack Integration', 'API Integration'], comment: 'Would love better integrations.', created_date: '2025-01-14' },
  { id: '8', rating: 5, usefulness_score: 5, missing_features: [], comment: 'No complaints, excellent tool!', created_date: '2025-01-13' },
];

export function FeedbackDashboardTab() {
  const [feedbacks] = useState(mockFeedbacks);
  const [newFeedback, setNewFeedback] = useState({ rating: 0, comment: '', features: '' });

  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0';

  const averageUsefulness = feedbacks.filter(f => f.usefulness_score).length > 0
    ? (feedbacks.filter(f => f.usefulness_score).reduce((sum, f) => sum + f.usefulness_score, 0) / 
       feedbacks.filter(f => f.usefulness_score).length).toFixed(1)
    : '0';

  const allFeatureSuggestions = feedbacks
    .flatMap(f => f.missing_features || [])
    .filter(f => f && f.trim());

  const featureFrequency = allFeatureSuggestions.reduce((acc: Record<string, number>, feature) => {
    const normalized = feature.toLowerCase().trim();
    acc[normalized] = (acc[normalized] || 0) + 1;
    return acc;
  }, {});

  const topFeatures = Object.entries(featureFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([feature, count]) => ({ feature, count }));

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: feedbacks.filter(f => f.rating === rating).length,
    percentage: feedbacks.length > 0 ? (feedbacks.filter(f => f.rating === rating).length / feedbacks.length) * 100 : 0
  }));

  const handleSubmitFeedback = () => {
    if (newFeedback.rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    toast.success('Thank you for your feedback!');
    setNewFeedback({ rating: 0, comment: '', features: '' });
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
                <p className="text-3xl font-bold">{averageRating}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= Math.round(parseFloat(averageRating)) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Responses</p>
                <p className="text-3xl font-bold">{feedbacks.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usefulness Score</p>
                <p className="text-3xl font-bold">{averageUsefulness}/5</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={parseFloat(averageUsefulness) * 20} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Feature Requests</p>
                <p className="text-3xl font-bold">{topFeatures.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Unique suggestions</p>
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
              {topFeatures.length > 0 ? (
                topFeatures.map(({ feature, count }, index) => (
                  <div key={feature} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="capitalize font-medium">{feature}</span>
                    </div>
                    <Badge variant="secondary">{count} requests</Badge>
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
              {feedbacks.slice(0, 5).map((feedback) => (
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
                    <span className="text-xs text-muted-foreground">{feedback.created_date}</span>
                  </div>
                  <p className="text-sm">{feedback.comment}</p>
                  {feedback.missing_features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {feedback.missing_features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              <p className="text-sm font-medium mb-2">Comments</p>
              <Textarea
                placeholder="Share your experience..."
                value={newFeedback.comment}
                onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Feature Requests (comma-separated)</p>
              <Textarea
                placeholder="API Integration, Mobile App, SSO..."
                value={newFeedback.features}
                onChange={(e) => setNewFeedback({ ...newFeedback, features: e.target.value })}
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 gap-2" onClick={handleSubmitFeedback}>
                <ThumbsUp className="h-4 w-4" />
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
