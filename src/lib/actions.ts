"use server";

import { auth } from "@/app/auth";
import { parseServerActionResponse } from "./custom-utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

interface ServerActionResponse<T = unknown> {
  _id?: string;
  error: string;
  status: "SUCCESS" | "ERROR";
  data?: T;
}

interface CreateStartupFormData {
  title: string;
  description: string;
  category: string;
  image: string;
  pitch: string;
  views: number;
  slug: {
    _type: "slug";
    current: string;
  };
  author: {
    _type: "reference";
    _ref: string;
  };
}

export const createPitch = async (
  form: FormData,
  pitch: string
): Promise<ServerActionResponse> => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup: CreateStartupFormData = {
      title: title as string,
      description: description as string,
      category: category as string,
      image: link as string,
      pitch,
      views: 0,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.id as string,
      },
    };

    const result = await writeClient.create({ _type: "startup", ...startup });
    console.log("Startup created:", result);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating startup:", error);

    return parseServerActionResponse({
      error: error instanceof Error ? error.message : "Unknown error occurred",
      status: "ERROR",
    });
  }
};
