"use client";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "next-i18next";
import TeamCard from "./TeamCard";

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  image: string;
  department: string;
}

// Members pinned to the top of their department, regardless of API order.
const PINNED_MEMBERS: { [department: string]: string } = {
  "sales-team": "julio barros",
  "marketing-and-media-creatives": "muhammad kamran",
};

export default function TeamSection() {
  const { t } = useTranslation("team");
  const [members, setMembers] = useState<TeamMember[]>([]);

  // Fetch members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend.gulfestates.ae";
        const response = await fetch(`${API_URL}/api/team/members`);
        const data = await response?.json();

        if (data.success) {
          console.log("Team Members Data:", data.data);
          setMembers(data.data || []);
        } else {
          console.error("Failed to fetch members:", data.message);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Get translated department name
  const getDepartmentName = (departmentSlug: string): string => {
    return t(`departments.${departmentSlug}`, departmentSlug);
  };

  // Group members by department and create teams array
  const teams = useMemo(() => {
    const departmentGroups: { [key: string]: TeamMember[] } = {};

    members.forEach((member) => {
      if (member.department) {
        if (!departmentGroups[member.department]) {
          departmentGroups[member.department] = [];
        }
        departmentGroups[member.department].push(member);
      }
    });

    // Convert to array format with title and members
    return Object.entries(departmentGroups)
      .filter(([_, members]) => members.length > 0)
      .map(([department, teamMembers]) => {
        const pinnedName = PINNED_MEMBERS[department];
        const sortedMembers = pinnedName
          ? [...teamMembers].sort((a, b) => {
              const aPinned = a.name?.trim().toLowerCase() === pinnedName ? 0 : 1;
              const bPinned = b.name?.trim().toLowerCase() === pinnedName ? 0 : 1;
              return aPinned - bPinned;
            })
          : teamMembers;

        return {
          title: getDepartmentName(department),
          members: sortedMembers,
        };
      });
  }, [members, t]);
  console.log({ teams });

  return (
    <section className="container mx-auto my-10 px-4 md:px-8 pb-10">
      {teams.map((team, index) => {
        const words = team.title.split(" ");
        const word1 = words[0];
        const rest = words.slice(1).join(" ");

        return (
          <div key={index} className="mb-10">
            <div className="mb-8 w-fit">
              <div className="flex flex-col gap-1">
                <h2 className="sm:text-3xl text-2xl wrap-break-word font-semibold">
                  <span className="text-primary">{word1}</span>{" "}
                  <span className="text-yellow-600">{rest}</span>
                </h2>
                <div className="bg-[url('/images/line-gold.png')] bg-cover bg-center bg-no-repeat h-px" />
              </div>
            </div>

            <div className="grid gap-4 md:gap-10 lg:grid-cols-3 min-[500px]:grid-cols-2 max-[500px]:grid-cols-1">
              {team?.members?.map((member, i) => (
                <TeamCard
                  key={member._id || i}
                  name={member?.name || ""}
                  role={member?.role || ""}
                  imageUrl={member?.image || "/images/team-avatar.webp"}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
