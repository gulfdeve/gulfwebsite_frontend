"use client";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

interface CommentFormProps {
  blog: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ blog }) => {
  const { t } = useTranslation("blogs");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          name,
          email,
          saveInfo,
          blog,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t("leaveAReply.success"));

        // Reset form
        setComment("");
        setName("");
        setEmail("");
        setSaveInfo(false);
      } else {
        toast.error(result.message || t("leaveAReply.error"));
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error(t("leaveAReply.networkError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white">
        <h2 className="text-3xl font-medium mb-4 text-gray-800">
          <span className="text-primary border-b-[1px] border-[#DEB66A]">
            {t("leaveAReply.title")}{" "}
          </span>
          <span className="text-[#DEB66A]">{t("leaveAReply.reply")}</span>
        </h2>

        <p className="mb-4">
          {t("leaveAReply.emailNote")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Comment Field */}
          <div>
            <label
              htmlFor="comment"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              {t("leaveAReply.comment")}
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary resize-none transition duration-150 ease-in-out"
              style={{ minHeight: "150px" }}
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              {t("leaveAReply.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary transition duration-150 ease-in-out h-12"
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              {t("leaveAReply.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary transition duration-150 ease-in-out h-12"
              disabled={isSubmitting}
            />
          </div>

          {/* Custom Checkbox */}
          <div className="flex items-center">
            <input
              id="saveInfo"
              name="saveInfo"
              type="checkbox"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
              className="appearance-none h-4 w-4 border border-gray-400 rounded-sm checked:bg-[#DEB66A] checked:border-0 focus:ring-0 cursor-pointer relative
                before:content-['✓'] before:absolute before:text-white before:text-xs before:top-[-2px] before:left-[3px] before:opacity-0 checked:before:opacity-100 transition"
              disabled={isSubmitting}
            />
            <label
              htmlFor="saveInfo"
              className="ml-2 block text-sm text-gray-700 cursor-pointer"
            >
              {t("leaveAReply.saveInfo")}
            </label>
          </div>

          {/* Send Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-32 cursor-pointer hover:bg-[#DEB66A] hover:text-white hover:border-white transition-colors duration-300 py-2 mx-auto font-medium rounded-full border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("leaveAReply.submitting") : t("leaveAReply.send")}
            </button>
          </div>
        </form>
    </div>
  );
};

export default CommentForm;
