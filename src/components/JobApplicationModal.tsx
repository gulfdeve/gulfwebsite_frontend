"use client";
import React, { useState, useRef, DragEvent } from "react";
import { X, Upload } from "lucide-react";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";

/** Blocked executable/script extensions for security */
const BLOCKED_EXTENSIONS = [
    ".exe", ".bat", ".cmd", ".com", ".scr", ".vbs", ".wsf", ".ps1",
    ".sh", ".bash", ".zsh", ".csh",
    ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
    ".php", ".php3", ".php4", ".php5", ".php7", ".php8", ".phtml",
    ".py", ".pyc", ".pyw", ".pyo", ".pyd",
    ".rb", ".rbw", ".pl", ".pm", ".cgi",
    ".asp", ".aspx", ".jsp", ".jspx",
    ".html", ".htm", ".xhtml", ".shtml",
    ".dll", ".so", ".dylib", ".sys", ".drv", ".bin",
    ".zip", ".rar", ".7z", ".jar", ".war", ".msi", ".deb", ".rpm",
    ".vb", ".vbs", ".vbe", ".ws", ".wsf", ".wsc", ".wsh",
    ".lnk", ".url", ".reg",
];

const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

interface JobApplicationModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    jobId: string;
    jobTitle: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    coverLetter: string;
}

