"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface CommentsListProps {
  blogId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ blogId }) => {
  const { t } = useTranslation("blogs");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!blogId) return;
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${API_URL}/api/comments/by-blog?blog=${encodeURIComponent(blogId)}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setComments(data.data);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [blogId]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {t("leaveAReply.commentsTitle", "Comments")} ({comments.length})
      </h3>
      <div className="space-y-6">
        {comments.map((c) => (
          <div
            key={c._id}
            className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-900">{c.name}</span>
              <span className="text-sm text-gray-500">
                {formatDate(c.createdAt)}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {c.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
