"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { ZodError } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

interface FormState {
  error: string;
  status: "INITIAL" | "SUCCESS" | "ERROR";
}

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  // Form field states to preserve values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
  });

  // Handle input changes to preserve values
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFormSubmit = async (
    prevState: FormState,
    formDataObj: FormData
  ): Promise<FormState> => {
    try {
      const formValues = {
        title: formData.title || (formDataObj.get("title") as string),
        description:
          formData.description || (formDataObj.get("description") as string),
        category: formData.category || (formDataObj.get("category") as string),
        link: formData.link || (formDataObj.get("link") as string),
        pitch,
      };

      // Update form state to preserve values in case of validation errors
      setFormData({
        title: formValues.title,
        description: formValues.description,
        category: formValues.category,
        link: formValues.link,
      });

      await formSchema.parseAsync(formValues);

      const result = await createPitch(formDataObj, pitch);

      if (result.status === "SUCCESS") {
        toast.success("Success", {
          description: "Your startup pitch has been created successfully!",
        });

        // Reset form after successful submission
        setFormData({
          title: "",
          description: "",
          category: "",
          link: "",
        });
        setPitch("");
        setErrors({});

        router.push(`/startup/${result._id}`);

        return {
          error: "",
          status: "SUCCESS",
        };
      } else {
        // Handle server action error
        toast.error("Error", {
          description: result.error || "Failed to create pitch",
        });

        return {
          ...prevState,
          error: result.error || "Failed to create pitch",
          status: "ERROR",
        };
      }
    } catch (error) {
      console.log("Validation error:", error);

      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Validation Error", {
          description: "Please check your inputs and try again",
        });

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR",
        };
      }

      toast.error("Unexpected Error", {
        description: "An unexpected error occurred",
      });

      return {
        ...prevState,
        error: "Unexpected Error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL" as const,
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="!startup-form_input"
          required
          placeholder="New Startup"
        />
        {errors?.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="!startup-form_textarea"
          required
          placeholder="Short description of your startup idea"
        />
        {errors?.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          category
        </label>
        <Input
          id="category"
          name="category"
          className="!startup-form_input"
          required
          placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
        />
        {errors?.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image/Video Link
        </label>
        <Input
          id="link"
          name="link"
          className="!startup-form_input"
          required
          placeholder="Paste a link to your demo or promotional media"
        />
        {errors?.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{
            borderRadius: 28,
            overflow: "hidden",
            borderWidth: 3,
            padding: 12,
          }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          className="mt-3"
          visibleDragbar={false}
        />
        {errors?.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="!startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? (
          "Submitting..."
        ) : (
          <>
            <span>Submit Your Pitch</span>
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default StartupForm;
