import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const TaglineGenerator: NextPage = () => {
  return (
    <Layout
      // title="Tagline Generator"
      breadcrumbs={ExperimentsLevelBreadcrumbs(
        "Tagline Generator",
        "/tagline-generator"
      )}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default TaglineGenerator;
