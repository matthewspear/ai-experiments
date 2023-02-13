import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const Planner: NextPage = () => {
  return (
    <Layout
      // title="Planner"
      breadcrumbs={ExperimentsLevelBreadcrumbs("Planner", "/planner")}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default Planner;
