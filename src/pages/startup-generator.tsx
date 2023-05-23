import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { ComingSoon } from "@/components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const StartupGenerator: NextPage = () => {
  return (
    <Layout
      title="Startup Name Generator"
      slug="/startup-generator"
      breadcrumbs={ExperimentsLevelBreadcrumbs(
        "Startup Name Generator",
        "/startup-generator"
      )}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default StartupGenerator;
