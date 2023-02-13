import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const Summary: NextPage = () => {
  return (
    <Layout
      // title="Summary"
      breadcrumbs={ExperimentsLevelBreadcrumbs("Summary", "/summary")}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default Summary;
