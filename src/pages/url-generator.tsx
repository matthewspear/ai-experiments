import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { ComingSoon } from "@/components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const URLGenerator: NextPage = () => {
  return (
    <Layout
      title="URL Generator"
      slug="/url-generator"
      breadcrumbs={ExperimentsLevelBreadcrumbs(
        "URL Generator",
        "/url-generator"
      )}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default URLGenerator;
