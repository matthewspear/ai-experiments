import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { ComingSoon } from "@/components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const Expand: NextPage = () => {
  return (
    <Layout
      title="Expander"
      breadcrumbs={ExperimentsLevelBreadcrumbs("Expander", "/expand")}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default Expand;