export default function JobApplicationModal({
    isOpen,
    onCloseAction,
    jobId,
    jobTitle,
}: JobApplicationModalProps) {
    const { t } = useTranslation("careers");
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        coverLetter: "",
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const resumeInputRef = useRef<HTMLInputElement>(null);
    const portfolioInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateFile = (file: File): string | null => {
        const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
        if (BLOCKED_EXTENSIONS.includes(ext)) {
            return t("application.errors.executableBlocked") || "Executable and script files are not allowed. Please upload PDF or DOCX only.";
        }
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return t("application.errors.pdfDocxOnly") || "Only PDF and DOCX files are allowed";
        }
        if (file.size > MAX_FILE_SIZE) {
            return t("application.errors.fileSize") || "File size must be less than 3MB";
        }
        return null;
    };

    const handleFileSelect = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "resume" | "portfolio"
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const err = validateFile(file);
            if (err) {
                toast.error(err);
                e.target.value = "";
                return;
            }
            if (type === "resume") {
                setResumeFile(file);
            } else {
                setPortfolioFile(file);
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, type: "resume" | "portfolio") => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            const err = validateFile(file);
            if (err) {
                toast.error(err);
                return;
            }
            if (type === "resume") {
                setResumeFile(file);
            } else {
                setPortfolioFile(file);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.coverLetter) {
            toast.error(t("application.errors.requiredFields") || "All fields are required");
            return;
        }

        if (!resumeFile) {
            toast.error(t("application.errors.resumeRequired") || "Resume is required");
            return;
        }

        setIsSubmitting(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            if (!API_URL) {
                throw new Error("API URL is not configured");
            }

            // Create FormData for file upload
            const submitFormData = new FormData();
            submitFormData.append("jobId", jobId);
            submitFormData.append("firstName", formData.firstName);
            submitFormData.append("lastName", formData.lastName);
            submitFormData.append("email", formData.email);
            submitFormData.append("coverLetter", formData.coverLetter);
            submitFormData.append("resume", resumeFile);
            if (portfolioFile) {
                submitFormData.append("portfolio", portfolioFile);
            }

            const response = await fetch(`${API_URL}/api/job-applications`, {
                method: "POST",
                body: submitFormData,
            });

            const data = await response.json();

            if (data.success) {
                toast.success(t("application.success") || "Application submitted successfully!");
                // Reset form
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    coverLetter: "",
                });
                setResumeFile(null);
                setPortfolioFile(null);
                onCloseAction();
            } else {
                toast.error(data.message || t("application.errors.submit") || "Failed to submit application");
            }
        } catch (error: any) {
            console.error("Error submitting application:", error);
            toast.error(t("application.errors.submit") || "Failed to submit application");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            onCloseAction();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-black" />
                </button>

                {/* Modal Content */}
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#01366f" }}>
                            {t("application.title") || "Upload Resume & Portfolio"}
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            {t("application.description") ||
                                "Apply for this job in a few clicks. Recruiter needs your updated resume and proof of work."}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                {t("application.firstName") || "First Name"}
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder={t("application.firstName") || "First Name"}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                {t("application.lastName") || "Last Name"}
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder={t("application.lastName") || "Last Name"}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                {t("application.email") || "Email"}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={t("application.email") || "Email"}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Cover Letter */}
                        <div>
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                                {t("application.coverLetter") || "Cover Letter"}
                            </label>
                            <textarea
                                id="coverLetter"
                                name="coverLetter"
                                value={formData.coverLetter}
                                onChange={handleInputChange}
                                placeholder={t("application.coverLetterPlaceholder") || "Write your cover letter here..."}
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* File Upload Area */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("application.resume") || "Resume"} <span className="text-red-500">*</span>
                            </label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, "resume")}
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-blue-300 bg-blue-50/50"
                                    }`}
                            >
                                <input
                                    type="file"
                                    ref={resumeInputRef}
                                    accept=".pdf"
                                    onChange={(e) => handleFileSelect(e, "resume")}
                                    className="hidden"
                                    disabled={isSubmitting}
                                />
                                <Upload className="w-12 h-12 mx-auto mb-3" style={{ color: "#01366f" }} />
                                <p className="text-sm text-gray-600 mb-2">
                                    {t("application.dragDrop") || "Drag & Drop or"}
                                    <button
                                        type="button"
                                        onClick={() => resumeInputRef.current?.click()}
                                        className="underline ml-1 hover:opacity-80 transition-opacity"
                                        style={{ color: "#01366f" }}
                                        disabled={isSubmitting}
                                    >
                                        {t("application.chooseFile") || "Choose file"}
                                    </button>
                                    {" "}to upload
                                </p>
                                <p className="text-xs text-gray-500">
                                    {t("application.fileFormat") || "PDF or DOCX Max 3.0MB"}
                                </p>
                                {resumeFile && (
                                    <p className="mt-2 text-sm text-green-600 font-medium">
                                        {t("application.fileSelected") || "Selected:"} {resumeFile.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Portfolio Upload (Optional) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t("application.portfolio") || "Portfolio"} ({t("application.optional") || "Optional"})
                            </label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, "portfolio")}
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-blue-300 bg-blue-50/50"
                                    }`}
                            >
                                <input
                                    type="file"
                                    ref={portfolioInputRef}
                                    accept=".pdf"
                                    onChange={(e) => handleFileSelect(e, "portfolio")}
                                    className="hidden"
                                    disabled={isSubmitting}
                                />
                                <Upload className="w-12 h-12 mx-auto mb-3" style={{ color: "#01366f" }} />
                                <p className="text-sm text-gray-600 mb-2">
                                    {t("application.dragDrop") || "Drag & Drop or"}
                                    <button
                                        type="button"
                                        onClick={() => portfolioInputRef.current?.click()}
                                        className="underline ml-1 hover:opacity-80 transition-opacity"
                                        style={{ color: "#01366f" }}
                                        disabled={isSubmitting}
                                    >
                                        {t("application.chooseFile") || "Choose file"}
                                    </button>
                                    {" "}to upload
                                </p>
                                <p className="text-xs text-gray-500">
                                    {t("application.fileFormat") || "PDF or DOCX Max 3.0MB"}
                                </p>
                                {portfolioFile && (
                                    <p className="mt-2 text-sm text-green-600 font-medium">
                                        {t("application.fileSelected") || "Selected:"} {portfolioFile.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full text-white font-semibold py-3 px-6 rounded-md transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: "#01366f" }}
                            >
                                {isSubmitting
                                    ? t("application.submitting") || "Submitting..."
                                    : t("application.submit") || "SUBMIT"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

