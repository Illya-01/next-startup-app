import { auth } from "@/app/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const CreateStartupPage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Submit Your Startup Pitch</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default CreateStartupPage;
